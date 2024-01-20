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

async function initMap() {
    try {
        const locationParam = window.location.search.split('location=')[1];
        const location = locationParam ? encodeURIComponent(locationParam) : 'Astana';


        const response = await fetch(`http://localhost:3000/dataAPI?location=${location}`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const responseData = await response.json();


        var lat = responseData.coordinates.lat;
        var lon = responseData.coordinates.lon;

        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: lat, lng: lon },
            zoom: 10,
            disableDefaultUI: true
        });
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}


window.initMap = initMap;