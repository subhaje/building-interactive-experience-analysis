# Interactive SVG Markers - Delivery Package

## 📦 What's Included

This package contains everything your design team needs to create interactive SVG images with clickable markers for the Greenheck building experience.

---

## 📁 Files Delivered

### 1. **section-data.json** ⭐ NEW
**Location:** `Content/js/section-data.json`

**Purpose:** Dummy JSON data for all building sections (use instead of API for testing)

**Features:**
- Complete data for all 8 school sections
- Includes HVAC solutions, products, specs, and requirements
- ~25KB file size (fast loading)
- Ready to use immediately - no API needed!

**Contents:**
- Classrooms, Science Lab, Locker Room, Gym
- Lobby, Admin Offices, Cafeteria, Kitchen
- Each with detailed HVAC solutions and product recommendations

---

### 2. **school-with-interactive-markers.svg**
**Location:** `Content/imgs/school/school-with-interactive-markers.svg`

**Purpose:** Template SVG file showing the complete implementation pattern

**Features:**
- Complete school building illustration
- 8 interactive markers with unique IDs
- Hover effects and styling
- Fully commented code
- Ready to use as-is or as a reference

**Markers included:**
- `marker-classrooms`
- `marker-science-lab`
- `marker-locker-room`
- `marker-gym`
- `marker-lobby`
- `marker-admin-offices`
- `marker-cafeteria`
- `marker-kitchen`

---

### 3. **SVG_MARKER_GUIDELINES.md**
**Location:** `SVG_MARKER_GUIDELINES.md`

**Purpose:** Complete design guidelines document for your design team

**Contents:**
- SVG structure requirements
- Marker design specifications
- Naming conventions
- Styling guidelines
- Accessibility requirements
- Testing checklist
- File optimization tips
- Quick reference templates

**Share this with:** Design team, contractors, external agencies

---

### 4. **interactive-markers-example.js**
**Location:** `interactive-markers-example.js`

**Purpose:** JavaScript implementation example

**Features:**
- **Supports both JSON and API data sources** (toggle with config flag)
- Complete click handler implementation
- Caching for better performance
- Modal/popup display logic
- Error handling
- Accessibility support (keyboard navigation)
- Well-commented code
- Export functions for modular use

**Use this to:** Integrate SVG markers into your existing application

---

### 5. **interactive-markers-demo.html**
**Location:** `interactive-markers-demo.html`

**Purpose:** Live demo page to see everything in action

**Features:**
- Interactive demonstration
- Click on markers to see API payload
- Mock data for all sections
- Visual feedback and animations
- Responsive design
- Console logging for debugging

**How to use:**
1. Open the file in a web browser
2. Click on any blue marker
3. See the section details loaded from JSON
4. Share with stakeholders for approval

---

### 6. **JSON_DATA_STRUCTURE.md**
**Location:** `JSON_DATA_STRUCTURE.md`

**Purpose:** Complete documentation of the JSON data format

**Contents:**
- JSON structure specification
- TypeScript interfaces
- Complete examples
- Usage instructions
- Best practices
- Troubleshooting guide

**Use this to:** Understand how to structure your data, add new sections, or migrate to API

---

## 🎯 How Each Piece Works Together

