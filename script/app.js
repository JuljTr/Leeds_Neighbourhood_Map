import { iconMap } from './iconMap.js';
import { placesData } from './places.js';

const sitesBox = document.getElementById("site-box");
const map = L.map("map-box").setView([53.7947, -1.5025], 11);
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, { attribution }).addTo(map);

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 10,
    cssMode: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
        "@0.00": {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        "@0.75": {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        "@1.00": {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        "@1.50": {
            slidesPerView: 4,
            spaceBetween: 40,
        },
    },
});


placesData.features.forEach((place, i) => {
    place.properties.id = i;
});

function displaySitesMarker() {
    placesData.features.forEach(place => {
        let layer = L.marker(place.geometry.coordinates)
            .bindPopup(`<h6>${place.properties.name}</h6>
            <p class="m-0">${place.properties.address}</p>
            <p class="m-0">${place.properties.city}</p>`)
            .closePopup()
            .addTo(map);

        layer.on("click", () => {
            map.flyTo(place.geometry.coordinates, 17)
        })
    });
}

function siteDisplayList() {
    for (const place of placesData.features) {
        const siteListing = document.createElement("div");
        const site = sitesBox.appendChild(siteListing);
        site.id = `listing-${place.properties.id}`;
        site.className = "m-0 col col-5 p-2 item swiper-slide";

        const div = site.appendChild(document.createElement("div"));
        div.className = "item-properties d-flex flex-column justify-content-between p-0 p-sm-4 text-center shadow-sm bg-body rounded";
        div.innerHTML =
            `<p class="m-0 fw-bold lh-1">${place.properties.name}</p>
             <p class="m-0 fs-6 fw-light lh-1 pt-1">${place.properties.address}</p>
             <p class="m-0 fs-6 fw-light lh-1">${place.properties.city}</p>
             <p class="m-0 fs-6 fw-light lh-1">${place.properties.country}</p>`;

        site.addEventListener("click", () => {
            map.flyTo(place.geometry.coordinates, 17);
        })
    }
    displaySitesMarker();
}

function getDay(el) {
    const date = new Date(el * 1000);
    return date.toLocaleString('en-GB', { weekday: 'long' }).slice(0, 3);
}

function convertDay(day, fn) {
    let [dayOne, dayTwo, dayThree] = day;

    let currEl = fn(dayOne);
    let secondEl = fn(dayTwo);
    let thirdEl = fn(dayThree);

    const currentDay = document.body.querySelector("#current-day");
    const secondDay = document.body.querySelector("#second-day");
    const thirdDay = document.body.querySelector("#third-day");

    currentDay.textContent = currEl;
    secondDay.textContent = secondEl;
    thirdDay.textContent = thirdEl;
}

function setTemperature(temp) {
    let [tempOne, tempTwo, tempThree] = temp;
    const currentTemp = document.getElementById("current-temp");
    const secondTemp = document.getElementById("second-temp");
    const thirdTemp = document.getElementById("third-temp");

    currentTemp.textContent = Math.floor(tempOne);
    secondTemp.textContent = Math.floor(tempTwo);
    thirdTemp.textContent = Math.floor(tempThree);
}

function getIcon(iconCode) {
    let [iconOne, iconTwo, iconThree] = iconCode;
    const currentIcon = document.querySelector("[data-current-icon]");
    const secondIcon = document.querySelector("[data-second-icon]");
    const thirdIcon = document.querySelector("[data-third-icon]");

    currentIcon.innerHTML = `<img src="./icons/${iconMap.get(iconOne)}.svg">`;
    secondIcon.innerHTML = `<img src="./icons/${iconMap.get(iconTwo)}.svg">`;
    thirdIcon.innerHTML = `<img src="./icons/${iconMap.get(iconThree)}.svg">`;
}
function getWeatherApi() {
    const lat = 53.7947;
    const lon = -1.5025;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum&timeformat=unixtime&forecast_days=3&timezone=Europe%2FLondon`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            console.log(data.daily.weathercode)
            getIcon(data.daily.weathercode);
            convertDay(data.daily.time, getDay);
            setTemperature(data.daily.temperature_2m_max);
        })
}

document.addEventListener("DOMContentLoaded", siteDisplayList);
document.addEventListener("DOMContentLoaded", getWeatherApi);

