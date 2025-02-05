let timeLeft = 300; // Default 5 minutes in seconds
let totalTime = 300; // Keep track of total time for progress calculation
let timerInterval;

const timerElement = document.getElementById("timer");
const progressElement = document.getElementById("progress");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const customTimeInput = document.getElementById("customTime");
const setTimeButton = document.getElementById("setTimeButton");
const endSound = document.getElementById("endSound");

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  timerElement.textContent = formatTime(timeLeft);
  updateProgressBar();
}

function updateProgressBar() {
  const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
  progressElement.style.width = `${progressPercentage}%`;
}

function startTimer() {
  if (timerInterval) return; // Prevent multiple intervals
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      endSound.play(); // Play sound when time is up
      alert("Time's up!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = totalTime = 300; // Reset to default 5 minutes
  updateTimerDisplay();
}

function setCustomTime() {
  const customMinutes = parseInt(customTimeInput.value);
  if (customMinutes > 0) {
    timeLeft = totalTime = customMinutes * 60;
    updateTimerDisplay();
    customTimeInput.value = ""; // Clear the input
  } else {
    alert("Please enter a valid number of minutes.");
  }
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
setTimeButton.addEventListener("click", setCustomTime);

// Initialize the timer display and progress bar
updateTimerDisplay();
