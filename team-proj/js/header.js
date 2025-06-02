const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__navigation-links');
const body = document.body;
const navButtons = document.querySelectorAll('.header__navigation-link');

let pageMap = {};
let currentPage = null;

// Завантажуємо карту
async function loadPageMap() {
    try {
        const res = await fetch('json/map.json');
        if (!res.ok) throw new Error('map.json не знайдено');
        pageMap = await res.json();
    } catch (err) {
        console.error('Помилка завантаження map.json:', err);
    }
}

function showPage(pageKey) {
    if (!pageMap[pageKey]) {
        console.warn(`Немає такого ключа: ${pageKey}`);
        return;
    }

    // Ховаємо всі секції
    Object.values(pageMap).flat().forEach(selector => {
        document.querySelector(selector)?.classList.add('hidden');
    });

    // Показуємо потрібні
    pageMap[pageKey].forEach(selector => {
        document.querySelector(selector)?.classList.remove('hidden');
    });

    // Кнопки: робимо активною поточну
    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageKey);
    });

    // Закриваємо бургер
    headerBurger.classList.remove('active');
    headerMenu.classList.remove('open');
    body.classList.remove('lock');

    // Запам’ятовуємо сторінку
    currentPage = pageKey;
}

function initNavigation() {
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageKey = button.dataset.page;
            showPage(pageKey);
        });
    });

    // Показати головну одразу
    showPage('main');
}

(async () => {
    await loadPageMap();
    initNavigation();
})();
