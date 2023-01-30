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

	// console.log(`${users.name} connected`)

	if (req.session.user) {
		console.log(`已安排 ${users.name} 進入 chatroom`)
		socket.join('even_' + date)

		socket.request['session'].save()
	}

	//html > script
	socket.on('chat message', async (msg) => {
		let req = socket.request as express.Request

		// let date = Date.now()

		let user = req.session.user?.username
		let userEmail = req.session.user?.email
		let userId = req.session.user?.id

		users[socket.id] = { name: req.session.user?.username }
		// let userInfos = users[socket.id]

		// console.log(`睇下user 名 : ${user}`)
		// console.log(`睇下${user} 電郵  : ${userEmail}`)
		// console.log(`睇下${user} 訊息: ${msg}`)

		// let checkUserId = await client.query(
		// 	`Select id from users where users.email = ($1) and users.username = ($2)`,
		// 	[userEmail, user]
		// )
		//user id here
		user
		userEmail
		console.log(`睇下user id : ${userId}`)

		await client.query(
			`INSERT INTO public_chat (user_id,chat_record,chat_message_time,created_at,updated_at) values ($1,$2,now(),now(),now())`,
			[userId, msg]
		)

		// sendMsgToDatabase

		// messages.push({
		// 	sender: users[socket.id].name,
		// 	content: msg,
		// 	createdAt: moment(date).format('MMMM Do YYYY, h:mm:ss a')

		// 	// new Date(Date.now()).toString()
		// })

		io.emit('chat message', [userId, msg])

		// await client.query(
		// 	`INSERT INTO chatroom (from_user,to_user,content,created_at, updated_at) values ($1,$2,$3,now(),now())`,
		// 	[chatroom_id, , message]
		// )

		// let msgToDatabase = await client.query(`
		// INSERT INTO chatroom (content, from_user , created_at, updated_at)`)
	})

	socket.on('disconnect', () => {
		console.log(`${users.name} 已離開`)
	})
})

app.get('/me', (req, res) => {
	res.json(req.session)
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
