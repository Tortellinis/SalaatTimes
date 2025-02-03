var map = L.map('map').setView([45.97194, 10.76738], 9);

// Custom icon for mosques
var mosqueIcon = L.icon({
    iconUrl: '../images/logo.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: null,
    className: 'custom-mosque-marker'
});

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Check if mosques are available
if (window.mosques && Array.isArray(window.mosques)) {
    // Loop through the array and add markers for each mosque
    window.mosques.forEach(function (mosque) {
        L.marker([mosque.lat, mosque.lon], { icon: mosqueIcon }).addTo(map)
            .bindPopup("<b>" + mosque.name + "</b><br>" + mosque.address);
    });
}

document.getElementById('get-location').addEventListener('click', function () {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Create a custom icon for the user's location
            var userIcon = L.icon({
                iconUrl: '../images/user4.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
                shadowUrl: null,
                className: 'custom-user-marker'
            });

            // Create a marker for user's location and add to the map
            var userMarker = L.marker([latitude, longitude], { icon: userIcon }).addTo(map)
                .bindPopup("<b>Your Location</b>").openPopup();

            // Zoom to the user's location
            map.setView([latitude, longitude], 13);

        }, function (error) {
            alert('Error getting location: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu");
    const sideMenu = document.getElementById("side-menu");

    menuButton.addEventListener("click", function () {
        sideMenu.classList.toggle("visible");
    });

    document.addEventListener("click", function (event) {
        const isClickInsideMenu = sideMenu && sideMenu.contains(event.target);
        const isClickInsideButton = menuButton.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideButton && sideMenu && sideMenu.classList.contains("visible")) {
            sideMenu.classList.remove("visible");
        }
    });
});

// Night mode if night
const localTime = new Date().getHours();
if (localTime >= 18 || localTime < 6) {
    document.body.classList.add('night-mode');
    document.getElementById('menu').src = "../images/menu1.png";
} else {
    document.body.classList.remove('night-mode');
    document.getElementById('menu').src = "../images/menu.png";
}