```
┌─────────────────────────────────────────────────┐
│  school-with-interactive-markers.svg            │
│  (The visual template)                          │
│  - Building illustration                        │
│  - Markers with IDs: marker-classrooms, etc.    │
│  - Hover effects                                │
└────────────┬────────────────────────────────────┘
             │
             │ clicked by user
             ↓
┌─────────────────────────────────────────────────┐
│  interactive-markers-example.js                 │
│  (The functionality)                            │
│  - Detects click on marker                      │
│  - Extracts ID: "marker-classrooms"             │
│  - Converts to: "classrooms"                    │
└────────────┬────────────────────────────────────┘
             │
             ├─────── Option 1: JSON Data ────────┐
             │                                     │
             │                                     ↓
             │                    ┌─────────────────────────────────┐
             │                    │  section-data.json              │
             │                    │  { "classrooms": {...} }        │
             │                    └────────────┬────────────────────┘
             │                                 │
             ├─────── Option 2: API ──────────┐│
             │                                 ││
             ↓                                 ││
┌─────────────────────────────────────────┐   ││
│  Your API Endpoint                      │   ││
│  POST /api/section-details              │   ││
│  Payload: { sectionId: "classrooms" }   │   ││
└────────────┬────────────────────────────┘   ││
             │                                 ││
             │ returns data                    ││
             ↓                                 ↓↓
┌─────────────────────────────────────────────────┐
│  Modal/Popup Display                            │
│  - Shows HVAC solutions                         │
│  - Shows product recommendations                │
│  - Shows equipment details                      │
│  - Shows specs and requirements                 │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start Guide

### For Developers

1. **View the demo:**
   ```bash
   # Open in browser
   open interactive-markers-demo.html
   ```

2. **Choose your data source:**
   ```javascript
   const CONFIG = {
     // Option A: Use JSON data (perfect for testing!)
     useLocalData: true,
     jsonDataPath: 'Content/js/section-data.json',
     
     // Option B: Use API (for production)
     useLocalData: false,
     apiEndpoint: '/api/section-details',
   };
   ```

3. **Integrate into your project:**
   ```javascript
   // Import the functions
   import { initializeInteractiveMarkers } from './interactive-markers-example.js';
   
   // Initialize when DOM is ready
   initializeInteractiveMarkers();
   ```

4. **Start with JSON, migrate to API later:**
   - Begin development with `useLocalData: true`
   - Build and test all features
   - When API is ready, simply set `useLocalData: false`
   - No code changes needed - same data structure!

### For Design Team

1. **Read the guidelines:**
   - Open `SVG_MARKER_GUIDELINES.md`
   - Review all requirements and conventions

2. **Study the template:**
   - Open `school-with-interactive-markers.svg` in your design tool
   - Examine the marker structure
   - Note the IDs and class names

3. **Create new SVGs:**
   - Use the same marker structure
   - Follow naming conventions
   - Test in the demo page

4. **Deliver files with:**
   - List of all marker IDs
   - Preview image (PNG)
   - Any special notes

---

## 📋 Marker ID Format

**Pattern:** `marker-[section-name]`

**Examples:**
- ✅ `marker-classrooms`
- ✅ `marker-admin-offices`
- ✅ `marker-mechanical-room`
- ❌ `marker-Classrooms` (don't capitalize)
- ❌ `classroom-marker` (wrong order)
- ❌ `marker_classrooms` (don't use underscores)

---

## 🎨 Marker Design Specifications

### Visual Design
- **Shape:** Circle
- **Radius:** 20px
- **Fill Color:** #0080ff (blue)
- **Hover Color:** #0066cc (darker blue)
- **Icon:** White plus sign (+)
- **Label:** White text, 14px, below marker

### Required Attributes
```xml
<g id="marker-[section-name]" 
   class="interactive-marker" 
   transform="translate(x, y)" 
   data-section="[section-name]">
  <!-- marker content -->
</g>
```

---

## 🔧 Integration Example

### HTML
```html
<div class="building-container">
  <object data="path/to/your-building.svg" 
          type="image/svg+xml" 
          id="building-svg">
  </object>
</div>
```

### JavaScript
```javascript
// Wait for SVG to load
const svgObject = document.getElementById('building-svg');

