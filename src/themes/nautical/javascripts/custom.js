document.addEventListener("DOMContentLoaded", function() {
  let firstQuery = document.querySelector('.query-nav-item');
  if (firstQuery) {
    firstQuery.classList.add('first-query');
  }

  let firstMutation = document.querySelector('.mutation-nav-item');
  if (firstMutation) {
    firstMutation.classList.add('first-mutation');
  }
});

document.addEventListener("DOMContentLoaded", function() {
  let uls = document.querySelectorAll('ul.nav-group-section-items');

  uls.forEach((ul) => {
    let firstQuery = ul.querySelector('.query-nav-item');
    if (firstQuery) {
      firstQuery.classList.add('first-query');
    }

    let firstMutation = ul.querySelector('.mutation-nav-item');
    if (firstMutation) {
      firstMutation.classList.add('first-mutation');
    }
  });
});