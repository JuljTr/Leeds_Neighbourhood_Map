console.log("hello world");

const map = L.map("map-box").setView([53.7947, -1.5025], 10);
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer( tileURL, { attribution }).addTo(map);

console.log(map)