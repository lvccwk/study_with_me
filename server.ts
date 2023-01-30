import express from 'express'
import HTTP from 'http'
import path from 'path'
import pg from 'pg'
import dotenv from 'dotenv'
import { Server as SocketIO } from 'socket.io'
import expressSession from 'express-session'
import { userRoutes } from './routes/userRoutes'
import { grantExpress, expressSessionConfig } from './plugin-config'
// import moment = require('moment')

// let count = 1

dotenv.config()
let app = express()
let server = new HTTP.Server(app)
const io = new SocketIO(server)
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

// type Message = {
// 	sender: string
// 	content: string
// 	createdAt: string
// }

let users: any = {}
// let messages: Message[] = []

app.use(userRoutes)
// app.use('/user', userRoutes)
io.on('connection', (socket) => {
	let req = socket.request as express.Request

	let date = Date.now()

	users = { name: req.session.user?.username }
	users[socket.id] = { name: req.session.user?.username }

	// console.log([socket.id])

	// let callUserId = await client.query(`SELECT users.id from users`)
	// let assignedIds = callUserId.rows

	// for (let assignedId of assignedIds) {
	// 	socket.join(String(assignedId.id))
	// 	console.log(assignedId.id)
	// }
	// count++
	// console.log(`${users.name} connected`)

	if (req.session.user) {
		console.log(`已安排 ${users.name} 進入 chatroom`)
		socket.join('even_' + date)

		socket.request['session'].save()
	}

	//html > script
	socket.on('chat message', async (msg) => {
		let req = socket.request as express.Request
		let username = req.session.user?.username
		let userId = req.session.user?.id

		//user id here
		console.log(`睇下user id : ${userId}`)

		await client.query(
			`INSERT INTO public_chat (user_id,chat_record,chat_message_time,created_at,updated_at) values ($1,$2,now(),now(),now())`,
			[userId, msg]
		)

		io.emit('chat message', {
			senderId: userId,
			senderUsername: username,
			msg,
			receiverId: 0
		})
	})

	socket.on('join_room', async (data) => {
		console.log('data: 睇data!!!')
		console.log('data: 睇data!!!', data)

		socket.join(data)
		console.log('joined successful')

		io.to(data).emit('private msg', data)
	})

	socket.on('disconnect', () => {
		console.log(`${users.name} 已離開`)
	})
})
//step 3
app.get('/speak-to-room/:roomName', (req, res) => {
	let roomName = req.params.roomName
	// Target: 63
	// let roomName = '123'
	let socketRoomName =
		'Room_' + String(roomName) + '-' + String(req.session.user?.id)
	// socket.join(roomName)
	console.log('roomName: ', socketRoomName)

	socket.join(socketRoomName)
	// io.emit('join_room', socketRoomName)

	io.to(socketRoomName).emit(
		'greeting-in-room',
		`${roomName}既人， halo 我係MC`
	)
	res.json({ message: 'ok' })
	return
})

app.get('/me', (req, res) => {
	res.json(req.session.user)
})

app.use(express.static(path.join(__dirname, 'template_design')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'private')))
app.use(express.static('uploads'))

app.use((req, res) => {
	res.redirect('404.html')
})

server.listen(8888, () => {
	console.log(` server listening on http://localhost:8888`)
})
