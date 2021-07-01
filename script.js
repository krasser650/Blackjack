let cards = [{
        name: "2",
        suit: "D",
        value: 2
    },
    {
        name: "2",
        suit: "S",
        value: 2
    },
    {
        name: "2",
        suit: "C",
        value: 2
    },
    {
        name: "2",
        suit: "H",
        value: 2
    },
    {
        name: "3",
        suit: "D",
        value: 3
    },
    {
        name: "3",
        suit: "S",
        value: 3
    },
    {
        name: "3",
        suit: "C",
        value: 3
    },
    {
        name: "3",
        suit: "H",
        value: 3
    },
    {
        name: "4",
        suit: "D",
        value: 4
    },
    {
        name: "4",
        suit: "S",
        value: 4
    },
    {
        name: "4",
        suit: "C",
        value: 4
    },
    {
        name: "4",
        suit: "H",
        value: 4
    },
    {
        name: "5",
        suit: "D",
        value: 5
    },
    {
        name: "5",
        suit: "S",
        value: 5
    },
    {
        name: "5",
        suit: "C",
        value: 5
    },
    {
        name: "5",
        suit: "H",
        value: 5
    },
    {
        name: "6",
        suit: "D",
        value: 6
    },
    {
        name: "6",
        suit: "S",
        value: 6
    },
    {
        name: "6",
        suit: "C",
        value: 6
    },
    {
        name: "6",
        suit: "H",
        value: 6
    },
    {
        name: "7",
        suit: "D",
        value: 7
    },
    {
        name: "7",
        suit: "S",
        value: 7
    },
    {
        name: "7",
        suit: "C",
        value: 7
    },
    {
        name: "7",
        suit: "H",
        value: 7
    },
    {
        name: "8",
        suit: "D",
        value: 8
    },
    {
        name: "8",
        suit: "S",
        value: 8
    },
    {
        name: "8",
        suit: "C",
        value: 8
    },
    {
        name: "8",
        suit: "H",
        value: 8
    },
    {
        name: "9",
        suit: "D",
        value: 9
    },
    {
        name: "9",
        suit: "S",
        value: 9
    },
    {
        name: "9",
        suit: "C",
        value: 9
    },
    {
        name: "9",
        suit: "H",
        value: 9
    },
    {
        name: "10",
        suit: "D",
        value: 10
    },
    {
        name: "10",
        suit: "S",
        value: 10
    },
    {
        name: "10",
        suit: "C",
        value: 10
    },
    {
        name: "10",
        suit: "H",
        value: 10
    },
    {
        name: "J",
        suit: "D",
        value: 10
    },
    {
        name: "J",
        suit: "S",
        value: 10
    },
    {
        name: "J",
        suit: "C",
        value: 10
    },
    {
        name: "J",
        suit: "H",
        value: 10
    },
    {
        name: "Q",
        suit: "D",
        value: 10
    },
    {
        name: "Q",
        suit: "S",
        value: 10
    },
    {
        name: "Q",
        suit: "C",
        value: 10
    },
    {
        name: "Q",
        suit: "H",
        value: 10
    },
    {
        name: "K",
        suit: "D",
        value: 10
    },
    {
        name: "K",
        suit: "S",
        value: 10
    },
    {
        name: "K",
        suit: "C",
        value: 10
    },
    {
        name: "K",
        suit: "H",
        value: 10
    },
    {
        name: "A",
        suit: "D",
        value: 11
    },
    {
        name: "A",
        suit: "S",
        value: 11
    },
    {
        name: "A",
        suit: "C",
        value: 11
    },
    {
        name: "A",
        suit: "H",
        value: 11
    }
];

const CHIP_VALUE = 40;
let player = {
    name: "ФИШКИ",
    chips: 200
}

var croupierCards = [],
    croupierSumEl = document.getElementById("croupier-sum-el"),
    croupierCardsEl = document.getElementById("croupier-cards-el"),
    croupierEl = document.getElementById("croupier-el"),
    croupierSumma = 0,

    playerCards = [],
    playerSumEl = document.getElementById("player-sum-el"),
    playerCardsEl = document.getElementById("player-cards-el"),
    playerEl = document.getElementById("player-el"),
    playerSumma = 0,

    chipsEl = document.getElementById("chips-el"),
    hasBlackjack = false,
    isAlive = false,
    countCards = 0,
    audio = new Audio('04036.mp3'),
    audio2 = new Audio('01069.mp3'),

    message = "Хотите сыграть раунд?",
    messageEl = document.getElementById("message-el");

