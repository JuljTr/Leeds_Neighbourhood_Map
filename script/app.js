import { placesData } from './places.js';

const map = L.map("map-box").setView([53.7947, -1.5025], 11);
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, { attribution }).addTo(map);


function displaySitesMarker() {
    placesData.features.forEach(place => {
        let layer = L.marker(place.geometry.coordinates);
        layer.addTo(map);
    })
}

function siteDisplayList() {
    const sitesBox = document.getElementById("site-box");

    placesData.features.forEach((place, i) => {
        place.properties.id = i;

        const siteListing = document.createElement("div");
        const site = sitesBox.appendChild(siteListing);
        site.id = `listing-${place.properties.id}`;
        site.className = "col col-6 col-sm-6 col-md-4 p-0 item";
        // carousel-item

        const div = site.appendChild(document.createElement("div"));
        div.className = "item-properties m-2 p-2 text-center shadow-sm bg-body rounded";
        div.innerHTML =
            `<p class="m-0 fw-bold">${place.properties.name},</p>
             <p class="m-0 fs-6 fw-light lh-1">${place.properties.address}</p>
             <p class="m-0 fs-6 fw-light lh-1">${place.properties.city}</p>
             <p class="m-0 fs-6 fw-light lh-1">${place.properties.country}</p>`;


        if (site.id === `listing-${0}`) {
            site.classList.add("active");
        }
    })
}
siteDisplayList();
document.addEventListener("DOMContentLoaded", displaySitesMarker);
