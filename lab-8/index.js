const burger = document.querySelector(".burger-btn");
const menuOverlay = document.querySelector(".menu-overlay-block");
const track = document.querySelector(".carousel-track-block");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");
const dotsContainer = document.querySelector(".dots-container");

let currentIndex = 0;
let autoSlideInterval;

burger.addEventListener("click", () => {
    menuOverlay.style.display = menuOverlay.style.display === "block" ? "none" : "block";
});

function getVisibleSlides() {
    return window.innerWidth >= 768 ? 3 : 2;
}

function setSlidePositions() {
    const slideWidth = track.clientWidth / getVisibleSlides();
    slides.forEach((slide) => {
        slide.style.minWidth = `${slideWidth}px`;
    });
}

function moveToSlide(index) {
    const visible = getVisibleSlides();
    const total = slides.length;
    const maxIndex = total - visible;
    if (index < 0) currentIndex = maxIndex;
    else if (index > maxIndex) currentIndex = 0;
    else currentIndex = index;

    const slideWidth = track.clientWidth / visible;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    updateDots();
}

function updateDots() {
    const allDots = dotsContainer.querySelectorAll("span");
    allDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

function createDots() {
    dotsContainer.innerHTML = "";
    const totalDots = slides.length - getVisibleSlides() + 1;
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("span");
        if (i === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", () => {
            moveToSlide(i);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    }
}

function setupAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveToSlide(currentIndex + 1);
    }, 4000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    setupAutoSlide();
}

nextButton.addEventListener("click", () => {
    moveToSlide(currentIndex + 1);
    resetAutoSlide();
});

prevButton.addEventListener("click", () => {
    moveToSlide(currentIndex - 1);
    resetAutoSlide();
});

window.addEventListener("resize", () => {
    setSlidePositions();
    moveToSlide(currentIndex);
    createDots();
});

setSlidePositions();
moveToSlide(0);
createDots();
setupAutoSlide();
