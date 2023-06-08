import { placesData } from './places.js';

const map = L.map("map-box").setView([53.7947, -1.5025], 12);
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer( tileURL, { attribution }).addTo(map);


placesData.features.forEach(place => {
    let layer = L.marker(place.geometry.coordinates);
    layer.addTo(map);    
})

placesData.features.forEach((place, i) => {
    place.properties.id = i
})
