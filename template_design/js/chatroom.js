const socket = io()

let messages = document.getElementById('messages')
let form = document.getElementById('form')
let input = document.getElementById('input')

//Ajax
form.addEventListener('submit', async function (e) {
	e.preventDefault()
	if (input.value) {
		// step 1 送input.value 去server
		socket.emit('chat message', input.value)
		input.value = ''

		let res = await fetch(`/speak-to-room/${roomName}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message: input.value
			})
		})
	}
})

socket.on('chat message', ({ senderId, senderUsername, msg, receiverId }) => {
	// console.log(('JS msg:',msg))
	console.log(senderId)
	// let msgTemplate = document.querySelector('.message')s
	// let msgDiv = msgTemplate.cloneNode((deep = true))
	// msgDiv.querySelector('.sender').textContent = msg.sender
	// msgDiv.querySelector('.createdAt').textContent = msg.createdAt
	// msgDiv.querySelector('.content').textContent = msg.content

	// //   let item = document.createElement('li')
	// //   item.textContent = msg
	// messages.appendChild(msgDiv)

	instantChat({
		senderId,
		senderUsername,
		msg
	})
})

socket.on('private msg', (data) => {
	console.log('privaate msg success')
})

socket.on('greeting-in-room', (data) => {
	console.log(data)
})

async function instantChat({ senderId, senderUsername, msg }) {
	const ownerId = localStorage.getItem('ownerId')
	// console.log(userInfo)
	let userContainerElem = document.querySelector('#instantchat')

	// let imagePath = tutorInfo.image_icon ? `${await getImage(tutorInfo.image_icon)}` : "images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg"
	// console.log(`chat room 112321321232121321312${userInfo.username}`)

	console.log({ senderId })
	console.log({ ownerId })

	if (senderId == ownerId) {
		userContainerElem.innerHTML += `
		<div
			class="d-flex flex-row justify-content-end">
			
			<div>${senderUsername}
			
			<div>
			<p
			class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
			"
		>
			${msg}
			</p>
			<p
			class="small ms-3 mb-3 rounded-3 text-muted float-end"
			>
			12:00 PM | Aug 13
			</p>
			</div>

			</div>
			<img
				src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
				alt="avatar 1"
				style="
					width: 65px;
					height: 100%;
				"/>
			
		</div>
		`
	} else {
		userContainerElem.innerHTML += `
	
			<div
				class="d-flex flex-row justify-content-start"
			>
				<img
					src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
					alt="avatar 1"
					style="
						width: 65px;
						height: 100%;
					"
				/>
			
				<div>${senderUsername}
				
				<div>
				<p
					class="small p-2 ms-3 mb-1 rounded-3"
					style="
						background-color: #f5f6f7;
					"
				>
				${msg}
				</p>
				<p
					class="small ms-3 mb-3 rounded-3 text-muted float-end"
				>
					12:00 PM | Aug 13
				</p>
			</div>
				
				
				
				</div>
	
			</div>
			`
	}
	scrollBottom()
}

async function getChatRecord() {
	let res = await fetch('/chatrecord')
	if (res.ok) {
		let data = await res.json()
		let userInfos = data.data

		let userContainerElem = document.querySelector('#record')
		console.log('getChatRecord', userInfos)
		userContainerElem.innerHTML = ''
		for (let userInfo of userInfos) {
			if (userInfo.is_myself === true) {
				// let imagePath = tutorInfo.image_icon ? `${await getImage(tutorInfo.image_icon)}` : "images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg"
				// console.log(`chat room 112321321232121321312${userInfo.username}`)

				userContainerElem.innerHTML += `

		<div
			class="d-flex flex-row justify-content-end">
			
			<div>${userInfo.username}
			
			<div>
			<p
			class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
			"
		>
			${userInfo.chat_record}
			</p>
			<p
			class="small ms-3 mb-3 rounded-3 text-muted float-end"
			>
			12:00 PM | Aug 13
			</p>
			</div>

			</div>
			<img
				src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
				alt="avatar 1"
				style="
					width: 65px;
					height: 100%;
				"/>
			
		</div>
		`
			} else {
				userContainerElem.innerHTML += `

		<div
			class="d-flex flex-row justify-content-start"
		>
			<img
				src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
				alt="avatar 1"
				style="
					width: 65px;
					height: 100%;
				"
			/>
		
			<div>${userInfo.username}
			
			<div>
			<p
				class="small p-2 ms-3 mb-1 rounded-3"
				style="
					background-color: #f5f6f7;
				"
			>
			${userInfo.chat_record}
			</p>
			<p
				class="small ms-3 mb-3 rounded-3 text-muted float-end"
			>
				12:00 PM | Aug 13
			</p>
		</div>
			
			
			
			</div>

		</div>
		`
			}
		}
	} else {
		alert('cannot fetch info')
	}
}

//step1
async function getUserlist() {
	let res = await fetch('/chatroom')
	if (res.ok) {
		let data = await res.json()
		let userInfos = data.data

		// console.log(tutorInfos)
		// getTutorInfo(tutorInfos)
		// console.table(tutorInfos)
		let userContainerElem = document.querySelector('.chatuserlist')
		for (let userInfo of userInfos) {
			// console.log(userInfo)
			let imagePath = userInfo.image_icon
				? userInfo.image_icon
				: 'images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg'

			// console.log(`chat room 112321321232121321312${userInfo.username}`)
			userContainerElem.innerHTML += `
	<ul class="list-unstyled mb-0" onclick="loadPmRoom(${
		userInfo.id
	})" onmouseover="" style="cursor: pointer;"="">
	<li
		class="p-2 border-bottom"
	>
		<a
			href="#!"
			class="d-flex justify-content-between"
		>
			<div
				class="d-flex flex-row"
			>
				<div>
					<img
						src="${imagePath}"
						alt="avatar"
						class="d-flex align-self-center me-3"
						width="60"
					/>
					<span
						class="badge bg-success badge-dot"
					></span>
				</div>
				<div
					class="pt-1"
				>
					<p
						class="fw-bold mb-0"
					>
					${userInfo.username}
					</p>
					<p
						class="small text-muted"
					>
			${''}
					</p>
				</div>
			</div>
			<div class="pt-1">
				<p
					class="small text-muted mb-1"
				>
					Just now
				</p>
				<span
					class="badge bg-danger rounded-pill float-end"
					>2</span
				>
			</div>
		</a>
	</li>
	`
			{
				/* <div class="username" onclick="privateMessage()" onmouseover="" style="cursor: pointer;"="">${userInfo.username}</div> */
			}
		}
	} else {
		alert('cannot fetch info')
	}
}

//step2
async function loadPmRoom(userId) {
	console.log('userId: ', userId)

	let roomName = 'room_' + userId

	//fetch -> get roomID
	// socket.emit('join_room', roomName)

	// from - to msg
	// getChatHistory()

	let res = await fetch(`/speak-to-room/${roomName}`)
	let result = await res.json()
	console.log(result)
}

function scrollBottom() {
	console.log('scrollBottom')
	// document.querySelector('#recordchat').scrollTop = document.querySelector('#recordchat').scrollHeight
	document.querySelector('#recordchat').scrollTop =
		document.querySelector('#recordchat').scrollHeight
}

// // message content  - this code not work
// async function messageHistory(username){
//     let res = await fetch('pm/:username')
//     let data = await res.json()
//     let subjects = data.data

//     let subjectSelect = document.querySelector('.username')

//     for(let subject of subjects){
//         myOption = document.createElement("option");
//         myOption.text = subject.chinese_name;
//         myOption.value = subject.id;
//         subjectSelect.appendChild(myOption);
//     }
// }

async function init() {
	// getSubject()
	await getChatRecord()
	await getUserlist()
	scrollBottom()
}
init()
