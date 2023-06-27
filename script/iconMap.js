export const iconMap = new Map();

addMapping([0,1], "sun");
addMapping([95,96,99], "cloud-bolt");
addMapping([2,3], "cloud-sun");
addMapping([45,48], "smog");
addMapping([51,53,55], "cloud");
addMapping([61,63,65], "cloud-rain");
addMapping([56,57,66,67,80,81,82], "cloud-showers-heavy");
addMapping([71,73,75,77,85,86], "cloud-snow");

function addMapping(code, icon){
    code.forEach(el => {
        iconMap.set(el, icon);
    });
}