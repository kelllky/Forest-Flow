// Function to start the timer
function startTimer(durationSeconds) {
  let remainingTime = durationSeconds;
  const countdownElement = document.getElementById("countdown");

  // Function to update the countdown
  function updateCountdown() {
      if (remainingTime <= 0) {
          clearInterval(interval);
          document.getElementById("notification").innerText = "Time's up! Take a break.";
          countdownElement.innerText = "00:00";
          showNotification();
          return;
      }

      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      countdownElement.innerText = 
          `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      remainingTime--;  // Decrease the time by 1 second
  }

  updateCountdown(); // Ensure it updates immediately
  const interval = setInterval(updateCountdown, 1000); // Update every second
}

// Function to show notification
function showNotification() {
  if (Notification.permission === "granted") {
      new Notification("Time's up! Take a break!");
  } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
          if (permission === "granted") {
              new Notification("Time's up! Take a break!");
          }
      });
  }
}

// Run this when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Automatically set timer to 5 minutes (300 seconds)
  const fiveMinutes = 30 * 60;  // 5 minutes in seconds
  startTimer(fiveMinutes);  // Start the timer immediately
});

