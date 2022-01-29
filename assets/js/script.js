var feedbackEl = document.querySelector("#feedback");
var initialsEl = document.querySelector("#initials");
var startBtn = document.querySelector("#start");
var submitBtn = document.querySelector("#submit");
var choicesEl = document.querySelector("#choices");
var timerEl = document.querySelector("#time");
var questionsEl = document.querySelector("#questions");

// Begins Quiz
function startQuiz() {
  // Removes Initial Body Wrapper, Replaced with Questions
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // Questions Start
  questionsEl.removeAttribute("class");

  // Timer Starts
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  // Prompts Question
  getQuestion();
}

// Initial Quiz Statements
var currentQuestionIndex = 0;
var time = questions.length * 12;
var timerId;

// Starts Questions
function getQuestion() {
  // Retrives Question From questions.js
  var currentQuestion = questions[currentQuestionIndex];

  // Removes main h1 and replaces with h2 Question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // Removes previous question pick
  choicesEl.innerHTML = "";

  //  Loops choices
  currentQuestion.choices.forEach(function(choice, i) {
    // New button appears after each question
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;

    // adds event listener for each question answer
    choiceNode.onclick = questionClick;

    choicesEl.appendChild(choiceNode);
  });
}

// What happens once one of possible answer has been clicked
function questionClick() {
  // Penalizes user if answer picked was wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 12;

    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "200%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "200%";
  }

  // Display if User was right or wrong
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1500);

  // Moves to next question
  currentQuestionIndex++;

  // Checks time
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // Stops timer
  clearInterval(timerId);

  // Move to end screen HTML
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // Shows User final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Hides Questions and replaces with Highscore HTML
  questionsEl.setAttribute("class", "hide");
}

// Updates the time for every new game
function clockTick() {
  time--;
  timerEl.textContent = time;

  // Checks if user ran out of time. if they did then they will be taken to end screen
  if (time <= 0) {
    quizEnd();
  }
}

// Saved highscore to localstorage
function saveHighscore() {
  // checks for value of input user box
  var initials = initialsEl.value.trim();

  // get saved scores from localstorage, if empty then sets to null array
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    };

    var newScore = {
      score: time,
      initials: initials
    };

    // Saves to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Moves to highscore end screen
    window.location.href = "highscore.html";
};

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;