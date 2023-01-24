import express from 'express'
// import { client } from '../app'
// import { checkPassword, hashPassword } from '../util/hash'
// import { checkPassword } from '../util/hash'
import { logger } from '../util/logger'
// import fetch from 'cross-fetch'
// import crypto from 'crypto'
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

		res.redirect('/admin.html')
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}
