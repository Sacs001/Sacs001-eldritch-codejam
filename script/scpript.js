import cards from '../data/mythicCards/index.js'
import { ancientsMonster } from '../data/ancients.js'

let infoForShuffleTheDeck = {
    "god": '',
    'difficulty': ''
};


let scoupCard = [];
let greenCard = '';
let blueCard = '';
let brownCard = '';
let massiveWithCardMediumLevelBrown = [];
let massiveWithCardMediumLevelBlue = [];
let massiveWithCardMediumLevelGreen = [];

let cardShirtFace = document.querySelector('.face')
let cardShirtBack = document.querySelector('.back')             //лицо и затылок переключения карт

//circles
let brownFirst = document.querySelector('.brown_first');
let blueFirst = document.querySelector('.blue_first');
let greenFirst = document.querySelector('.green_first');

let brownSecond = document.querySelector('.brown_second');
let blueSecond = document.querySelector('.blue_second');
let greenSecond = document.querySelector('.green_second');

let brownThird = document.querySelector('.brown_third');
let blueThird = document.querySelector('.blue_third');
let greenThird = document.querySelector('.green_third');

let numListener = 0;

let shirt = ''



cards[0].forEach((el) => {
    if (el.difficulty == "normal") massiveWithCardMediumLevelBrown.push(el)
})
cards[1].forEach((el) => {
    if (el.difficulty == "normal") massiveWithCardMediumLevelBlue.push(el)     //список с картами среднего уровня
})
cards[2].forEach((el) => {
    if (el.difficulty == "normal") massiveWithCardMediumLevelGreen.push(el)
})

let chooseMonsterDifficulty = document.querySelector('.alert');
//нажатие кнопок
document.addEventListener('click', (event) => {
    switch (event.target.id) {
        case 'azathoth':
            infoForShuffleTheDeck.god = event.target.id
            break
        case 'cthulhu':
            infoForShuffleTheDeck.god = event.target.id
            break
        case 'iogSothoth':
            infoForShuffleTheDeck.god = event.target.id
            break
        case 'shubNiggurath':
            infoForShuffleTheDeck.god = event.target.id
            break
    }

    switch (event.target.id) {
        case 'veryEasy':
            infoForShuffleTheDeck.difficulty = event.target.id
            break
        case 'easy':
            infoForShuffleTheDeck.difficulty = event.target.id
            break
        case 'normal':
            infoForShuffleTheDeck.difficulty = event.target.id
            break
        case 'hard':
            infoForShuffleTheDeck.difficulty = event.target.id
            break
        case 'veryHard':
            infoForShuffleTheDeck.difficulty = event.target.id
            break
    }
    chooseMonsterDifficulty.textContent = `Монстр: ${infoForShuffleTheDeck.god}. Уровень сложности: ${infoForShuffleTheDeck.difficulty}`
})


// функция замешивания

