//Created variables matching the html code and assigned them the value of the element with their ID 

var timer = document.getElementById("timer");
var time = document.getElementById("time");
var startScreen = document.getElementById("start_screen");
var start = document.getElementById("start");
var startButton = document.getElementById("start_button");
var questionsDiv = document.getElementById("questions_div");
var title = document.getElementById("title");
var options= document.getElementById("options");
var endScreen= document.getElementById("end_screen");
var finalScore= document.getElementById("final_score");
var initials = document.getElementById("initials");
var submitButton = document.getElementById("submit_button");

//Created these additional variables as I wrote my javascript and needed them to run my code



//When Start Quiz button is clicked, the startButton function is going to hide the Start Screen, start the timer and make it count down to zero and will display the questions from my linked questions.js file
startButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    questionsDiv.style.display = "block";

    //Starts timer by creating a variable, assigning it value of 60 and then using setInterval method to create a function that will be called every 1000 ms
    var timeRemaining = 60;
    setInterval(function() {
    //Function decreases value of timeRemaining by 1 and then updates text of timer to display the new value
    timeRemaining--;
    timer.innerHTML = timeRemaining + " seconds remaining";

    // If the timer reaches zero, End Screen will be displayed
    if (timeRemaining === 0) {
      endScreen.style.display = "block";
    }
  }, 1000);
  //
// Gets the question from the questions.js file
var questions = [];
var questionsData = fetch("./assets/questions.js").then(response => response.json());
questionsData.then(data => {
  questions = data.questions;
  
})});