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
	console.log(('JS msg:',msg))
	let msgTemplate = document.querySelector('.message')
	let msgDiv = msgTemplate.cloneNode((deep = true))
	msgDiv.querySelector('.sender').textContent = msg.sender
	msgDiv.querySelector('.createdAt').textContent = msg.createdAt
	msgDiv.querySelector('.content').textContent = msg.content

	//   let item = document.createElement('li')
	//   item.textContent = msg
	messages.appendChild(msgDiv)
})

socket.on('join room', (socket) => {
	console.log(socket)
	//   let item = document.createElement('li')
	//   item.textContent = msg
	// messages.appendChild(msgDiv)
})

// socket.on('get_user_id',(1) => {
// 	console.log(1)
// })

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
	<div class="username" onclick="privateMessage()" onmouseover="" style="cursor: pointer;"="">${userInfo.username}</div>
	`
	}
	 
	} else {
		alert('cannot fetch info')
	}
}

// message content 
async function messageHistory(username){
    let res = await fetch('pm/:username')
    let data = await res.json()
    let subjects = data.data

    let subjectSelect = document.querySelector('.username')

    for(let subject of subjects){
        myOption = document.createElement("option");
        myOption.text = subject.chinese_name;
        myOption.value = subject.id;
        subjectSelect.appendChild(myOption);
    }
}

// load chatroom page to get id 
async function getChatID() {

	let res = await fetch('/opentochat')
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
	<div class="username" onclick="messageHistory(${username})" onmouseover="" style="cursor: pointer;"="">${userInfo.username}</div>
	`
	}

	} else {
		alert('cannot fetch info')
	}
}

form.addEventListener('submit', function (e) {
	e.preventDefault()
	if (input.value) {
		socket.emit('chat message', input.value)
		input.value = ''
	}
})



function init(){
	// getSubject()
	getUserlist()
}
init()