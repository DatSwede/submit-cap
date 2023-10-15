document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('form-1');
  const errorMsgElement = document.querySelector('[msg="cap"]');
  const remainingSubmissionsElement = document.querySelector('[cap="number"]');

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

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const submissions = updateRemainingSubmissionsDisplay();

      if (submissions.length >= 5) {
        // Display the error message element
        if (errorMsgElement) {
          errorMsgElement.style.display = 'flex';
        }
        return false;
      } else {
        const now = new Date().getTime();
        // Add current timestamp to the submissions array
        submissions.push(now);
        localStorage.setItem('form-1-submissions', JSON.stringify(submissions));
        form.submit(); // Submit the form
      }
    });
  }

  // Initial display update
  updateRemainingSubmissionsDisplay();
});
