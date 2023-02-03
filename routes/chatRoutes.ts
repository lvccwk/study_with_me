import express from 'express'
// import { checkPassword } from '../util/hash'
import { logger } from '../util/logger'
import { client } from '../util/db'
import { User } from '../util/interface'
import moment = require('moment')
import { isLoggedInAPI } from '../util/guard'

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

export const chatRoutes = express.Router()
chatRoutes.get('/chatroom', getUserList)
chatRoutes.get('/chatrecord', isLoggedInAPI, getChatRecord)
chatRoutes.get('/instantchat', isLoggedInAPI, instantChat)

async function getUserList(req: express.Request, res: express.Response) {
	try {
		let selectUserResult = await client.query(
			`select users.id,
			users.username,
			users.type,
			image.image_icon
		from users
			left JOIN image ON users.id = image.user_id`
		)

		// let userImage = await client.query(
		// 	`SELECT image_icon from image JOIN users ON image.user_id = users.id`
		// )
		let foundMember = selectUserResult.rows

		res.json({
			data: foundMember
		})
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}

async function getChatRecord(req: express.Request, res: express.Response) {
	try {
		let databaseToPublicChats = await client.query(
			`Select 
			($1=users.id) as is_myself,
			users.id, users.username, public_chat.chat_record, public_chat.created_at
			FROM public_chat
			JOIN users ON users.id = public_chat.user_id
			ORDER BY public_chat.id ASC`,
			[req.session['user']!['id']]
		)

		// let userImage = await client.query(
		// 	`SELECT image_icon from image JOIN users ON image.user_id = users.id`
		// )
		let foundMember = databaseToPublicChats.rows

		if (foundMember.length > 1) {
			let timeResults = foundMember[0].created_at
			// console.log(`check my time moment`, timeResults)

			let timeResult = moment(timeResults).format(
				'MMMM Do YYYY, h:mm:ss a'
			)
			// let timeResult = moment(timeResults).format('MMMM Do YYYY, h:mm:ss a')

			res.json({
				data: foundMember,
				time: timeResult
			})
			return
		}
		res.status(500).json({
			message: '[USR001] - Not foundMember'
		})
		return
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}

async function instantChat(req: express.Request, res: express.Response) {
	try {
		let databaseToPublicChats = await client.query(
			`Select 
			($1=users.id) as is_myself,
			users.id, users.username, public_chat.chat_record
			FROM public_chat
			JOIN users ON users.id = public_chat.user_id
			ORDER BY public_chat.id ASC`,
			[req.session['user']!['id']]
		)
		// let userImage = await client.query(
		// 	`SELECT image_icon from image JOIN users ON image.user_id = users.id`
		// )
		let foundMember = databaseToPublicChats.rows
		console.log('hiihiihhihihi', databaseToPublicChats.rows)

		let timeResults = databaseToPublicChats.rows[0].created_at
		console.log(`check my time moment`, timeResults)

		let timeResult = moment(timeResults).format('MMMM Do YYYY, h:mm:ss a')
		res.json({
			data: foundMember,
			time: timeResult
		})
	} catch (error) {
		logger.error(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}
