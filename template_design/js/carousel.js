import { getAllStudents, getAllTeachers } from './account.js'
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
			groupCells: true,
			wrapAround: true,
			lazyLoad: true
		})
	} else {
		let teacherList = await getAllTeachers()
		console.log('teacher list =', teacherList)
		const carousel = document.querySelector(
			'.carousel-user-list > .carousel-area'
		)

		const carouselTitle = document.querySelector(
			'.carousel-user-list>.carousel-title'
		)
		carouselTitle.innerHTML = 'Teacher-List'

		for (let teacher of teacherList) {
			carousel.innerHTML += `
                <div class="carousel-cell" id="carousel-userId-${teacher.id}">
                    <a href="/admin/viewotheruser?id=${teacher.id}">
                        <img class="carousel-cell-image"
                            data-flickity-lazyload="/${teacher.image_icon}"
                            alt="tulip" />
                        <div>
                        <span>${teacher.username}</span>
                        </div>
                    </a>
                </div>
            `
		}

		$('.carousel-area').flickity({
			groupCells: true,
			wrapAround: true,
			lazyLoad: true
		})
	}
}

async function carouselInit() {
	let session = await getSession()
	console.log(session)
	await showUserCarousel(session.type)
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
