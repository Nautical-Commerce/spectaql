document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.nav-group-title');
  
  elements.forEach((el) => {
    const content = el.textContent.trim();

    if (['Queries', 'Mutations', 'Types', 'Definitions'].includes(content)) {
      // Append the plus sign for expandable items
      appendExpandSign(el);

      const nextUl = el.nextElementSibling;
      if (nextUl && nextUl.tagName === 'UL') {
        // Hide the UL initially
        nextUl.style.display = 'none';

        // Assign an onclick function to toggle the UL
        el.addEventListener('click', () => toggleNavItems(nextUl, el));

        // Add specific class based on content
        addNavItemClass(el, content);
      }
    }
  });
});

function toggleNavItems(ul, triggerEl) {
  const isExpanded = ul.style.display === 'block';
  // Toggle display and text content, and ARIA attributes for accessibility
  ul.style.display = isExpanded ? 'none' : 'block';
  triggerEl.textContent = triggerEl.textContent.replace(isExpanded ? '+' : '-', isExpanded ? '-' : '+');
  triggerEl.setAttribute('aria-expanded', !isExpanded);
}

function appendExpandSign(el) {
  // Only append if not already present
  if (!el.textContent.includes('+')) {
    el.textContent += ' +';
  }
}

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