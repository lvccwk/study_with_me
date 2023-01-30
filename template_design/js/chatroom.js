const socket = io()

let messages = document.getElementById('messages')
let form = document.getElementById('form')
let input = document.getElementById('input')

//Ajax
form.addEventListener('submit', function (e) {
	e.preventDefault()
	if (input.value) {
		// step 1 送input.value 去server
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

async function getChatRecord(){
	let res = await fetch('/chatrecord')
	if (res.ok) {
		let data = await res.json()
		let userInfos = data.data

	let userContainerElem = document.querySelector('#record')
	for(let userInfo of userInfos){
		// console.log(userInfo.chat_record)
	let imagePath = tutorInfo.image_icon ? `${await getImage(tutorInfo.image_icon)}` : "images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg"
	// console.log(`chat room 112321321232121321312${userInfo.username}`) 
	userContainerElem.innerHTML +=
	// <div class="chathistory" >${userInfo.username},${userInfo.username}</div>
	`
	<div
	class="d-flex flex-row justify-content-end"
	
>
	<div>
		<p
		class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
		>
		${userInfo.chat_record}
	</p>
	<p
		class="small me-3 mb-3 rounded-3 text-muted"
	>
	12:00 PM | Aug 13  BY ${userInfo.username}
	</p>
</div>

<img
		src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
		alt="avatar 1"
		style="
			width: 45px;
			height: 100%;
		"
	/>

</div>
	`
	}
	 
	} else {
		alert('cannot fetch info')
	}
}


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
		// console.log(userInfo)
	let imagePath = userInfo.image_icon ? userInfo.image_icon : "images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg"

	// console.log(`chat room 112321321232121321312${userInfo.username}`) 
	userContainerElem.innerHTML += 
	`
	<ul class="list-unstyled mb-0" onclick="messageHistory(${userInfo})" onmouseover="" style="cursor: pointer;"="">
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
						Hello,
						Are you
						there?
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
					>3</span
				>
			</div>
		</a>
	</li>
	`
{/* <div class="username" onclick="privateMessage()" onmouseover="" style="cursor: pointer;"="">${userInfo.username}</div> */}
}
	 
	} else {
		alert('cannot fetch info')
	}
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




function init(){
	// getSubject()
	getUserlist()
	getChatRecord()
}
init()