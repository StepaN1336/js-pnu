let initialCards = {};
let cards = {};
let playerScore = 0;
let dealerScore = 0;
let playerCards = [];
let dealerCards = [];
let gameEndStatus = false;
let gameStartStatus = false;
let dealerAceInHandAmount = 0;
let playerAceInHandAmount = 0;
let balance = 1000;
let bet = 0;

const blackjackNavBtn = document.querySelector('.blackjack__nav-btn');
const startButton = document.querySelector('.blackjack__button--start');
const passButton = document.querySelector('.blackjack__button--pass');
const getCardButton = document.querySelector('.blackjack__button--get');
const gameResultField = document.querySelector('.blackjack__result');

fetch('json/deck-cards.json')
    .then((res) => res.json())
    .then((data) => {
        initialCards = data;
        cards = { ...initialCards };
    });

startButton.addEventListener('click', () => startNewGame());
passButton.addEventListener('click', () => playerPass());
getCardButton.addEventListener('click', () => playerGotCard());

blackjackNavBtn.addEventListener('click', () => {
    const disclaimerModal = document.querySelector('.blackjack__modal--disclaimer');
    disclaimerModal.style.display = 'flex';

    document.querySelector('.blackjack__modal--disclaimer-accept').onclick = () => {
        disclaimerModal.style.display = 'none';
    };
});

async function startNewGame() {
    if (balance <= 0) {
        showModal("You have no money left!");
        return;
    }

    bet = await askBet(balance);

    if (bet === null) {
        showModal('You canceled your bet!');
        return;
    }

    gameStartStatus = true;
    balance -= bet;
    cards = { ...initialCards };
    playerScore = 0;
    dealerScore = 0;
    playerCards = [];
    dealerCards = [];
    gameEndStatus = false;
    gameResultField.textContent = '';
    dealerAceInHandAmount = 0;
    playerAceInHandAmount = 0;

    for (let i = 0; i < 2; i++) {
        addPlayerCard();
    }
    addDealerCard();
}

function askBet(maxBet) {
    return new Promise((resolve) => {
        const modal = document.querySelector('.blackjack__modal--bet');
        const input = document.querySelector('.blackjack__bet-input');
        const error = document.querySelector('.blackjack__bet-error');
        const placeBetBtn = document.querySelector('.blackjack__place-bet-btn');
        const cancelBetBtn = document.querySelector('.blackjack__place-bet-cancel-btn');

        input.value = '';
        error.textContent = '';
        modal.style.display = 'flex';

        placeBetBtn.onclick = () => {
            const value = parseInt(input.value);
            if (!value || value <= 0) {
                error.textContent = 'Bet must be a positive number.';
            } else if (value > maxBet) {
                error.textContent = 'You cannot bet more than your balance.';
            } else {
                modal.style.display = 'none';
                resolve(value);
            }
        };

        cancelBetBtn.onclick = () => {
            modal.style.display = 'none';
            resolve(null);
        }
    });
}

function getRandomCard() {
    const keys = Object.keys(cards);
    const index = Math.floor(Math.random() * keys.length);
    const key = keys[index];
    const value = cards[key];
    delete cards[key];
    return [key, value];
}

function addPlayerCard() {
    if (!gameStartStatus) {
        showModal('Please, place your bet to start a new game.');
        return;
    }
    const [name, value] = getRandomCard();
    playerCards.push(name);

    if (name.includes('A')) {
        if (playerScore > 10) {
            playerScore += 1;
        } else {
            playerAceInHandAmount++;
            playerScore += 11;
        }
    } else {
        playerScore += value;
        if (playerScore > 21 && playerAceInHandAmount > 0) {
            playerScore -= 10;
            playerAceInHandAmount--;
        }
    }

    cardAndScoreRender();
}

function addDealerCard() {
    const [name, value] = getRandomCard();
    dealerCards.push(name);

    if (name.includes('A')) {
        if (dealerScore > 10) {
            dealerScore += 1;
        } else {
            dealerAceInHandAmount++;
            dealerScore += 11;
        }
    } else {
        dealerScore += value;
        if (dealerScore > 21 && dealerAceInHandAmount > 0) {
            dealerScore -= 10;
            dealerAceInHandAmount--;
        }
    }

    cardAndScoreRender();
}

function renderCards(container, cards) {
    container.innerHTML = '';
    cards.forEach((cardName) => {
        const img = document.createElement('img');
        img.src = `images/cards/${cardName}.png`;
        img.alt = cardName;
        container.appendChild(img);
    });
}

function cardAndScoreRender() {
    document.querySelector('.blackjack__dealer-cards').innerHTML = 'Dealer Cards: ';
    document.querySelector('.blackjack__player-cards').innerHTML = 'Player Cards: ';
    renderCards(document.querySelector('.blackjack__dealer-cards'), dealerCards);
    renderCards(document.querySelector('.blackjack__player-cards'), playerCards);
    document.querySelector('.blackjack__dealer-score').textContent = `Dealer Score: ${dealerScore}`;
    document.querySelector('.blackjack__player-score').textContent = `Player Score: ${playerScore}`;
    document.querySelector('.blackjack__balance').textContent = `Your Balance: ${balance}`;
}

function gameOver() {
    if ((dealerScore > playerScore && dealerScore <= 21) || playerScore > 21) {
        gameResultField.textContent = 'Dealer Won!';
    } else if (dealerScore === playerScore) {
        gameResultField.textContent = 'Tie! Your bet has been returned!';
        balance += bet;
    } else {
        gameResultField.textContent = 'Player Won!';
        balance += bet * 2;
    }
    cardAndScoreRender();
}

function playerPass() {
    if (gameEndStatus) {
        showModal('Game ended! Start a new one.');
        return;
    } else if (!gameStartStatus) {
        showModal('Please, place your bet to start a new game.');
        return;
    }

    while (dealerScore < playerScore && dealerScore < 22) {
        addDealerCard();
    }

    gameEndStatus = true;
    gameOver();
}

function playerGotCard() {
    if (gameEndStatus) {
        showModal('Game ended! Start a new one.');
        return;
    }
    addPlayerCard();
    if (playerScore > 21) {
        gameEndStatus = true;
        gameOver();
    }
}

function showModal(message) {
    const modal = document.querySelector('.blackjack__modal--message');
    const modalText = document.querySelector('.blackjack__modal--message-text');

    modalText.textContent = message;
    modal.style.display = 'flex';

    document.querySelector('.blackjack__modal--message-close').onclick = () => {
        modal.style.display = 'none';
    };
}
