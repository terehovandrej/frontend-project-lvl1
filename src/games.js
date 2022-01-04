import readlineSync from "readline-sync";

export const evenGame = () => {
    const name = readlineSync.question('May I have your name? ');
    console.log(`Hello, ${name}!`)
    console.log('Answer "yes" if the number is even, otherwise answer "no".')
    let right_answers = 0
    while (right_answers < 3) {
        let random = getRandomInRange(0, 1000)
        console.log(`Question: ${random}`)
        let answer = readlineSync.question('Your answer: ');
        if (random % 2 === 0) {
            if (answer === 'yes') {
                right_answers++
                console.log('Correct!')
            } else {
                right_answers = 0
                console.log(`${answer} is wrong answer ;(. Correct answer was 'yes'.`)
                console.log(`Let's try again, ${name}`)
            }
        } else if (random % 2 !== 0) {
            if (answer === 'no') {
                right_answers++
                console.log('Correct!')
            } else {
                right_answers = 0
                console.log(`${answer} is wrong answer ;(. Correct answer was 'no'.`)
                console.log(`Let's try again, ${name}`)
            }
        }
    }
    console.log(`Congratulations, ${name}!`)
}
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

