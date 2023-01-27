import { createScheduleTable } from "./schedule.js"

const carousel = document.querySelector(".carousel")
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
<div class="carousel-cell">
    <img class="carousel-cell-image"
        data-flickity-lazyload="/images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg"
        alt="tulip" />
</div>
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
<div class="carousel-cell">
    <img class="carousel-cell-image"
        data-flickity-lazyload="/images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg"
        alt="tulip" />
</div>
`

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