function stir() {
    numListener++;
    if (infoForShuffleTheDeck.god !== '' && infoForShuffleTheDeck.difficulty !== '') {
        ancientsMonster.forEach((el) => {                       //смотрим сколько карт нужно разного цвета
            if (infoForShuffleTheDeck.god == el.id) {
                greenCard = el.firstStage.greenCards + el.secondStage.greenCards + el.thirdStage.greenCards
                blueCard = el.firstStage.blueCards + el.secondStage.blueCards + el.thirdStage.blueCards
                brownCard = el.firstStage.brownCards + el.secondStage.brownCards + el.thirdStage.brownCards
            }
        })
    } else console.log(`Error push info`)


    let scoups = chooseDifficulty(infoForShuffleTheDeck.difficulty);

    shuffle(scoups[2]);
    shuffle(scoups[1]);
    shuffle(scoups[0]);

    let green = addCard(greenCard, scoups[2]);
    let blue = addCard(blueCard, scoups[1]);  //массивы для каждого монстра
    let brown = addCard(brownCard, scoups[0]);

    if (infoForShuffleTheDeck.difficulty == 'veryEasy') {
        addMisssingCard(greenCard, scoups[2], massiveWithCardMediumLevelGreen)
        addMisssingCard(brownCard, scoups[0], massiveWithCardMediumLevelBrown)  //добавление карт, если их не хватает другой сложности
        addMisssingCard(blueCard, scoups[1], massiveWithCardMediumLevelBlue)
    } else if (infoForShuffleTheDeck.difficulty == 'veryHard') {
        addMisssingCard(greenCard, scoups[2], massiveWithCardMediumLevelGreen)
        addMisssingCard(brownCard, scoups[0], massiveWithCardMediumLevelBrown)  //добавление карт, если их не хватает другой сложности
        addMisssingCard(blueCard, scoups[1], massiveWithCardMediumLevelBlue)
    }

    shirt = sortByStage(ancientsMonster, green, blue, brown);
    return shirt
}
let scoupEnded = []
function mainFunc() {
    document.querySelector('.btn_start').addEventListener('click', () => {
        scoupEnded = stir()

        return scoupEnded
    })

    document.addEventListener('click', (event) => {
        if (scoupEnded.length !== 0) {
            cardShirtBack.classList.add('active_back');
        } else {
            cardShirtBack.classList.remove('active_back')
        }
        if (event.target.classList.contains('back')) {
            let cardFace = scoupEnded.shift()
            console.log(cardFace)
            console.log(scoupEnded.length)
            cardShirtFace.style.background = `url(${cardFace.cardFace})no-repeat center/contain`
            switch (cardFace.color) {
                case 'green':
                    removeNumCard(greenFirst, greenSecond, greenThird)
                    break
                case 'brown':
                    removeNumCard(brownFirst, brownSecond, brownThird)
                    break
                case 'blue':
                    removeNumCard(blueFirst, blueSecond, blueThird)
                    break
            }
        }

    })

}

mainFunc()

function stageOfDifficulty(arr, numArr, difficulty) {
    arr = cards[numArr].filter((el) => el.difficulty !== difficulty)
    return arr
}

function chooseDifficulty(difficultyy) {            // собираем карты по сложности
    let brownDiff = [];
    let greenDiff = [];
    let blueDiff = [];

    if (difficultyy == "veryEasy") {
        return [
            brownDiff = cards[0].filter((el) => el.difficulty == 'easy'),
            blueDiff = cards[1].filter((el) => el.difficulty == 'easy'),
            greenDiff = cards[2].filter((el) => el.difficulty == 'easy')
        ]
    } else if (difficultyy == "easy") {
        return [
            brownDiff = cards[0].filter((el) => el.difficulty !== 'hard'),
            blueDiff = cards[1].filter((el) => el.difficulty !== 'hard'),
            greenDiff = cards[2].filter((el) => el.difficulty !== 'hard')
        ]
    } else if (difficultyy == "normal") {
        return [
            brownDiff = [...cards[0]],
            blueDiff = [...cards[1]],
            greenDiff = [...cards[2]]
        ]
    } else if (difficultyy == "hard") {
        return [
            brownDiff = cards[0].filter((el) => el.difficulty !== 'easy'),
            blueDiff = cards[1].filter((el) => el.difficulty !== 'easy'),
            greenDiff = cards[2].filter((el) => el.difficulty !== 'easy')
        ]
    } else if (difficultyy == "veryHard") {
        return [
            brownDiff = cards[0].filter((el) => el.difficulty == 'hard'),
            blueDiff = cards[1].filter((el) => el.difficulty == 'hard'),
            greenDiff = cards[2].filter((el) => el.difficulty == 'hard')
        ]
    }
}

function addCard(numCardForPush, arrCard) {    //делаем массив с обработанными картами
    scoupCard = [];
    for (let i = numCardForPush; numCardForPush > 0; numCardForPush--) {
        scoupCard.push(arrCard.pop());
    }
    return scoupCard
}

