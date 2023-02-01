import { getAllStudents } from './account.js'
import { getSession } from './account.js'

async function showUserCarousel(type) {
	console.log(type)
	if (type == 'teacher') {
		let studentList = await getAllStudents()
		console.log(`student list = ${studentList}`)
		console.log(studentList)
		const carousel = document.querySelector(
			'.carousel-user-list > .carousel-area'
		)

		carousel.innerHTML = `
        <div class="carousel-cell">
            <img class="carousel-cell-image"
                data-flickity-lazyload="/images/avatar/happy-asian-man-standing-with-arms-crossed-grey-wall.jpg"
                alt="tulip" />
        </div>
        <div class="carousel-cell">
            <img class="carousel-cell-image"
                data-flickity-lazyload="/images/avatar/indoor-shot-beautiful-happy-african-american-woman-smiling-cheerfully-keeping-her-arms-folded-relaxing-indoors-after-morning-lectures-university.jpg"
                alt="tulip" />
        </div>
`

		for (let student of studentList) {
			carousel.innerHTML += `
                <div class="carousel-cell" id="carousel-userId-${student.id}">
                    <a href="/admin/viewotheruser?id=${student.id}">
                        <img class="carousel-cell-image"
                            data-flickity-lazyload="/${student.image_icon}"
                            alt="tulip" />
                        <div>
                        <span>${student.username}</span>
                        </div>
                    </a>
                </div>
            `
		}

		$('.carousel-area').flickity({
			// options
			// cellAlign: 'left',
			// contain: true
			groupCells: true,
			wrapAround: true,
			lazyLoad: true
		})
	}
}

async function carouselInit() {
	let session = await getSession()
	console.log(session)
	await showUserCarousel(session.user.type)
}

carouselInit()

// const students = document.querySelectorAll(".carousel-cell")
// for (let student of students) {
//     student.addEventListener("click", () => {
//         console.log("click")
//         const studentDetail = document.querySelector(".student-detail")
//         studentDetail.innerHTML = `
//         <h4 class="mb-3">
//             Student Detail
//         </h3>
//         <span>student level:</span>
//         <span>小六</span>
//         <div class="col-12 schedule-table" id="student-id">
//         `
//         createScheduleTable("student-id")
//     })
// }
