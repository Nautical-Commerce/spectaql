function scrollSpy() {
  var INIT_DELAY_MS = 400
  var SCROLL_DEBOUNCE_MS = 0
  var RESIZE_DEBOUNCE_MS = 400

  var PADDING = 0
  // If we are applying a scroll padding, we'll be doing it to the HTML element
  // so we'll check it to see if we should do something different than the default
  // by trying to get the value from the styles
  var htmlElement = document.querySelector('html')
  if (htmlElement) {
    var scrollPaddingTop = window.getComputedStyle(htmlElement).scrollPaddingTop
    if (
      scrollPaddingTop &&
      typeof scrollPaddingTop === 'string' &&
      scrollPaddingTop !== 'auto' &&
      scrollPaddingTop.endsWith('px')
    ) {
      PADDING = PADDING + parseInt(scrollPaddingTop.split('px')[0])
    }
  }
  var ACTIVE_CLASS = 'nav-scroll-active'
  var EXPAND_CLASS = 'nav-scroll-expand'
  var EXPANDABLE_SELECTOR = '.nav-group-section'

  var currentIndex = null
  var sections = [] // [{ id: 'query-someQuery', top: 1234 }]

  function init() {
    findScrollPositions()
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
  }

  function findScrollPositions() {
    // Inspired by: https://codepen.io/zchee/pen/ogzvZZ
    currentIndex = null
    var allScrollableItems = document.querySelectorAll('[data-traverse-target]')
    Array.prototype.forEach.call(allScrollableItems, function (e) {
      sections.push({ id: e.id, top: e.offsetTop })
    })
  }

  function toggleSection(section, shouldExpand) {
    if (shouldExpand) {
      // Logic to show or expand the section
      section.style.display = 'block'; // or any other logic to expand the section
    } else {
      // Logic to hide or collapse the section
      section.style.display = 'none'; // or any other logic to collapse the section
    }
  }

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  var handleResize = debounce(function () {
    findScrollPositions()
    handleScroll()
  }, RESIZE_DEBOUNCE_MS)

  var lastExpandedSection = null; // New variable to keep track of the last expanded section

  var handleScroll = debounce(function () {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    var index = getVisibleSectionIndex(scrollPosition);
  
      // Use the updated function to check if lastExpandedSection is out of view.
      if (lastExpandedSection && !isElementInViewport(lastExpandedSection)) {
        toggleSection(lastExpandedSection, false);
        lastExpandedSection = null;
      }      
    
    if (index === currentIndex) {
      return
    }

    currentIndex = index;
    var section = sections[index];
  
    var activeEl = document.querySelector(`.${ACTIVE_CLASS}`);
    var nextEl = section ? document.querySelector('#nav a[href="#' + section.id + '"]') : null;
  
    var parentNextEl = getParentSection(nextEl);
    var parentActiveEl = getParentSection(activeEl);
    var isDifferentParent = parentActiveEl !== parentNextEl;
  
    if (parentActiveEl && isDifferentParent) {
      toggleSectionExpansion(parentActiveEl, false);
    }
    if (parentNextEl && isDifferentParent) {
      toggleSectionExpansion(parentNextEl, true);
      lastExpandedSection = parentNextEl; // Update the last expanded section
    }

    if (nextEl) {
      nextEl.classList.add(ACTIVE_CLASS)
      if (nextEl.scrollIntoViewIfNeeded) {
        nextEl.scrollIntoViewIfNeeded()
      } else if (nextEl.scrollIntoView && !isElementInViewport(nextEl)) {
        nextEl.scrollIntoView({ block: 'center', inline: 'start' })
      }
      expandParentUlForActiveItem(nextEl);
    }

    if (activeEl) {
      activeEl.classList.remove(ACTIVE_CLASS)
    }
  }, SCROLL_DEBOUNCE_MS)

  // New function to expand the parent UL if it contains an active link
function expandParentUlForActiveItem(activeLink) {
  // Get closest UL that is an ancestor of the active link
  var ul = activeLink.closest('ul');
  if (!ul) {
    return; // If there's no ul, nothing to expand
  }

  // Find the associated nav-group-title
  var navGroupTitle = ul.previousElementSibling;
  if (navGroupTitle && navGroupTitle.classList.contains('nav-group-title')) {
    // Check the content and update accordingly
    var content = navGroupTitle.textContent.trim();
    var itemType = content.split(' ')[0]; // Assuming the format is 'Type +'
    if (content.endsWith('+')) {
      // Only proceed if the content ends with a '+', indicating it's collapsible
      ul.style.display = 'block'; // Show the UL
      navGroupTitle.textContent = itemType + ' -'; // Update the text to show '-'
      // Ensure the proper class is added to the navGroupTitle for styling if needed
      addNavItemClass(navGroupTitle, itemType);
    }
  }
}

  function toggleSectionExpansion(element, shouldExpand) {
    const classListFunc = shouldExpand ? 'add' : 'remove'
    while (element) {
      element.classList[classListFunc](EXPAND_CLASS)
      element = getParentSection(element.parentNode)
    }
  }

  function getParentSection(el) {
    if (!el || !el.closest) return null
    return el.closest(EXPANDABLE_SELECTOR)
  }

  function getVisibleSectionIndex(scrollPosition) {
    var positionToCheck = scrollPosition + PADDING
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i]
      var nextSection = sections[i + 1]
      if (
        positionToCheck >= section.top &&
        (!nextSection || positionToCheck < nextSection.top)
      ) {
        return i
      }
    }
    return -1
  }

  setTimeout(init, INIT_DELAY_MS)
}