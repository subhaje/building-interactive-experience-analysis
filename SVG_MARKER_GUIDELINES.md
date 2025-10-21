# Interactive SVG Markers - Design Guidelines

## Overview
This document provides guidelines for creating interactive SVG images with clickable markers for the Greenheck building interactive experience. These SVGs allow users to click on specific building sections to load detailed HVAC information via API calls.

## Template File
Reference file: `Content/imgs/school/school-with-interactive-markers.svg`

## Key Requirements

### 1. SVG Structure

#### Required Elements
Each interactive SVG must include:
- Building illustration (can be isometric, top-down, or side view)
- Interactive markers for each clickable section
- Consistent marker styling
- Clear labels for each marker

#### File Organization
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900">
  <defs>
    <!-- Styles and reusable components -->
  </defs>
  
  <!-- Building structure -->
  <g id="building">
    <!-- Building sections -->
  </g>
  
  <!-- Interactive markers -->
  <g id="marker-[section-name]" class="interactive-marker">
    <!-- Marker elements -->
  </g>
</svg>
```

### 2. Marker Requirements

#### Essential Attributes
Every marker MUST have:

1. **Unique ID** (required for API calls)
   ```xml
   id="marker-classrooms"
   id="marker-admin-offices"
   id="marker-gym"
   ```
   
   Format: `marker-[section-name]` (lowercase, hyphenated)

2. **Class Name** (required for JavaScript selection)
   ```xml
   class="interactive-marker"
   ```

3. **Data Attribute** (optional, for additional metadata)
   ```xml
   data-section="classrooms"
   data-building-type="school"
   ```

#### Marker Visual Design
Standard marker consists of:
- Blue circle (fill: #0080ff, radius: 20)
- White plus sign (+) centered in circle
- Text label below the marker
- Hover state (scale: 1.1, fill: #0066cc)

Example marker structure:
```xml
<g id="marker-classrooms" 
   class="interactive-marker" 
   transform="translate(220, 280)" 
   data-section="classrooms">
  
  <!-- Circle background -->
  <circle class="marker-circle" r="20" />
  
  <!-- Plus icon -->
  <g class="marker-plus">
    <line x1="0" y1="-10" x2="0" y2="10" />
    <line x1="-10" y1="0" x2="10" y2="0" />
  </g>
  
  <!-- Label -->
  <text class="text-label" y="45">Classrooms</text>
</g>
```

### 3. Naming Conventions

#### Section IDs
Use lowercase with hyphens:
- ✅ `marker-science-lab`
- ✅ `marker-admin-offices`
- ❌ `marker-ScienceLab` (don't use camelCase)
- ❌ `marker_science_lab` (don't use underscores)

#### Common Section Names
Standard sections for school buildings:
- `marker-classrooms`
- `marker-science-lab`
- `marker-gym`
- `marker-cafeteria`
- `marker-kitchen`
- `marker-lobby`
- `marker-admin-offices`
- `marker-locker-room`
- `marker-library`
- `marker-auditorium`
- `marker-mechanical-room`

### 4. Styling Guidelines

#### Required CSS Classes
Include these classes in the SVG `<style>` section:

```css
.interactive-marker {
  cursor: pointer;
  transition: transform 0.2s ease;
  transform-origin: center;
  transform-box: fill-box;
}

.interactive-marker:hover {
  transform: scale(1.1);
}

.interactive-marker:hover .marker-circle {
  fill: #0066cc;
}

.marker-circle {
  fill: #0080ff;
  transition: fill 0.2s ease;
}

.marker-plus {
  fill: white;
  stroke: white;
  stroke-width: 2;
}

.text-label {
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  fill: white;
  text-anchor: middle;
  pointer-events: none;
}
```

### 5. Accessibility Requirements

Each marker should include:
```xml
<g id="marker-gym" 
   class="interactive-marker" 
   role="button" 
   tabindex="0"
   aria-label="View Gym HVAC solutions">
  <!-- marker content -->
</g>
```

### 6. ViewBox and Dimensions

#### Recommended Sizes
- Desktop: `viewBox="0 0 1400 900"` (16:10 ratio)
- Mobile: `viewBox="0 0 800 1000"` (portrait orientation)
- For responsive SVGs, use: `width="100%" height="auto"`
- Always include `preserveAspectRatio="xMidYMid meet"`

#### Responsive SVG Structure
```xml
<svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 1400 900" 
     width="100%" 
     height="auto" 
     preserveAspectRatio="xMidYMid meet">
  <!-- SVG content -->
