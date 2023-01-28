const socket = io()

let messages = document.getElementById('messages')
let form = document.getElementById('form')
let input = document.getElementById('input')

//Ajax
form.addEventListener('submit', function (e) {
	e.preventDefault()
	if (input.value) {
		socket.emit('chat message', input.value)
		input.value = ''
	}
})

socket.on('chat message', (msg) => {
	console.log(msg)
	let msgTemplate = document.querySelector('.message')
	let msgDiv = msgTemplate.cloneNode((deep = true))
	msgDiv.querySelector('.sender').textContent = msg.sender
	msgDiv.querySelector('.createdAt').textContent = msg.createdAt
	msgDiv.querySelector('.content').textContent = msg.content

	//   let item = document.createElement('li')
	//   item.textContent = msg
	messages.appendChild(msgDiv)
})




async function getUserlist() {

	let res = await fetch('/chatroom')
	if (res.ok) {
		let data = await res.json()
		let userInfos = data.data

	// console.log(tutorInfos)
		// getTutorInfo(tutorInfos)
		// console.table(tutorInfos)
	let userContainerElem = document.querySelector('.chatuserlist')
	for(let userInfo of userInfos){
	// let imagePath = tutorInfo.image_icon ? `${await getImage(tutorInfo.image_icon)}` : "images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg"
	// console.log(`chat room 112321321232121321312${userInfo.username}`) 
	userContainerElem.innerHTML += 
	`
	<div>${userInfo.username}</div>
	`
	}

	} else {
		alert('cannot fetch info')
	}
}

function init(){
	// getSubject()
	getUserlist()
}
init()