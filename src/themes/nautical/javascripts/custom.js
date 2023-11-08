document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.nav-group-title');
  
  elements.forEach((el) => {
    const content = el.textContent.trim();
    if (['Queries', 'Mutations', 'Types', 'Definitions'].includes(content)) {
      const nextUl = el.nextElementSibling;
      if (nextUl && nextUl.tagName === 'UL') {
        // Hide the UL initially
        nextUl.style.display = 'none';
        nextUl.classList.add('schema-section');

        // Assign an onclick function to toggle the UL
        el.addEventListener('click', () => toggleNavItems(nextUl));

        // Monitor changes to the active class on the a elements
        const links = nextUl.querySelectorAll('a');
        links.forEach(link => {
          new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
              if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                // If the nav-scroll-active class was added, show the UL
                if (link.classList.contains('nav-scroll-active')) {
                  nextUl.style.display = '';
                }
              }
            }
          }).observe(link, { attributes: true });
        });

        // Add specific class based on content
        addNavItemClass(el, content);
      }
    }
  });
});

function toggleNavItems(ulElement) {
  const isHidden = ulElement.style.display === 'none';
  ulElement.style.display = isHidden ? '' : 'none';
}

function addNavItemClass(navGroupTitle, content) {
  const classMap = {
    'Queries': 'query-nav-item',
    'Mutations': 'mutation-nav-item',
    'Types': 'types-nav-item',
  };

  const className = classMap[content];
  if (className) {
    navGroupTitle.classList.add(className);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.copy-icon').forEach(function(element) {
    element.addEventListener('click', function() {
      var operationElement = this.closest('.operation');
      var definitionElement = this.closest('.definition');

      var id;
      if (operationElement) {
        id = operationElement.getAttribute('id');
      } else if (definitionElement) {
        id = definitionElement.getAttribute('id');
      }

      if (!id) {
        // Handle the case when neither '.operation' nor '.definition' is found.
        console.error("No '.operation' or '.definition' element found.");
        return;
      }

      var url = window.location.href.split('#')[0] + '#' + id;
      navigator.clipboard.writeText(url);

      window.history.replaceState(null, null, '#' + id);
      document.getElementById(id).scrollIntoView();

    });
  });
});
