;const htmlElement = document.documentElement;

// Night mode if night
const localTime = new Date().getHours();

if (localTime >= 18 || localTime < 6) {
    document.body.classList.add('night-mode');
    document.getElementById('menu').src = "../images/menu(1).png";
} else {
    document.body.classList.remove('night-mode');
    document.getElementById('menu').src = "../images/menu.png";
}

function getMethod() {

};

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