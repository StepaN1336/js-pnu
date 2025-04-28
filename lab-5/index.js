const startScreen = document.querySelector('.start-screen');
const gameScreen = document.querySelector('.game-screen');
const square = document.querySelector('.square');
const approachSquare = document.querySelector('.approach-square');
const scoreDisplay = document.querySelector('.score');
const timerDisplay = document.querySelector('.timer');
const colorButtons = document.querySelectorAll('.color-button');
const hitSound = new Audio('osu-hit-sound.mp3');
const missSound = new Audio('osu-miss-sound.wav');
const gameOverSound = new Audio('game-over-sound.mp3');

let color = 'red';
let difficultySettings = {};
let score = 0;
let timeLeft = 0;
let gameActive = false;
let approachSquareAnimationFrame;
let timerInterval;
let accurateClick = false;
let isFirstBodyClick = true;

function selectColor(button, selectedColor) {
    colorButtons.forEach(btn => {
        btn.classList.remove('active-button');
    });

    button.classList.add('active-button');
    color = selectedColor;
}

function startGame(difficulty) {
    if (difficulty === 'easy') {
        difficultySettings = {
            timer: 5,
            hitPoints: 1,
            missPoints: -1,
            size: 50,
            approachSquareSpeed: 1,
            moveDistance: 400
        };
    } else if (difficulty === 'medium') {
        difficultySettings = {
            timer: 3,
            hitPoints: 3,
            missPoints: -5,
            size: 40,
            approachSquareSpeed: 1.5,
            moveDistance: 800
        };
    } else if (difficulty === 'hard') {
        difficultySettings = {
            timer: 2,
            hitPoints: 5,
            missPoints: -10,
            size: 30,
            approachSquareSpeed: 2,
            moveDistance: 1200
        };
    }

    startScreen.classList.remove('active');
    gameScreen.classList.add('active');

    initGame();
}

function initGame() {
    score = 0;
    gameActive = true;

    square.style.backgroundColor = color;
    square.style.width = difficultySettings.size + 'px';
    square.style.height = difficultySettings.size + 'px';

    approachSquare.style.width = '200px';
    approachSquare.style.height = '200px';

    moveSquareRandomly();
    shrinkApproachSquare();

    timerInterval = setInterval(updateTimer, 1000);

    square.addEventListener('click', onSquareClick);
    document.body.addEventListener('click', onBodyClick);
}

let lastX = window.innerWidth / 2;
let lastY = window.innerHeight / 2;

function moveSquareRandomly() {
    if (!gameActive) return;

    const maxX = window.innerWidth - difficultySettings.size;
    const maxY = window.innerHeight - difficultySettings.size;

    let minX = Math.max(0, lastX - difficultySettings.moveDistance);
    let maxXLocal = Math.min(maxX, lastX + difficultySettings.moveDistance);

    let minY = Math.max(0, lastY - difficultySettings.moveDistance);
    let maxYLocal = Math.min(maxY, lastY + difficultySettings.moveDistance);

    let newX = Math.random() * (maxXLocal - minX) + minX;
    let newY = Math.random() * (maxYLocal - minY) + minY;

    square.style.left = newX + 'px';
    square.style.top = newY + 'px';

    approachSquare.style.left = newX + 'px';
    approachSquare.style.top = newY + 'px';

    lastX = newX;
    lastY = newY;

    resetTimer();
    resetApproachSquare();
}

function onSquareClick(e) {
    if (!gameActive) return;
    e.stopPropagation();
    if (accurateClick) {
        updateScore(difficultySettings.hitPoints * 2);
    } else {
        updateScore(difficultySettings.hitPoints);
    }
    hitSound.play();
    hitSound.currentTime = 0;
    moveSquareRandomly();
}

function onBodyClick() {
    if (!gameActive) return;
    if (isFirstBodyClick) {
        isFirstBodyClick = false;
        return;
    }
    missSound.play();
    missSound.currentTime = 0;
    updateScore(difficultySettings.missPoints);
}

function updateScore(change = 0) {
    score += change;
    scoreDisplay.textContent = `Очки: ${score}`;
}

function updateTimer() {
    if (!gameActive) return;
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}

function resetTimer() {
    timeLeft = difficultySettings.timer;
    timerDisplay.textContent = timeLeft;
}

function endGame() {
    gameActive = false;
    gameOverSound.play();
    clearInterval(timerInterval);
    cancelAnimationFrame(approachSquareAnimationFrame);
    alert(`Гру завершено! Твій результат: ${score} очок.`);
    location.reload();
}

function resetApproachSquare() {
    approachSquare.style.width = '200px';
    approachSquare.style.height = '200px';
    approachSquare.style.marginLeft = '-80px';
    approachSquare.style.marginTop = '-80px';
}

function shrinkApproachSquare() {
    if (!gameActive) return;

    let approachSquareSize = parseFloat(getComputedStyle(approachSquare).width);

    if (approachSquareSize > difficultySettings.size) {
        accurateClick = true;
        approachSquareSize -= difficultySettings.approachSquareSpeed;
        approachSquare.style.width = `${approachSquareSize}px`;
        approachSquare.style.height = `${approachSquareSize}px`;
        approachSquare.style.marginLeft = `${-approachSquareSize / 2 + difficultySettings.size / 2 - 2}px`;
        approachSquare.style.marginTop = `${-approachSquareSize / 2 + difficultySettings.size / 2 - 2}px`;
    } else {
        accurateClick = false;
    }
    approachSquareAnimationFrame = requestAnimationFrame(shrinkApproachSquare);
}
