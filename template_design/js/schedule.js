// const store = window.localStorage;
import { getSession } from "./account.js"
import { getAllStudents } from "./account.js"
import { getAllTeachers } from "./account.js"
import { checkUrlId } from "./account.js"
import { getOtherUser } from "./account.js"

async function getConfirmedSchedule() {
    let otherUserId = checkUrlId()
    let session = await getSession()
    let day = document.querySelector("#calendar-chose-date")
    if (!otherUserId) {
        let res = await fetch(`/admin/schedule/confirm/${session.user.type}/${session.user.id}/${day.innerHTML}/`)
        return await res.json()
    } else {
        let result = await getOtherUser(otherUserId)
        let res = await fetch(`/admin/schedule/confirm/${result.type}/${otherUserId}/${day.innerHTML}`)
        return await res.json()
    }

}

export async function createScheduleTable(htmlId) {
    let schedules = await getConfirmedSchedule()
    let session = await getSession()
    console.log("confirmed schedules = ", schedules)
    const tableAddForm = $(`#${htmlId}`);
    tableAddForm.html(`                            
         <div class="schedule-row">
             <div class="col-1 schedule-box time">time</div>
             <div class="col-2 schedule-box"><span>user</span></div>
             <div class="col-5 col-lg-6 schedule-box details">details</div>
             <div class="col-2 col-lg-1 schedule-box"><span>status</span></div>
             <div class="col-2 schedule-box">action</div>
         </div>`)

    const now = moment();

    const currentTime = { text: moment().format("h:00 A"), hour: moment().hour() };

    $("#day").text(now.format("dddd MMMM DD, YYYY"));

    const range = (start, end, step) => {
        return Array.from(
            Array.from(Array(Math.ceil((end - start) / step)).keys()),
            (x) => start + x * step
        );
    };

    const hoursOfTheDay = Array.from(new Array(24)).map((v, i) => {
        const text = moment().hour(i).format("h:00 A");
        const hour = moment().hour(i);
        const id = moment().hour(i).format("hA");
        return { text, hour, id };
    });

    hoursOfTheDay.forEach((hr) => {
        const form = $(`<form></form>`);

        const grid = $(
            `<div class="schedule-row" id="booking-${hr.id}"></div>`
        );

        const time = $(
            `<div class="col-1 schedule-box time">${hr.text}</div>`
        );

        const student = $(`<div class="col-2 schedule-box student"><span> </span></div>`)

        const textArea = $(
            `<div class="col-5 col-lg-6 schedule-box details"></div>`
        );

        const status = $(`<div class="col-2 col-lg-1 schedule-box status"> </div>`);

        const buttons = $(
            `<div class="col-2 schedule-box buttons">
                <button type="button" id="add-button-${hr.id}">Add</button>
                </div>`
        );

        grid.append(time);
        grid.append(student);
        grid.append(textArea);
        grid.append(status);
        grid.append(buttons);

        form.append(grid)
        tableAddForm.append(form);

        const addButton = document.querySelector(`#add-button-${hr.id}`)
        addButton.addEventListener("click", async function () {
            const choseDate = document.querySelector("#calendar-chose-date")
            const choseTime = document.querySelector(`#booking-${hr.id}>.time`)
            await createInputForm(choseDate.innerHTML, choseTime.innerHTML, "Add", session.user.type)

            // const editConfirm = document.querySelector(".edit-confirm")

        });
    });

    for (let schedule of schedules) {
        let timeId = moment(schedule.booking_time, 'HH:mm a').format('hA')
        // console.log(moment(schedule.booking_date).format('YYYY-MM-DD'))
        if (schedule.booking_status == 'confirmed') {
            if (session.user.type == "teacher") {
                document.querySelector(`#booking-${timeId}>.student`).innerHTML = schedule.student_name
                document.querySelector(`#booking-${timeId}>.details`).innerHTML = schedule.details
                document.querySelector(`#booking-${timeId}>.status`).innerHTML = schedule.booking_status
                document.querySelector(`#booking-${timeId}>.buttons`).innerHTML = `
                    <button type="button" id="edit-button-${timeId}">edit</button>
                    <button type="button" id="cancel-button-${timeId}">Cancel</button>
                `
                const cancelButton = document.querySelector(`#cancel-button-${timeId}`)
                cancelButton.addEventListener("click", async function () {
                    console.log("clicked")
                    let session = await getSession()
                    const choseDate = document.querySelector("#calendar-chose-date")
                    const choseTime = document.querySelector(`#booking-${timeId}>.time`)

                    const formObject = {};

                    formObject["cancelDate"] = choseDate.innerHTML;
                    formObject["cancelTime"] = choseTime.innerHTML;
                    formObject["studentId"] = schedule.student_id;
                    formObject["type"] = session.user.type;

                    console.log(formObject)

                    const res = await fetch(`/admin/cancel/${session.user.id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formObject),
                    });
                    await createScheduleTable("teacher-id")
                })
            } else {
                document.querySelector(`#booking-${timeId}>.student`).innerHTML = schedule.teacher_name
                document.querySelector(`#booking-${timeId}>.details`).innerHTML = schedule.details
                document.querySelector(`#booking-${timeId}>.status`).innerHTML = schedule.booking_status
                document.querySelector(`#booking-${timeId}>.buttons`).innerHTML = `
                    <button type="button" id="edit-button-${timeId}">edit</button>
                    <button type="button" id="cancel-button-${timeId}">Cancel</button>
                `
                const cancelButton = document.querySelector(`#cancel-button-${timeId}`)
                cancelButton.addEventListener("click", async function () {
                    console.log("clicked")
                    let session = await getSession()
                    const choseDate = document.querySelector("#calendar-chose-date")
                    const choseTime = document.querySelector(`#booking-${timeId}>.time`)

                    const formObject = {};

                    formObject["cancelDate"] = choseDate.innerHTML;
                    formObject["cancelTime"] = choseTime.innerHTML;
                    formObject["teacherId"] = schedule.teacher_id;
                    formObject["type"] = session.user.type;

                    console.log(formObject)

                    const res = await fetch(`/admin/cancel/${session.user.id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formObject),
                    });
                    await createScheduleTable("teacher-id")
                })
            }
        } else {
            if (session.user.type == "teacher") {
                if (schedule.teacher_status == 'confirm') {
                    document.querySelector(`#booking-${timeId}>.student`).innerHTML = schedule.student_name
                    document.querySelector(`#booking-${timeId}>.details`).innerHTML = schedule.details
                    document.querySelector(`#booking-${timeId}>.status`).innerHTML = schedule.booking_status
                    document.querySelector(`#booking-${timeId}>.buttons`).innerHTML = `
                            <button type="button" id="edit-button-${timeId}">edit</button>
                            <button type="button" id="cancel-button-${timeId}">Cancel</button>
                        `
                    const cancelButton = document.querySelector(`#cancel-button-${timeId}`)
                    cancelButton.addEventListener("click", async function () {
                        let session = await getSession()
                        const choseDate = document.querySelector("#calendar-chose-date")
                        const choseTime = document.querySelector(`#booking-${timeId}>.time`)

                        const formObject = {};

                        formObject["cancelDate"] = choseDate.innerHTML;
                        formObject["cancelTime"] = choseTime.innerHTML;
                        formObject["studentId"] = schedule.student_id;
                        formObject["type"] = session.user.type;
                        console.log(formObject)

                        const res = await fetch(`/admin/cancel/${session.user.id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(formObject),
                        });
                        await createScheduleTable("teacher-id")
                    })
                }
            } else {
                if (schedule.student_status == 'confirm') {
                    document.querySelector(`#booking-${timeId}>.student`).innerHTML = schedule.teacher_name
                    document.querySelector(`#booking-${timeId}>.details`).innerHTML = schedule.details
                    document.querySelector(`#booking-${timeId}>.status`).innerHTML = schedule.booking_status
                    document.querySelector(`#booking-${timeId}>.buttons`).innerHTML = `
                            <button type="button" id="edit-button-${timeId}">edit</button>
                            <button type="button" id="cancel-button-${timeId}">Cancel</button>
                        `
                    const cancelButton = document.querySelector(`#cancel-button-${timeId}`)
                    cancelButton.addEventListener("click", async function () {
                        let session = await getSession()
                        const choseDate = document.querySelector("#calendar-chose-date")
                        const choseTime = document.querySelector(`#booking-${timeId}>.time`)

                        const formObject = {};

                        formObject["cancelDate"] = choseDate.innerHTML;
                        formObject["cancelTime"] = choseTime.innerHTML;
                        formObject["teacherId"] = schedule.teacher_id;
                        formObject["type"] = session.user.type;
                        console.log(formObject)

                        const res = await fetch(`/admin/cancel/${session.user.id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(formObject),
                        });
                        await createScheduleTable("teacher-id")
                    })
                }
            }
        }
    }
}


// pending request
// external js: isotope.pkgd.js

async function createInputForm(date, time, action, type) {
    const input = document.querySelector(".schedule-input")
    let oppositeType = ""
    if (type == "teacher") {
        oppositeType = "student"
    } else {
        oppositeType = "teacher"
    }
    input.innerHTML = `
    <form>
        <h4> ${action} booking </h4>
        <span>Date: </span> 
        <input type="text" name="date" value="${date}" readonly>
        <br>
        <span>Time: </span>
        <input type="text" name="time" value="${time}" readonly>
        <br>
        <span>${oppositeType}: </span>
        <select class="form-select form-user-list" aria-label="Default select example" name="${oppositeType}" required>
            <option value="">${oppositeType}</option>
        </select>
        <div class="input-group">
            <span class="input-group-text">Detail</span>
            <textarea class="form-control" aria-label="With textarea" name="details"></textarea>
        </div>
        <button type="submit" class="submit-confirm">submit</button>
    </form>
    `
    if (type == "teacher") {
        let studentList = await getAllStudents()
        for (let student of studentList) {
            console.log(student)
            document.querySelector('.form-user-list').innerHTML += `
            <option value="${student.student_id}">stu-ID: ${student.student_id} ${student.username}</option>
        `
        }
    } else {
        let teacherList = await getAllTeachers()
        for (let teacher of teacherList) {
            console.log(teacher)
            document.querySelector('.form-user-list').innerHTML += `
            <option value="${teacher.teacher_id}">tea-ID: ${teacher.teacher_id} ${teacher.username}</option>
        `
        }
    }

}

async function getPendingSchedule() {
    let session = await getSession()
    let res = await fetch(`/admin/schedule/pending/${session.user.id}`)
    return await res.json()
}

// init Isotope
async function IsotopeInIt() {
    console.log('IsotopeInIt')
    document.querySelector('.table-like').innerHTML = ""
    let pendingSchedules = await getPendingSchedule()
    for (let schedule of pendingSchedules) {
        console.log(schedule)
        document.querySelector('.table-like').innerHTML += `
            <li class="table-like-item" id="pending-booking-${schedule.id}">
                <div class="student-name">${schedule.student_name}</div>
                <div class="booking-date">${moment(schedule.booking_date).format('YYYY-MM-DD')}</div>
                <div class="booking-time">${moment(schedule.booking_time, 'HH:mm a').format('h:mm a')}</div>
                <div class="booking-details">${schedule.details}</div>
                <div class="status">add</div>
                <div class="action">
                    <button type="button" class="btn btn-success accept">Accept</button>
                    <button type="button" class="btn btn-danger decline">Decline</button>
                </div>
            </li>
        `
    }

    var $table = $('.table-like').isotope({
        layoutMode: 'vertical',
        getSortData: {
            studentName: '.student-name',
            bookingDate: '.booking-date',
            bookingTime: '.booking-time',
            status: '.status',
        }
    });

    // bind sort button click
    $('#sorts').on('click', 'div', function () {
        var sortValue = $(this).attr('data-sort-value');
        $table.isotope({ sortBy: sortValue });
    });

    // change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'div', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

    for (let schedule of pendingSchedules) {
        console.log(schedule)
        const acceptButton = document.querySelector(`#pending-booking-${schedule.id}>.action>.accept`)
        acceptButton.addEventListener("click", async function () {
            const formObject = {};
            formObject["pendingDate"] = schedule.booking_date
            formObject["pendingTime"] = schedule.booking_time
            formObject["teacherId"] = schedule.teacher_id
            formObject["studentId"] = schedule.student_id
            formObject["studentStatus"] = schedule.student_status
            formObject["teacherStatus"] = schedule.teacher_status
            formObject["bookingStatus"] = schedule.booking_status

            const checkRes = await fetch(`/admin/checkcrash/${schedule.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formObject),
            });

            let result = await checkRes.json()
            if (result == "No Record") {
                alert("you can add now!")
                const addRes = await fetch(`/admin/accept/${schedule.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formObject),
                });
                console.log(addRes)
                await createScheduleTable("teacher-id")
                await IsotopeInIt()
            } else {
                console.log(result)
                alert("This pending request crashed other bookings")
            }

        })
        const declineButton = document.querySelector(`#pending-booking-${schedule.id}>.action>.decline`)
        declineButton.addEventListener("click", async function () {
            const formObject = {};
            formObject["studentStatus"] = schedule.student_status
            formObject["teacherStatus"] = schedule.teacher_status

            const res = await fetch(`/admin/decline/${schedule.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formObject),
            });
            await createScheduleTable("teacher-id")
            await IsotopeInIt()
        })
    }
}
async function scheduleInputSubmit() {
    let session = await getSession()
    let oppositeType = ""
    if (session.user.type == "teacher") {
        oppositeType = "student"
    } else {
        oppositeType = "teacher"
    }
    const input = document.querySelector(".schedule-input")
    input.addEventListener("submit", async function (event) {
        console.log('click')
        event.preventDefault();

        // Serialize the Form afterwards
        const form = event.target;
        const formObject = {};
        formObject["inputDate"] = form.date.value;
        formObject["inputTime"] = form.time.value;
        formObject["details"] = form.details.value;
        formObject["type"] = session.user.type;

        if (session.user.type == "teacher") {
            formObject[`studentId`] = form.student.value;
        } else {
            formObject[`teacherId`] = form.teacher.value;
        }
        console.log(formObject)

        const res = await fetch(`/admin/add/${session.user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObject),
        });
        input.innerHTML = "<span> submit successful</span>"
        await createScheduleTable("teacher-id")
    })
}

async function scheduleInIt() {
    await createScheduleTable("teacher-id")
    await IsotopeInIt()
    await scheduleInputSubmit()
}

scheduleInIt()