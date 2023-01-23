import express from 'express'
// import { client } from '../app'
import { checkPassword, hashPassword } from '../util/hash'
import { logger } from '../util/logger'
import fetch from 'cross-fetch'
import crypto from 'crypto'
import { client } from '../util/db'
export const userRoutes = express.Router()

userRoutes.post('/login', login)
userRoutes.get('/logout', logout)
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
		req.session['user'] = user

		// console.log('loading goold login')
		return res.redirect('/')
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR003] - Server error'
		})
	}
}
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

function getSessionProfile(req: express.Request, res: express.Response) {
	res.json(req.session.user || {})
}
async function login(req: express.Request, res: express.Response) {
	try {
		logger.info('body = ', req.body)
		let { username, password } = req.body
		if (!username || !password) {
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

		let isPasswordValid = await checkPassword(password, foundUser.password)
		if (!isPasswordValid) {
			res.status(402).json({
				message: 'Invalid password'
			})
			return
		}

		delete foundUser.password
		req.session.user = foundUser

		console.log('foundUser = ', foundUser)

		res.redirect('/admin.html')
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}
