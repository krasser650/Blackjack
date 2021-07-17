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
    croupier = document.getElementById('croupier'),
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
    audio = new Audio('./sound/04036.mp3'),
    audio2 = new Audio('./sound/01069.mp3'),
    audio3 = new Audio('./sound/011.mp3'),
    audio4 = new Audio('./sound/012.mp3'),
    audio5 = new Audio('./sound/013.mp3'),

    message = "Хотите сыграть раунд?",
    messageEl = document.getElementById("message-el"),
    logEl = document.getElementById("log-el"),
    logBodyEl = document.getElementById("log-body-el"),

    btnPlay = document.getElementById("btn-start-el"),
    btnNew = document.getElementById("btn-new-el"),
    btnPass = document.getElementById("btn-cancel-el"),
    bodyEl = document.getElementById("body-el");

btnPlay.addEventListener("click", startGame);
btnNew.addEventListener("click", newCard);
btnPass.addEventListener("click", pass);
chipsEl.addEventListener("click", rebootGame);
bodyEl.addEventListener("keydown", setFocus);

bodyEl.setAttribute('style', 'background-image: url(./img/bg.jpg)');
messageEl.textContent = message;
chipsEl.textContent = player.name + " : $" + player.chips;
shuffle(cards);
flipCards();
console.log(record);
addLog(record);

function addLog(str) {
    const line = document.createElement('hr');
    logBodyEl.prepend(line);
    let log = document.createElement('p');
    log.classList.add('log__record');
    log.textContent = str;
    logBodyEl.prepend(log);
}

function flipCards() {
    addCardImage(croupierCardsEl, './img/cards/00.png');
    addCardImage(croupierCardsEl, './img/cards/00.png');
    addCardImage(playerCardsEl, './img/cards/00.png');
    addCardImage(playerCardsEl, './img/cards/00.png');
}

