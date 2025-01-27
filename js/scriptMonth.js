const calculationMethod = ['MWL', 'ISNA', 'Egypt', 'Makkah', 'Karachi', 'Tehran', 'Jafari'];
const htmlElement = document.documentElement;

function getMethod() {
    return document.getElementById('method-select').value;
}

window.onload = displayClock();
function displayClock() {
    var options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    var display = new Date().toLocaleTimeString([], options);
    document.getElementById('live-clock').innerText = display;
    setTimeout(displayClock, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu");
    const sideMenu = document.getElementById("side-menu");

    // Toggle side menu visibility
    menuButton.addEventListener("click", function () {
        sideMenu.classList.toggle("visible");
    });

    // Close side menu when clicking outside
    document.addEventListener("click", function (event) {
        const isClickInsideMenu = sideMenu.contains(event.target);
        const isClickInsideButton = menuButton.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideButton && sideMenu.classList.contains("visible")) {
            sideMenu.classList.remove("visible");
        }
    });
});

// Night mode if night
const localTime = new Date().getHours();

if (localTime >= 18 || localTime < 6) {
    document.body.classList.add('night-mode');
    document.getElementById('menu').src = "../images/menu(1).png";
} else {
    document.body.classList.remove('night-mode');
    document.getElementById('menu').src = "../images/menu.png";
}

// Load PrayTimes.js and get the method from the dropdown
document.getElementById('get-location').addEventListener('click', function () {
    const method = getMethod();
    const prayerTimes = new PrayTimes(method);
    prayerTimes.adjust({ imsak: 10, dhuhr: 0, asr: 'Standard', highLats: 'AngleBased' });

    // Get user's location and calculate prayer times
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const currentDate = new Date();
        const currentDay = currentDate.getDate();

        let timeZone = currentDate.getTimezoneOffset() / -60;
        // Fix timezone adjustment by subtracting 1 hour
        //timeZone -= 1;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        console.log(month);

        let monthVar = month + 1;
        if (monthVar > 12) {
            monthVar = 1;
        }
        let nameMonth = '';
        switch (monthVar) {
            case 1:
                nameMonth = "January";
                break;
            case 2:
                nameMonth = "February";
                break;
            case 3:
                nameMonth = "March";
                break;
            case 4:
                nameMonth = "April";
                break;
            case 5:
                nameMonth = "May";
                break;
            case 6:
                nameMonth = "June";
                break;
            case 7:
                nameMonth = "July";
                break;
            case 8:
                nameMonth = "August";
                break;
            case 9:
                nameMonth = "September";
                break;
            case 10:
                nameMonth = "October";
                break;
            case 11:
                nameMonth = "November";
                break;
            case 12:
                nameMonth = "December";
                break;
            default:
                nameMonth = "Invalid month number";
                break;
        }

        document.getElementById('name-month').innerText = nameMonth;

        // Get total days in the current month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Clear previous results
        const grid = document.getElementById('monthly-grid');
        grid.innerHTML = '';

        // Loop through all days in the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const times = prayTimes.getTimes(date, [latitude, longitude], timeZone);

            // Check if the date matches the current date
            const isToday = day === currentDay;

            // Create a new table row for each day with prayer times
            const rowClass = isToday ? 'table-row today' : 'table-row'; // Add 'today' class if it matches
            const row = `<li class="${rowClass}">
        <div class="col col-1" data-label="Data">${date.toDateString()}</div>
        <div class="col col-2" data-label="Fajr">${times.fajr}</div>
        <div class="col col-3" data-label="Alba">${times.sunrise}</div>
        <div class="col col-4" data-label="Dhuhr">${times.dhuhr}</div>
        <div class="col col-5" data-label="Asr">${times.asr}</div>
        <div class="col col-6" data-label="Maghrib">${times.maghrib}</div>
        <div class="col col-7" data-label="Isha">${times.isha}</div>
    </li>`;

            grid.insertAdjacentHTML('beforeend', row);
        }

        document.getElementById('download-pdf').style.display = 'block';

        // Print table PDF
        document.getElementById('download-pdf').addEventListener('click', function () {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Prepare data
            const headers = ['Date', 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
            const rows = [];

            const prayerRows = document.querySelectorAll('.table-row'); // Get all prayer rows
            prayerRows.forEach(row => {
                const cols = row.querySelectorAll('.col');
                const rowData = [];
                cols.forEach(col => {
                    rowData.push(col.innerText); // Collect text from each column
                });
                rows.push(rowData);
            });

            // Add headers
            doc.autoTable({
                head: [headers],
                body: rows,
            });

            // Create name with month and year
            const filename = `prayer_times_${nameMonth}_${year}.pdf`;

            // Save PDF
            doc.save(filename);
        });

    });

});