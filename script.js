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

const CHIP_VALUE = 20;
const REPLENISHMENT_AMOUNT = 200;
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
    rate = 1,
    gameBet = CHIP_VALUE * rate,
    record = player.chips + " : Новая игра",
    audio = new Audio('04036.mp3'),
    audio2 = new Audio('01069.mp3'),

    message = "Хотите сыграть раунд?",
    messageEl = document.getElementById("message-el"),
    logEl = document.getElementById("log-el"),
    logBodyEl = document.getElementById("log-body-el");

messageEl.textContent = message;
chipsEl.textContent = player.name + " : $" + player.chips;
shuffle(cards);
flipCards();
console.log(record);
addLog(record);

function addLog(str) {
    const l = document.createElement('hr');
    logBodyEl.prepend(l);
    let p = document.createElement('p');
    p.classList.add('log__record');
    p.textContent = str;
    logBodyEl.prepend(p);
}

function flipCards() {
    addCardImage(croupierCardsEl, './img/cards/00.png');
    addCardImage(croupierCardsEl, './img/cards/00.png');
    addCardImage(playerCardsEl, './img/cards/00.png');
    addCardImage(playerCardsEl, './img/cards/00.png');
}

function setStartUpSettings() {
    let resetSet = true;
    if (isAlive) {
        if (playerCards.length === 2) {
            audio.play();
            resetSet = confirm("Хотите начать новый раунд?" + "\n" +
                "Возвращается только половина Вашей ставки, то есть  $" + gameBet / 2 + "." + "\n" +
                "Согласны?");
            if (!resetSet) {
                return false;
            }
            player.chips = player.chips - (gameBet / 2);
            message = "Возврат половины ставки - " + gameBet / 2;
            record = player.chips + " : " + message;
            console.log(record);
            addLog(record);
            setSettingDefault();
            chipsEl.textContent = player.name + " : $" + player.chips;
        }
        return false;
    }
    if (player.chips < gameBet) {
        audio.play();
        message = "Недостаточно фишек!"
        messageEl.textContent = message;
        isAlive = false;
        return false;
    }
    isAlive = true;
    hasBlackjack = false;
    disabledChecked();
    setStyleDefaultGame();
    playerSumma = 0;
    croupierSumma = 0;
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
    if (playerSumma > 21) {
        message = "Проиргыш!"
        isAlive = false;
        highlightPlayerResult(false);
        pay();
    } else if (playerSumma <= 20) {
        message = "Хотите взять карту?"
    } else if (playerSumma === 21) {
        if (playerCards.length === 2) {
            hasBlackjack = true;
        }
        pass();
    } else {
        message = "Проиргыш!"
        isAlive = false;
        highlightPlayerResult(false);
        record = player.chips + " : " + message + " Счет " + playerSumma + ":" + croupierSumma;
        console.log(record);
        addLog(record);
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
    disabledChecked();
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
    boxImage.className = 'image-card';
    el.appendChild(boxImage);
    switch (el.children.length) {
        case 3:
            for (let node of el.childNodes) {
                node.setAttribute('style', 'margin: 0 -22px');
            }
            break;
        case 4:
            for (let node of el.childNodes) {
                // node.style.marginRight = '-55px';
                node.setAttribute('style', 'margin: 0 -28px');
            }
            break;
        case 5:
            for (let node of el.childNodes) {
                // node.style.marginRight = '-70px';
                node.setAttribute('style', 'margin: -32px');
            }
            break;
        case 6:
            for (let node of el.childNodes) {
                // node.style.marginRight = '-75px';
                node.setAttribute('style', 'margin: -35px');
            }
            break;
        case 7:
            for (let node of el.childNodes) {
                // node.style.marginRight = '-80px';
                node.setAttribute('style', 'margin: -37px');
            }
            break;
        case 8:
            for (let node of el.childNodes) {
                // node.style.marginRight = '-85px';
                node.setAttribute('style', 'margin: -39px');
            }
            break;
        default:
    }
}

function createUrlToImage(card) {
    return "./img/cards/" + card.suit.toLowerCase() +
        "/" + card.name + card.suit + ".png";

}


function TakeCardFromDeck() {
    if (countCards === cards.length - 5) {
        shuffle(cards);
        countCards = 0;
        record = "Смена колоды карт!";
        addLog(record);
        console.log(record);
    }
    return cards[countCards++];
}

function pass() {
    if (!isAlive) {
        return;
    }
    croupierCardsEl.removeChild(croupierCardsEl.lastChild);
    while (croupierSumma < playerSumma) {
        if ((hasBlackjack && croupierSumma < 10 && croupierCards.length === 1) ||
            (hasBlackjack && croupierCards.length === 2)) {
            break;
        }
        addCard(croupierCardsEl, croupierCards);
        croupierSumma = croupierCards.reduce((sum, current) => sum + current.value, 0);
    }
    croupierEl.textContent = "Карты крупье: ";
    for (let card of croupierCards) {
        croupierEl.textContent += " - " + card.value;
    }
    croupierSumEl.textContent = croupierSumma;
    if (croupierSumma > playerSumma && croupierSumma < 22 || playerSumma >= 22) {
        message = "Проиргыш!";
        messageEl.textContent = message;
        highlightPlayerResult(false);
        record = player.chips + " : " + message + " Счет - " + playerSumma + ":" + croupierSumma;
    } else if (playerSumma === croupierSumma && croupierSumma < 21) {
        message = "Ничья!";
        messageEl.textContent = message;
        highlightPlayerResult();
    } else if (playerSumma === 21) {
        if ((playerSumma === croupierSumma && hasBlackjack && croupierCards.length === 2) ||
            (playerSumma === croupierSumma && !hasBlackjack && croupierCards.length > 2)) {
            message = "Ничья!";
            highlightPlayerResult();
        } else if (playerSumma === croupierSumma && !hasBlackjack && croupierCards.length == 2) {
            message = "Проиргыш!";
            highlightPlayerResult(false);
        } else if ((playerSumma != croupierSumma && hasBlackjack) ||
            (playerSumma === croupierSumma && hasBlackjack && croupierCards.length > 2)) {
            message = "BlackJack!";
            highlightPlayerResult(true);
        } else if ((playerSumma != croupierSumma && !hasBlackjack) ||
            (playerSumma === croupierSumma && hasBlackjack && croupierCards.length > 2)) {
            message = "Двадцать одно!"
            highlightPlayerResult(true);
        }
    } else {
        message = "Выигрыш!";
        messageEl.textContent = message;
        highlightPlayerResult(true);
    }
    isAlive = false;
    disabledChecked();
    pay();
}

function pay() {
    if (player.chips < 0) {
        message = "Недостаточно фишек!"
        messageEl.textContent = message;
        isAlive = false;
        return;
    }
    if (croupierSumma === 0) {
        // player.chips = player.chips - gameBet;
        record = "Pаунд. Cтавка - " + gameBet;
    } else {
        if (croupierSumma > playerSumma && croupierSumma < 22 || playerSumma >= 22) {
            player.chips = player.chips - gameBet;
        } else if (playerSumma === croupierSumma && croupierSumma < 21) {
            // player.chips = player.chips + gameBet;
        } else if (playerSumma === 21) {
            if ((playerSumma === croupierSumma && hasBlackjack && croupierCards.length === 2) ||
                (playerSumma === croupierSumma && !hasBlackjack && croupierCards.length > 2)) {
                // player.chips = player.chips + gameBet;
            } else if (playerSumma === croupierSumma && !hasBlackjack && croupierCards.length == 2) {
                player.chips = player.chips - gameBet;
            } else if ((playerSumma != croupierSumma && hasBlackjack) ||
                (playerSumma === croupierSumma && hasBlackjack && croupierCards.length > 2)) {
                player.chips = player.chips + (gameBet + (gameBet * 0.5));
            } else if ((playerSumma != croupierSumma && !hasBlackjack) ||
                (playerSumma === croupierSumma && hasBlackjack && croupierCards.length > 2)) {
                player.chips = player.chips + gameBet;
            }
        } else {
            player.chips = player.chips + gameBet;
        }
        record = player.chips + " : " + message + " Счет - " + playerSumma + ":" + croupierSumma;
    }
    console.log(record);
    addLog(record);
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

function rebootGame() {
    if (isAlive) return;
    if (player.chips > 0) {
        audio2.play();
        const result = confirm("Стоимость Ваших фишек составляет $" + player.chips + "\n" +
            "Хотите пополнить еще на $" + REPLENISHMENT_AMOUNT + "?");
        if (!result) {
            return;
        }
    }
    setSettingDefault();
    player.chips += REPLENISHMENT_AMOUNT;
    record = player.chips + " : Пополнение фишек. Сумма - " + REPLENISHMENT_AMOUNT;
    console.log(record);
    addLog(record);
    chipsEl.textContent = player.name + " : $" + player.chips;
}

function setSettingDefault() {
    message = "Хотите сыграть раунд?"
    messageEl.textContent = message;
    croupierSumma = 0;
    playerSumma = 0;
    croupierEl.textContent = "Карты крупье:";
    croupierSumEl.textContent = croupierSumma;
    playerEl.textContent = "Ваши карты:";
    playerSumEl.textContent = playerSumma;
    hasBlackjack = false;
    isAlive = false;
    while (playerCardsEl.firstChild) {
        playerCardsEl.removeChild(playerCardsEl.firstChild);
    }
    while (croupierCardsEl.firstChild) {
        croupierCardsEl.removeChild(croupierCardsEl.firstChild);
    }
    setStyleDefaultGame();
    flipCards();
    disabledChecked();
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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setRate(src) {
    rate = src.value;
    gameBet = CHIP_VALUE * rate;
}

function openLog() {
    logEl.setAttribute('style', 'margin-left: 0px');
}

function closeLog() {
    logEl.setAttribute('style', 'margin-left: -300px');
    console.log(logEl);
}

function deleteLog() {
    while (logBodyEl.firstChild) {
        logBodyEl.removeChild(logBodyEl.firstChild);
    }
}

function disabledChecked() {
    const radioBtn = document.querySelectorAll("div.radio-btn-panel > input");
    if (isAlive) {
        for (ratio of radioBtn) {
            ratio.disabled = 'disabled';
            let btn = document.getElementById("btn-start -el");
            btn.textContent = "СДАТЬСЯ";
        }
    } else {
        for (ratio of radioBtn) {
            ratio.disabled = '';
            let btn = document.getElementById("btn-start -el");
            btn.textContent = "ИГРАТЬ";
        }
    }
}
