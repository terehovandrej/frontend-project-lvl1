import readlineSync from 'readline-sync';

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArith() {
  const arith = ['+', '-', '*'];
  return `${getRandomInRange(1, 10)} ${arith[getRandomInRange(0, 2)]} ${getRandomInRange(1, 10)}`;
}

function evaluate(string) {
  const array = string.split(' ');
  let result = 0;
  if (array[1] === '+') {
    result = array[0] + array[2];
  } else if (array[1] === '*') {
    result = array[0] * array[2];
  } else if (array[1] === '-') {
    result = array[0] - array[2];
  }
  return result;
}

const getNod = (first, second) => {
  let a = first;
  let b = second;
  while (a !== b) {
    if (a > b) a -= b;
    else b -= a;
  }
  return a;
};

const getProgressionWithSecret = () => {
  const progressionLength = getRandomInRange(5, 15);
  let firstProgressionNumber = getRandomInRange(0, 100);
  const progressionStep = getRandomInRange(3, 10);
  const secretIndex = getRandomInRange(0, progressionLength - 1);
  const array = [];
  const result = [];

  for (let i = 0; i < progressionLength; i += 1) {
    array.push(firstProgressionNumber);
    firstProgressionNumber += progressionStep;
  }
  const secret = array[secretIndex];
  array[secretIndex] = '..';
  result.push(array);
  result.push(secret);
  return result;
};

const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i += 1) if (num % i === 0) return false;
  return num > 1;
};

export default (gameType) => {
  const name = readlineSync.question('May I have your name? ');
  console.log(`Hello, ${name}!`);
  if (gameType === 'brain-even') {
    console.log('Answer "yes" if the number is even, otherwise answer "no".');
  } else if (gameType === 'brain-calc') {
    console.log('What is the result of the expression?');
  } else if (gameType === 'brain-gcd') {
    console.log('Find the greatest common divisor of given numbers.');
  } else if (gameType === 'brain-progression') {
    console.log('What number is missing in the progression?');
  } else if (gameType === 'brain-prime') {
    console.log('Answer "yes" if given number is prime. Otherwise answer "no".');
  }
  let countRightAnswers = 0;
  let question = '';
  let rightAnswer = '';
  while (countRightAnswers < 3) {
    if (gameType === 'brain-even') {
      question = getRandomInRange(0, 1000);
      if (question % 2 === 0) {
        rightAnswer = 'yes';
      } else if (question % 2 !== 0) {
        rightAnswer = 'no';
      }
    } else if (gameType === 'brain-calc') {
      question = getRandomArith();
      rightAnswer = String(evaluate(question));
    } else if (gameType === 'brain-gcd') {
      const a = getRandomInRange(1, 100);
      const b = getRandomInRange(1, 100);
      question = `${a} ${b}`;
      rightAnswer = String(getNod(a, b));
    } else if (gameType === 'brain-progression') {
      const questionAndAnswer = getProgressionWithSecret();
      question = questionAndAnswer[0].join(' ');
      rightAnswer = String(questionAndAnswer[1]);
    } else if (gameType === 'brain-prime') {
      question = getRandomInRange(0, 15);
      if (isPrime(question)) {
        rightAnswer = 'yes';
      } else if (!isPrime(question)) {
        rightAnswer = 'no';
      }
    }
    console.log(`Question: ${question}`);
    const answer = readlineSync.question('Your answer: ');
    console.log(`${answer}`);
    if (answer === rightAnswer) {
      console.log('Correct!');
      countRightAnswers += 1;
    } else {
      countRightAnswers = 0;
      console.log(`'${answer}' is wrong answer ;(. Correct answer was '${rightAnswer}'.`);
      console.log(`Let's try again, ${name}!`);
      break;
    }
  }
  console.log(`Congratulations, ${name}!`);
};
