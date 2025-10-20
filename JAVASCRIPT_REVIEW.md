# JavaScript Code Review & Optimization Report

## 🔴 Critical Issues

### 1. **Missing Element Reference (index.html:594)**
```javascript
const selectSpacesBtn = document.getElementById('modal-select-spaces-btn');
```
**Issue**: This element doesn't exist in your HTML.
**Impact**: `selectSpacesBtn` will be `null`, causing errors on line 852.
**Fix**: Either remove the button functionality or add the button to your HTML.

### 2. **Duplicate Query Selector (index.html:660 & 729)**
```javascript
// Line 660:
const adminOfficeOverlay = document.querySelector('.admin-office-overlay');

// Line 729:
const adminOfficeOverlay = document.querySelector('.admin-office-overlay');
```
**Issue**: Same element queried twice.
**Fix**: Remove the duplicate on line 729, use the one from line 660.

### 3. **Inefficient Global Event Listener (index.html:875-883)**
```javascript
document.addEventListener('click', function (e) {
    if (!popover.contains(e.target) && popover.style.display === 'block') {
        hidePopover();
        clickableAreas.forEach(area => {
            area.style.display = 'block';
        });
    }
});
```
**Issue**: Runs on EVERY document click, even when popover isn't visible.
**Impact**: Performance degradation.

---

## ⚠️ Performance Issues

### 4. **Multiple Hover Event Listeners with Inline Styles (index.html:760-766)**
```javascript
area.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.05)';
});
area.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
});
```
**Issue**: Manipulating inline styles triggers reflows. Should use CSS classes.
**Fix**:
```javascript
area.addEventListener('mouseenter', function () {
    this.classList.add('hover-scale');
});
area.addEventListener('mouseleave', function () {
    this.classList.remove('hover-scale');
});
```
Add to CSS:
```css
.clickable-area.hover-scale {
    transform: scale(1.05);
}
```

### 5. **Redundant Code in Accordion (index.html:566-573)**
```javascript
function initAccordion() {
    if (mq.matches) {
        closeAll();
    } else {
        closeAll();  // ← Duplicate!
        panels.forEach(panel => panel.setAttribute('aria-hidden', 'false'));
    }
    updateAccordionDisplay();
}
```
**Fix**:
```javascript
function initAccordion() {
    closeAll();
    if (!mq.matches) {
        panels.forEach(panel => panel.setAttribute('aria-hidden', 'false'));
    }
    updateAccordionDisplay();
}
```

### 6. **Excessive DOM Queries (index.html:549, 556, 660)**
```javascript
// Called multiple times:
document.querySelectorAll('.footer-heading').forEach(...)
document.querySelector('.admin-office-overlay')
```
**Fix**: Cache these selectors at the top level.

### 7. **String Concatenation Instead of Template Literals (index.html:800)**
```javascript
document.getElementById(tabName + '-content').classList.add('active');
```
**Fix**:
```javascript
document.getElementById(`${tabName}-content`).classList.add('active');
```

---

## 🐛 Bug Fixes & Logic Issues

### 8. **Popover Uses currentSpace Before It's Set (index.html:772)**
```javascript
popoverViewBtn.addEventListener('click', function () {
    hidePopover();
    showDetailScene(currentSpace, currentSystem);  // ← currentSpace is still null!
});
```
**Issue**: `currentSpace` and `currentSystem` aren't set when the popover is opened.
**Fix**: Store space/system when showing popover:
```javascript
function showPopover(space, system, x, y) {
    currentSpace = space;  // ← Add this
    currentSystem = system;  // ← Add this
    popoverSpaceName.textContent = space.charAt(0).toUpperCase() + space.slice(1);
    popoverSystemName.textContent = system;
    popover.style.display = 'block';
    popover.style.left = x + 'px';
    popover.style.top = y + 'px';
}
```

### 9. **Uncached Space Name Transformation (index.html:679, 716)**
```javascript
// Repeated twice:
space.charAt(0).toUpperCase() + space.slice(1)
```
**Fix**: Create a helper function:
```javascript
function capitalizeSpace(space) {
    return space.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
```

---

## 🚀 Optimization Recommendations

### 10. **Event Delegation Instead of Multiple Listeners (index.html:814-826)**
```javascript
// Current: Adds listener to each button
carouselPrevBtns.forEach(btn => {
    btn.addEventListener('click', function () { ... });
});
carouselNextBtns.forEach(btn => {
    btn.addEventListener('click', function () { ... });
});
```
**Better**:
```javascript
document.addEventListener('click', function(e) {
    if (e.target.closest('.carousel-prev')) {
        currentProductIndex = currentProductIndex > 0 ? currentProductIndex - 1 : productCards.length - 1;
        showProduct(currentProductIndex);
    } else if (e.target.closest('.carousel-next')) {
        currentProductIndex = currentProductIndex < productCards.length - 1 ? currentProductIndex + 1 : 0;
        showProduct(currentProductIndex);
    }
});
```

### 11. **Unnecessary Array.from Conversions (index.html:497-498)**
```javascript
const accordionBtns = Array.from(document.querySelectorAll('.footer-accordion-btn'));
const panels = Array.from(document.querySelectorAll('.footer-accordion-panel'));
```
**Better**: Only convert when needed:
```javascript
const accordionBtns = document.querySelectorAll('.footer-accordion-btn');
const panels = document.querySelectorAll('.footer-accordion-panel');
```

