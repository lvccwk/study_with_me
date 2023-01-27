import express from 'express'
import http from 'http'
import { Server as SocketIO } from 'socket.io'
export const chatRoutes = express.Router()

//....
const app = express()
const server = new http.Server(app)
const io = new SocketIO(server)

io.on('chatroom/:id', function (socket) {
	console.log(socket)
	socket.emit('message', 'welcome to chatroom')
})
