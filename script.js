var questions = [
  {
      title: "Inside which HTML element do we put the JavaScript",
      choices: ["<HTML>", "<main>", "<javascript>", "<script>"],
      answer: "<script>",
      checked:false
  },
  {
      title: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "HyperLinks and Text Markup Language", "Home Tool Markup Langauge", "I dont know"],
      answer: "Hyper Text Markup Language",
      checked:false
  },
  {
      title: "What is an Array?",
      choices: ["A single variable that lets you store multipel elements", "primitive data type", "a conditional statement", "all of the above"],
      answer: "A single variable that lets you store multipel elements",
      checked:false
  },
  {
      title: "What is javascript",
      choices: ["a prototype-based langauge", "a lanague having object oriented features", "both above", "none of the above"],
      answer: "both above",
      checked:false
  },
  {
      title: "What is github?",
      choices: ["the same as git", "the terminal / bash", "not important", "a collaboration site for programmers"],
      answer: "a collaboration site for programmers",
      checked:false
  },

];



// Global variables

var executeQuiz = document.querySelector("#startBtn");
var timerDisplay = document.querySelector(".timer");
var gameCard = document.querySelector("#gameCard");
var start = document.querySelector(".start");
var title = document.querySelector("#title");

var choiceA = document.querySelector("#choiceA");
var choiceB = document.querySelector("#choiceB");
var choiceC = document.querySelector("#choiceC");
var choiceD = document.querySelector("#choiceD");
var answer = document.querySelector("#answer");
var feedback = document.querySelector("#response1");

var multipleChoiceCard = document.querySelector("#multipleChoiceCard");
var scoreForm = document.querySelector("#scoreForm");
var scoreCard = document.querySelector("#scoreCard");

var nameBox = document.querySelector("#nameBox");
var submitBtn = document.querySelector("#submitBtn");
var backBtn = document.querySelector("#backBtn");
var highScoreBtn = document.querySelector("#highScoreBtn");
var scoreBtn = document.querySelector("#scoreBtn");
var clearBtn = document.querySelector("#clearBtn");



var remainingLeft = questions.length * 15;
var questionIndex = 0;
var s = 0;
var score = 0;
var scoreList = [];
var timeInterval;

getScore();

// Start the timer
function timer() {
  length = questions.length;
  timeInterval = setInterval(function () {
    remainingLeft--;
    timerDisplay.textContent = "TIMER: " + remainingLeft;
    if (remainingLeft === 0 || questionIndex>= length) {
      clearInterval(timeInterval);
      terminate();
    }
  }, 1000);
}


// Displaying questions & answers from questions object
function render(what) {
  /*
  if (questionIndex< questions.length) {
    title.textContent = questions[questionIndex].title;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
  } else {
    terminate();
  }*/
  switch (what) {

    case "score": 
      
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
    break;

    case "question":

      length = questions.length;
      if (questionIndex > length) {
        terminate();
      } else {
        title.textContent = questions[questionIndex].title;
        choiceA.textContent = questions[questionIndex].choices[0];
        choiceB.textContent = questions[questionIndex].choices[1];
        choiceC.textContent = questions[questionIndex].choices[2];
        choiceD.textContent = questions[questionIndex].choices[3];
      }
    break;

    case "scoreboard":
      topTen = scoreList.slice(0, 10);
      leaderBoardDiv = document.createElement("div");
      leaderBoardDiv.setAttribute("id", "playerInitials");
      document.getElementById("leaderBoard").appendChild(leaderBoardDiv);
    break;

  }
  

}


// Shows the player if their choice is right or wrong
function check(event) {
  if (questionIndex >= questions.length) {
    terminate();
    clearInterval(timeInterval);
  } else {
    if (event === questions[questionIndex].answer) {
      response1.textContent = "Correct!";
    } else {
      remainingLeft -= 10;
      response1.textContent = "Incorrect";
    }
    score = remainingLeft;
    questionIndex++;
    render("question");
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
function terminate() {
  scoreBtn.innerHTML = score;
  scoreBtn.style.display = "inline-block";
  gameCard.classList.add("hide");
  scoreForm.classList.remove("hide");
  timerDisplay.classList.add("hide");
  highScoreBtn.classList.add("hide");
  leaderBoard();
}


// Show top 10 scores from storage
function leaderBoard() {
  removeFromLeaderBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });
  render("scoreboard");
  render("score");
  /*
  topTen = scoreList.slice(0, 10);
  for (var i = 0; i < topTen.length; i++) {
    var player = topTen[i].player;
    var score = topTen[i].score;
    var newDiv = document.createElement("div");
    leaderBoardDiv.appendChild(newDiv);
    var newLabel = document.createElement("label");
    newLabel.textContent = player + " - " + score;
    newDiv.appendChild(newLabel);
  }*/
}


// Add name to the leader board
/*
function addToLeaderBoard() {
  
  leaderBoardDiv = document.createElement("div");
  leaderBoardDiv.setAttribute("id", "playerInitials");
  document.getElementById("leaderBoard").appendChild(leaderBoardDiv);
}*/


// Clear names from leader board
function removeFromLeaderBoard() {
  var removeScores = document.getElementById("playerInitials");
  if (removeScores !== null) {
    removeScores.remove();
  } else {
  }
}

function switchState(stage) {
  switch(stage) {
    case "start":
      start.classList.add("hide");
      gameCard.classList.remove("hide");
      highScoreBtn.style.display = "none";
      scoreCard.classList.add("hide");
      break;
    case "end":
      scoreBtn.innerHTML = score;
      scoreBtn.style.display = "inline-block";
      gameCard.classList.add("hide");
      scoreForm.classList.remove("hide");
      timerDisplay.classList.add("hide");
      highScoreBtn.classList.add("hide");
      break;
    case "scoreSubmit":
      scoreForm.classList.add("hide");
      scoreCard.classList.remove("hide");
    break;

    default:
      if (stage.classList.contains("hide")) {
        stage.classList.remove("hide");
      } else {
        stage.classList.add("hide");
      }
  } 
    
}

// Event listeners
executeQuiz.addEventListener("click", function (event) {
  timer();
  render("question");
  switchState("start");
});

multipleChoiceCard.addEventListener("click", function (event) {
  var event = event.target;
  check(event.textContent.trim());
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