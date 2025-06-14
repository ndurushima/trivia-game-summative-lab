const readline = require("readline");

const questions = [
  {
    question: "What's the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Who painted the Mona Lisa?",
    choices: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
    answer: "Da Vinci"
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "What is the atomic number of Oxygen?",
    choices: ["6", "7", "8", "9"],
    answer: "8"
  }
];

let score = 0;
let currentQuestion = 0;
const timeLimit = 30; // seconds
let timeLeft = timeLimit;
let timer;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion() {
  if (currentQuestion >= questions.length) {
    return endGame();
  }

  const q = questions[currentQuestion];
  console.log(`\nQuestion ${currentQuestion + 1}: ${q.question}`);
  q.choices.forEach((choice, index) => {
    console.log(`  ${index + 1}. ${choice}`);
  });

  rl.question("Your answer (1-4): ", (input) => {
    const selectedIndex = parseInt(input) - 1;
    if (q.choices[selectedIndex] === q.answer) {
      console.log("Correct!");
      score++;
    } else {
      console.log(`Incorrect! The correct answer was: ${q.answer}`);
    }
    currentQuestion++;
    askQuestion();
  });
}

function endGame() {
  clearInterval(timer);
  console.log("\nGame Over!");
  console.log(`Your Score: ${score} / ${questions.length}`);
  rl.close();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      console.log("\n Time's up!");
      endGame();
    }
  }, 1000);
}

function startGame() {
  console.log("Welcome to the CLI Trivia Game!");
  console.log(`You have ${timeLimit} seconds to complete the quiz.`);
  startTimer();
  askQuestion();
}

startGame();
