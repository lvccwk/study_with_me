const socket = io()
let messages = document.getElementById('messages')
let form = document.getElementById('form')
let input = document.getElementById('input')

//Ajax
form.addEventListener('submit', async function (e) {
	try {
		e.preventDefault()
		// console.log('form clicked')
		if (input.value) {
			// step 1 送input.value 去server
			let userId = localStorage.getItem('userId')
			// let senderId = localStorage.getItem('senderId')
			// let receiverId = localStorage.getItem('receiverId')
			// console.log(userId, senderId, receiverId)
			socket.emit('chat message', [input.value, userId])
			// console.log('message123123123', [input.value, userId])
			// socket.emit('unsubscribe', '123_64')
			console.log('睇清楚啲', input.value, userId)
			input.value = ''

			let res = await fetch(`/newChatMessage`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId: userId,
					// receiver: receiverId,
					msg: input.value
				})
			})
		}
	} catch (error) {
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
})

socket.on(
	'chat message',
	({
		senderId,
		senderUsername,
		msg,
		receiverID,
		receiverUsername,
		createdAt,
		chatMessageTime
	}) => {
		// // console.log(('JS msg:',msg))
		// console.log('chat message', {
		// 	senderId,
		// 	senderUsername,
		// 	msg,
		// 	receiverID,
		// 	receiverUsername,
		// 	createdAt,
		// 	chatMessageTime
		// })
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
			msg,
			receiverID,
			receiverUsername,
			createdAt,
			chatMessageTime
		})
	}
)

// socket.on('greeting-in-room', (data) => {
// 	console.log('收到喇：', data)
// })

async function instantChat({
	senderId,
	senderUsername,
	msg,
	receiverID,
	receiverUsername,
	createdAt,
	chatMessageTime
}) {
	console.log({
		senderId,
		senderUsername,
		msg,
		receiverID,
		receiverUsername,
		createdAt,
		chatMessageTime
	})

	try {
		const ownerId = localStorage.getItem('ownerId')
		// console.log('12312312312321123123321', {
		// 	senderId,
		// 	senderUsername,
		// 	msg,
		// 	receiverID,
		// 	receiverUsername,
		// 	createdAt,
		// 	chatMessageTime
		// })
		// const ownerId = req.session.user.id
		// console.log(userInfo)
		let userContainerElem = document.querySelector('#instantchat')

		// let imagePath = tutorInfo.image_icon ? `${await getImage(tutorInfo.image_icon)}` : "images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg"
		// console.log(`chat room 112321321232121321312${userInfo.username}`)

		// console.log({ senderId })
		// console.log({ ownerId })

		if (senderId == ownerId) {
			userContainerElem.innerHTML += `

			<div
				class="d-flex flex-row justify-content-end">
	
				<div>${receiverUsername}
	
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
				${createdAt}
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
	
				<div>${receiverUsername}
	
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
					${createdAt}
				</p>
			</div>
	
				</div>
	
			</div>
			`
		}

		scrollBottom()

		// let res = await fetch(`/newChatMessage`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		sender: senderId
		// 		// receiver: receiverId,
		// 		// msg: input.value
		// 	})
		// })
	} catch (error) {
		res.status(500).json({
			message: '[USR001] - Server error'
		})
	}
}

async function getGrouplist() {
	// let res = await fetch('/getgrouplist')
	// if (res.ok) {
	// 	let data = await res.json()
	// 	let userInfos = data.data

	let userContainerElem = document.querySelector('#getgrouplist')

	// console.log(userInfo)
	// let imagePath = userInfo.image_icon
	// 	? userInfo.image_icon
	// 	: 'images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg'
	let imagePath = 'uploads/image-1674801652522.jpeg'
	let groupname = '公開頻道'
	userContainerElem.innerHTML += `
	<ul class="list-unstyled mb-0" onclick="loadPublicRoom()" onmouseover="" style="cursor: pointer;"="">
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
						src="uploads/image-1674801652522.jpeg"
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
					公開頻道
					</p>
					<p
						class="small text-muted"
					>

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
}

async function getPrivateChatRecord(data, time) {
	let userContainerElem = document.querySelector('#record')
	// console.log('getPublicChatRecord', data, '21e124e214214124', time)
	userContainerElem.innerHTML = ''

	for (let userInfo of data) {
		// console.log('final!!!!', userInfo)
		if (userInfo.sender_id === userInfo.user_id) {
			// let imagePath = tutorInfo.image_icon ? `${await getImage(tutorInfo.image_icon)}` : "images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg"
			// console.log(`chat room 112321321232121321312${userInfo.username}`)

			userContainerElem.innerHTML += `

			<div
				class="d-flex flex-row justify-content-end">

				<div>${userInfo.sender_name}

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
				${time}
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

				<div>${userInfo.sender_name}

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
					${time}
				</p>
			</div>

				</div>

			</div>
			`
		}
	}
	scrollBottom()
}

async function getPublicChatRecord() {
	localStorage.setItem('userId', 'join_public_room')

	socket.emit('join_public_room')

	let res = await fetch('/chatrecord')
	if (res.ok) {
		let data = await res.json()
		let userInfos = data.data
		let timeFormat = data.time

		let userContainerElem = document.querySelector('#record')
		console.log('getPublicChatRecord', userInfos)
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
				${timeFormat}
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
				${timeFormat}
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

socket.on('private msg', (data) => {
	console.log('privaate msg success')
	// instantChat({
	// 	senderId,
	// 	senderUsername,
	// 	msg
	// })
})

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
	<ul class="list-unstyled mb-0" onclick="getUserAndRoomId(${
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
async function getUserAndRoomId(userId) {
	console.log('userId: ', userId)

	// let roomNameA = 'room_' + userId
	// let roomNameB = userId + 'room_'
	// let roomName = userId
	//fetch -> get roomID
	socket.emit('join_room', userId)

	// from - to msg
	// getChatHistory()

	// let res = await fetch(`/speak-to-room/${roomName}`)

	let uploadData = {
		userId: userId
		// roomid: roomName
	}
	localStorage.setItem('userId', userId)
	let res = await fetch('/getuserandroomid', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(uploadData)
	})
	//returning
	let result = await res.json()
	let data = result.data
	let time = result.time
	// console.log(data)
	// console.log(`checkcheck12321312`, time)
	localStorage.setItem('senderId', data.sender)
	localStorage.setItem('receiverId', data.receiver)

	getPrivateChatRecord(data, time)
}

function scrollBottom() {
	// console.log('scrollBottom')
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
	// await getChatRecord()
	await getUserlist()
	await getGrouplist()
	scrollBottom()
}
init()

async function loadPublicRoom() {
	await getPublicChatRecord()

	scrollBottom()
}
