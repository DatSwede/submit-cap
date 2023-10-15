document.addEventListener("DOMContentLoaded", function() {
  const errorMsgElement = document.querySelector('[msg="cap"]');
  const remainingSubmissionsElement = document.querySelector('[cap="number"]');
  const submitButton = document.getElementById('request-btn');

  function updateRemainingSubmissionsDisplay() {
    const now = new Date().getTime();
    const twelveHours = 12 * 60 * 60 * 1000;  // 12 hours in milliseconds
    let submissions = JSON.parse(localStorage.getItem('form-1-submissions') || "[]");
    submissions = submissions.filter(timestamp => now - timestamp < twelveHours);
    const remainingSubmissions = 5 - submissions.length;

    if (remainingSubmissionsElement) {
      remainingSubmissionsElement.textContent = remainingSubmissions.toString();
    }

    if (remainingSubmissions <= 0) {
      if (submitButton) {
        submitButton.style.display = 'none';
      }
      if (errorMsgElement) {
        errorMsgElement.style.display = 'flex';
      }
    }
  }

  // Initial display update
  updateRemainingSubmissionsDisplay();
});
