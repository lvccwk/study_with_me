// import { moment } from './moment.js';

const store = window.localStorage;

const container = $(".container");

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
    return { text, hour };
});

function color(time) {
    return time.text === currentTime.text
        ? "bg-red-300"
        : time.hour < now
            ? "bg-gray-300"
            : "bg-green-200";
}

hoursOfTheDay.forEach((hr) => {
    const grid = $(
        `<form data-name="${hr.text}" class="grid grid-cols-12  border-gray-500 "></form>.`
    );

    const time = $(
        `<div class="flex items-center justify-center col-span-2 h-16">${hr.text}</div>`
    );

    const textArea = $(
        `<textarea name="${hr.text
        }" maxLength="50" style="resize: none; overflow: hidden;" class="col-span-8 h-16 p-6 ${color(
            hr
        )}">${store.getItem(hr.text) || ""}</textarea>`
    );

    textArea.keydown((e) => {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            return false;
        }
    });

    const saveButton = $(
        `<button type="submit" class="col-span-2 h-16 bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition duration-500 ease-in-out"><i class="fas fa-save text-xl"></i></button>`
    );

    grid.submit((e) => {
        e.preventDefault();

        const value = $(`textarea[name="${hr.text}"]`).val();

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
        if(session.user.type == "teacher") {
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
        } else {
    if (schedule.booking_status == 'confirmed') {
        if (session.user.type == "teacher") {
            document.querySelector(`#booking-${timeId}>.student`).innerHTML = schedule.teacher_name
            document.querySelector(`#booking-${timeId}>.details`).innerHTML = schedule.details
            document.querySelector(`#booking-${timeId}>.status`).innerHTML = schedule.booking_status
        } else {
            document.querySelector(`#booking-${timeId}>.student`).innerHTML = schedule.student_name
            document.querySelector(`#booking-${timeId}>.details`).innerHTML = schedule.details
            document.querySelector(`#booking-${timeId}>.status`).innerHTML = schedule.booking_status
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
    let otherUserId = checkUrlId()
    if (!otherUserId) {
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

        grid.append(time);
        grid.append(textArea);
        grid.append(saveButton);

        container.append(grid);
    });
