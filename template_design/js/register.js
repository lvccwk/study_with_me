// submit form with image
let contactsFormFile = document.querySelector('#signup-form')
contactsFormFile.addEventListener('submit', async (e) => {
	//1. data preparation

	e.preventDefault()

	let formData = new FormData(contactsFormFile)

	//2. send request

	let res = await fetch('/register', {
		method: 'POST',
		body: formData
	})

	//3. post request handling

	let data = await res.json()
	// console.log(data)
	if (res.ok) {
		window.location.replace('/account.html')
		alert('create account success')
	} else {
		alert('create account fail')
	}
})
async function getSubject() {
	let res = await fetch('/subject')
	let data = await res.json()
	let subjects = data.data

	let subjectSelect = document.querySelector('.subject-button')

	for (let subject of subjects) {
		myOption = document.createElement('option')
		myOption.text = subject.chinese_name
		myOption.value = subject.id
		subjectSelect.appendChild(myOption)
	}
}

async function getGoogleInfo() {
	let res = await fetch('/getgoogle')
	let data = await res.json()
	let user1 = data.data

	// console.log(user1)
}

function init() {
	getSubject()
	getGoogleInfo()
}
init()