</svg>
```

#### Responsive Considerations
- Use relative positioning (percentages or viewBox coordinates)
- Test marker clickability on mobile devices (minimum 44×44px touch target)
- Ensure adequate spacing between markers (minimum 80px)
- SVG will scale proportionally while maintaining aspect ratio
- Use CSS `max-width` to limit maximum size if needed

#### CSS for Responsive Container
```css
.svg-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.svg-container svg {
  display: block;
  width: 100%;
  height: auto;
}
```

### 7. Building Illustration Guidelines

#### Visual Style
- Clean, simplified isometric or 3D perspective
- Light gray tones for building (#d4d4d4)
- Blue-tinted windows (#87ceeb, opacity: 0.6)
- Darker gray for roofs (#a8a8a8)
- Green elements for landscaping (#4CAF50)

#### Level of Detail
- Focus on recognizable shapes and sections
- Avoid excessive detail that may not render well at smaller sizes
- Maintain clarity at 50% zoom level

### 8. File Optimization

#### Best Practices
- Remove unnecessary metadata and comments from final files
- Optimize paths using SVG optimization tools
- Keep file size under 200KB for fast loading
- Use `<use>` elements for repeated components

#### Recommended Tools
- SVGO (command-line optimization)
- Adobe Illustrator (Export As > SVG)
- Figma (Export > SVG with "Outline stroke" enabled)

### 9. Testing Checklist

Before submitting SVG files, verify:
- [ ] All markers have unique IDs
- [ ] All markers have `class="interactive-marker"`
- [ ] Hover effects work correctly
- [ ] Labels are readable and positioned correctly
- [ ] File renders properly in Chrome, Firefox, Safari
- [ ] Clickable areas are large enough (minimum 40×40px)
- [ ] SVG scales properly at different viewport sizes
- [ ] No console errors when loaded
- [ ] File size is optimized

### 10. Integration with JavaScript

#### How Developers Use These SVGs

```javascript
// 1. Select all interactive markers
const markers = document.querySelectorAll('.interactive-marker');

// 2. Add click handlers
markers.forEach(marker => {
  marker.addEventListener('click', (e) => {
    // Extract section ID from marker ID
    const markerId = e.currentTarget.id; // "marker-classrooms"
    const sectionId = markerId.replace('marker-', ''); // "classrooms"
    
    // 3. Call API with section ID
    fetch('/api/section-details', {
      method: 'POST',
      body: JSON.stringify({ sectionId })
    })
    .then(response => response.json())
    .then(data => displayPopup(data));
  });
});
```

### 11. Example Use Cases

#### K-12 Schools
Sections: Classrooms, Science Labs, Gym, Cafeteria, Library, Admin Offices

#### Healthcare Facilities
Sections: Patient Rooms, Operating Rooms, Emergency Department, Laboratory, Cafeteria, Mechanical Room

#### Office Buildings
Sections: Open Office, Conference Rooms, Server Room, Break Room, Lobby, Mechanical Room

#### Manufacturing Facilities
Sections: Production Floor, Warehouse, Office Area, Loading Dock, Clean Room

### 12. File Naming Convention

Format: `[building-type]-with-interactive-markers.svg`

Examples:
- `school-with-interactive-markers.svg`
- `hospital-with-interactive-markers.svg`
- `office-building-with-interactive-markers.svg`
- `manufacturing-plant-with-interactive-markers.svg`

### 13. Deliverables

For each building type, provide:
1. Full SVG file with interactive markers
2. List of all section IDs and their corresponding labels
3. Preview image (PNG, 1400×900px)
4. Any special notes or considerations

### 14. Support and Questions

For questions or clarification, please provide:
- Building type
- Number of sections/markers needed
- Any specific design constraints
- Reference images or sketches

---

## Quick Reference Template

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900">
  <defs>
    <style>
      /* Copy styles from template */
    </style>
  </defs>
  
  <!-- Building structure -->
  <g id="building">
    <!-- Your building illustration -->
  </g>
  
  <!-- Interactive Markers -->
  <g id="marker-[section-name]" 
     class="interactive-marker" 
     transform="translate(x, y)" 
     data-section="[section-name]">
    <circle class="marker-circle" r="20" />
    <g class="marker-plus">
      <line x1="0" y1="-10" x2="0" y2="10" />
      <line x1="-10" y1="0" x2="10" y2="0" />
    </g>
    <text class="text-label" y="45">[Label Text]</text>
  </g>
  
  <!-- Repeat for each marker -->
</svg>
```

## Version History
- v1.0 - Initial guidelines (October 2025)

