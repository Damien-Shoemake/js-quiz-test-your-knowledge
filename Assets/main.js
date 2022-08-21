var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')

var questionContainerElement = document.getElementById('question-container')

var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

// Initializing variables to be used later in the code 
var shuffledQuestions;
var currentQuestionIndex;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
})


// Function to start the game
function startGame() {

    console.log('started')
    startButton.classList.add('hide')

    // Shuffles questions - if it's a negative number, it's sorted one way, if it's positive it's sorted another way
    shuffledQuestions = questions.sort(() => Math.random() -.5)

    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}

// Function that sets the interval for the countdown
function setTimer() {
    
}

var questions = [

    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<script>', correct: true},
            { text: '<js>', correct: false},
            { text: '<div>', correct: false},
            { text: '<javascript>', correct: false}
        ]
    },
    {
        question: 'Where is the correct place to insert a JavaScript file?', 
        answers: [
            {text: '<body>', correct: true},
            {text: '<span>', correct: false},
            {text: '<header>', correct: false},
            {text: '<title>', correct: false}
        ]
    }, 
    {
        question: 'Which of these examples has correct syntax?',
        answers: [
            {text: 'function myFunction()', correct: true},
            {text: 'var randMath = math.Random()', correct: false},
            {text: 'function:MyFunction()', correct: false},
            {text: 'Function::MyFunction()', correct: false}
        ]
    },
    {
        question: 'How do you write an "if" statement in JavaScript?',
        answers: [
            {text: 'if (i == 0)', correct: true},
            {text: 'if i == 0 then', correct: false},
            {text: 'if i = 0 then', correct: false},
            {text: 'if i=0 do', correct: false}
        ]
    },

]

