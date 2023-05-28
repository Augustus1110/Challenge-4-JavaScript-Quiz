//Created variables matching the html code and assigned them the value of the element with their ID 

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

//These additional variables were created as I wrote the javascript, because they are needed to run the code

//Creates a variable that stores the current question index. Value is set to 0 because the first question in the array is at index 0
var currentQuestionIndex = 0;
//Creates a variable that stores the questions array from questions.js
var choices = questions[currentQuestionIndex].choices;

//When Start Quiz button is clicked, startButton function is going to hide the Start Screen, display the quiz questions and start the timer
startButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    quizQuestions.style.display = "block";
    //Displays the first question in the array, indexed at 0
    title.innerHTML = questions[0].question;
    //Creates a for loop that will loop through the choices array
    for (var i = 0; i < choices.length; i++) {
        //Creates a button element for each choice in array
        var choiceButton = document.createElement("button");
        //Sets the class of each button to "choice"
        choiceButton.setAttribute("class", "choice");
        //Sets the value of each button to the value of each choice array
        choiceButton.setAttribute("value", choices[i]);
        //Sets the text of each button to the value of each choice in array
        choiceButton.textContent = choices[i];
        //Appends each button to the options div
        options.appendChild(choiceButton);
    }
    //Starts timer by creating a variable with value of 60 and then using setInterval method to create a function that will be called every 1000ms (i.e. every 1 second)
    var timeRemaining = 8;
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
  
});


//create display questions function here
//create a for loop for your choices
//create a function for your choices
// click event for your choices buttons inside of your for loop with the current index variable ++


// remember to set your innerHTML to an empty string as the value of your variables will change as the user clicks through the quiz