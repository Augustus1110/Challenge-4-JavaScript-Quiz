//I created variables matching the html code and assigned them the value of the element with their ID 

var timeSec = document.getElementById("time_sec");
var startScreen = document.getElementById("start_screen");
var startButton = document.getElementById("start_button");
var quizQuestions = document.getElementById("quiz_questions");
var title = document.getElementById("title");
var options= document.getElementById("options");
var endScreen= document.getElementById("end_screen");
var finalScore= document.getElementById("final_score");
var initials = document.getElementById("initials");
var submitButton = document.getElementById("submit_button");
var highScores = document.getElementById("high_scores");
var highScoresList = document.getElementById("high_scores_list");
var playAgain = document.getElementById("play_again");
var clearHighScores = document.getElementById("clear_high_scores");

//These additional variables were created as I wrote the javascript, because they are needed to run the code. They are global variables so that they can be accessed in multiple functions

var intervalId;
var timeRemaining;
//Creates variable that stores the current question index. Value is set to 0 because first question in the array is at index 0
var currentQuestionIndex = 0;
//Creates a variable that stores the questions array from questions.js
var choices = questions[currentQuestionIndex].choices;

//I created all of these functions so I don't have to repeat code. I can just call these functions when I need them. I created them at the top of the file so they are accessible to all of the code below


//showEndScreen function clears the interval, hides seconds, hides questions, and displays end screen with final score
function showEndScreen() {
  clearInterval(intervalId);
  timeSec.style.display = "none";
  quizQuestions.style.display = "none";
  endScreen.style.display = "block";
  //Displays final score as 0 if timer reaches 0, will not display negative number
  finalScore.textContent = Math.max(0, timeRemaining);
}

//This function starts the timer. It works by using the variable timeRemaining, with value of 50, then using setInterval method to create a function that will be called every 1000ms (i.e. every 1 second)
function startTimer() {
   timeRemaining = 50;
   intervalId = setInterval(function() {
   //Decreases value of timeRemaining by 1 
   timeRemaining--;
   //Updates text of timer to display the new value of timeRemaining
   //If timeRemaining is negative, will display 0 instead of negative number
   timeSec.innerHTML = Math.max(0, timeRemaining);
   //Checks if timeRemaining is less than or equal to 0 OR if currentQuestionIndex is equal to the length of the questions array
   if (timeRemaining <= 0 || currentQuestionIndex === questions.length) {
      //If the timer becomes less than or equal to zero, OR if there are no more questions, clears interval, hides seconds, hides questions, and displays end screen with final score
      showEndScreen();
   }
 }, 1000);
}

//This function takes in the array of "choices" from questions.js as an argument and creates a button for each choice in that array
function makeAnswerButtons(choices){
  //Creates a loop that will loop through the choices array
  for (var i = 0; i < choices.length; i++) {
    //Creates button element for each choice in array
    var choiceButton = document.createElement("button");
    //.setAttribute is a method used to modify/add attributes to an HTML element. Here, it sets the class of each button to "choice" so that it can be targeted later. I will target it to add CSS styling
    choiceButton.setAttribute("class", "choice");
    //Sets value of each button to value of each choice in array
    choiceButton.setAttribute("value", choices[i]);
    //Sets text of each button to value of each choice in array
    choiceButton.textContent = choices[i];
    //Appends the choiceButton element as a child of the options div. This adds the button to the HTML page so that the user can see it
    options.appendChild(choiceButton);
  }
}    

//THIS PART OF THE CODE HANDLES THE START SCREEN AND START BUTTON

//Adds a click event listener to Start Quiz button. When clicked, startButton function is going to hide the Start Screen, display the quiz questions and start the timer
startButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    quizQuestions.style.display = "block";
    startTimer();

    //THIS PART OF THE CODE HANDLES DISPLAYING THE QUESTIONS AND CHOICES

    //innerHTML is a property that sets or returns the HTML content of an element. Here, is sets the content of title to the value of questions[0].question 
    //questions[0].question retrieves the question text from questions.js and looks to the "questions" array at index 0 and accesses the "question" property of first question object in the array
    
    //Together these work to display the first question in the array, indexed at 0
    title.innerHTML = questions[0].question;
    //In order to display the answer choices as buttons, I created the makeAnswerButtons function and amd calling it here, passing in the choices array as an argument. The text of the function is found at the bottom of this file
    makeAnswerButtons(choices);
    
    //THIS PART OF THE CODE HANDLES THE USER'S ANSWERS TO THE QUESTIONS

    //Adds a click event listener to the options div.
    options.addEventListener("click", function(event) {
      //When choice button clicked, this checks if clicked element matches the class "choice"
      if (event.target.matches(".choice")) {
          //If true, clicked button's value is stored in userAnswer variable
          var userAnswer = event.target.value;
          //Retrieves correct answer for current question from questions array
          var correctAnswer = questions[currentQuestionIndex].answer;
          //Creates new paragraph element called result, to display correctness of user's answer
          var result = document.createElement("p");
          //Checks if user's answer matches correct answer, displays "Correct!" or "Incorrect!", accordingly
          if (userAnswer === correctAnswer) {
              result.textContent = "Correct!";
          } else {
              result.textContent = "Incorrect!";
              //Subtracts 10 seconds from timeRemaining if user's answer is incorrect
              timeRemaining -= 10;
              //If the timer becomes less than or equal to zero, showEndScreen function is called and clears the interval, hides seconds, hides questions, and displays end screen with final score
              if (timeRemaining <= 0){
                  showEndScreen();
              }
          }
          //Appends result to quizQuestions div
          quizQuestions.appendChild(result);
          //Displays result for 0.8 seconds, then uses setTimeout method to hide result on page by removing result from quizQuestions
          setTimeout(function() {
              result.remove();
          }, 800);

          //THIS PART OF THE CODE HANDLES MOVING ON TO THE NEXT QUESTION

          //After user answers question, this increases currentQuestionIndex by 1 which moves the index to the next question in the array
          currentQuestionIndex++;

          //Checks if currentQuestionIndex is less than the length of the questions array, if true, displays next question
          if (currentQuestionIndex < questions.length) {
              //If there are more questions, updates title element's innerHTML to the question of the next index in the questions array  
              title.innerHTML = questions[currentQuestionIndex].question;
              //Updates choices variable to the choices of the next index in the questions array
              choices = questions[currentQuestionIndex].choices;
              //sets options' innerHTML to an empty string to remove any previously displayed answer buttons
              options.innerHTML = "";
              //Calls makeAnswerButtons function to display answer buttons for the next question
              makeAnswerButtons(choices);
          } else {
              //If there are no more questions, showEndScreen function is called and clears the interval, hides seconds, hides questions, and displays end screen with final score
              showEndScreen();
          }
        }
      }
    );
  });



//THIS PART OF THE CODE HANDLES THE END SCREEN AND DISPLAYING THE USER'S FINAL SCORE 

function saveScore(){
  var score = Math.max(0, timeRemaining);
  var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
  var newScore = {
    score: score,
    initials: initials.value.trim()
  }
  savedScores.push(newScore);
  localStorage.setItem("savedScores", JSON.stringify(savedScores));
}

submitButton.onclick = saveScore;



//THIS PART OF THE CODE HANDLES THE HIGH SCORES SCREEN

//create a function that will display the 5 previous high scores and initials on the high scores page
//create a function that will display the user's initials and score on the high scores page if they have one of the top 5 scores
//create a function that will clear the high scores
//create a function that will go back to the start screen