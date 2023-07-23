import { placesData } from './places.js';
import { displayWeatherIcons, convertDay, getDay, setTemperature } from './temperature.js';
import { initializeSwiper } from './swiper.js';

const sitesBox = document.getElementById("site-box");
const map = L.map("map-box").setView([53.7947, -1.5025], 11);
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
L.tileLayer(tileURL, { attribution }).addTo(map);

function addMarkersToMap() {
    placesData.features.forEach(place => {
        const marker = L.marker(place.geometry.coordinates)
            .bindPopup(`<h6>${place.properties.name}</h6>
            <p class="m-0">${place.properties.address}</p>
            <p class="m-0">${place.properties.city}</p>`)
            .addTo(map);

        marker.on("click", () => {
            map.flyTo(place.geometry.coordinates, 17)
        })
    });
}

function renderPlacesCarousel() {
    placesData.features.forEach((place, index) => {
        const siteListing = document.createElement("div");
        const site = sitesBox.appendChild(siteListing);
        site.id = `place-listing-${index}`;
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
    });

    addMarkersToMap();
}

function renderWeatherDetails() {
    const lat = 53.7947;
    const lon = -1.5025;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum&timeformat=unixtime&forecast_days=3&timezone=Europe%2FLondon`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            displayWeatherIcons(data.daily.weathercode);
            convertDay(data.daily.time, getDay);
            setTemperature(data.daily.temperature_2m_max);
        })
}


function renderPhotoGallery() {
    fetch("https://api.unsplash.com/search/photos/?query=leeds&orientation=landscape&client_id=WdfepevhiWFE9VB3-aC2TWHc7Drsrl9rieYiSOHPSsc")
        .then(res => {
            return res.json();
        })
        .then(data => {
            const carouselBody = document.querySelector("[data-carousel-main]");

            for (const el of data.results) {
                const newDiv = document.createElement("div");
                newDiv.setAttribute("class", "carousel-item");
                carouselBody.appendChild(newDiv);

                const text = document.createElement("p");
                text.className = "figure tag";
                text.innerHTML = `<small>by</small> <a href="${el.user.links.html}" class="link">${el.user.name}</a> <small>on</small> <a href="https://unsplash.com/" class="link">Unsplash</a>`
                newDiv.appendChild(text);

                const img = document.createElement("img");
                img.setAttribute("src", `${el.urls.regular}`);
                img.setAttribute("class", "d-block w-100");
                newDiv.appendChild(img);
            }
            carouselBody.firstElementChild.classList.add("active");
        })
}

document.addEventListener("DOMContentLoaded", renderWeatherDetails);
document.addEventListener("DOMContentLoaded", initializeSwiper);
document.addEventListener("DOMContentLoaded", renderPlacesCarousel);
document.addEventListener("DOMContentLoaded", renderPhotoGallery);

