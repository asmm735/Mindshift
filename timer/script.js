let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const stopButton = document.getElementById('stop'); // Assuming your Stop button has this ID
const progressRing = document.querySelector('.progress-ring');

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;
  progressRing.style.background = `conic-gradient(#ff6347 ${progress}%, #eee ${progress}% 100%)`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      alert('Time is up!');
      isRunning = false;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60; // Reset to 25 minutes
  updateTimerDisplay();
}

function stopTimer() {
  clearInterval(timer); // Stop the timer
  isRunning = false;
  timeLeft = 25 * 60; // Reset to initial state
  updateTimerDisplay(); // Update the display
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
stopButton.addEventListener('click', stopTimer); // Add event listener for Stop button

// Initialize display
updateTimerDisplay();
