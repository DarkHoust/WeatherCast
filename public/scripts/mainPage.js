
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

// On-Click handle functions
function showMap() {
    let weatherView = document.querySelectorAll(".weather");
    let mapView = document.querySelectorAll(".map");
    let accountView = document.querySelectorAll(".account");
    let searchView = document.querySelectorAll('.searchView');
    let historyView = document.querySelectorAll('.history');

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

    historyView.forEach((container) => {
        container.classList.add('d-none');
    })

    //Updating map's location
    initMap();
}

function showHistory() {
    let weatherView = document.querySelectorAll(".weather");
    let mapView = document.querySelectorAll(".map");
    let accountView = document.querySelectorAll(".account");
    let searchView = document.querySelectorAll('.searchView');
    let historyView = document.querySelectorAll('.history');

    weatherView.forEach((container) => {
        container.classList.add("d-none");
    });

    mapView.forEach((container) => {
        container.classList.add("d-none");
    });

    accountView.forEach((container) => {
        container.classList.add("d-none")
    });

    searchView.forEach((container) => {
        container.classList.add("d-none")
    });

    historyView.forEach((container) => {
        container.classList.remove('d-none');
    })
}

function showWeather() {
    let weatherView = document.querySelectorAll(".weather");
    let mapView = document.querySelectorAll(".map");
    let accountView = document.querySelectorAll(".account");
    let searchView = document.querySelectorAll('.searchView');
    let historyView = document.querySelectorAll('.history');

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

    historyView.forEach((container) => {
        container.classList.add('d-none');
    })
}

function redirectToMainPage() {
    window.location.href = '/';
}

function reloadPage(){
    location.reload();
}

function showAccountInfo() {
    let weatherView = document.querySelectorAll(".weather");
    let mapView = document.querySelectorAll(".map");
    let accountView = document.querySelectorAll(".account");
    let searchView = document.querySelectorAll('.searchView');
    let historyView = document.querySelectorAll('.history');

    weatherView.forEach((container) => {
        container.classList.add("d-none");
    });

    mapView.forEach((container) => {
        container.classList.add("d-none");
    });

    accountView.forEach((container) => {
        container.classList.remove("d-none")
    });

    searchView.forEach((container) => {
        container.classList.add("d-none")
    });
    
    historyView.forEach((container) => {
        container.classList.add('d-none');
    });
}

function logOut() {
    window.location.replace('/auth')
}

function redirectToAdmin() {
    window.location.href = "/admin";
}

// function formatDate(timestamp) {
//     const date = new Date(timestamp);
//     return date.toLocaleString();
// }
