import { placesData } from './places.js';
import { getWeatherData } from './weatherApi.js';

const sitesBox = document.getElementById("site-box");
const map = L.map("map-box").setView([53.7947, -1.5025], 11);
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, { attribution }).addTo(map);


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    cssMode: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    mousewheel: true,
    keyboard: true,
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

document.addEventListener("DOMContentLoaded", siteDisplayList);

getWeatherData(10, 10, Intl.DateTimeFormat().resolvedOptions().timezone)
.then( renderWeather)
.catch(error => {
    console.log(error)
    alert("Error getting weather")
});
