async function loadTutorInfo() {
	let res = await fetch('/homepage-tutor')
	if (res.ok) {
		let data = await res.json()
		let tutorInfos = data.data
		console.log(data.tutorImage.rows)
		// console.log(tutorInfos)
		// getTutorInfo(tutorInfos)
		// console.table(tutorInfos)
		let tutorContainerElem = document.querySelector('#homepage-tutor')
		for (let i = 0; i < tutorInfos.rows.length; i++) {
			let tutorInfo = tutorInfos.rows[i]
			let tutorImage = data.tutorImage.rows[i]
			console.log(tutorImage)
			let imagePath = tutorImage.image_icon
				? `${await getImage(tutorImage.image_icon)}`
				: 'images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg'
			// console.log(tutorInfo.username,imagePath,tutorInfo.chinese_name)
			tutorContainerElem.innerHTML += `
<div class="col-lg-3 col-md-6 col-12">
<div class="speakers-thumb speakers-thumb-small">
    <img
        src="${tutorImage.image_icon}"
        class="img-fluid speakers-image"
        alt=""
    />

    <div class="speakers-info">
        <h5 class="speakers-title mb-0">
        ${tutorInfo.username}
        </h5>

        <p class="speakers-text mb-0">
        ${tutorInfo.chinese_name}
        </p>

        <ul class="social-icon">
            <li>
                <a
                    href="#"
                    class="social-icon-link bi-facebook"
                ></a>
            </li>

            <li>
                <a
                    href="#"
                    class="social-icon-link bi-instagram"
                ></a>
            </li>
        </ul>
    </div>
</div>
</div>
`
		}
	} else {
		alert('cannot fetch info')
	}
}

async function getImage(imageName) {
	let res = await fetch('imageName')

	if (res.url.includes('404')) {
		return 'images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg'
	} else {
		return `${imageName}`
	}
}

async function init() {
	// js()
	await loadTutorInfo()
}
init()
