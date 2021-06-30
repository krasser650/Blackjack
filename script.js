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

const CHIP_VALUE = 25;
let player = {
    name: "ФИШКИ",
    chips: 200
}


var playerCards = [],
    playerSumEl = document.querySelector("#player-sum-el"),
    playerEl = document.getElementById("player-el"),
    playerSumma = 0,

    croupierCards = [],
    croupierEl = document.getElementById("croupier-el"),
    croupierSumEl = document.getElementById("croupier-sum-el"),
    croupierSumma = 0,

    chipsEl = document.getElementById("chips-el"),
    hasBlackjack = false,
    isAlive = false,
    countCards = 0,
    audio = new Audio('04036.mp3');

message = "Хотите сыграть раунд?",
    messageEl = document.getElementById("message-el");

chipsEl.textContent = player.name + " : $" + player.chips;
messageEl.textContent = message;
shuffle(cards);
console.log(cards);

function startGame() {
    if (player.chips < CHIP_VALUE) {
        audio.play();
        message = "Не достаточно фишек!"
        messageEl.textContent = message;
        isAlive = false;
        return;
    }
    if (isAlive) {
        audio.play();
        const result = confirm("Хотите начать новый раунд?" + "\n" +
            "Сделанная вами ставка в размере $" + CHIP_VALUE + " не возвращается!");
        if (result) {
            isAlive = false;
            startGame();
        }
        return;
    }
    playerSumma = 0;
    croupierSumma = 0;
    pay();
    isAlive = true;
    hasBlackjack = false;
    playerCards = [];
    croupierCards = [];
    playerCards.push(getRandomCard_2());
    playerCards.push(getRandomCard_2());
    croupierCards.push(getRandomCard_2());
    playerSumma = playerCards.reduce((sum, current) => sum + current.value, 0);
    croupierSumma = croupierCards.reduce((sum, current) => sum + current.value, 0);
    renderGame();
}

function renderGame() {
    if (croupierSumma > 21) {
        message = "Вы выиграли!"
        isAlive = false;
        pay();
    } else if (playerSumma <= 20) {
        message = "Хотите взять карту?"
    } else if (playerSumma === 21) {
        message = "У Вас  BlackJack!"
        hasBlackjack = true;
        isAlive = false;
        pay();
    } else {
        message = "Вы проиграли!"
        isAlive = false;
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

function newCard() {
    if (!isAlive) return;
    let card = getRandomCard_2();
    playerCards.push(card);
    playerSumma = playerCards.reduce((sum, current) => sum + current.value, 0);
    renderGame();
}

function pass() {
    if (!isAlive) {
        return;
    }
    while (croupierSumma < playerSumma) {
        croupierCards.push(getRandomCard_2());
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
        console.log(player.chips + " : " + message);
    } else if (croupierSumma === playerSumma) {
        message = "Ничья!"
        messageEl.textContent = message;
    } else {
        message = "Вы выиграли!"
        messageEl.textContent = message;
    }
    isAlive = false;
    pay();
}

function getRandomCard() {
    let randomCard = Math.floor(Math.random() * 13) + 1;
    if (randomCard === 1) {
        return 11;
    }
    return randomCard > 10 ? 10 : randomCard;
}

function getRandomCard_2() {
    if (cards.length === countCards) {
        shuffle(cards);
        countCards = 0;
    }
    console.log('count = ' + countCards);
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

function resetGame() {
    if (player.chips > 0) {
        audio.play();
        alert("У Вас еще есть фишки. Сумма: $" + player.chips);
        return;
    }
    message = "Хотите сыграть раунд?"
    messageEl.textContent = message;
    croupierSumma = 0;
    croupierEl.textContent = "Карты крупье:";
    croupierSumEl.textContent = croupierSumma;
    playerSumma = 0;
    playerEl.textContent = "Ваши карты:";
    playerSumEl.textContent = playerSumma;
    hasBlackjack = false;
    isAlive = false;
    player.chips = 200;
    chipsEl.textContent = player.name + " : $" + player.chips;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
