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

function logout(req: express.Request, res: express.Response) {
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
		let { username, password, email } = req.body
		console.log(req.body)

		if (!username || !password || !email) {
			res.status(402).json({
				message: 'Invalid input'
			})
			return
		}

		let selectUserResult = await client.query(
			`select * from users where username = $1 `,
			[username]
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
		req.session.user = foundUser
		console.log('hihihi')
		console.log('foundUser = ', foundUser)

		res.redirect('/admin.html')
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}
