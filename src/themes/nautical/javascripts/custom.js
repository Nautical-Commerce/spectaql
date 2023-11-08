document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.nav-group-title');
  
  elements.forEach((el) => {
    const content = el.textContent.trim();
    if (['Queries', 'Mutations', 'Types', 'Definitions'].includes(content)) {
      // Initialize with a '+' sign for expandable items
      el.innerHTML += ' <span class="toggle-sign">+</span>';
      
      const nextUl = el.nextElementSibling;
      if (nextUl && nextUl.tagName === 'UL') {
        // Hide the UL initially
        nextUl.style.display = 'none';
        nextUl.classList.add('schema-section');

        // Assign an onclick function to toggle the UL visibility and sign
        el.addEventListener('click', function () {
          toggleNavItems(nextUl, this);
        });

        // Add specific class based on content
        addNavItemClass(el, content);
      }
    }
  });
});

function toggleNavItems(ulElement, navGroupTitle) {
  const isHidden = ulElement.style.display === 'none';
  ulElement.style.display = isHidden ? 'block' : 'none'; // Toggle display

  // Update the toggle sign based on the UL visibility
  const toggleSign = navGroupTitle.querySelector('.toggle-sign');
  toggleSign.textContent = isHidden ? '-' : '+';
}

function addNavItemClass(navGroupTitle, content) {
  const classMap = {
    'Queries': 'query-nav-item',
    'Mutations': 'mutation-nav-item',
    'Types': 'types-nav-item',
    'Definitions': 'definitions-nav-item',
  };

  // Add the new class based on the mapping
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
