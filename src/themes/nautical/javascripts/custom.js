document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.copy-icon').forEach(function(element) {
    element.addEventListener('click', function() {
      var id = this.closest('.operation').getAttribute('id');
      var url = window.location.href.split('#')[0] + '#' + id;
      navigator.clipboard.writeText(url);

      window.history.replaceState(null, null, '#' + id);
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

      var successMessage = this.nextElementSibling;
      successMessage.style.display = 'inline-block';
      setTimeout(function() {
        successMessage.style.display = 'none';
      }, 400);
    });
  });
});