messageEl.textContent = message;
chipsEl.textContent = player.name + " : $" + player.chips;
shuffle(cards);
flipCards();


function flipCards() {
    addCardImage(croupierCardsEl, './img/cards/00.png');
    addCardImage(croupierCardsEl, './img/cards/00.png');
    addCardImage(playerCardsEl, './img/cards/00.png');
    addCardImage(playerCardsEl, './img/cards/00.png');
}

function setStartUpSettings() {
    if (player.chips < CHIP_VALUE) {
        audio.play();
        message = "Недостаточно фишек!"
        messageEl.textContent = message;
        isAlive = false;
        return false;
    }
    let resetSet = true;
    if (isAlive) {
        audio.play();
        resetSet = confirm("Хотите начать новый раунд?" + "\n" +
            "Сделанная вами ставка в размере $" + CHIP_VALUE + " не возвращается!");
        if (!resetSet) {
            return false;
        }
    }
    playerSumma = 0;
    croupierSumma = 0;
    setStyleDefaultGame();
    isAlive = true;
    hasBlackjack = false;
    playerCards = [];
    croupierCards = [];
    while (playerCardsEl.firstChild) {
        playerCardsEl.removeChild(playerCardsEl.firstChild);
    }
    while (croupierCardsEl.firstChild) {
        croupierCardsEl.removeChild(croupierCardsEl.firstChild);
    }
    pay();
    return true;
}

function startGame() {
    if (setStartUpSettings()) {
        addCard(playerCardsEl, playerCards);
        addCard(playerCardsEl, playerCards);
        addCard(croupierCardsEl, croupierCards);
        addCardImage(croupierCardsEl, './img/cards/00.png');
        playerSumma = playerCards.reduce((sum, current) => sum + current.value, 0);
        croupierSumma = croupierCards.reduce((sum, current) => sum + current.value, 0);
        renderGame();
    }
}

function renderGame() {
    if (croupierSumma > 21) {
        message = "Вы выиграли!"
        isAlive = false;
        pay();
        highlightPlayerResult(true);
    } else if (playerSumma <= 20) {
        message = "Хотите взять карту?"
    } else if (playerSumma === 21) {
        message = "У Вас  BlackJack!"
        hasBlackjack = true;
        isAlive = false;
        pay();
        highlightPlayerResult(true);
    } else {
        message = "Вы проиграли!"
        isAlive = false;
        highlightPlayerResult(false);
        console.log(player.chips + " : " + message);
    }
    messageEl.textContent = message;
    playerEl.textContent = "Ваши карты: ";
    for (let card of playerCards) {
        playerEl.textContent += " - " + card.value;
    }
    croupierEl.textContent = "Карты крупье: ";
    for (let card of croupierCards) {
        croupierEl.textContent += " - " + card.value;
    }
    croupierSumEl.textContent = croupierSumma;
    playerSumEl.textContent = playerSumma;
}

function pass() {
    if (!isAlive) {
        return;
    }
    croupierCardsEl.removeChild(croupierCardsEl.lastChild);
    while (croupierSumma < playerSumma) {
        addCard(croupierCardsEl, croupierCards);
        croupierSumma = croupierCards.reduce((sum, current) => sum + current.value, 0);
    }
    croupierEl.textContent = "Карты крупье: ";
    for (let card of croupierCards) {
        croupierEl.textContent += " - " + card.value;
    }
    croupierSumEl.textContent = croupierSumma;
    if (croupierSumma > playerSumma && croupierSumma < 22) {
        message = "Вы проиграли!"
        messageEl.textContent = message;
        highlightPlayerResult(false);
        console.log(player.chips + " : " + message);
    } else if (croupierSumma === playerSumma) {
        message = "Ничья!"
        messageEl.textContent = message;
        highlightPlayerResult();
    } else {
        message = "Вы выиграли!"
        messageEl.textContent = message;
        highlightPlayerResult(true);
    }
    isAlive = false;
    pay();
}

