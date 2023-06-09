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
    placesData.features.forEach((place, i) => {
        place.properties.id = i;

        const sitesBox = document.getElementById("site-box");
        const siteListing = document.createElement("div");
        const site = sitesBox.appendChild(siteListing);
        site.id = `listing-${place.properties.id}`;
        site.className = "item";

        const div = site.appendChild(document.createElement("div"));
        div.innerHTML =
            `<p>${place.properties.name}</p>
             <p>${place.properties.address}</p>
             <p>${place.properties.city}</p>
             <p>${place.properties.country}</p>`;

        div.className = "item-properties";
        console.log(sitesBox)
    })
}
siteDisplayList();
document.addEventListener("DOMContentLoaded", displaySitesMarker);
