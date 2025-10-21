# JSON Data Structure Documentation

## Overview
This document describes the JSON data structure used for storing building section information. The data can be used instead of API calls for testing, development, or as a fallback.

## File Location
`Content/js/section-data.json`

## Data Structure

### Top Level
The JSON file contains an object where each key is a section ID (matching the marker IDs without the "marker-" prefix):

```json
{
  "classrooms": { /* section data */ },
  "gym": { /* section data */ },
  "cafeteria": { /* section data */ },
  ...
}
```

### Section Object Structure

Each section object contains the following properties:

```typescript
interface SectionData {
  id: string;                    // Section identifier (matches key)
  title: string;                 // Display title
  description: string;           // Section description
  imageUrl?: string;             // Optional hero/banner image
  hvacSolutions: HVACSolution[]; // Array of HVAC solutions
  products: Product[];           // Array of featured products
  requirements: Requirements;    // Standards and requirements
}
```

#### HVACSolution Object

```typescript
interface HVACSolution {
  id: string;           // Solution identifier
  name: string;         // Solution name
  description: string;  // Detailed description
  icon: string;         // Path to icon image
  products: string[];   // Array of related product IDs
}
```

**Example:**
```json
{
  "id": "erv",
  "name": "Energy Recovery Ventilators (ERV)",
  "description": "Recover energy from exhaust air while bringing in fresh outdoor air",
  "icon": "Content/imgs/icons/energy-recovery.svg",
  "products": ["ERV-500", "ERV-750"]
}
```

#### Product Object

```typescript
interface Product {
  id: string;           // Product identifier (model number)
  name: string;         // Product name
  category: string;     // Product category
  image: string;        // Path to product image
  description: string;  // Product description
  specs: {              // Product specifications
    [key: string]: string;  // Key-value pairs of specs
  };
}
```

**Example:**
```json
{
  "id": "ERV-500",
  "name": "Model ERV-500",
  "category": "Energy Recovery",
  "image": "Content/imgs/EnergyRecovery.png",
  "description": "Compact energy recovery ventilator ideal for classroom applications",
  "specs": {
    "airflow": "500 CFM",
    "efficiency": "Up to 80%",
    "application": "Small to medium classrooms"
  }
}
```

#### Requirements Object

```typescript
interface Requirements {
  standard: string;              // Applicable standard (e.g., "ASHRAE 62.1")
  ventilationRate: string;       // Required ventilation rate
  occupancy?: string;            // Typical occupancy
  exhaustRate?: string;          // Required exhaust rate (if applicable)
  specialConsiderations?: string; // Additional notes
}
```

**Example:**
```json
{
  "standard": "ASHRAE 62.1",
  "ventilationRate": "10 CFM per person minimum",
  "occupancy": "Typically 25-30 students",
  "specialConsiderations": "CO2 levels should not exceed 1000 ppm"
}
```

## Complete Example

Here's a complete example for a classroom section:

```json
{
  "classrooms": {
    "id": "classrooms",
    "title": "Classrooms",
    "description": "Standard learning spaces require proper ventilation for student health and comfort.",
    "imageUrl": "Content/imgs/icons/select-a-space.svg",
    "hvacSolutions": [
      {
        "id": "erv",
        "name": "Energy Recovery Ventilators (ERV)",
        "description": "Recover energy from exhaust air while bringing in fresh outdoor air",
        "icon": "Content/imgs/icons/energy-recovery.svg",
        "products": ["ERV-500", "ERV-750"]
      },
      {
        "id": "doas",
        "name": "Dedicated Outdoor Air Systems (DOAS)",
        "description": "Provide 100% outdoor air ventilation for optimal indoor air quality",
        "icon": "Content/imgs/icons/outdoor-air.svg",
        "products": ["DOAS-1000", "DOAS-1500"]
      }
    ],
    "products": [
      {
        "id": "ERV-500",
        "name": "Model ERV-500",
        "category": "Energy Recovery",
        "image": "Content/imgs/EnergyRecovery.png",
        "description": "Compact energy recovery ventilator ideal for classroom applications",
        "specs": {
          "airflow": "500 CFM",
          "efficiency": "Up to 80%",
          "application": "Small to medium classrooms"
        }
      }
    ],
    "requirements": {
      "standard": "ASHRAE 62.1",
      "ventilationRate": "10 CFM per person minimum",
      "occupancy": "Typically 25-30 students",
      "specialConsiderations": "CO2 levels should not exceed 1000 ppm"
    }
  }
}
```

## Usage in JavaScript

