



const socket = io.connect()


socket.on('message', message =>{
    console.log(message)
})