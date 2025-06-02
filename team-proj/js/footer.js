const modal = document.querySelector(".modal");
const saveBtn = document.querySelector(".modal__save");
const nameInput = document.querySelector(".modal__input");
const footerBtn = document.querySelector(".footer__interaction-button");
const textAppealContainer = document.querySelector('.modal__text-appeal');
const greetingModal = document.querySelector(".modal--greeting");
const greetingText = document.querySelector(".modal__text--greeting");
const closeGreetingBtn = document.querySelector(".modal__save--close");

const savedName = localStorage.getItem("userName");

if (!savedName) {
    modal.classList.add("modal--visible");
} else {
    updateFooter(savedName);
}

saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name.length > 0 && name.length <= 20) {
        localStorage.setItem("userName", name);
        modal.classList.remove("modal--visible");
        updateFooter(name);
    } else if(name.length > 20) {
        textAppealContainer.textContent = "Ваше ім'я занадто довге, спробуйте скоротити :("
    }
});

closeGreetingBtn.addEventListener("click", () => {
    greetingModal.classList.remove("modal--visible");
});

function updateFooter(name) {
    footerBtn.textContent = `Привіт, ${name}! Натисни, щоб дізнатись про новинки 🎁`;
    footerBtn.addEventListener("click", () => {
        greetingText.textContent = `Раді бачити тебе, ${name}! Слідкуй за оновленнями 🛍️`;
        greetingModal.classList.add("modal--visible");
    });
}
