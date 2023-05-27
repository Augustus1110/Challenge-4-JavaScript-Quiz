//Created variables matching the html code and assigned them the value of the element with their ID 

var timeSec = document.getElementById("time_sec");
var startScreen = document.getElementById("start_screen");
var start = document.getElementById("start");
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

//Created these additional variables as I wrote my javascript and needed them to run my code
var currentQuestionIndex = 0;

//When Start Quiz button is clicked, startButton function is going to hide the Start Screen, start the timer count down and will display the quiz questions
startButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    quizQuestions.style.display = "block";

    //Starts timer by creating a variable with value of 60 and then using setInterval method to create a function that will be called every 1000ms (i.e. every 1 second)
    var timeRemaining = 7;
    var intervalId = setInterval(function() {
    //Decreases value of timeRemaining by 1 
    timeRemaining--;
    //Updates text of timer to display the new value of timeRemaining
    //If timeRemaining is negative, will display 0 instead of negative number
    timeSec.innerHTML = Math.max(0, timeRemaining);
 
    // If the timer reaches zero, OR if all of the questions are answered, the following will happen: timer ends, questions become hidden and end screen will display

    //Checks if timeRemaining is equal to 0 OR if currentQuestionIndex is equal to the length of the questions array
    if (timeRemaining === 0 || currentQuestionIndex === questions.length) {
      
      //Clears interval previously set with setInterval. clearInterval function stops the execution of the interval from running and updating the timer by passing intervalId in as an argument
      clearInterval(intervalId);
      quizQuestions.style.display = "none";
      endScreen.style.display = "block";
    }
  }, 1000);
  

title.innerHTML = questions[0].question;
});


//create display questions function here
//create a for loop for your choices
//create a function for your choices
// click event for your choices buttons inside of your for loop with the current index variable ++


// remember to set your innerHTML to an empty string as the value of your variables will change as the user clicks through the quiz