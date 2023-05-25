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



//When Start Quiz button is clicked, the Start Screen becomes hidden, the first  question and answer choices appear 
startButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    questionsDiv.style.display = "block";

    //The timer starts counting down
    var timeRemaining = 60;
    setInterval(function() {
    timeRemaining--;
    timer.innerHTML = timeRemaining + " seconds remaining";

    // If the timer reaches zero, display the End Screen
    if (timeRemaining === 0) {
      endScreen.style.display = "block";
    }
  }, 1000);

});