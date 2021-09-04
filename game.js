
const question = document.getElementById("question");

const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById('score');

let currentQuestion = {};
let  acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
    {
        question: 'Which is my Favouraite Dish ?',
        choice1: 'Biryani',
        choice2: 'Fried Rice',
        choice3: 'Dosa',
        choice4: 'Pakoda',
        answer: 1,
    },
    {
        question:
            "Which is my Favouraite movie ?",
        choice1: "Simhadhri",
        choice2: "Yamadhonga",
        choice3: "Adhurs",
        choice4: "Brindhavanam",
        answer: 3,
    },
    {
        question: "Guess the Number I think 😌😉?",
        choice1: "0033",
        choice2: "3030",
        choice3: "3300",
        choice4: "3223",
        answer: 3,
    },
];

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTION = 3;

startGame = () => {
    questionCounter=0;
    score=0;
    availableQuestion = [ ...questions];
    console.log(availableQuestion);
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestion.length === 0 || questionCounter >= MAX_QUESTION){
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign("end.html");
    };

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTION}`;
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText =currentQuestion.question;

    choices.forEach( (choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestion.splice(questionIndex,1);
    acceptingAnswer = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if(classToApply == 'correct'){
            incrementScore(CORRECT_BONUS);
        }
        else{
            decrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
        },1000);

        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
decrementScore = num => {
    score -= num;
    scoreText.innerText = score;
}

startGame();
