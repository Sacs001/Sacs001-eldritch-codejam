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
console.log(cards)
let chooseMonsterDifficulty = document.querySelector('.alert');

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
                let greenCard = el.firstStage.greenCards + el.secondStage.greenCards + el.thirdStage.greenCards
                let blueCard = el.firstStage.blueCards + el.secondStage.blueCards + el.thirdStage.blueCards
                let brownCard = el.firstStage.brownCards + el.secondStage.brownCards + el.thirdStage.brownCards
                console.log(greenCard)
                console.log(blueCard)
                console.log(brownCard)
            }
        })
    } else console.log(`Error push info`)

    chooseDifficulty(infoForShuffleTheDeck.difficulty)
})

function stageOfDifficulty(arr, numArr, difficulty) {
    arr = cards[numArr].filter((el) => el.difficulty !== difficulty)
    return arr
}
//переделать на функции во всех уровнях сложности!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function chooseDifficulty(difficulty) {
    // let allCard = [];
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
    console.log(blueDiff)
    console.log(greenDiff)
    brownDiff = []
    blueDiff = []
    greenDiff = []
}

