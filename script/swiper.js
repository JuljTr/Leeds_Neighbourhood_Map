export function swiperJs() {
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
}