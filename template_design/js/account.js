async function getMe() {
	const res = await fetch('/me')
	const data = await res.json()
	if (res.ok) {
		const ownerId = data.id
		localStorage.setItem('ownerId', ownerId)
	}
}

export async function getSession() {
	let res = await fetch('/me')
	return await res.json()
}
async function showProfile(session, otherUserId) {
	let welcome = document.querySelector('.welcome-div')
	let dp = document.querySelector('.profile-picture')
	let educationLevel = document.querySelector(
		'.profile-detail>#education-level'
	)

	if (!otherUserId) {
		welcome.innerHTML = `<h1 class="welcome-msg"> Welcome back! <br>${session.user.username}</h1>`
		dp.innerHTML = `
            <div class="profile">
                <img src="/images/avatar/${session.user.image}"
                class="profile-image img-fluid" alt="" />
            </div>
        `
	} else {
		let result = await getOtherUser(otherUserId)
		console.log(result)
		welcome.innerHTML = `<h1 class="welcome-msg">${result.username}</h1>`
		dp.innerHTML = `
            <div class="profile">
                <img src="/images/avatar/${result.image_icon}"
                class="profile-image img-fluid" alt="" />
            </div>
        `
		educationLevel.innerHTML = `${result.academic_level}`
	}
}

export async function getAllStudents() {
	const res = await fetch('/admin/students')
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
