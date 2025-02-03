var map = L.map('map').setView([45.97194, 10.76738], 9);

// Custom icon for mosques using a local image and a specific color for the marker
var mosqueIcon = L.icon({
    iconUrl: '../images/logo.png', // Path to your locally saved image
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor the icon
    popupAnchor: [0, -32], // Popup position relative to the icon
    shadowUrl: null, // No shadow
    className: 'custom-mosque-marker' // Custom class if needed for additional styling
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

// Function to show user's location
document.getElementById('get-location').addEventListener('click', function () {
    if (navigator.geolocation) {
        // Request the user's location
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Create a custom icon for the user's location
            var userIcon = L.AwesomeMarkers.icon({
                icon: 'fa-location-arrow', // Font Awesome icon for user location
                markerColor: 'blue',
                prefix: 'fa'
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

// Toggle side menu visibility
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu");
    const sideMenu = document.getElementById("side-menu");

    menuButton.addEventListener("click", function () {
        sideMenu.classList.toggle("visible");
    });

    // Close side menu when clicking outside
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