// import express from 'express'
// import http from 'http'
// import { Server as SocketIO } from 'socket.io'
// import { client } from '../util/db'
// import { User } from '../util/interface'
// import { logger } from '../util/logger'
// import moment = require('moment')
// export const chatRoutes = express.Router()
// //....
// const app = express()
// app.use(express.json())
// const server = new http.Server(app)
// const io = new SocketIO(server)

// declare module 'express-session' {
// 	interface SessionData {
// 		counter?: number
// 		user?: User
// 	}
// }

// io.on('chatroom/:id', function (socket) {
// 	console.log(socket)
// 	socket.emit('message', 'welcome to chatroom')
// })

// chatRoutes.get('pm/:username', messageHistory)
// chatRoutes.get('pm', sendMessage)
// chatRoutes.get('/welcome', getWelcomeMsg)
// chatRoutes.get('/chathistory', getMsgHistory)
// // chatRoutes.post('createMessage', createMessage)

// async function getMsgHistory(req: express.Request, res: express.Response) {
// 	try {
// 		let selectUserResult = await client.query(
// 			`select content from chatroom`
// 		)

// 		let foundMember = selectUserResult.rows

// 		res.json({
// 			data: foundMember
// 		})
// 	} catch (error) {
// 		logger.error(error)
// 		res.status(500).json({
// 			message: '[USR001] - Server error'
// 		})
// 	}
// }

// async function getWelcomeMsg(req: express.Request, res: express.Response) {
// 	try {
// 		let selectUserResult = await client.query(
// 			`select content from chatroom where from_user = 7 `
// 		)

// 		let foundMember = selectUserResult.rows
// 		console.log(foundMember)
// 		res.json({
// 			data: foundMember
// 		})
// 	} catch (error) {
// 		logger.error(error)
// 		res.status(500).json({
// 			message: '[USR001] - Server error'
// 		})
// 	}
// }

// // create new chatroom function do not finish yet - with insert database function
// async function sendMessage(req: express.Request, res: express.Response) {
// 	try {
// 		let { chatroom_id, message } = req.body
// 		let date = Date.now()
// 		let format_date = moment(date).format('MMMM Do YYYY, h:mm:ss a')

// 		await client.query(
// 			`INSERT INTO chatroom (from_user,to_user,content,created_at, updated_at) values ($1,$2,$3,now(),now())`,
// 			[chatroom_id, , message]
// 		)

// 		io.emit('get_user_id')

// 		res.json({
// 			data: format_date
// 		})
// 	} catch (error) {
// 		logger.error(error)
// 		res.status(500).json({
// 			message: '[USR002] - Server error'
// 		})
// 	}
// }
// // send message history do not finish yet - call chat history to chatroom.js
// async function messageHistory(req: express.Request, res: express.Response) {
// 	try {
// 		let connectUser = await client.query(
// 			`select * from chatroom
// 			where (from_user = 7  and to_user = 4 ) or (from_user = 4 and to_user = 7)
// 			`
// 		)

// 		let foundUser = connectUser.rows

// 		res.json({
// 			data: foundUser
// 		})
// 	} catch (error) {
// 		logger.error(error)
// 		res.status(500).json({
// 			message: '[USR002] - Server error'
// 		})
// 	}
// }
