const store = window.localStorage;

const container = $(".schedule-table");

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
    const form = $(`<form></form>`);

    const grid = $(
        `<div class="schedule-row" id="booking-1"></div>`
    );

    const time = $(
        `<div class="col-1 schedule-box">${hr.text}</div>`
    );

    const student = $(`<div class="col-2 schedule-box"><select class="form-select" aria-label=".form-select-lg example">
  <option selected>students</option>
  <option value="James">James</option>
  <option value="Lawrence">Lawrence</option>
  <option value="Newton">Newton</option>
</select></div>`)

    const textArea = $(
        `<div class="col-5 col-lg-6 schedule-box booking">about homework</div>`
    );

    const status = $(`<div class="col-2 col-lg-1 schedule-box"><span>confirm</span></div>`);

    textArea.keydown((e) => {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            return false;
        }
    });

    const buttons = $(
        `<div class="col-2 schedule-box"><button type="submit">Cancel</button><button type="submit">Edit</button></div>`
    );

    grid.submit((e) => {
        e.preventDefault();

        const value = $(`textarea[name="${hr.text}"]`).val();

        store.setItem(hr.text, value);
    });

    grid.append(time);
    grid.append(student);
    grid.append(textArea);
    grid.append(status);
    grid.append(buttons);

    form.append(grid)

    container.append(form);
});