function shuffle(arr) {    //метод сортировки массива
    let j;
    let temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// проверка хватает ли карт для замешивания
function addMisssingCard(colorCard, colorDiff, additionalMassiv) {
    shuffle(additionalMassiv)
    if (colorDiff.length < colorCard) {
        let i = colorCard - colorDiff.length
        for (i; i > 0; i--) {
            colorDiff.push(addMisssingCard.pop);
        }
    }
}


function sortByStage(monster, color1, color2, color3) {     //раскладываем карты по колодам 
    let firstStageCards = [];
    let secondStageCards = [];
    let thirdStageCards = [];
    let firstStageScoupCard = [];
    let secondStageScoupCard = [];
    let thirdStageScoupCard = [];

    switch (infoForShuffleTheDeck.god) {
        case 'azathoth':
            firstStageCards = monster[0].firstStage;
            secondStageCards = monster[0].secondStage;
            thirdStageCards = monster[0].thirdStage;
            break
        case 'cthulhu':
            firstStageCards = monster[1].firstStage;
            secondStageCards = monster[1].secondStage;
            thirdStageCards = monster[1].thirdStage;
            break
        case 'iogSothoth':
            firstStageCards = monster[2].firstStage;
            secondStageCards = monster[2].secondStage;
            thirdStageCards = monster[2].thirdStage;
            break
        case 'shubNiggurath':
            firstStageCards = monster[3].firstStage;
            secondStageCards = monster[3].secondStage;
            thirdStageCards = monster[3].thirdStage;
            break
    }
    for (let key in firstStageCards) {
        if (key == 'greenCards') {
            addCardOnDeck(firstStageCards[key], firstStageScoupCard, color1)
            greenFirst.textContent = firstStageCards[key];
        }
        else if (key == 'blueCards') {
            addCardOnDeck(firstStageCards[key], firstStageScoupCard, color2)
            blueFirst.textContent = firstStageCards[key];
        }
        else if (key == 'brownCards') {
            addCardOnDeck(firstStageCards[key], firstStageScoupCard, color3)
            brownFirst.textContent = firstStageCards[key];
        }
    }
    for (let key in secondStageCards) {
        if (key == 'greenCards') {
            addCardOnDeck(secondStageCards[key], secondStageScoupCard, color1)
            greenSecond.textContent = secondStageCards[key];
        }
        else if (key == 'blueCards') {
            addCardOnDeck(secondStageCards[key], secondStageScoupCard, color2)
            blueSecond.textContent = secondStageCards[key];
        }
        else if (key == 'brownCards') {
            addCardOnDeck(secondStageCards[key], secondStageScoupCard, color3)
            brownSecond.textContent = secondStageCards[key];
        }
    }
    for (let key in thirdStageCards) {
        if (key == 'greenCards') {
            addCardOnDeck(thirdStageCards[key], thirdStageScoupCard, color1)
            greenThird.textContent = thirdStageCards[key];
        }
        else if (key == 'blueCards') {
            addCardOnDeck(thirdStageCards[key], thirdStageScoupCard, color2)
            blueThird.textContent = thirdStageCards[key];
        }
        else if (key == 'brownCards') {
            addCardOnDeck(thirdStageCards[key], thirdStageScoupCard, color3)
            brownThird.textContent = thirdStageCards[key];
        }
    }
    shuffle(firstStageScoupCard)
    shuffle(secondStageScoupCard)
    shuffle(thirdStageScoupCard)

    let shirt = firstStageScoupCard.concat(secondStageScoupCard, thirdStageScoupCard)

    return shirt
}


function addCardOnDeck(numCard, endScoup, colorScoup) {    //добавляем карты в деку
    for (let i = 0; numCard > i; i++) {
        let i = colorScoup.pop()
        endScoup.push(i)
    }

    return endScoup
}

function removeNumCard(first, second, third) {
    if (first.textContent > 0) first.textContent = first.textContent - 1
    else if (second.textContent > 0) second.textContent = second.textContent - 1
    else if (third.textContent > 0) third.textContent = third.textContent - 1
}  