const calculationMethod = ['MWL', 'ISNA', 'Egypt', 'Makkah', 'Karachi', 'Tehran', 'Jafari'];
const htmlElement = document.documentElement;
function getMethod() {

};
// Load PrayTimes.js
const prayerTimes = new PrayTimes(document.getElementById('method-select').value);
prayTimes.adjust({ imsak: 10, dhuhr: 0, asr: 'Standard', highLats: 'AngleBased' });

window.onload = displayClock();
function displayClock(){
  var display = new Date().toLocaleTimeString();
  document.getElementById('live-clock').innerText = display;
  setTimeout(displayClock, 1000); 
}

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu");
    const sideMenu = document.getElementById("side-menu");

    // Toggle side menu visibility
    menuButton.addEventListener("click", function () {
        sideMenu.style.visibility = sideMenu.style.visibility === "visible" ? "hidden" : "visible";
    });

    // Close side menu when clicking outside of it
    document.addEventListener("click", function (event) {
        const isClickInsideMenu = sideMenu.contains(event.target);
        const isClickInsideButton = menuButton.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideButton) {
            sideMenu.style.visibility = "hidden";
        }
    });
});

// Get user's location and calculate prayer times
document.getElementById('get-location').addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        htmlElement.className = '';
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude);

        // Get current date
        const currentDate = new Date();

        // Night mode if night
        const localTime = new Date().getHours();

        if (localTime >= 18 || localTime < 6) {
            document.body.classList.add('night-mode');
            document.getElementById('menu').src = "../images/menu(1).png";
        } else {
            document.body.classList.remove('night-mode');
            document.getElementById('menu').src = "../images/menu.png";
        }

        let timeZone = currentDate.getTimezoneOffset() / -60; // Timezone offset in hours

        // Fix timezone adjustment by subtracting 1 hour
        //timeZone -= 1;
        console.log("Adjusted Time Zone Offset:", timeZone);

        // Calculate prayer times
        const times = prayTimes.getTimes(currentDate, [latitude, longitude], timeZone);

        // Display prayer times
        document.getElementById('timeFajr').textContent = `${times.fajr}`;
        document.getElementById('timeSunrise').textContent = `${times.sunrise}`;
        document.getElementById('timeDhuhr').textContent = `${times.dhuhr}`;
        document.getElementById('timeAsr').textContent = `${times.asr}`;
        document.getElementById('timeMaghrib').textContent = `${times.maghrib}`;
        document.getElementById('timeIsha').textContent = ` ${times.isha}`;
    }, function (error) {
        alert('Error getting location: ' + error.message);
    });
});

document.getElementById('method-select').addEventListener('change', function () {
    const selectedMethod = this.value;
    prayTimes.setMethod(selectedMethod);
});
