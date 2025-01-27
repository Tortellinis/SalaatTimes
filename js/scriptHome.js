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
