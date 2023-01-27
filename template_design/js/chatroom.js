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


		async function getSubject(msg){
			let res = await fetch('/user/userinfo')
			let data = await res.json()
			let userinfo = users.name
			console.log(`check check user name ${msg}`)
			// let subjectSelect = document.querySelector('.subject-button')
		
			// for(let subject of subjects){
			// 	myOption = document.createElement("option");
			// 	myOption.text = subject.chinese_name;
			// 	myOption.value = subject.id;
			// 	subjectSelect.appendChild(myOption);
			// }
		}
		
		function init(){
		
			getSubject()
		}
		init()