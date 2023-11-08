document.addEventListener('DOMContentLoaded', function () {
  const navItems = document.querySelectorAll('.nav-group-title');

  // Initialize all navItems with a '+' sign
  navItems.forEach(navItem => {
    const content = navItem.textContent.trim();
    if (['Queries', 'Mutations', 'Types', 'Definitions'].includes(content)) {
      appendSign(navItem, '+');
      const nextUl = navItem.nextElementSibling;
      if (nextUl && nextUl.tagName === 'UL') {
        nextUl.style.display = 'none'; // Hide UL initially
        nextUl.classList.add('schema-section');
        navItem.addEventListener('click', function () {
          toggleNavItems(nextUl, this);
        });
        addNavItemClass(navItem, content);
      }
    }
  });

  // Function to check and update the expansion and signs based on active class
  function updateSectionsBasedOnActiveClass() {
    navItems.forEach(navItem => {
      const nextUl = navItem.nextElementSibling;
      if (nextUl && nextUl.classList.contains('schema-section')) {
        // Check if any <a> within the <ul> has the 'nav-scroll-active' class
        const activeLink = nextUl.querySelector('li a.nav-scroll-active');
        const isExpanded = nextUl.style.display === 'block';

        if (activeLink && !isExpanded) {
          // Expand and update sign if there's an active link and the section is not already expanded
          nextUl.style.display = 'block';
          updateSign(navItem, '-');
        } else if (!activeLink && isExpanded) {
          // Collapse and update sign if there's no active link and the section is expanded
          nextUl.style.display = 'none';
          updateSign(navItem, '+');
        }
      }
    });
  }

  // Listen to scroll events for changing active section
  document.addEventListener('scroll', updateSectionsBasedOnActiveClass);

  // Listen for hash changes (when jumping to a section)
  window.addEventListener('hashchange', updateSectionsBasedOnActiveClass);
});

function toggleNavItems(ulElement, navGroupTitle) {
  const isHidden = ulElement.style.display === 'none';
  ulElement.style.display = isHidden ? 'block' : 'none';
  updateSign(navGroupTitle, isHidden ? '-' : '+');
}

function appendSign(navGroupTitle, sign) {
  navGroupTitle.innerHTML += ` <span class="toggle-sign">${sign}</span>`;
}

function updateSign(navGroupTitle, sign) {
  const toggleSign = navGroupTitle.querySelector('.toggle-sign');
  if (toggleSign) {
    toggleSign.textContent = sign;
  }
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

//copy header anchor link 
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