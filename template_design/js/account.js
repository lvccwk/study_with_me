async function getMe() {
	const res = await fetch('/me1')
	const data = await res.json()
	if (res.ok) {
		const ownerId = data.id
		localStorage.setItem('ownerId', ownerId)
	}
}

export async function getSession() {
	let res = await fetch('/me')
	let user = await res.json()
	console.log(user)
	return user
}
async function showProfile(session, otherUserId) {
	let welcome = document.querySelector('.welcome-div')
	let dp = document.querySelector('.profile-picture')
	let profile = document.querySelector('.profile-detail')

	if (!otherUserId) {
		welcome.innerHTML = `<h2 class="welcome-msg"> Welcome back! <br>${session.username}</h2>`
		dp.innerHTML = `
            <div class="profile">
                <img src="${session.image}"
                class="profile-image img-fluid" alt="" />
            </div>
            
        `
		profile.innerHTML = `
        <span>account type:</span>
        <span>${session.type}</span>
        `
	} else {
		let result = await getOtherUser(otherUserId)
		console.log('otheruserId = ', result)
		welcome.innerHTML = `<h2 class="welcome-msg">${result.username}</h2>`
		dp.innerHTML = `
            <div class="profile">
                <img src="/${result.image_icon}"
                class="profile-image img-fluid" alt="" />
            </div>
        `
		profile.innerHTML = `
        <span>account type:</span>
        <span>${result.type}</span>
        `
	}
}

export async function getAllStudents() {
	const res = await fetch('/admin/students')
	return await res.json()
}

export async function getAllTeachers() {
	const res = await fetch('/admin/teachers')
	return await res.json()
}

export async function getOtherUser(userId) {
	const res = await fetch(`/admin/otheruser/${userId}`)
	return await res.json()
}

export function checkUrlId() {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const otherUserId = urlParams.get('id')
	return otherUserId
}

async function init() {
	let otherUserId = checkUrlId()
	let session = await getSession()
	getMe()
	console.log(session)
	await showProfile(session, otherUserId)
}

init()
