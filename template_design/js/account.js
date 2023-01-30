async function getMe() {
	const res = await fetch('/me')
	const data = await res.json()
	if (res.ok) {
		const ownerId = data.id
		localStorage.setItem('ownerId', ownerId)
	}
}
getMe()
