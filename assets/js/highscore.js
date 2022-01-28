function printHighscores() {
    // Set to empty array or grab scores from localstorage
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    
    // In descending order, sort highscores by score property.
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // For each high score, create a li tag.
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // Show Highscore on Page
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
}
  
function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}
  
document.getElementById("clear").onclick = clearHighscores;
  
// Function runs everytime page loads
printHighscores();