function newCard() {
    if (!isAlive) {
        return;
    }
    addCard(playerCardsEl, playerCards);
    playerSumma = playerCards.reduce((sum, current) => sum + current.value, 0);
    renderGame();
}

function addCard(el, arr) {
    arr.push(TakeCardFromDeck());
    const card = arr[arr.length - 1];
    const imgUrl = createUrlToImage(card);
    addCardImage(el, imgUrl);
}

function addCardImage(el, url) {
    let boxImage = new Image();
    boxImage.src = url;
    switch (el.children.length) {
        case 3:
            for (let node of el.childNodes) {
                node.style.marginRight = '-35px';
            }
            break;
        case 4:
            for (let node of el.childNodes) {
                node.style.marginRight = '-51px';
            }
            break;
        case 5:
            for (let node of el.childNodes) {
                node.style.marginRight = '-62px';
            }
            break;
        case 6:
            for (let node of el.childNodes) {
                node.style.marginRight = '-68px';
            }
            break;
        case 7:
            for (let node of el.childNodes) {
                node.style.marginRight = '-73px';
            }
            break;
        default:
    }
    el.appendChild(boxImage);
}

function createUrlToImage(card) {
    return "./img/cards/" + card.suit.toLowerCase() +
        "/" + card.name + card.suit + ".png";

}


function TakeCardFromDeck() {
    if (cards.length === countCards) {
        shuffle(cards);
        countCards = 0;
    }
    return cards[countCards++];
}

function pay() {
    if (player.chips < 0) {
        message = "Недостаточно фишек!"
        messageEl.textContent = message;
        isAlive = false;
        return;
    }
    if (croupierSumma === 0) {
        player.chips = player.chips - CHIP_VALUE;
        console.log("Начал раунд, ставка - $" + CHIP_VALUE);
    } else if (croupierSumma > 21 || (croupierSumma < playerSumma && playerSumma < 21)) {
        player.chips = player.chips + (CHIP_VALUE * 2);
        console.log(player.chips + " : " + message);
    } else if (croupierSumma === playerSumma) {
        player.chips = player.chips + CHIP_VALUE;
        console.log(player.chips + " : " + message);
    } else if (playerSumma === 21) {
        player.chips = player.chips + (CHIP_VALUE * 3);
        console.log(player.chips + " : " + message);
    }
    chipsEl.textContent = player.name + " : $" + player.chips;
}

function highlightPlayerResult(result) {
    if (result === undefined) {
        playerSumEl.style.background = '#d45100';
        croupierSumEl.style.background = '#d45100';
        messageEl.style.background = '#d45100';
    } else if (result) {
        croupierSumEl.style.background = '#b50e0e';
        messageEl.style.background = 'green';
        playerSumEl.style.background = 'green';
    } else {
        playerSumEl.style.background = '#b50e0e';
        messageEl.style.background = '#b50e0e';
        croupierSumEl.style.background = 'green';
    }
}

function setStyleDefaultGame() {
    if (playerSumEl.style.background !== 'black') {
        playerSumEl.style.background = 'black'
    }
    if (croupierSumEl.style.background !== 'black') {
        croupierSumEl.style.background = 'black'
    }
    messageEl.style.background = 'transparent';
}

function rebootGame() {
    let result = true;
    if (player.chips > 0) {
        audio2.play();
        result = confirm("У Вас еще есть фишки, cумма: $" + player.chips + "\n" +
            "Xотите начать заново?");
    }
    if (!result) {
        return;
    }
    message = "Хотите сыграть раунд?"
    messageEl.textContent = message;
    croupierSumma = 0;
    playerSumma = 0;
    setStyleDefaultGame();
    croupierEl.textContent = "Карты крупье:";
    croupierSumEl.textContent = croupierSumma;
    playerEl.textContent = "Ваши карты:";
    playerSumEl.textContent = playerSumma;
    hasBlackjack = false;
    isAlive = false;
    player.chips = 200;
    chipsEl.textContent = player.name + " : $" + player.chips;
    while (playerCardsEl.firstChild) {
        playerCardsEl.removeChild(playerCardsEl.firstChild);
    }
    while (croupierCardsEl.firstChild) {
        croupierCardsEl.removeChild(croupierCardsEl.firstChild);
    }
    flipCards();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
