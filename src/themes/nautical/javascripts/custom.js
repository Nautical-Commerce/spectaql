document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.nav-group-title');
  
  elements.forEach((el) => {
    const content = el.textContent.trim();

    if (['Queries', 'Mutations', 'Types', 'Definitions'].includes(content)) {
      // Append the plus sign for expandable items
//      appendExpandSign(el);

//      const nextUl = el.nextElementSibling;
//      if (nextUl && nextUl.tagName === 'UL') {
        // Hide the UL initially
//        nextUl.style.display = 'none';

        // Assign an onclick function to toggle the UL
 //       el.addEventListener('click', () => toggleNavItems(nextUl, el));

        // Add specific class based on content
        addNavItemClass(el, content);
      
    }
  });
});

function addNavItemClass(navGroupTitle, content) {
  const classMap = {
    'Queries': 'query-nav-item',
    'Mutations': 'mutation-nav-item',
    'Types': 'types-nav-item',
  };

  // Add the new class
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
