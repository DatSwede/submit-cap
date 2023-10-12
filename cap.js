document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('form-1');
  const errorMsgElement = document.querySelector('[msg="cap"]');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const now = new Date().getTime();
      const twelveHours = 12 * 60 * 60 * 1000;  // 12 hours in milliseconds
      let submissions = JSON.parse(localStorage.getItem('form-1-submissions') || "[]");
      
      // Filter out timestamps older than 12 hours
      submissions = submissions.filter(timestamp => now - timestamp < twelveHours);
      
      if (submissions.length >= 5) {
        // Display the error message element
        if (errorMsgElement) {
          errorMsgElement.style.display = 'block';
        }
        return false;
      } else {
        // Add current timestamp to the submissions array
        submissions.push(now);
        localStorage.setItem('form-1-submissions', JSON.stringify(submissions));
        form.submit(); // Submit the form
      }
    });
  }
});
