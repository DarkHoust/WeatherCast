function showMap() {
    let weatherView = document.querySelectorAll(".weather");
    let mapView = document.querySelectorAll(".map");
    let accountView = document.querySelectorAll(".account");
    let searchView = document.querySelectorAll('.searchView')

    weatherView.forEach((container) => {
        container.classList.add("d-none");
    });

    mapView.forEach((container) => {
        container.classList.remove("d-none");
    });

    accountView.forEach((container) => {
        container.classList.add("d-none")
    });

    searchView.forEach((container) => {
        container.classList.remove("d-none")
    });
    //Updating map's location
    initMap();
}

function showWeather() {
    let weatherView = document.querySelectorAll(".weather");
    let mapView = document.querySelectorAll(".map");
    let accountView = document.querySelectorAll(".account");
    let searchView = document.querySelectorAll('.searchView')

    weatherView.forEach((container) => {
        container.classList.remove("d-none");
    });

    mapView.forEach((container) => {
        container.classList.add("d-none");
    });

    accountView.forEach((container) => {
        container.classList.add("d-none")
    })

    searchView.forEach((container) => {
        container.classList.remove("d-none")
    })
}

function redirectToMainPage() {
    window.location.href = 'http://localhost:3000';
}

function reloadPage(){
    location.reload();
}

function showAccountInfo() {
    let weatherView = document.querySelectorAll(".weather");
    let mapView = document.querySelectorAll(".map");
    let accountView = document.querySelectorAll(".account");
    let searchView = document.querySelectorAll('.searchView')

    weatherView.forEach((container) => {
        container.classList.add("d-none");
    });

    mapView.forEach((container) => {
        container.classList.add("d-none");
    });

    accountView.forEach((container) => {
        container.classList.remove("d-none")
    })

    searchView.forEach((container) => {
        container.classList.add("d-none")
    })
}

function logOut() {
    window.location.replace('/auth')
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