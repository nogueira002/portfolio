
const carousel = document.querySelector('.carousel');
let index = 0;
const totalImages = document.querySelectorAll('.carousel img').length;
const visibleImages = 3;

function updateCarousel() {
    const offset = -index * (100 + 20); // 100px largura + 20px margem
    carousel.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
    if (index < totalImages - visibleImages) {
        index++;
    } else {
        index = 0;
    }
    updateCarousel();
}

function prevSlide() {
    if (index > 0) {
        index--;
    } else {
        index = totalImages - visibleImages;
    }
    updateCarousel();
}
