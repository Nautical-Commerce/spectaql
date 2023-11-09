// Toggles the 'expanded' class on the clicked 'operation-section' h6 element
// and toggles the 'expanded' class on the related 'schema-section' ul element.
function toggleNavItem(operationSection) {
  operationSection.classList.toggle('expanded');
  let schemaSection = operationSection.nextElementSibling;
  if (schemaSection && schemaSection.classList.contains('schema-section')) {
    schemaSection.classList.toggle('expanded');
  }
}

// Automatically expands the 'operation-section' and 'schema-section'
// if they contain a '.nav-scroll-active' link.
function updateSectionsBasedOnActiveClass() {
  document.querySelectorAll('.operation-section').forEach(operationSection => {
    const schemaSection = operationSection.nextElementSibling;
    if (schemaSection && schemaSection.classList.contains('schema-section')) {
      const activeLink = schemaSection.querySelector('li a.nav-scroll-active');
      if (activeLink) {
        operationSection.classList.add('expanded');
        schemaSection.classList.add('expanded');
      }
    }
  });
}

let timeoutId = null;

function throttledUpdateSections() {
  // Clear the previous timeout if it exists
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  // Set a timeout to update sections after a short delay
  // This reduces the frequency of updates during scroll
  timeoutId = setTimeout(updateSectionsBasedOnActiveClass, 200);
}

// Listen for scroll events and use the throttled function instead
document.addEventListener('scroll', throttledUpdateSections);
window.addEventListener('hashchange', updateSectionsBasedOnActiveClass);


// get anchor link function definition
function copyAnchor(clickedElement) {
  var operationElement = clickedElement.closest('.operation');
  var definitionElement = clickedElement.closest('.definition');

  var id;
  if (operationElement) {
    id = operationElement.getAttribute('id');
  } else if (definitionElement) {
    id = definitionElement.getAttribute('id');
  }

  if (!id) {
    // Alert the user if no id is found
    alert("Link cannot be copied. No 'operation' or 'definition' element found.");
    return;
  }

  var url = window.location.href.split('#')[0] + '#' + id;
  navigator.clipboard.writeText(url).then(function() {
    /* Clipboard successfully set */
    console.log('Anchor URL copied to clipboard.');
  }, function() {
    /* Clipboard write failed */
    console.error('Failed to copy anchor URL.');
  });

  window.history.replaceState(null, null, '#' + id);
  document.getElementById(id).scrollIntoView();
}