### Loading the Data

```javascript
// Fetch the entire JSON file
async function loadSectionData() {
  const response = await fetch('Content/js/section-data.json');
  return await response.json();
}

// Get specific section
async function getSectionData(sectionId) {
  const allData = await loadSectionData();
  return allData[sectionId];
}
```

### Using with Markers

```javascript
// When a marker is clicked
marker.addEventListener('click', async (e) => {
  const markerId = e.currentTarget.id;        // "marker-classrooms"
  const sectionId = markerId.replace('marker-', ''); // "classrooms"
  
  // Load section data from JSON
  const sectionData = await getSectionData(sectionId);
  
  // Display in modal/popup
  displayModal(sectionData);
});
```

### Configuration

In `interactive-markers-example.js`, set `useLocalData` to `true`:

```javascript
const CONFIG = {
  useLocalData: true,  // Use JSON instead of API
  jsonDataPath: 'Content/js/section-data.json',
  // ...
};
```

## Sections Included

The current JSON file includes data for all 8 school sections:

1. **classrooms** - Standard learning spaces
2. **science-lab** - Laboratory spaces with fume hoods
3. **locker-room** - High-humidity spaces
4. **gym** - Large gymnasium spaces
5. **lobby** - Main entrance and vestibule
6. **admin-offices** - Administrative office spaces
7. **cafeteria** - Dining areas
8. **kitchen** - Commercial kitchen spaces

## Adding New Sections

To add a new section:

1. **Add to JSON file:**
   ```json
   {
     "library": {
       "id": "library",
       "title": "Library",
       "description": "Quiet study spaces...",
       // ... rest of structure
     }
   }
   ```

2. **Add marker to SVG:**
   ```xml
   <g id="marker-library" 
      class="interactive-marker" 
      transform="translate(x, y)">
     <!-- marker elements -->
   </g>
   ```

3. **Test:** Click the marker and verify data loads

## Data Validation

### Required Fields
- `id` (string)
- `title` (string)
- `description` (string)
- `hvacSolutions` (array, can be empty)
- `products` (array, can be empty)
- `requirements` (object)

### Optional Fields
- `imageUrl` (string)
- Any additional custom fields for your application

## File Size Considerations

Current file size: ~25KB
- Contains 8 sections with full data
- Includes product specs and detailed descriptions
- Small enough to load quickly
- Consider lazy loading for very large datasets (50+ sections)

## Caching Strategy

The example code implements caching:

```javascript
let cachedSectionData = null;

async function fetchFromJSON(sectionId) {
  // Load once and cache
  if (!cachedSectionData) {
    const response = await fetch('Content/js/section-data.json');
    cachedSectionData = await response.json();
  }
  
  return cachedSectionData[sectionId];
}
```

**Benefits:**
- Single HTTP request
- Fast subsequent lookups
- Reduced server load

## Migration to API

When ready to use an API instead of JSON:

1. **Update configuration:**
   ```javascript
   const CONFIG = {
     useLocalData: false,  // Switch to API
     apiEndpoint: '/api/section-details',
     // ...
   };
   ```

2. **API should return the same structure:**
   ```javascript
   // POST /api/section-details
   // Request: { sectionId: "classrooms" }
   // Response: { id: "classrooms", title: "Classrooms", ... }
   ```

3. **No code changes needed** - the data structure remains the same

## Best Practices

### Image Paths
- Use relative paths from the HTML file location
- Example: `Content/imgs/EnergyRecovery.png`
- Ensure all images exist and are optimized

### Product IDs
- Use consistent naming (e.g., model numbers)
- Match IDs between `hvacSolutions.products` array and `products` array
- Enables linking solutions to specific products

### Descriptions
- Keep concise but informative
- Focus on benefits and key features
- Avoid technical jargon when possible

### Standards
- Use official standard names (ASHRAE 62.1, NFPA 96, etc.)
- Include version numbers if relevant
- Link to documentation if available

## Troubleshooting

### Data not loading
- Check file path in `CONFIG.jsonDataPath`
- Verify JSON is valid (use JSONLint)
- Check browser console for errors
- Ensure file is served correctly (not blocked by CORS)

### Section not found
- Verify section ID matches JSON key exactly
- Check for typos (case-sensitive)
- Ensure marker ID format: `marker-[section-id]`

### Images not displaying
- Check image paths are correct
- Verify images exist at specified paths
- Check browser network tab for 404 errors

## Version History
- v1.0 - Initial structure (October 2025)
- Includes 8 school sections with full data

