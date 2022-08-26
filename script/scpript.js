import cards from '../data/mythicCards/index.js'
import { ancientsMonster } from '../data/ancients.js'

let infoForShuffleTheDeck = {
    "god": '',
    'difficulty': ''
};

// let greenCard = '';
// let brownCard = '';
// let blueCard = '';
let brownDiff = [];
let greenDiff = [];
let blueDiff = [];
let scoupCard = [];
let greenCard = '';
let blueCard = '';
let brownCard = '';
let massiveWithCardMediumLevelBrown = [];
let massiveWithCardMediumLevelBlue = [];
let massiveWithCardMediumLevelGreen = [];

cards[0].forEach((el) => {
    if (el.difficulty == "medium") massiveWithCardMediumLevelBrown.push(el)
})

cards[1].forEach((el) => {
    if (el.difficulty == "medium") massiveWithCardMediumLevelBlue.push(el)     //список с картами среднего уровня
})
cards[2].forEach((el) => {
    if (el.difficulty == "medium") massiveWithCardMediumLevelGreen.push(el)
})

console.log(ancientsMonster)
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
        case 'medium':
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
document.querySelector('.btn_start').addEventListener('click', () => {
    if (infoForShuffleTheDeck.god !== '' && infoForShuffleTheDeck.difficulty !== '') {
        ancientsMonster.forEach((el) => {                       //смотрим сколько карт нужно разного цвета
            if (infoForShuffleTheDeck.god == el.id) {
                greenCard = el.firstStage.greenCards + el.secondStage.greenCards + el.thirdStage.greenCards
                blueCard = el.firstStage.blueCards + el.secondStage.blueCards + el.thirdStage.blueCards
                brownCard = el.firstStage.brownCards + el.secondStage.brownCards + el.thirdStage.brownCards
                // console.log(greenCard)
                // console.log(blueCard)
                // console.log(brownCard)
            }
        })
    } else console.log(`Error push info`)
    // console.log(greenCard)
    chooseDifficulty(infoForShuffleTheDeck.difficulty)

    shuffle(greenDiff);
    shuffle(blueDiff);
    shuffle(brownDiff);

    let green = addCard(greenCard, greenDiff);
    let blue = addCard(blueCard, blueDiff);  //массивы для каждого монстра
    let brown = addCard(brownCard, brownDiff);
    console.log(greenDiff)
    if (infoForShuffleTheDeck.difficulty == 'veryEasy') {
        addMisssingCard(greenCard, greenDiff, massiveWithCardMediumLevelGreen)
        addMisssingCard(brownCard, brownDiff, massiveWithCardMediumLevelBrown)  //добавление карт, если их не хватает другой сложности
        addMisssingCard(blueCard, blueDiff, massiveWithCardMediumLevelBlue)
    } else if (infoForShuffleTheDeck.difficulty == 'veryHard') {

        addMisssingCard(greenCard, greenDiff, massiveWithCardMediumLevelGreen)
        addMisssingCard(brownCard, brownDiff, massiveWithCardMediumLevelBrown)  //добавление карт, если их не хватает другой сложности
        addMisssingCard(blueCard, blueDiff, massiveWithCardMediumLevelBlue)
    }

    // function addMisssingCard(colorCard, colorDiff, additionalMassiv) {             // проверка хватает ли карт для замешивания

    //     if (colorDiff.length < colorCard.length) {
    //         let i = colorCard.length - colorDiff.length
    //         for (i; i > 0; i--) {
    //             console.log(additionalMassiv)
    //             colorDiff.push(shuffle(additionalMassiv).pop);
    //         }
    //     }
    // }
    // console.log(green);
    // console.log(blue);
    // console.log(brown);
})

function stageOfDifficulty(arr, numArr, difficulty) {
    arr = cards[numArr].filter((el) => el.difficulty !== difficulty)
    return arr
}
//переделать на функции во всех уровнях сложности!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function chooseDifficulty(difficulty) {
    // let allCard = [];
    brownDiff = [];
    blueDiff = [];
    greenDiff = [];
    switch (difficulty) {

        case 'veryEasy':
            cards[0].forEach((el) => {
                if (el.difficulty == 'easy') {
                    brownDiff.push(el);
                }
            })

            cards[1].forEach((el) => {
                if (el.difficulty == 'easy') {
                    blueDiff.push(el);
                }
            })

            cards[2].forEach((el) => {
                if (el.difficulty == 'easy') {
                    greenDiff.push(el);
                }
            })
            break
        case 'easy':
            brownDiff = cards[0].filter((el) => el.difficulty !== 'hard')
            blueDiff = cards[1].filter((el) => el.difficulty !== 'hard')
            greenDiff = cards[2].filter((el) => el.difficulty !== 'hard')

            break
        case 'medium':
            brownDiff = [...cards[0]]
            blueDiff = [...cards[1]]
            greenDiff = [...cards[2]]
            break
        case 'hard':
            brownDiff = cards[0].filter((el) => el.difficulty !== 'easy')
            blueDiff = cards[1].filter((el) => el.difficulty !== 'easy')
            greenDiff = cards[2].filter((el) => el.difficulty !== 'easy')
            break
        case 'veryHard':
            cards[0].forEach((el) => {
                if (el.difficulty == 'hard') {
                    brownDiff.push(el);
                }
            })

            cards[1].forEach((el) => {
                if (el.difficulty == 'hard') {
                    blueDiff.push(el);
                }
            })

            cards[2].forEach((el) => {
                if (el.difficulty == 'hard') {
                    greenDiff.push(el);
                }
            })
            break
    }
    console.log(brownDiff)
    console.log(blueDiff)//                
    console.log(greenDiff)

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

function addMisssingCard(colorCard, colorDiff, additionalMassiv) {             // проверка хватает ли карт для замешивания
    console.log(colorDiff.length)
    console.log(colorCard.length)
    if (colorDiff.length < colorCard.length) {
        let i = colorCard.length - colorDiff.length
        console.log(i)
        for (i; i > 0; i--) {
            // console.log(additionalMassiv)
            colorDiff.push(shuffle(additionalMassiv).pop);
        }
    }
}


