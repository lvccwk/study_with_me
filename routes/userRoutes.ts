import express from 'express'
import { hashPassword } from '../util/hash'
// import { checkPassword } from '../util/hash'
import { logger } from '../util/logger'
import fetch from 'cross-fetch'
import crypto from 'crypto'
import { client } from '../util/db'
import { User } from '../util/interface'
import { formParsePromise } from '../util/formidable'

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
userRoutes.get('/tutorpage', getTutorInfo)
userRoutes.get('/studentpage', getStudentInfo)
userRoutes.get('/homepage-tutor', getTutorHome)

// userRoutes.get('/getgoogle', getGoogleInfo)

// userRoutes.get('/chatroom', getUsername)
// userRoutes.get('/login/google', getUserInfo)

// async function getGoogleInfo(req: express.Request, res: express.Response) {
// 	try {
// 		const accessToken = req.session?.['grant'].response.access_token

// 		// const fetchRes = await fetch(
// 		// 	'https://www.googleapis.com/oauth2/v2/userinfo',
// 		// 	{
// 		// 		method: 'get',
// 		// 		headers: {
// 		// 			Authorization: `Bearer ${accessToken}`
// 		// 		}
// 		// 	}
// 		// )

// 		// const googleUserProfile = await fetchRes.json()
// 		// let user = (
// 		// 	await client.query(`SELECT * FROM users WHERE users.email = $1`, [
// 		// 		googleUserProfile.email
// 		// 	])
// 		// ).rows[0]
// 		// console.log(user)
// 		console.log(accessToken)
// 		res.json({
// 			// data: user ? user.email : ''
// 			data: accessToken
// 		})
// 	} catch (error) {
// 		console.log(error)
// 	}
// }

async function loginGoogle(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	res.redirect('/register.html')
	next()
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
			res.redirect('/register.html?google=1')
			// registration

			let hashedPassword = await hashPassword(crypto.randomUUID())
			console.log(googleUserProfile.email)
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
		console.log(user)

		req.session['user'] = user

		console.log('loading google login')
		// return res.redirect('/account.html')
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR003] - Server error'
		})
	}
}

// async function loginGoogle(req: express.Request, res: express.Response) {
// 	console.log('123')
// 	try {
// 		const accessToken = req.session?.['grant'].response.access_token
// 		const fetchRes = await fetch(
// 			'https://www.googleapis.com/oauth2/v2/userinfo',
// 			{
// 				method: 'get',
// 				headers: {
// 					Authorization: `Bearer ${accessToken}`
// 				}
// 			}
// 		)
// 		console.log('a')
// 		const googleUserProfile = await fetchRes.json()
// 		let users = (
// 			await client.query(`SELECT * FROM users WHERE users.email = $1`, [
// 				googleUserProfile.email
// 			])
// 		).rows

// 		let user = users[0]
// 		console.log('b', user)
// 		if (!user) {
// 			// Create the user when the user does not exist
// 			console.log('no user')
// 			let emailPrefix = googleUserProfile.email.split('@')[0]
// 			console.log(emailPrefix)
// 			user = (
// 				await client.query(
// 					`INSERT INTO users (email,username) VALUES ($1,$2) RETURNING *`,
// 					[googleUserProfile.email, emailPrefix]
// 				)
// 			).rows[0]
// 		}

// 		req.session['user'] = user
// 		console.log(req.session['user'])
// 		return res.redirect('/account.html')
// 	} catch (error) {
// 		console.log('ERR0R: ' + error)
// 		res.status(500).json({
// 			message: '[SERVER ERROR]'
// 		})
// 	}
// }

async function register(req: express.Request, res: express.Response) {
	try {
		let { fields, files } = await formParsePromise(req)
		let { username, password, email, type, subjectId } = fields
		console.log({ username, password, email, type, subjectId })
		console.log(files)
		if (!username || !password || !email || !type || !subjectId) {
			res.status(402).json({
				message: 'Invalid input'
			})
			return
		}

		let newUser = await client.query(
			`INSERT INTO users (username, password, email, type, created_at, updated_at) values ($1,$2,$3,$4,now(),now()) returning id`,
			[username, password, email, type]
		)

		let newTeacher = await client.query(
			`INSERT INTO teacher (user_id, created_at, updated_at) values ($1,now(),now()) returning id`,
			[newUser.rows[0].id]
		)

		let newSubject = await client.query(
			`INSERT INTO teacher_subject (subject_id,teacher_id, created_at, updated_at) values ($1,$2,now(),now()) returning id`,
			[subjectId, newTeacher.rows[0].id]
		)

		let imageUser = await client.query(
			`INSERT INTO image (user_id,image_icon, created_at, updated_at) values ($1,$2,now(),now()) returning id`,
			[newUser.rows[0].id, files?.image?.newFilename || '']
		)
		// res.redirect('/')

		res.json({
			data: newSubject,
			imageUser,
			message: 'register ok'
		})
		// next()
		// res.redirect('/')
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
		console.log('login:', req.session.user)
		delete req.session.user
		console.log(req.session.user)

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
		console.log({ email, password })

		if (!email || !password) {
			res.status(402).json({
				message: 'Invalid input'
			})
			return
		}

		let selectUserResult = await client.query(
			`select * from users where email = $1 `,
			[email]
		)

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

		console.log(foundUser.username)
		req.session.user = {
			username: foundUser.username,
			password: '',
			email: foundUser.email
		}

		console.log(`check req session ${req.session}`)
		console.log('foundUser = ', foundUser)

		res.redirect('/account.html')
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
		let tutorSubject = await client.query(
			`SELECT chinese_name from subject JOIN teacher_subject ON subject.id = teacher_subject.subject_id`
		)
		// let tutorImage = await client.query(
		// 	`SELECT image_icon from image JOIN users ON image.user_id = user.id returning *`
		// )

		res.json({
			data: tutorInfo,
			tutorSubject,
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
			
			WHERE users.type = 'student'
			`
		)
		// let tutorSubject = await client.query(
		// 	`SELECT chinese_name from subject JOIN teacher_subject ON subject.id = teacher_subject.subject_id`
		// )
		// let tutorImage = await client.query(
		// 	`SELECT image_icon from image JOIN users ON image.user_id = user.id returning *`
		// )

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
			// `SELECT users.username, image.image_icon,subject.id,subject.chinese_name, users.type
			// from users
			// join teacher on teacher.user_id = users.id
			// join teacher_subject on teacher_subject.teacher_id = teacher.id
			// join subject on subject.id = teacher_subject.subject_id
			// join image on image.user_id = users.id

			// WHERE users.type = 'teacher'
			// `

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
		let tutorSubject = await client.query(
			`SELECT chinese_name from subject JOIN teacher_subject ON subject.id = teacher_subject.subject_id`
		)
		// let tutorImage = await client.query(
		// 	`SELECT image_icon from image JOIN users ON image.user_id = user.id returning *`
		// )

		res.json({
			data: tutorInfo,
			tutorSubject,
			message: 'select teacher, image and subject ok !'
		})
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}
