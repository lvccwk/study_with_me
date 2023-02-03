import express from 'express'
import { hashPassword } from '../util/hash'
// import { checkPassword } from '../util/hash'
import { logger } from '../util/logger'
import fetch from 'cross-fetch'
import crypto from 'crypto'
import { client } from '../util/db'
import { User } from '../util/interface'
import { formParsePromise } from '../util/formidable'
import { getUserByEmail } from '../DAO/userDao'

// import { uploadInfo } from '../util/interface'
// import { sessionMiddleware } from '../server'
let app = express()
app.use(express.json())
declare module 'express-session' {
	interface SessionData {
		counter?: number
		user?: User
	}
}

export const userRoutes = express.Router()
userRoutes.post('/login', login)
userRoutes.get('/logout', logout)
userRoutes.post('/register', register)
userRoutes.get('/subject', getSubject)
userRoutes.get('/login/google', loginGoogle)
userRoutes.get('/tutors', getTutorInfo)
userRoutes.get('imageName', getTutorInfo)
userRoutes.get('/studentpage', getStudentInfo)
userRoutes.get('/homepage-tutor', getTutorHome)

async function loginGoogle(
	req: express.Request,
	res: express.Response
	// next: express.NextFunction
) {
	// res.redirect('/register.html')
	// next()
	try {
		const accessToken = req.session?.['grant'].response.access_token
		const fetchRes = await fetch(
			'https://www.googleapis.com/oauth2/v2/userinfo',
			{
				method: 'get',
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		)

		const googleUserProfile = await fetchRes.json()
		let user = (
			await client.query(`SELECT * FROM users WHERE users.email = $1`, [
				googleUserProfile.email
			])
		).rows[0]
		//填多2個資料

		if (!user) {
			// registration

			let hashedPassword = await hashPassword(crypto.randomUUID())

			// let emailPrefix = googleUserProfile.email.split('@')[0]

			user = (
				await client.query(
					`INSERT INTO users
						(username, email, password, created_at, updated_at)
						VALUES ($1,$2,$3, now(),now()) RETURNING *`,
					[
						googleUserProfile.email,
						googleUserProfile.email,
						hashedPassword
					]
				)
			).rows[0]
		}

		req.session['user'] = user

		// console.log('loading google login')
		return res.redirect('/admin')
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR003] - Server error'
		})
	}
}

async function register(req: express.Request, res: express.Response) {
	try {
		let { fields, files } = await formParsePromise(req)
		let { username, password, email, type, subjectId } = fields
		// console.log(
		// 	`new user register information : ${{
		// 		username,
		// 		password,
		// 		email,
		// 		type,
		// 		subjectId
		// 	}}`
		// )
		// console.log(`new user register information: ${files}`)
		if (!username || !password || !email || !type || !subjectId) {
			res.status(402).json({
				message: 'Invalid input'
			})
			return
		}

		if (type == 'teacher') {
			let newUser = await client.query(
				`INSERT INTO users (username, password, email, type, created_at, updated_at) values ($1,$2,$3,$4,now(),now()) returning id`,
				[username, password, email, type]
			)

			let newTeacher = await client.query(
				`INSERT INTO teacher (user_id, created_at, updated_at) values ($1,now(),now()) returning id`,
				[newUser.rows[0].id]
			)

			await client.query(
				`INSERT INTO teacher_subject (subject_id,teacher_id, created_at, updated_at) values ($1,$2,now(),now()) returning id`,
				[subjectId, newTeacher.rows[0].id]
			)

			let imageUser = await client.query(
				`INSERT INTO image (user_id,image_icon, created_at, updated_at) values ($1,$2,now(),now()) returning id`,
				[newUser.rows[0].id, files?.image?.newFilename || '']
			)

			let imageNewName = await client.query(
				`SELECT image_icon FROM image where id = $1`,
				[imageUser.rows[0].id]
			)

			req.session.user = {
				username: username,
				email: email,
				id: newUser.rows[0].id,
				image: imageNewName.rows[0].image_icon,
				type: type
			}

			res.json(req.session.user)
		} else {
			console.log('can get into register route student')
			let newUser = await client.query(
				`INSERT INTO users (username, password, email, type, created_at, updated_at) values ($1,$2,$3,$4,now(),now()) returning id`,
				[username, password, email, type]
			)

			await client.query(
				`INSERT INTO student (user_id, subject_id, created_at, updated_at) values ($1,$2,now(),now())`,
				[newUser.rows[0].id, subjectId]
			)

			let imageUser = await client.query(
				`INSERT INTO image (user_id,image_icon, created_at, updated_at) values ($1,$2,now(),now()) returning id`,
				[newUser.rows[0].id, files?.image?.newFilename || '']
			)

			let imageNewName = await client.query(
				`SELECT image_icon FROM image where id = $1`,
				[imageUser.rows[0].id]
			)

			req.session.user = {
				username: username,
				email: email,
				id: newUser.rows[0].id,
				image: imageNewName.rows[0].image_icon,
				type: type
			}

			res.json(req.session.user)
		}
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR002] - Server error'
		})
	}
}

