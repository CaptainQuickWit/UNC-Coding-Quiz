// Question list
var questions = [
  {
      title: "Inside which HTML element do we put the JavaScript",
      choices: ["<HTML>", "<main>", "<javascript>", "<script>"],
      answer: "<script>"
  },
  {
      title: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "HyperLinks and Text Markup Language", "Home Tool Markup Langauge", "I dont know"],
      answer: "Hyper Text Markup Language"
  },
  {
      title: "What is an Array?",
      choices: ["A single variable that lets you store multipel elements", "primitive data type", "a conditional statement", "all of the above"],
      answer: "A single variable that lets you store multipel elements"
  },
  {
      title: "What is javascript",
      choices: ["a prototype-based langauge", "a lanague having object oriented features", "both above", "none of the above"],
      answer: "both above"
  },
  {
      title: "What is github?",
      choices: ["the same as git", "the terminal / bash", "not important", "a collaboration site for programmers"],
      answer: "a collaboration site for programmers"
  },

];

// Global variables
var beginQuiz = document.querySelector("#mothafuka");
var timerDisplay = document.querySelector(".timer");
var quizCard = document.querySelector("#quizCard");
var start = document.querySelector(".start");
var title = document.querySelector("#title");

var A = document.querySelector("#A");
var B = document.querySelector("#B");
var C = document.querySelector("#C");
var D = document.querySelector("#D");
var answer = document.querySelector("#answer");
var feedback = document.querySelector("#response1");

var multipleCard = document.querySelector("#multipleCard");
var scoreForm = document.querySelector("#scoreForm");
var scoreCard = document.querySelector("#scoreCard");

var nameBox = document.querySelector("#nameBox");
var submitBtn = document.querySelector("#submitBtn");
var backBtn = document.querySelector("#backBtn");
var highScoreBtn = document.querySelector("#highScoreBtn");
var scoreBtn = document.querySelector("#scoreBtn");
var clearBtn = document.querySelector("#clearBtn");


var timeLeft = questions.length * 15;
var q = 0;
var s = 0;
var score = 0;
var scoreList = [];
var timeInterval;

getScore();

// Start the timer
function timer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = "TIMER: " + timeLeft;
    if (timeLeft === 0 || q >= questions.length) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}


// Displaying questions & answers from questions object
function displayQA() {
  
  if (q < questions.length) {
    title.textContent = questions[q].title;
    console.log(questions[q].choices[0]);
    A.textContent = questions[q].choices[0];
    B.textContent = questions[q].choices[1];
    C.textContent = questions[q].choices[2];
    D.textContent = questions[q].choices[3];
  } else { 
    gameOver();
  }
}


// Shows the player if their choice is right or wrong
function compareAnswer(event) {
  if (q >= questions.length) {
    gameOver();
    clearInterval(timeInterval);
  } else {
    if (event === questions[q].answer) {
      response1.textContent = "Correct!";
    } else {
      timeLeft -= 10;
      response1.textContent = "Incorrect";
    }
    score = timeLeft;
    q++;
    displayQA();
  }
}


// Retriving scores from local storage
function getScore() {
  var storedScore = JSON.parse(localStorage.getItem("highScore"));
  if (storedScore !== null) {
    scoreList = storedScore;
  }
}


// Save scores to local storage
function saveScore() {
  localStorage.setItem("highScore", JSON.stringify(scoreList));
}


// Display game over screen 
function gameOver() {
  scoreBtn.innerHTML = score;
  scoreBtn.style.display = "inline-block";
  quizCard.classList.add("hide");
  scoreForm.classList.remove("hide");
  timerDisplay.classList.add("hide");
  highScoreBtn.classList.add("hide");
  leaderBoard();
}


// Show top 10 scores from storage
function leaderBoard() {
  removeFromLeaderBoard();
  addToLeaderBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });

  topTen = scoreList.slice(0, 10);

  for (var i = 0; i < topTen.length; i++) {
    var player = topTen[i].player;
    var score = topTen[i].score;

    var newDiv = document.createElement("div");
    leaderBoardDiv.appendChild(newDiv);

    var newLabel = document.createElement("label");
    newLabel.textContent = player + " - " + score;
    newDiv.appendChild(newLabel);
  }
}


// Add name to the leader board
function addToLeaderBoard() {
  leaderBoardDiv = document.createElement("div");
  leaderBoardDiv.setAttribute("id", "playerInitials");
  document.getElementById("leaderBoard").appendChild(leaderBoardDiv);
}


// Clear names from leader board
function removeFromLeaderBoard() {
  var removeScores = document.getElementById("playerInitials");
  if (removeScores !== null) {
    removeScores.remove();
  } else {
  }
}


// Event listeners
beginQuiz.addEventListener("click", function (event) {
  timer();
  displayQA();
  start.classList.add("hide");
  quizCard.classList.remove("hide");
  highScoreBtn.style.display = "none";
  scoreCard.classList.add("hide");
});

multipleChoiceCard.addEventListener("click", function (event) {
  var event = event.target;
  compareAnswer(event.textContent.trim());
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var playerInitials = nameBox.value.trim();
  var newScore = {
    player: playerInitials,
    score: score,
  };
  
  scoreList.push(newScore);
  saveScore();
  leaderBoard();
  scoreForm.classList.add("hide");
  scoreCard.classList.remove("hide");
});

highScoreBtn.addEventListener("click", function (event) {
  scoreCard.classList.remove("hide");
  highScoreBtn.classList.add("hide");
  start.classList.add("hide");
  leaderBoard();
});


backBtn.addEventListener("click", function (event) {
  location.reload();
});

clearBtn.addEventListener("click", function (event) {
  scoreList = [];
  start.classList.add("hide");
  localStorage.setItem("highScore", JSON.stringify(scoreList));
  leaderBoard();
  saveScore();
});