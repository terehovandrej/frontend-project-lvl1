import readlineSync from "readline-sync";

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArith() {
    const arith = ["+", "-", "*"]
    return `${getRandomInRange(1, 10)} ${arith[getRandomInRange(0, 2)]} ${getRandomInRange(1, 10)}`
}

const getNod = (a, b) => {
    while (a !== b) {
        if (a > b) a = a - b
        else b = b - a
    }
    return a
}

const getProgressionWithSecret = () => {
    let progression_length = getRandomInRange(5, 15)
    let first_progression_number = progression_length = getRandomInRange(0, 100)
    let progression_step = getRandomInRange(3, 10)
    let secret_index = getRandomInRange(0, progression_length)
    const array = []
    const result = []

    for (let i = 0; i < progression_length; i++) {
        array.push(first_progression_number)
        first_progression_number+= progression_step
    }
    let secret = array[secret_index]
    array[secret_index] = '..'
    result.push(array)
    result.push(secret)
    return result
}

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false;
    return num > 1;
}

export const goGame = (gameType) => {
    const name = readlineSync.question('May I have your name? ');
    console.log(`Hello, ${name}!`)
    if (gameType === 'brain-even') {
        console.log('Answer "yes" if the number is even, otherwise answer "no".')
    } else if (gameType === 'brain-calc') {
        console.log('What is the result of the expression?')
    } else if (gameType === 'brain-gcd') {
        console.log('Find the greatest common divisor of given numbers.')
    } else if (gameType === 'brain-progression') {
        console.log('What number is missing in the progression?')
    } else if (gameType === 'brain-prime') {
        console.log('Answer "yes" if given number is prime. Otherwise answer "no".')
    }
    let count_right_answers = 0
    let question = ''
    let right_answer = ''
    while (count_right_answers < 3) {
        if (gameType === 'brain-even') {
            question = getRandomInRange(0, 1000)
            if (question % 2 === 0) {
                right_answer = 'yes'
            } else if (question % 2 !== 0) {
                right_answer = 'no'
            }
        } else if (gameType === 'brain-calc') {
            question = getRandomArith()
            right_answer = String(eval(question))
        } else if (gameType === 'brain-gcd') {
            let a = getRandomInRange(1, 100)
            let b = getRandomInRange(1, 100)
            question = `${a} ${b}`
            right_answer = String(getNod(a, b))
        }
        else if (gameType === 'brain-progression') {
            const question_and_answer = getProgressionWithSecret()
            question = question_and_answer[0]
            right_answer = String(question_and_answer[1])
        } else if (gameType === 'brain-prime') {
            question = getRandomInRange(0, 15)
            isPrime(question) ? right_answer = 'yes' : right_answer = 'no'
        }
        console.log(`Question: ${question}`)
        let answer = readlineSync.question('Your answer: ');
        console.log(`${answer}`)
        if (answer === right_answer) {
            console.log('Correct!')
            count_right_answers++
        } else {
            count_right_answers = 0
            console.log(`'${answer}' is wrong answer ;(. Correct answer was '${right_answer}'.`)
            console.log(`Let's try again, ${name}`)
            break
        }
    }
    console.log(`Congratulations, ${name}!`)

}