async function getSubject(req: express.Request, res: express.Response) {
	try {
		let selectUserResult = await client.query(`select * from subject`)

		let foundSubject = selectUserResult.rows

		res.json({
			data: foundSubject
		})
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}

async function logout(req: express.Request, res: express.Response) {
	try {
		// console.log('login:', req.session.user)
		delete req.session.user
		// console.log(req.session.user)

		res.redirect('/')
		// res.json({
		// 	message: 'Logout success'
		// })
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR002] - Server error'
		})
	}
}

async function login(req: express.Request, res: express.Response) {
	try {
		logger.info('body = ', req.body)
		let { email, password } = req.body
		console.log('login input = ')
		console.log({ email, password })

		if (!email || !password) {
			res.status(402).json({
				message: 'Invalid input'
			})
			return
		}

		let selectUserResult = await getUserByEmail(email)

		let foundUser = selectUserResult.rows[0]

		if (!foundUser) {
			res.status(402).json({
				message: 'Invalid username'
			})
			return
		}
		if (foundUser.password !== password) {
			res.status(402).json({
				message: 'Invalid password'
			})
			return
		}

		delete foundUser.password

		let isTeacher = await client.query(
			`select teacher.id from teacher join users on teacher.user_id = users.id where users.id = ${foundUser.id}`
		)

		if (isTeacher.rows[0]) {
			foundUser['type'] = 'teacher'
		} else {
			foundUser['type'] = 'student'
		}

		let userImage = await client.query(
			`select image_icon from image join users on image.user_id = users.id where users.id = ${foundUser.id}`
		)

		// console.log(foundUser.username)
		req.session.user = {
			username: foundUser.username,
			email: foundUser.email,
			id: foundUser.id,
			image: userImage.rows[0].image_icon,
			type: foundUser.type
		}

		console.log(req.session.user)
		// console.log(`check req session ${req.session}`)
		// console.log('foundUser = ', foundUser)

		res.redirect('/admin')
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}

// async function getUsername(req: express.Request, res: express.Response) {
// 	try {
// 		let selectUserResult = await client.query(`select * from subject`)

// 		let foundSubject = selectUserResult.rows

// 		res.json({
// 			data: foundSubject
// 		})
// 	} catch (error) {
// 		logger.error(error)
// 		res.status(500).json({
// 			message: '[USR001] - Server error'
// 		})
// 	}
// }

async function getTutorInfo(req: express.Request, res: express.Response) {
	try {
		let tutorInfo = await client.query(
			// `SELECT users.username, image.image_icon ,subject.id, subject.chinese_name  from users
			// join teacher on teacher.user_id = users.id
			// join teacher_subject on teacher_subject.teacher_id = teacher.id
			// join subject on subject.id = teacher_subject.subject_id
			// join image on image.user_id = users.id

			`SELECT users.username, image.image_icon,subject.id,subject.chinese_name, users.type
			from users
			join teacher on teacher.user_id = users.id
			join teacher_subject on teacher_subject.teacher_id = teacher.id
			join subject on subject.id = teacher_subject.subject_id
			join image on image.user_id = users.id

			WHERE users.type = 'teacher'
			`
		)
		// let tutorSubject = await client.query(
		// 	`SELECT chinese_name from subject JOIN teacher_subject ON subject.id = teacher_subject.subject_id`
		// )
		let tutorImage = await client.query(
			`SELECT image_icon from image JOIN users ON image.user_id = users.id`
		)

		res.json({
			data: tutorInfo,
			tutorImage,
			message: 'select teacher, image and subject ok !'
		})
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}

async function getStudentInfo(req: express.Request, res: express.Response) {
	try {
		let studentInfo = await client.query(
			`SELECT users.username, image.image_icon,subject.id,subject.chinese_name, users.type
			from users
			join teacher on teacher.user_id = users.id
			join teacher_subject on teacher_subject.teacher_id = teacher.id
			join subject on subject.id = teacher_subject.subject_id
			join image on image.user_id = users.id
			
			WHERE users.type = 'student'
			`
		)

		res.json({
			data: studentInfo,
			message: 'select student ok !'
		})
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}

async function getTutorHome(req: express.Request, res: express.Response) {
	try {
		let tutorInfo = await client.query(
			`with 
			distinct_subject as (
				select distinct subject_id as selected_subject_id from teacher_subject ts  
			),
			random_four as (
				select * from distinct_subject order by random() limit 4 
			),
			random_four_teacher as (
				select * from random_four 
				join teacher_subject ts on ts.subject_id  = random_four.selected_subject_id order by random() limit 4 
			
			)
			
			select 
			s.chinese_name,
			u.username 
			from random_four_teacher
			join subject s on s.id  = random_four_teacher.subject_id
			join teacher t on t.id = random_four_teacher.teacher_id
			join users u on u.id = t.id;
			`
		)

		let tutorImage = await client.query(
			`SELECT image_icon from image 
			JOIN users ON image.user_id = users.id`
		)

		res.json({
			data: tutorInfo,
			tutorImage,
			message: 'select teacher, image and subject ok !'
		})
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}
