//Created variables matching the html code and assigned them the value of the element with their ID 

var time = document.getElementById("time");
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

//Created these additional variables as I wrote my javascript and needed them to run my code
var currentQuestionIndex = 0;



//When Start Quiz button is clicked, the startButton function is going to hide the Start Screen, start the timer and make it count down to zero and will display the questions from my linked questions.js file
startButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    quizQuestions.style.display = "block";

    //Starts timer by creating a variable, assigning it value of 60 and then using setInterval method to create a function that will be called every 1000 ms
    var timeRemaining = 7;
    setInterval(function() {
    //Function decreases value of timeRemaining by 1 and then updates text of timer to display the new value
    timeRemaining--;
    time.innerHTML = timeRemaining;
    //Add code here to stop timer from going negative

    // If the timer reaches zero, End Screen will be displayed
    if (timeRemaining === 0) { // or if the question length is met
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