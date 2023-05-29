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
              //If no more questions left, this stops timer by clearing the interval using clearInterval(intervalId), hides quizQuestions and displays endScreen
              clearInterval(intervalId);
              quizQuestions.style.display = "none";
              endScreen.style.display = "block";
          }
      }
  });

    //THIS PART OF THE CODE HANDLES THE TIMER - BUT NOTE THAT IT IS STILL CONTAINED WITHIN THE START BUTTON EVENT LISTENER, SO THE TIMER FUNCTIONALITY STARTS WHEN THE START BUTTON IS CLICKED

    //Starts timer by creating a variable with value of 60 and then using setInterval method to create a function that will be called every 1000ms (i.e. every 1 second)
    var timeRemaining = 60;
    var intervalId = setInterval(function() {
    //Decreases value of timeRemaining by 1 
    timeRemaining--;
    //Updates text of timer to display the new value of timeRemaining
    //If timeRemaining is negative, will display 0 instead of negative number
    timeSec.innerHTML = Math.max(0, timeRemaining);
 
    // If the timer reaches zero, OR if all of the questions are answered, the following will happen: timer ends, questions become hidden and end screen will display

    //Checks if timeRemaining is equal to 0 OR if currentQuestionIndex is equal to the length of the questions array
    if (timeRemaining === 0 || currentQuestionIndex === questions.length) {
      
       //If no more questions left, this stops timer by clearing the interval using clearInterval(intervalId), hides quizQuestions and displays endScreen
      clearInterval(intervalId);
      quizQuestions.style.display = "none";
      endScreen.style.display = "block";
    }
  }, 1000);
  
});

//The makeAnswerButtons function was created because the functionality is repeated in my the code. Above, I call this function instead of retyping the same code

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



//create display questions function here
//create a for loop for your choices
//create a function for your choices
// click event for your choices buttons inside of your for loop with the current index variable ++


// remember to set your innerHTML to an empty string as the value of your variables will change as the user clicks through the quiz