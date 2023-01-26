import express from 'express'
import HTTP from 'http'
import path from 'path'
import pg from 'pg'
import dotenv from 'dotenv'
import { Server as SocketIO } from 'socket.io'
import expressSession from 'express-session'
import { userRoutes } from './routes/userRoutes'
import { grantExpress, expressSessionConfig } from './plugin-config'
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

// io.on('connection', function (socket) {
// 	const req = socket.request as express.Request
// 	let date = Date.now()
// 	if (req.session.id) {
// 		console.log(`已安排 ${socket.id} 進入 chatroom`)
// 		socket.join('even_' + date)
// 		socket.request['session'].save()
// 	}

// 	// io.to(socket.id).emit(
// 	// 	`server-greeting`,
// 	// 	`新connection啊? 你好啊 from server ${date}`
// 	// )
// 	// socket.emit(`server-greeting`, `新connection啊？ 你好啊 from server ${date}`);
// })

type Message = {
	sender: string
	content: string
	createdAt: string
}

let users: any = {}
let messages: Message[] = []

app.use(userRoutes)
io.on('connection', (socket) => {
	let req = socket.request as express.Request
	let date = Date.now()
	// users[socket.id] = { name: chance.name() }
	users = { name: req.session.user?.username }
	users[socket.id] = { name: req.session.user?.username }
	// console.log(`find socket !!!!!!!! ${users.name}`)
	console.log(`${users.name} connected`)

	if (req.session.id) {
		console.log(`已安排 ${users.name} 進入 chatroom`)
		// console.log(req.body)
		socket.join('even_' + date)
		console.log('even_' + date)
		socket.request['session'].save()
	}

	//html > script
	socket.on('chat message', (msg) => {
		console.log(msg)

		messages.push({
			sender: users[socket.id].name,
			content: msg,
			createdAt: new Date(Date.now()).toString()
		})
		io.emit('chat message', messages[messages.length - 1])
	})

	socket.on('disconnect', () => {
		console.log(`${users.name} disconnected`)
	})
})

app.get('/me', (req, res) => {
	res.json(req.session)
})

app.use(express.static(path.join(__dirname, 'template_design')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'private')))

app.use((req, res) => {
	res.redirect('404.html')
})

server.listen(8888, () => {
	console.log(` server listening on http://localhost:8888`)
})
