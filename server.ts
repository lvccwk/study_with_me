import express from 'express'
import HTTP from 'http'
import path from 'path'
import pg from 'pg'
import dotenv from 'dotenv'
import { Server as SocketIO } from 'socket.io'
import expressSession from 'express-session'
import { userRoutes } from './routes/userRoutes'
import { adminRoutes } from './routes/adminRoutes'
import { grantExpress, expressSessionConfig } from './plugin-config'
import moment = require('moment')
dotenv.config()
let app = express()
let server = new HTTP.Server(app)
export const io = new SocketIO(server)
app.use(express.json())

export const client = new pg.Client({
	database: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
})

export interface chatroom {
	clan: string
	name: string
}

client.connect()

export const sessionMiddleware = expressSession({
	secret: 'study with me chatroom',
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false }
})

app.use(sessionMiddleware)
app.use(expressSessionConfig)
app.use(grantExpress as express.RequestHandler)

io.use((socket, next) => {
	let req = socket.request as express.Request
	let res = req.res as express.Response
	sessionMiddleware(req, res, next as express.NextFunction)
})

let users: any = {}
// let messages: Message[] = []

app.use(userRoutes)
// app.use('/user', userRoutes)
io.on('connection', (socket) => {
	let req = socket.request as express.Request

	let date = Date.now()

	users = { name: req.session.user?.username }
	users[socket.id] = { name: req.session.user?.username }

	if (req.session.user) {
		console.log(`已安排 ${users.name} 進入 chatroom`)
		socket.join('even_' + date)
		socket.request['session'].save()
	}

	socket.on('unsubscribe', function (room) {
		try {
			socket.leave(room)
		} catch (e) {
			console.log('[error]', 'leave room :', e)
			socket.emit('error', 'couldnt perform requested action')
		}
	})

	socket.on('join_public_room', function () {
		socket.join('join_public_room')
	})

	socket.on('join_room', async (data) => {
		let res = req.res as express.Response
		try {
			console.log('data: 睇data!!!', data)

			let dataA = String(data) + '-' + String(req.session.user?.id)
			let dataB = String(req.session.user?.id) + '-' + String(data)

			// console.log(dataA)
			socket.join(dataA)
			socket.join(dataB)

			io.to(dataA).emit('private msg', dataA)
			io.to(dataB).emit('private msg', dataB)
		} catch (error) {
			res.status(500).json({
				message: '[USR001] - Server error'
			})
		}
	})
	//public
	// socket.on('chat message', async ([msg, id]) => {
	// 	let req = socket.request as express.Request

	// 	const roomId = id + '-' + String(req.session.user?.id)
	// 	console.log({ roomId })

	// 	let username = req.session.user?.username
	// 	let userId = req.session.user?.id

	// 	//user id here
	// 	console.log(`睇下user id : ${userId}`)

	// 	await client.query(
	// 		`INSERT INTO public_chat (user_id,chat_record,chat_message_time,created_at,updated_at) values ($1,$2,now(),now(),now())`,
	// 		[userId, msg]
	// 	)

	// 	io.to(roomId).emit('chat message', {
	// 		senderId: userId,
	// 		senderUsername: username,
	// 		msg,
	// 		receiverId: 0
	// 	})
	// })

	//private
	socket.on('chat message', async ([msg, receiverId]) => {
		let req = socket.request as express.Request
		let roomId = receiverId + '-' + String(req.session.user?.id)
		if (receiverId == 'join_public_room') {
			roomId = 'join_public_room'
			receiverId = 0
		}

		let senderName = req.session.user?.username
		let senderId = req.session.user?.id

		//user id here
		// console.log(`睇下user id : ${userId}`)
		console.log(`睇下user id : ${[msg, receiverId, senderId, senderName]}`)
		// await client.query(
		// 	`INSERT INTO public_chat (user_id,chat_record,chat_message_time,created_at,updated_at) values ($1,$2,now(),now(),now())`,
		// 	[userId, msg]
		// )
		const publicChat = (
			await client.query(
				`INSERT INTO public_chat (sender, receiver, chat_record, chat_message_time,created_at,updated_at) values ($1,$2,$3,now(),now(),now()) returning *`,
				[senderId, receiverId, msg]
			)
		).rows[0]

		let receiverUsername = ''
		if (receiverId) {
			receiverUsername = (
				await client.query(`SELECT username from users where id = $1`, [
					receiverId
				])
			).rows[0].username
		}

		let created_time = moment(publicChat.created_at).format(
			'MMMM Do YYYY, h:mm:ss a'
		)
		created_time
		io.to(roomId).emit('chat message', {
			senderId,
			senderUsername: senderName,
			msg: msg,
			receiverID: receiverId,
			receiverUsername,
			createdAt: created_time,
			chatMessageTime: publicChat.chat_message_time
		})

		socket.on('disconnect', () => {
			console.log(`${users.name} 已離開`)
		})
	})

	app.post('/newChatMessage', async (req, res) => {
		try {
			let { sender, receiver, msg } = req.body
			console.log('/newChatMessage', { sender, receiver, msg })
			// await client.query(
			// 	`INSERT INTO public_chat (sender, receiver, chat_record, chat_message_time,created_at,updated_at) values ($1,$2,$3,now(),now(),now())`,
			// 	[sender, receiver, msg]
			// )
			res.end('ok')
		} catch (error) {
			res.status(500).json({
				message: '[USR001] - Server error'
			})
		}
	})
})
//step 3
app.post('/getuserandroomid', async (req, res) => {
	try {
		let reqResult = req.body

		let receiverID = reqResult.userId
		// let username = req.session.user?.username
		// console.log('getuserandroomid: ', [
		// 	req.session['user']!['id'],
		// 	receiverID
		// ])

		let result = await client.query(
			`
			select ${req.session['user']!['id']} as user_id, 
			sender_user.id as sender_id, sender_user.username as sender_name, 
			receiver_user.username as receiver_name, receiver_user.id as receiver_id, 
			public_chat.chat_record, public_chat.chat_message_time, public_chat.created_at
			FROM public_chat
			inner join users as sender_user on sender_user.id = sender 
			inner join users as receiver_user on receiver_user.id = receiver 

			where (
					sender = $1
					and receiver = $2
				)
				or (
					sender = $2
					and receiver = $1
				)
				ORDER BY public_chat.id ASC
		`,
			[req.session['user']!['id'], receiverID]
		)

		let foundResult = result.rows

		let timeResults = foundResult[0]
		// console.log(`2222222222222`, foundResult)
		let timeResult = moment(timeResults).format('MMMM Do YYYY, h:mm:ss a')
		// console.log('getuserandroomid', { foundResult })
		res.json({
			data: foundResult,
			time: timeResult
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: '[USR001] - Server error'
		})

		// let getUserAndRoomResult = req.body.rows
		// let roomName = req.params.roomName
		// let
		// let userId =
		// let socRoomName =
		// 	'Room_' + String(roomName) + '-' + String(req.session.user?.id)
		// console.log('roomName: ', socRoomName)
		// socket.join(socRoomName)
		// io.emit('join_room', socketRoomName)
		// io.to(socRoomName).emit('greeting-in-room', `${roomName}既人， halo 我係MC`)
	}
})

app.use('/admin', adminRoutes)

app.get('/me', (req, res) => {
	res.json(req.session.user)
})

app.use(express.static(path.join(__dirname, 'template_design')))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', express.static(path.join(__dirname, 'private')))
app.use(express.static('uploads'))



app.use((req, res) => {
	res.redirect('404.html')
})

server.listen(8888, () => {
	console.log(` server listening on http://localhost:8888`)
})