---

## 🔒 Security & Best Practices

### 12. **header.js: Potential XSS Vulnerability (header.js:755-757)**
```javascript
btn.innerHTML = 
    (item.icon ? `<img src="${item.icon}" alt="" />` : '') +
    `<span>${item.title}</span>` + ...
```
**Issue**: `item.icon` and `item.title` from JSON aren't sanitized.
**Fix**: Use `textContent` or sanitize data:
```javascript
const img = document.createElement('img');
img.src = item.icon;
img.alt = '';
const span = document.createElement('span');
span.textContent = item.title;  // ← Safe
```

### 13. **Alert Usage (index.html:857, 859)**
```javascript
alert(`Selected spaces: ${selectedSpaces.join(', ')}`);
alert('Please select at least one space');
```
**Issue**: `alert()` blocks the UI and is poor UX.
**Fix**: Use custom modals or toast notifications.

---

## 📱 Accessibility Issues

### 14. **Missing Focus Management When Modal Opens (index.html:629-633)**
```javascript
selectSpaceBtn.addEventListener('click', function () {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    showBuildingOverview();
});
```
**Fix**: Add focus management:
```javascript
selectSpaceBtn.addEventListener('click', function () {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    showBuildingOverview();
    closeBtn.focus();  // ← Move focus to close button
});
```

### 15. **No Focus Trap in Modal**
**Issue**: Users can tab outside the modal.
**Fix**: Implement focus trap (keep focus within modal when open).

---

## 🎯 header.js Specific Issues

### 16. **Class Usage with Functions (header.js:9-242)**
**Issue**: Using classes in procedural code unnecessarily.
**Consider**: These could be simple factory functions since you're not leveraging class benefits.

### 17. **Excessive DOM Queries (header.js:304, 310, 412, 432, 492, etc.)**
```javascript
document.querySelectorAll('.site-header__nav-link').forEach(...)
document.querySelectorAll('.dropdown-menu').forEach(...)
document.querySelectorAll('.submenu').forEach(...)
```
**Fix**: Cache these at initialization.

### 18. **Strategy Pattern Overkill (header.js:358-390)**
```javascript
class MenuStrategy { ... }
class MegaMenuStrategy extends MenuStrategy { ... }
class SubmenuStrategy extends MenuStrategy { ... }
```
**Issue**: Three nearly identical classes with minimal differences.
**Better**: Single function with conditional logic.

### 19. **Multiple Redundant Event Listeners (header.js:576-580, 629-635)**
```javascript
// Line 576:
document.querySelectorAll('.submenu').forEach(existingSubmenu => {
    if (existingSubmenu !== submenu) {
        existingSubmenu.style.display = 'none';
    }
});

// Line 512-518: Same pattern repeated
document.querySelectorAll('.submenu').forEach(submenu => {
    if (submenu !== state.activeSubmenu) {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});
```
**Fix**: Extract to a shared function.

---

## 💡 Best Practice Improvements

### 20. **Inconsistent Function Declarations**
- Some use arrow functions
- Some use function declarations
- Some use function expressions

**Recommendation**: Standardize based on your style guide.

### 21. **Magic Numbers (index.html:749-750)**
```javascript
const x = rect.left - modalRect.left + rect.width / 2 - 19;
const y = rect.top - modalRect.top - 235;
```
**Fix**: Use constants:
```javascript
const POPOVER_OFFSET_X = 19;
const POPOVER_OFFSET_Y = 235;
const x = rect.left - modalRect.left + rect.width / 2 - POPOVER_OFFSET_X;
const y = rect.top - modalRect.top - POPOVER_OFFSET_Y;
```

### 22. **Unused Variables (index.html:690-707)**
```javascript
const spaceData = {
    'classrooms': {
        equipment: [...]  // ← Never used
    },
    'gym': {
        equipment: [...]  // ← Never used
    }
};
```

---

## 📊 Summary

| Category | Count | Priority |
|----------|-------|----------|
| Critical Issues | 3 | 🔴 High |
| Performance Issues | 7 | 🟡 Medium |
| Bugs & Logic | 4 | 🔴 High |
| Security | 2 | 🟠 Medium-High |
| Accessibility | 2 | 🟠 Medium-High |
| Best Practices | 8 | 🟢 Low-Medium |

**Total Issues Found: 26**

---

## 🎯 Priority Fix List

1. ✅ Fix missing `selectSpacesBtn` reference
2. ✅ Fix `currentSpace` bug in popover
3. ✅ Remove duplicate `adminOfficeOverlay` query
4. ✅ Optimize document-level click listener
5. ✅ Replace inline style manipulation with CSS classes
6. ✅ Add focus management to modal
7. ⚠️ Sanitize HTML in header.js
8. ⚠️ Replace alerts with better UX
9. 📈 Cache repeated DOM queries
10. 📈 Implement event delegation for carousels

---

## 📝 Notes

- Your accordion code is well-structured with good keyboard support ✅
- Consider extracting the modal logic into a separate module
- header.js is over-engineered but functional
- Overall code is readable and maintainable

Would you like me to implement any of these fixes?

