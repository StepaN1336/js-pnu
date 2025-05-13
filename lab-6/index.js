let levels = [];
let levelIndex = 0;
let originalMatrix = [];
let currentMoves = 0;
let lastMove = null;
let timer = 0;
let timerInterval;
let winTriggered = false;
const gridSize = 5;

const grid = document.getElementById("grid");
const resetBtn = document.getElementById("reset");
const newGameBtn = document.getElementById("newGame");
const minMovesSpan = document.getElementById("minMoves");
const currentMovesSpan = document.getElementById("currentMoves");
const timerSpan = document.getElementById("timer");

let cells = [];

function loadLevels() {
    fetch('index.json')
        .then(res => res.json())
        .then(data => {
            levels = data;
            startLevel(0);
        });
}

function startLevel(index) {
    clearInterval(timerInterval);
    timer = 0;
    timerInterval = setInterval(updateTimer, 1000);
    levelIndex = index % levels.length;
    const level = levels[levelIndex];
    originalMatrix = level.matrix.map(row => [...row]);
    minMovesSpan.textContent = level.minMoves;
    currentMoves = 0;
    updateMovesDisplay();
    renderGrid(originalMatrix);
}

function updateMovesDisplay() {
    currentMovesSpan.textContent = currentMoves;
}

function updateTimer() {
    timer++;
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    timerSpan.textContent = `${minutes}:${seconds}`;
}

function renderGrid(matrix) {
    grid.innerHTML = '';
    cells = [];

    for (let row = 0; row < gridSize; row++) {
        cells[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("button");
            cell.classList.add("cell");
            if (matrix[row][col] === 1) {
                cell.classList.add("on");
            }
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", handleClick);
            grid.appendChild(cell);
            cells[row][col] = cell;
        }
    }
}

function toggle(row, col) {
    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
        cells[row][col].classList.toggle("on");
    }
}

function handleClick(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    const key = `${row},${col}`;

    toggle(row, col);
    toggle(row - 1, col);
    toggle(row + 1, col);
    toggle(row, col - 1);
    toggle(row, col + 1);

    if (lastMove && lastMove.row === row && lastMove.col === col) {
        currentMoves = Math.max(0, currentMoves - 1);
        lastMove = null;
    } else {
        currentMoves++;
        lastMove = { row, col };
    }

    updateMovesDisplay();
    checkWin();
}

function checkWin() {
    const allOff = cells.every(row =>
        row.every(cell => !cell.classList.contains("on"))
    );
    if (allOff) {
        winTriggered = true;
        clearInterval(timerInterval);
        setTimeout(() => {
            alert(`You win in ${currentMoves} moves and ${timerSpan.textContent} time!`);
        }, 100);
    }
}

resetBtn.addEventListener("click", () => {
    renderGrid(originalMatrix.map(row => [...row]));
    currentMoves = 0;
    updateMovesDisplay();
    timer = 0;
    if(winTriggered) timerInterval = setInterval(updateTimer, 1000);
});

newGameBtn.addEventListener("click", () => {
    startLevel(levelIndex + 1);
});

loadLevels();
