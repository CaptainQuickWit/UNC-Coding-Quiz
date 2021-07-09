
var clockEl = document.getElementById('countdown');
var highScoreEl = document.getElementById('highScore');
var mainEl = document.getElementById('main');
var clock = document.querySelector("#clock");
var submitBtnEl = document.querySelector("#submitBtn");
var startbtnEl = document.querySelector("#startBtn");
var backbtnEl = document.querySelector("#backBtn");
var highScoreBtnEl = document.querySelector("#highScoreBtn");
var initials = null;
var secondsLeft = 100;
var holdInterval = 0;
var penalty = 10;
var timeLeft = 30;

function countdown() {
  timeLeft = 30;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      clockEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      clockEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      clockEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      displayMessage();
    }
  }, 1000);
}

var questionsObject = [
  {
    
    objectType: "MetaData",
    currentScore: 0,
    numberOfQuestions: 5,
    userInitials: "",
  },  
  {   
      objectType: "Question",
      title: "What is HTML?",
      selection: ["a styling langauge", "object oriented programming langauge", "whats an html?", "Hyper Text Markup Language"],
      answer: {"d":"Hyper Text Markup Language"}
  },
  {   objectType: "Question",
      title: "What is css?",
      selection: ["object", "add's interactivity", "a type of API", "styling for html"],
      answer: {"d":"styling for html"}
  },
  {   
    objectType: "Question",
      title: "an object is ____.",
      selection: ["basically a function", "a type of array", "data type with state and properties", "all of the above"],
      answer: {"c":"data type with state and properties"}
  },
  {   objectType: "Question",
      title: "True or False: is a String an object?",
      selection: ["True; its a collection of characters", "False; its a primitive value"],
      answer: {"a":"True; its a collection of characters"}
  },
  {   objectType: "Question",
      title: "What is a package manager",
      selection: ["a thing to install manage and delete programs and its dependencies", "a terminal", 
      "the console log", "an MSI file"],
      answer: {"a":"a thing to install manage and delete programs and its dependencies"}
  },
];

// Displays the message one word at a time
function displayMessage() {
  var wordCount = 0;

  // Uses the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var msgInterval = setInterval(function () {
    // If there are no more words left in the message
    if (words[wordCount] === undefined) {
      // Use `clearInterval()` to stop the timer
      clearInterval(msgInterval);
    } else {
      // Display one word of the message
      mainEl.textContent = words[wordCount];
      wordCount++;
    }
  }, 1000);
}

//countdown();
//this function brings everything together and acts as the 'brain' of the program
function coreLogic()  {
  countdown();
  render();
  while (timeLeft > 0) {

  }
}

var highScores = [];
startBtn.addEventListener("click", function (event) {
  coreLogic();
});

backBtn.addEventListener("click", function (event) {
  location.reload();
});
