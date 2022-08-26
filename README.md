# Javascript Code Quiz

## What it does: 

 - This application sets a timer of 60 seconds and then quizes the user on their javascript knowledge
 - This application uses local storage to save high scores

 <br>

 ## The code: 

 - This code initializes a variety of elements in the main.js file through the .getElementById and .querySelector methods
 - When the start button is pressed, the game begins by taking an array named questions and and shuffling it, then passing that array into an element called shuffledQuestions
 - The quiz then generates four buttons dynamically that serve as possible answers. Wrong answers flash the screen red, and correct answers flash the screen green. Wrong answers also deduct 5 seconds from the clock
 - Once the questions are all passed through or the timer reaches 0, the game is stopped and the user is asked to enter their name for a high score. 
 - The score is then entered into local storage and shown on the screen. 

 ## Screenshots of the Project

 ![Project in Neutral State.](../02-Challenge/Assets/images/js_Neutral_state.png)
 ![Project in Correct State.](../02-Challenge/Assets/images/js_Correct_answer.png)
 ![Project in Incorrect State.](../02-Challenge/Assets/images/js_Incorrect_answer.png)

 ## Link to Deployed Project

 Below is a link to the deployed project

 https://damien-shoemake.github.io/js-quiz-test-your-knowledge/