function setStartUpSettings() {
    if (isAlive) {
        if (playerCards.length === 2) {
            createPlayModal();
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
    setInitialGameDataToDefault();
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
    audio4.play();
    if (playerSumma > 21) {
        pass();
    } else if (playerSumma <= 20) {
        message = "Хотите взять карту?"
    } else if (playerSumma === 21) {
        if (playerCards.length === 2) {
            hasBlackjack = true;
        }
        btnPlay.disabled = true;
        setTimeout(() => pass(), 500);
    } else {
        isAlive = false;
        pass();
    }
    messageEl.textContent = message;
    updatePlayerCardInfo()
    updateCroupierCardInfo();
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
    addCardImage(el, imgUrl, arr);
}

function addCardImage(el, url, arr) {
    let elem = `<img src="${url}" class="image-card" alt=""></img>`
    el.innerHTML += elem;
    if (!arr) return;
    let elm = "";
    switch (arr.length) {
        case 4:
            for (const item of arr) {
                const imgUrl = createUrlToImage(item);
                elm += `<img src="${imgUrl}" class="image-card" alt=""
                            style="margin: 0 -16px">
                       </img>`
            }
            el.innerHTML = elm;
            break;
        case 5:
            for (const item of arr) {
                const imgUrl = createUrlToImage(item);
                elm += `<img src="${imgUrl}" class="image-card" alt=""
                            style="margin: 0 -24px">
                       </img>`
            }
            el.innerHTML = elm;
            break;
        case 6:
            for (const item of arr) {
                const imgUrl = createUrlToImage(item);
                elm += `<img src="${imgUrl}" class="image-card" alt=""
                            style="margin: 0 -28px">
                       </img>`
            }
            el.innerHTML = elm;
            break;
        case 7:
            for (const item of arr) {
                const imgUrl = createUrlToImage(item);
                elm += `<img src="${imgUrl}" class="image-card" alt=""
                            style="margin: 0 -31px">
                       </img>`
            }
            el.innerHTML = elm;
            break;
        case 8:
            for (const item of arr) {
                const imgUrl = createUrlToImage(item);
                elm += `<img src="${imgUrl}" class="image-card" alt=""
                                style="margin: 0 -34px">
                           </img>`
            }
            el.innerHTML = elm;
            break;
        case 9:
            for (const item of arr) {
                const imgUrl = createUrlToImage(item);
                elm += `<img src="${imgUrl}" class="image-card" alt=""
                                style="margin: 0 -38px">
                           </img>`
            }
            el.innerHTML = elm;
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
        record = "Смена колоды карт";
        addLog(record);
        console.log(record);
    }
    return cards[countCards++];
}

function pass() {
    if (!isAlive) {
        return;
    }
    if (playerSumma <= 21 && croupierSumma < 21) {
        addCroupierCards();
    }
    updateCroupierCardInfo();
    if (croupierSumma > playerSumma && croupierSumma < 22 || playerSumma >= 22) {
        message = "Проиргыш";
        highlightPlayerResult(false);
    } else if (playerSumma === croupierSumma && croupierSumma < 21) {
        message = "Ничья";
        highlightPlayerResult();
    } else if (playerSumma === 21) {
        calculateResultIfPlayerSummaIsTwentyOne();
    } else {
        message = "Выигрыш";
        highlightPlayerResult(true);
    }
    isAlive = false;
    messageEl.textContent = message;
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
        record = "Pаунд. Cтавка - " + gameBet;
    } else {
        if (croupierSumma > playerSumma && croupierSumma < 22 || playerSumma >= 22) {
            player.chips = player.chips - gameBet;
        } else if (playerSumma === croupierSumma && croupierSumma < 21) {
            //nothing
        } else if (playerSumma === 21) {
            calculatePayIfPlayerSummaIsTwentyOne();
        } else {
            player.chips = player.chips + gameBet;
        }
        record = player.chips + " : " + message + " Счет - " + playerSumma + ":" + croupierSumma;
    }
    chipsEl.textContent = player.name + " : $" + player.chips;
    console.log(record);
    addLog(record);
}

function calculatePayIfPlayerSummaIsTwentyOne() {
    if (playerSumma === croupierSumma && !hasBlackjack && croupierCards.length == 2) {
        player.chips = player.chips - gameBet;
    } else if ((playerSumma != croupierSumma && hasBlackjack) ||
        (playerSumma === croupierSumma && hasBlackjack && croupierCards.length > 2)) {
        player.chips = player.chips + (gameBet + (gameBet * 0.5));
    } else if ((playerSumma != croupierSumma && !hasBlackjack) ||
        (playerSumma === croupierSumma && hasBlackjack && croupierCards.length > 2)) {
        player.chips = player.chips + gameBet;
    }
}

function calculateResultIfPlayerSummaIsTwentyOne() {
    if ((playerSumma === croupierSumma && hasBlackjack && croupierCards.length === 2) ||
        (playerSumma === croupierSumma && !hasBlackjack && croupierCards.length > 2)) {
        message = "Ничья";
        highlightPlayerResult();
    } else if (playerSumma === croupierSumma && !hasBlackjack && croupierCards.length == 2) {
        message = "Проиргыш";
        highlightPlayerResult(false);
    } else if ((playerSumma != croupierSumma && hasBlackjack) ||
        (playerSumma === croupierSumma && hasBlackjack && croupierCards.length > 2)) {
        message = "BlackJack!";
        highlightPlayerResult(true);
        setTimeout(() => playVoice(), 500);
    } else if ((playerSumma != croupierSumma && !hasBlackjack) ||
        (playerSumma === croupierSumma && hasBlackjack && croupierCards.length > 2)) {
        message = "Двадцать одно!"
        highlightPlayerResult(true);
    }
    setTimeout(() => btnPlay.disabled = false, 1500);
}

function addCroupierCards() {
    if (hasBlackjack && croupierSumma < 10 || playerSumma < croupierSumma) {} else {
        croupierCardsEl.removeChild(croupierCardsEl.lastChild);
    }
    while ((playerSumma - croupierSumma > 0 && croupierSumma < 20) ||
        (playerSumma === croupierSumma && croupierSumma < 17)) {
        if ((hasBlackjack && croupierSumma < 10 && croupierCards.length === 1) ||
            (hasBlackjack && croupierCards.length === 2)) {
            break;
        }
        addCard(croupierCardsEl, croupierCards);
        croupierSumma = croupierCards.reduce((sum, current) => sum + current.value, 0);
        audio3.play();
    }
}

function updateCroupierCardInfo() {
    croupierEl.textContent = "Карты крупье: ";
    for (let card of croupierCards) {
        croupierEl.textContent += " - " + card.value;
    }
    croupierSumEl.textContent = croupierSumma;
}

function updatePlayerCardInfo() {
    playerEl.textContent = "Ваши карты: ";
    for (let card of playerCards) {
        playerEl.textContent += " - " + card.value;
    }
    playerSumEl.textContent = playerSumma;
}

function highlightPlayerResult(result) {
    if (result === undefined) {
        playerSumEl.style.background = '#ba4700';
        croupierSumEl.style.background = '#ba4700';
        croupier.style.background = '#ba4700';
        messageEl.style.background = '#ba4700';
    } else if (result) {
        croupierSumEl.style.background = '#990000';
        croupier.style.background = '#990000';
        playerSumEl.style.background = '#004F04';
        messageEl.style.background = '#004F04';
    } else {
        playerSumEl.style.background = '#990000';
        croupierSumEl.style.background = '#004F04';
        croupier.style.background = '#004F04';
        messageEl.style.background = '#990000';
    }
}

function rebootGame() {
    if (isAlive) return;
    if (player.chips > 0) {
        createRebootModal();
    }
}

function setSettingDefault() {
    audio5.play();
    message = "Хотите сыграть раунд?"
    messageEl.textContent = message;
    isAlive = false;
    setInitialGameDataToDefault();
    updateCroupierCardInfo();
    updatePlayerCardInfo();
    flipCards();
}

function setInitialGameDataToDefault() {
    hasBlackjack = false;
    croupierSumma = 0;
    playerSumma = 0;
    playerCards = [];
    croupierCards = [];
    while (playerCardsEl.firstChild) {
        playerCardsEl.removeChild(playerCardsEl.firstChild);
    }
    while (croupierCardsEl.firstChild) {
        croupierCardsEl.removeChild(croupierCardsEl.firstChild);
    }
    disabledChecked();
    setStyleDefaultGame();
}

function setStyleDefaultGame() {
    if (playerSumEl.style.background !== 'black') {
        playerSumEl.style.background = 'black'
    }
    if (croupierSumEl.style.background !== 'black') {
        croupierSumEl.style.background = 'black'
    }
    messageEl.style.background = 'transparent';
    croupier.style.background = '#002a04';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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
}

function deleteLog() {
    while (logBodyEl.firstChild) {
        logBodyEl.removeChild(logBodyEl.firstChild);
    }
}

function disabledChecked() {
    const radioBtn = document.querySelectorAll("div.radio-btn-panel > input");
    if (isAlive) {
        for (let ratio of radioBtn) {
            ratio.disabled = 'disabled';
        }
        btnPlay.textContent = "СДАТЬСЯ";
    } else {
        for (let ratio of radioBtn) {
            ratio.disabled = '';
        }
        btnPlay.textContent = "ИГРАТЬ";
    }
}

function setFocus(event) {
    switch (event.keyCode) {
        case 87:
            btnPlay.focus();
            break;
        case 83:
            btnNew.focus();
            break;
        case 65:
            btnPlay.focus();
            break;
        case 68:
            btnPass.focus();
            break;
    }
}

function playVoice() {
    const sounds = ["./sound/voice1.mp3", "./sound/voice2.mp3", "./sound/voice3.mp3"];
    const rndVoice = Math.floor(Math.random() * sounds.length);
    const voice = new Audio(sounds[rndVoice]);
    voice.play();
}

function createPlayModal() {
    audio.play();
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    let btnOk = document.getElementById("btn-ok");
    let modalMessage = document.getElementById("modal-message-el");
    modalMessage.textContent = "Хотите начать новый раунд? " +
        "Возвращается только половина ставки, то есть  $" + gameBet / 2 + ". " +
        "Согласны?";
    span.onclick = () => {
        modal.style.display = "none";
    }
    btnOk.onclick = () => {
        player.chips = player.chips - (gameBet / 2);
        message = "Возврат половины ставки - " + gameBet / 2;
        record = player.chips + " : " + message;
        chipsEl.textContent = player.name + " : $" + player.chips;
        modal.style.display = "none";
        setSettingDefault();
        console.log(record);
        addLog(record);
    }
    modal.style.display = "block";
}

function createRebootModal() {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const btnOk = document.getElementById("btn-ok");
    const modalMessage = document.getElementById("modal-message-el");
    modalMessage.textContent = "Стоимость Ваших фишек составляет $" + player.chips + ". " +
        "Хотите пополнить еще на $" + REPLENISHMENT_AMOUNT + "?";
    span.onclick = () => {
        modal.style.display = "none";
    }
    btnOk.onclick = () => {
        setSettingDefault();
        player.chips += REPLENISHMENT_AMOUNT;
        chipsEl.textContent = player.name + " : $" + player.chips;
        record = player.chips + " : Пополнение фишек. Сумма - " + REPLENISHMENT_AMOUNT;
        modal.style.display = "none";
        console.log(record);
        addLog(record);
    }
    modal.style.display = "block";
    audio2.play();
}
