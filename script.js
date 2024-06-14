let map;
let marker;
let watchId;

function initMap() {
    const initialPosition = { lat: -23.55052, lng: -46.633308 }; // Posição inicial (São Paulo, por exemplo)

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: initialPosition,
    });

    marker = new google.maps.Marker({
        position: initialPosition,
        map: map,
    });
}

function updatePosition(position) {
    const { latitude, longitude } = position.coords;
    const newPosition = { lat: latitude, lng: longitude };

    marker.setPosition(newPosition);
    map.setCenter(newPosition);
}

function handleError(error) {
    console.error(`Erro ao obter localização: ${error.message}`);
}

function startTracking() {
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(updatePosition, handleError, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
        });
    } else {
        alert("Geolocalização não é suportada pelo seu navegador.");
    }
}

function stopTracking() {
    if (navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
    }
}

document.addEventListener("DOMContentLoaded", initMap);
