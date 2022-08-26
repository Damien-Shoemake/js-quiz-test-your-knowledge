// Selecting various index.html parts to manipulate dynamically
var scoreInputEl = document.getElementById('score-form');
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var timerEl = document.getElementById('countdown');
var scoreEl = document.querySelector('#score-input');
var nameEl = document.querySelector('#initials');
var questionContainerEl = document.getElementById('question-container');
var disableButtons = document.getElementById("answer-buttons");
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var submitButtonEl = document.getElementById('submit-button');



// Setting the timeLeft variable to save the score, initialized globally because I was having scoping issues keeping it inside the interval function
var timeLeft = 61;





// Initializing variables to be used later in the code 
var shuffledQuestions;
var currentQuestionIndex;
var timeInterval;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    // increments the index of the shuffledQuestions array
    currentQuestionIndex++;
    // sets the next question of the index is incremented
    setNextQuestion();
});


// Function to start the game
function startGame() {
    timeLeft = 61;

    scoreInputEl.classList.add('hide')
    startButton.classList.add('hide');
    nextButton.removeAttribute('disabled');
    questionElement.classList.remove('hide');
    disableButtons.classList.remove('hide');

    // Shuffles questions - if it's a negative number, it's sorted one way, if it's positive it's sorted another way
    shuffledQuestions = questions.sort(() => Math.random() -.5);

    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    clearInterval(timeInterval);
    setNextQuestion();
    setTimer();

};

// Function that selects the next question randomly
function setNextQuestion() {

    resetState();

    showQuestion(shuffledQuestions[currentQuestionIndex]);

    };


function showQuestion(question) {  
    questionElement.innerText = question.question
        // The "forEach" method creates an answer button for each one of the answers in our questions array with the createElement method
        question.answers.forEach(answer => {


            var button = document.createElement('button');

            button.innerText = answer.text;
            button.classList.add('btn');
    
            // checks booleans in the questions array instead of strings. true/false is initialized in the array itself
            if (answer.correct) {

                button.dataset.correct = answer.correct;

            };
        

            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        }
    );
};

// sets the state back to default
function resetState() {

    clearStatusClass(document.body);
    nextButton.classList.add('hide');

    //This loop removes the answers from the question that came before so that we don't get infinitely increasing buttons
    while (answerButtonsElement.firstChild) {

        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    };
};


// Function that selects the answer
function selectAnswer(i) {
    var selectedButton = i.target;
    var correct = selectedButton.dataset.correct;
    

    // This is the code that changes the color for wrong/right answers
    setStatusClass(document.body, correct);

    // creates an array from answer buttons so we can use it for the forEach loop, and for each button we want to set the status class, and check if the answer is correct
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    if(shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
    
    } else {
        gameOver();
        setScore();
    };

    if (!correct) {
        timeLeft = timeLeft - 4;
        
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element);

    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    };


};


function clearStatusClass(element) {

    element.classList.remove('correct');
    element.classList.remove('incorrect');

};

// Function that sets the interval for the countdown
function setTimer() {
    
    timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds left; " + (questions.length - currentQuestionIndex) + " questions left";

        // Once time reaches 0, buttons become disabled so only the restart button can used
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            nextButton.setAttribute('disabled', 'disabled');
            nextButton.classList.add('hide')
            timerEl.textContent = "Time's up! Your score is: 0 :(";
            gameOver();
            setScore();
            
        }

    }, 1000);
}

function gameOver() {

    scoreInputEl.classList.remove('hide')
    scoreEl.classList.remove('hide')
    disableButtons.classList.add('hide');
    questionElement.classList.add('hide');
    if(timeLeft < 0){
        timeLeft = 0;
    }
    timerEl.textContent = "All done! Your score is: " + timeLeft;
    startButton.innerText = 'Enter Your Score Above, Press Here to Replay';
    startButton.classList.remove('hide');
    clearInterval(timeInterval);
    scoreEl.value = timeLeft;
}

function setScore() {
    
    submitButtonEl.addEventListener("click", function(event){
        event.preventDefault();

        var score = {
            logScore: scoreEl.value,
            name: nameEl.value
        }
        localStorage.setItem("logScore", JSON.stringify(score));
        var scoreShow = document.createElement("li");
        var storedScore = JSON.parse(localStorage.getItem('logScore'));
    
        scoreShow.textContent = "Last Score: " + storedScore.name + ": " + storedScore.logScore
        timerEl.appendChild(scoreShow)

    })
    

}



// var score = {
//      score: scoreEl.value,
//      name: nameEl.value
// };

// console.log(score.name);
// console.log(score.score);



var questions = [

    

    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<div>', correct: false},
            { text: '<js>', correct: false},
            { text: '<javascript>', correct: false},
            { text: '<script>', correct: true}
        ]
    },
    {
        question: 'Where is the correct place to insert a JavaScript file?', 
        answers: [
            {text: '<span>', correct: false},
            {text: '<body>', correct: true},
            {text: '<header>', correct: false},
            {text: '<title>', correct: false}
        ]
    }, 
    {
        question: 'Which of these examples has correct syntax for JavaScript?',
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
            {text: 'if i == 0 then', correct: false},
            {text: 'if i = 0 then', correct: false},
            {text: 'if (i == 0)', correct: true},
            {text: 'if i=0 do', correct: false}
        ]
    },
    {
        question: 'What is the correct JavaScript syntax to change the content of the HTML element below?',
        answers: [
            {text: 'document.getElement("p").innerHTML = "Hello World!";', correct: false},
            {text: 'document.getElementById("demo").innerHTML = "Hello World!"', correct: true},
            {text: 'document.getElementByName("p").innerHTML = "Hello World!";', correct: false},
            {text: '#demo.innerHTML = "Hello World!";', correct: false}
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            {text: 'alert("Hello World");', correct: true},
            {text: 'msgBox("Hello World");', correct: false},
            {text: 'msg("Hello World");', correct: false},
            {text: 'alertBox("Hello World");', correct: false}

        ]
    },
    {
        question: 'How does a for loop start?',
        answers: [
            {text: 'for (i = 0; i <= 5)', correct: false},
            {text: 'for (i = 0; i <= 5; i++)', correct: true},
            {text: 'for i = 1 to 5', correct: false},
            {text: 'for (i <= 5; i++)', correct: false}
        ]
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        answers: [
            {text: 'var colors = (1:"red", 2:"green", 3:"blue")', correct: false},
            {text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', correct: false},
            {text: 'var colors = "red", "green", "blue"', correct: false},
            {text: 'var colors = ["red", "green", "blue"]', correct: true}
        ]
    },
    {
        question: 'How do you round the number 7.25, to the nearest integer?', 
        answers: [
            {text: 'Math.round(7.25)', correct: true},
            {text: 'round(7.25)', correct: false},
            {text: 'Math.rnd(7.25)', correct: false},
            {text: 'rnd(7.25)', correct: false}
        ]
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?', 
        answers: [
            {text: 'onmouseover', correct: false},
            {text: 'onchange', correct: false},
            {text: 'onclick', correct: true},
            {text: 'onmouseclick', correct: false}
        ]
    }

]

