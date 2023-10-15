document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('form-1');
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
    return submissions;
  }

  if (form && submitButton) {
    form.addEventListener('submit', function(e) {
      const submissions = updateRemainingSubmissionsDisplay();
      const now = new Date().getTime();

      if (submissions.length >= 5) {
        // Hide the submission button
        submitButton.style.display = 'none';

        // Display the error message element
        if (errorMsgElement) {
          errorMsgElement.style.display = 'flex';
        }

        e.preventDefault();
        return false;
      } else {
        submissions.push(now);
        localStorage.setItem('form-1-submissions', JSON.stringify(submissions));
      }
    });
  }

  // Initial display update and check to hide button if limit is reached
  const submissions = updateRemainingSubmissionsDisplay();
  if (submissions.length >= 5) {
    submitButton.style.display = 'none';
  }
});
