const questions = [
    {
        question: "Which of these cities is not on the Danube?",
        answers: [
            { text: "Bratislava", correct: false},
            { text: "Bucharest", correct: true},
            { text: "Belgrade", correct: false},
            { text: "Brahmaputhra", correct: false},
        ]
    },
    {
        question: "Which river is on the border between Mexico and the US?",
        answers: [
            { text: "Rio Grande", correct: true},
            { text: "Brazos River", correct: false},
            { text: "Snake River", correct: false},
            { text: "Zaire River", correct: false},
        ]
    },
    {
        question: "The Ganges begins in Which mountain range?",
        answers: [
            { text: "karakoram", correct: false},
            { text: "Andes", correct: false},
            { text: "Naramada", correct: false},
            { text: "Himalayas", correct: true},
        ]
    },
    {
        question: "The Rio de la plata has inspired the name of a soccer team from which city?",
        answers: [
            { text: "Montevideo", correct: false},
            { text: "Buenos Aires", correct: true},
            { text: "Rio de janeiro", correct: false},
            { text: "Krishna", correct: false},
        ]
    },
    {
        question: "Which river in North America gave its name to the famous gold rush of the 1800s?",
        answers: [
            { text: "Klondike River", correct: true},
            { text: "Yukon River", correct: false},
            { text: "Fortymile River", correct: false},
            { text: "Yamuna River", correct: false},
        ]
    },
    {
        question: "Boney M had a massive hit with the Rivers of Babylon, but where are they?",
        answers: [
            { text: "Iraq", correct: true},
            { text: "Saudi Arabia", correct: false},
            { text: "Iran", correctL: false},
            { text: "kashmir", correct: false},
        ]
    }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();