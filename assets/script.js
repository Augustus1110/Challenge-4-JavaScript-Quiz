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

//These additional variables were created as I wrote the javascript, because they are needed to run the code

//Creates variable that stores the current question index. Value is set to 0 because first question in the array is at index 0
var currentQuestionIndex = 0;
//Creates a variable that stores the questions array from questions.js
var choices = questions[currentQuestionIndex].choices;

//THIS PART OF THE CODE HANDLES THE START SCREEN AND START BUTTON

//Adds a click event listener to Start Quiz button. When clicked, startButton function is going to hide the Start Screen, display the quiz questions and start the timer
startButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    quizQuestions.style.display = "block";

    //THIS PART OF THE CODE HANDLES DISPLAYING THE QUESTIONS AND CHOICES

    //innerHTML is a property that sets or returns the HTML content of an element, here is sets the content of title to the value of questions[0].question 
    //question[0].question retrieves the question text from the "questions" array at index 0 and accesses the "question" property of the object at index 0
    
    //Together these work to display the first question in the array, indexed at 0
    title.innerHTML = questions[0].question;
    //Creates a for loop that will loop through the choices array
    for (var i = 0; i < choices.length; i++) {
        //Creates button element for each choice in array
        var choiceButton = document.createElement("button");
        //.setAttribute is a method used to modify/add attributes to an HTML element. Here, it sets the class of each button to "choice"
        choiceButton.setAttribute("class", "choice");
        //Sets value of each button to value of each choice in array
        choiceButton.setAttribute("value", choices[i]);
        //Sets text of each button to value of each choice in array
        choiceButton.textContent = choices[i];
        //Appends each button to the options div
        options.appendChild(choiceButton);
    }
    
    //THIS PART OF THE CODE HANDLES THE USER'S ANSWER TO THE QUESTIONS

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
          }
          //Appends result to quizQuestions div
          quizQuestions.appendChild(result);
          //Displays result for 0.8 seconds, then uses setTimeout method to hide result on page by removing result from quizQuestions
          setTimeout(function() {
              result.remove();
          }, 800);

          //THIS PART OF THE CODE HANDLES MOVING ON TO THE NEXT QUESTION

          //After user answers question, this increases currentQuestionIndex by 1 which move the index to the next question in the array
          currentQuestionIndex++;

          //If more questions remain, this displays the next question and choices
          if (currentQuestionIndex < questions.length) {

              title.innerHTML = questions[currentQuestionIndex].question;
              choices = questions[currentQuestionIndex].choices;
              options.innerHTML = "";

              for (var i = 0; i < choices.length; i++) {
                  var choiceButton = document.createElement("button");
                  choiceButton.setAttribute("class", "choice");
                  choiceButton.setAttribute("value", choices[i]);
                  choiceButton.textContent = choices[i];
                  options.appendChild(choiceButton);
              }
          } else {
              clearInterval(intervalId);
              quizQuestions.style.display = "none";
              endScreen.style.display = "block";
          }
      }
  });


    //Starts timer by creating a variable with value of 60 and then using setInterval method to create a function that will be called every 1000ms (i.e. every 1 second)
    var timeRemaining = 20;
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