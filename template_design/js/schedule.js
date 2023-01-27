// const store = window.localStorage;

export function createScheduleTable(part) {
    const tableAddForm = $(`#${part}`);
    tableAddForm.html(`                            
     <div class="schedule-row">
         <div class="col-1 schedule-box time">time</div>
         <div class="col-2 schedule-box"><span>student</span></div>
         <div class="col-5 col-lg-6 schedule-box booking">details</div>
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

    // function color(time) {
    //     return time.text === currentTime.text
    //         ? "bg-red-300"
    //         : time.hour < now
    //             ? "bg-gray-300"
    //             : "bg-green-200";
    // }

    hoursOfTheDay.forEach((hr) => {
        const form = $(`<form></form>`);

        const grid = $(
            `<div class="schedule-row" id="booking-${hr.id}"></div>`
        );

        const time = $(
            `<div class="col-1 schedule-box time">${hr.text}</div>`
        );

        const student = $(`<div class="col-2 schedule-box"><span> </span></div>`)

        const textArea = $(
            `<div class="col-5 col-lg-6 schedule-box booking"> </div>`
        );

        const status = $(`<div class="col-2 col-lg-1 schedule-box"><span> </span></div>`);

        // textArea.keydown((e) => {
        //     if (e.keyCode == 13 && !e.shiftKey) {
        //         e.preventDefault();
        //         return false;
        //     }
        // });

        const buttons = $(
            `<div class="col-2 schedule-box">
            <button type="submit">Cancel</button>
            <button type="button" id="edit-button-${hr.id}">Edit</button>
            </div>`
        );

        grid.submit((e) => {
            e.preventDefault();

            // const value = $(`textarea[name="${hr.text}"]`).val();

            // store.setItem(hr.text, value);
        });

        grid.append(time);
        grid.append(student);
        grid.append(textArea);
        grid.append(status);
        grid.append(buttons);

        form.append(grid)
        tableAddForm.append(form);

        const editButton = document.querySelector(`#edit-button-${hr.id}`)
        editButton.addEventListener("click", function () {
            const input = document.querySelector(".schedule-input")
            const choseDate = document.querySelector("#calendar-chose-date")
            const choseTime = document.querySelector(`#booking-${hr.id}>.time`)
            input.innerHTML = `
                <h4> Edit booking </h4>
                <span>Date: </span> 
                <span>${choseDate.innerHTML}</span>
                <br>
                <span>Time: </span>
                <span>${choseTime.innerHTML}</span>
                <br>
                <span>student: </span>
                <select class="form-select" aria-label="Default select example">
                    <option selected>student</option>
                    <option value="James>James</option>
                    <option value="Lawrence">Lawrence</option>
                    <option value="Newton">Newton</option>
                </select>
                <div class="input-group">
                    <span class="input-group-text">Detail</span>
                    <textarea class="form-control" aria-label="With textarea"></textarea>
                </div>
                <button class="edit-confirm">edit</button>
            `
        });
    });
}

createScheduleTable("teacher-id")

// pending request
// external js: isotope.pkgd.js

// init Isotope
var $table = $('.table-like').isotope({
    layoutMode: 'vertical',
    getSortData: {
        studentName: '.student-name',
        bookingDate: '.booking-date',
        bookingTime: '.booking-time',
        status: '.status',
        // weight: function (itemElem) {
        //     var weight = $(itemElem).find('.weight').text();
        //     console.log(weight)
        //     return parseFloat(weight.replace(/[\(\)]/g, ''));
        // }
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
