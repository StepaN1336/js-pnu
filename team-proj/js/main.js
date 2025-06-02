const indexPageContainer = document.querySelector('.index-page');
const ctaButton = document.querySelector('.hero__button');
const sliderButtons = document.querySelectorAll('.slider__button');
const slides = document.querySelectorAll('.slider__slide');
const dots = document.querySelectorAll('.slider__dot');
const prevBtn = document.querySelector('.slider__prev');
const nextBtn = document.querySelector('.slider__next');
const slider = document.querySelector('.slider');
const slidesContainer = document.querySelector('.slider__slides');
const catalogContainer = document.querySelector('.catalog');
let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100 / slides.length}%)`;
    slides.forEach((slide, i) => slide.classList.toggle('slider__slide--active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('slider__dot--active', i === currentSlide));
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
    });
});

ctaButton.addEventListener('click', () => {
    indexPageContainer.classList.add('hidden');
    catalogContainer.classList.remove('hidden');
});

sliderButtons.forEach(button => {
    button.addEventListener('click', () => {
        indexPageContainer.classList.add('hidden');
        catalogContainer.classList.remove('hidden');
    });
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

startAutoSlide();
showSlide(currentSlide);
