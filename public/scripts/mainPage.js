function showMap() {
    let toHide = document.querySelectorAll(".weather");
    let containers = document.querySelectorAll(".map");

    containers.forEach((container) => {
        container.classList.remove("d-none");
    });

    toHide.forEach((container) => {
        container.classList.add("d-none");
    });
    //Updating map's location
    initMap();
}

function showWeather() {
    let containers = document.querySelectorAll(".weather");
    let toHide = document.querySelectorAll(".map");

    containers.forEach((container) => {
        container.classList.remove("d-none");
    });

    toHide.forEach((container) => {
        container.classList.add("d-none");
    });
}

function reloadPage(){
    location.reload();
}


//Google Map API
let map;

function initMap() {
    fetch('http://localhost:3000/dataAPI')
        .then(response => response.json())
        .then(responseData => {
            var lat = responseData.coordinates.lat;
            var lon = responseData.coordinates.lon;
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: lat, lng: lon },
                zoom: 10,
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

window.initMap = initMap;