svgObject.addEventListener('load', function() {
  const svgDoc = svgObject.contentDocument;
  const markers = svgDoc.querySelectorAll('.interactive-marker');
  
  markers.forEach(marker => {
    marker.addEventListener('click', async (e) => {
      const sectionId = e.currentTarget.id.replace('marker-', '');
      
      // Call your API
      const response = await fetch('/api/section-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionId })
      });
      
      const data = await response.json();
      displayModal(data);
    });
  });
});
```

---

## 📊 API Payload Structure

### Request
```json
{
  "sectionId": "classrooms",
  "buildingType": "school",
  "facilityId": "greenheck-high-school",
  "timestamp": "2025-10-21T10:30:00.000Z"
}
```

### Expected Response
```json
{
  "title": "Classrooms",
  "description": "Standard learning spaces...",
  "hvacSolutions": [
    {
      "name": "Energy Recovery Ventilators",
      "description": "...",
      "products": [...]
    }
  ],
  "products": [
    {
      "id": "ERV-123",
      "name": "Model ERV-500",
      "image": "...",
      "description": "..."
    }
  ]
}
```

---

## ✅ Testing Checklist

Before deploying:
- [ ] All markers have unique IDs
- [ ] Click handlers work for all markers
- [ ] API integration tested
- [ ] Modal displays correctly
- [ ] Hover effects work
- [ ] Responsive on mobile
- [ ] Keyboard navigation works
- [ ] Console has no errors
- [ ] Performance is acceptable

---

## 🐛 Troubleshooting

### Markers not clickable
- Check that `class="interactive-marker"` is present
- Verify JavaScript is loaded after SVG
- Check browser console for errors

### IDs not extracted correctly
- Ensure ID format: `marker-section-name`
- Check the `replace('marker-', '')` logic

### SVG not loading
- Verify file path is correct
- Check that SVG is valid XML
- Try using `<img>` tag instead of `<object>` for testing

### Styling not applied
- Ensure `<style>` block is in SVG `<defs>`
- Check CSS selector specificity
- Verify classes are applied correctly

---

## 📞 Next Steps

1. **Review the demo** (`interactive-markers-demo.html`)
2. **Share guidelines** with design team (`SVG_MARKER_GUIDELINES.md`)
3. **Integrate JavaScript** into your application (`interactive-markers-example.js`)
4. **Test thoroughly** with real data
5. **Create additional building types** following the same pattern

---

## 📝 Building Types to Create

Suggested additional SVGs:
- Healthcare facilities (hospitals, clinics)
- Office buildings
- Manufacturing plants
- Data centers
- Warehouses
- Restaurants/Commercial kitchens
- Universities/Higher education
- Sports facilities

Each should follow the same marker pattern and conventions.

---

## 🎓 Additional Resources

### Standards Referenced
- ASHRAE 62.1 (Ventilation for Acceptable Indoor Air Quality)
- NFPA 96 (Ventilation Control and Fire Protection)
- ANSI Z9.5 (Laboratory Ventilation)
- IMC (International Mechanical Code)

### Design Tools
- Adobe Illustrator (SVG export)
- Figma (SVG export with outline stroke)
- Inkscape (free, open-source)
- SVGO (optimization)

---

## 📄 File Structure Summary

```
building-interactive-experience-analysis/
├── Content/
│   ├── imgs/
│   │   └── school/
│   │       └── school-with-interactive-markers.svg  ← SVG Template
│   └── js/
│       └── section-data.json                        ← ⭐ JSON Data
├── interactive-markers-example.js                   ← JavaScript Implementation
├── interactive-markers-demo.html                    ← Demo Page
├── SVG_MARKER_GUIDELINES.md                         ← Design Guidelines
├── JSON_DATA_STRUCTURE.md                           ← Data Format Docs
└── INTERACTIVE_SVG_DELIVERY.md                      ← This File
```

---

## ✨ Key Benefits

1. **Ready to Use:** Complete JSON data included - no API needed to get started!
2. **Consistent Pattern:** All SVGs follow the same structure
3. **Easy Integration:** Simple JavaScript API
4. **Flexible Data:** Use JSON for testing, API for production
5. **Scalable:** Works for any building type
6. **Maintainable:** Well-documented and commented
7. **Accessible:** Keyboard navigation and ARIA labels
8. **Responsive:** Works on all screen sizes
9. **Performance:** Optimized SVG loading and data caching

---

**Questions or issues?** Refer to the guidelines document or review the demo page.

**Version:** 1.0  
**Date:** October 21, 2025  
**Status:** Ready for production

