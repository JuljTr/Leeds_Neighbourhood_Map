import { iconMap } from './iconMap.js';

export function getIcon(iconCode) {
    let [iconOne, iconTwo, iconThree] = iconCode;
    const currentIcon = document.querySelector("[data-current-icon]");
    const secondIcon = document.querySelector("[data-second-icon]");
    const thirdIcon = document.querySelector("[data-third-icon]");

    currentIcon.innerHTML = `<img src="./icons/${iconMap.get(iconOne)}.svg">`;
    secondIcon.innerHTML = `<img src="./icons/${iconMap.get(iconTwo)}.svg">`;
    thirdIcon.innerHTML = `<img src="./icons/${iconMap.get(iconThree)}.svg">`;
}

export function setTemperature(temp) {
    let [tempOne, tempTwo, tempThree] = temp;
    const currentTemp = document.getElementById("current-temp");
    const secondTemp = document.getElementById("second-temp");
    const thirdTemp = document.getElementById("third-temp");

    currentTemp.textContent = Math.floor(tempOne);
    secondTemp.textContent = Math.floor(tempTwo);
    thirdTemp.textContent = Math.floor(tempThree);
}

export function getDay(el) {
    const date = new Date(el * 1000);
    return date.toLocaleString('en-GB', { weekday: 'long' }).slice(0, 3);
}

export function convertDay(day, fn) {
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