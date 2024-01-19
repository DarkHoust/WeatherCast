function showMap() {
    let toHide = document.querySelectorAll(".weather");
    let containers = document.querySelectorAll(".map");

    containers.forEach((container) => {
        container.classList.remove("d-none");
    });

    toHide.forEach((container) => {
        container.classList.add("d-none");
    });
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
