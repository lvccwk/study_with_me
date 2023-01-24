import express from 'express'
// import { client } from '../app'
import { hashPassword } from '../util/hash'
// import { checkPassword } from '../util/hash'
import { logger } from '../util/logger'
import fetch from 'cross-fetch'
import crypto from 'crypto'
import { client } from '../util/db'
import { User } from '../util/interface'
export const userRoutes = express.Router()
// import { sessionMiddleware } from '../server'
let app = express()
app.use(express.json())

declare module 'express-session' {
	interface SessionData {
		counter?: number
		user?: User
	}
}

userRoutes.post('/login', login)
userRoutes.get('/logout', logout)
userRoutes.post('/register', register)
userRoutes.get('/me', getSessionProfile)
userRoutes.get('/login/google', loginGoogle)

async function loginGoogle(req: express.Request, res: express.Response) {
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
			await client.query(
				`SELECT * FROM users WHERE users.username = $1`,
				[googleUserProfile.email]
			)
		).rows[0]

		if (!user) {
			// registration

			let hashedPassword = await hashPassword(crypto.randomUUID())
			user = (
				await client.query(
					`INSERT INTO users 
						(username,password, created_at, updated_at)
						VALUES ($1,$2, now(),now()) RETURNING *`,
					[googleUserProfile.email, hashedPassword]
				)
			).rows[0]
		}

		delete user.password
		// req.session['user'] = user

		// console.log('loading goold login')
		return res.redirect('/account.html')
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR003] - Server error'
		})
	}
}

function getSessionProfile(req: express.Request, res: express.Response) {
	res.json(req.session.user || {})
}

async function register(req: express.Request, res: express.Response) {
	try {
		let { username, password, email, type } = req.body
		console.log({ username, password, email, type })

		if (!username || !password || !email || !type) {
			res.status(402).json({
				message: 'Invalid input'
			})
			return
		}

		let selectUserResult = await client.query(
			`INSERT INTO users (username, password, email, type, created_at, updated_at) values ($1,$2,$3,$4,now(),now())`,
			[username, password, email, type]
		)

		console.log(selectUserResult)
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR002] - Server error'
		})
	}
}

async function logout(req: express.Request, res: express.Response) {
	try {
		delete req.session.user
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
		// req.session.user = {
		// 	username: foundUser.username,
		// 	password: '',
		// 	email: foundUser.email
		// }

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
