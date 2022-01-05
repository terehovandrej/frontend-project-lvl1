import readlineSync from "readline-sync";

export const evenGame = () => {
    goGame('brain-even')
}

export const calcGame = () => {
    goGame('brain-calc')
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArith() {
    const arith =  ["+", "-", "*"]
    return `${getRandomInRange(1, 10)} ${arith[getRandomInRange(0, 2)]} ${getRandomInRange(1, 10)}`
}

export const goGame = (gameType) => {
    const name = readlineSync.question('May I have your name? ');
    console.log(`Hello, ${name}!`)
    if (gameType === 'brain-even'){
        console.log('Answer "yes" if the number is even, otherwise answer "no".')
    }else if (gameType === 'brain-calc'){
        console.log('What is the result of the expression?')
    }
    let count_right_answers = 0
    let question = ''
    let right_answer = ''
    while (count_right_answers < 3) {
        if (gameType === 'brain-even'){
            question = getRandomInRange(0, 1000)
            if (question % 2 === 0) {
                right_answer = 'yes'
            }
            else if (question % 2 !== 0) {
                right_answer = 'no'
            } else {

            }
        } else if (gameType === 'brain-calc'){
            question = getRandomArith()
            right_answer = String(eval(question))
        }
        console.log(`Question: ${question}`)
        let answer = readlineSync.question('Your answer: ');
        if (answer === right_answer) {
                console.log('Correct!')
                count_right_answers++
        } else {
                count_right_answers = 0
                console.log(`${answer} is wrong answer ;(. Correct answer was ${right_answer}.`)
                console.log(`Let's try again, ${name}`)
            }
        }
    console.log(`Congratulations, ${name}!`)
    }

