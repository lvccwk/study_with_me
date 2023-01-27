async function loadTutorInfo() {
    console.log('hIHIHIHI')
	let res = await fetch('/')
	if (res.ok) {
		let data = await res.json()
		let tutorInfos = data.data

    // console.log(tutorInfos)
		// getTutorInfo(tutorInfos)
		// console.table(tutorInfos)
  let tutorContainerElem = document.querySelector('#homepage-tutor')
  for(let tutorInfo of tutorInfos.rows){
    let imagePath = tutorInfo.image_icon ? `uploads/${tutorInfo.image_icon}` : "images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg"
    console.log(tutorInfo.username,tutorInfo.image_icon,tutorInfo.chinese_name) 
    tutorContainerElem.innerHTML += 
  
`
<div class="col-lg-3 col-md-6 col-12">
<div class="speakers-thumb speakers-thumb-small">
    <img
        src="${imagePath}"
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


async function init(){

    // js()
    await loadTutorInfo()
 
  }
  init()