# Root Cause Analysis: Accessibility Widget Not Applying Changes

**Date**: November 18, 2025  
**Issue**: Accessibility widget opens and settings can be changed, but visual changes are not applied to the website content.  
**Status**: 🔍 INVESTIGATING

---

## Problem Statement

The accessibility widget UI is functional:
- ✅ Widget button appears
- ✅ Widget panel opens
- ✅ Settings can be adjusted
- ✅ Settings save to localStorage

However:
- ❌ Font size changes don't affect text
- ❌ Letter spacing doesn't change
- ❌ Line height doesn't change
- ❌ Toggle features (high contrast, etc.) don't apply

---

## Diagnostic Steps

### Step 1: Verify JavaScript is Running

**Check**: Is the `applySettings()` function being called?

**Expected Console Output**:
```
Applying accessibility settings: {fontSize: 120, ...}
Font scale set to: 120%
```

**Test**:
1. Open browser console (F12)
2. Open accessibility widget
3. Change font size
4. Look for console messages

**Possible Issues**:
- [ ] Function not being called
- [ ] useEffect not triggering
- [ ] Settings state not updating

---

### Step 2: Verify CSS Variables are Set

**Check**: Are CSS custom properties being set on the `<html>` element?

**Test**:
1. Open DevTools
2. Inspect `<html>` element
3. Look at "Styles" tab
4. Check for inline styles:
   ```css
   --accessibility-font-scale: 120%;
   --accessibility-letter-spacing: 0px;
   --accessibility-line-height: 1.5;
   ```

**Possible Issues**:
- [ ] CSS variables not being set
- [ ] Variables set but not used
- [ ] Variables overridden by other styles

---

### Step 3: Verify CSS File is Loaded

**Check**: Is `accessibility.css` being loaded by the browser?

**Test**:
1. Open DevTools → Network tab
2. Refresh page
3. Filter by "CSS"
4. Look for `accessibility.css` or check if it's bundled in main CSS

**Possible Issues**:
- [ ] CSS file not imported correctly
- [ ] Import path incorrect
- [ ] Vite not bundling the file
- [ ] CSS not being processed

---

### Step 4: Verify CSS Rules are Applied

**Check**: Are the CSS rules from `accessibility.css` present in the computed styles?

**Test**:
1. Inspect any text element (paragraph, heading)
2. Look at "Computed" tab
3. Check `font-size`, `letter-spacing`, `line-height`
4. See if they reference CSS variables

**Possible Issues**:
- [ ] CSS rules not applying
- [ ] Tailwind overriding with higher specificity
- [ ] `!important` not working
- [ ] CSS calc() not computing

---

## Hypothesis 1: CSS Import Issue

**Theory**: The `@import './accessibility.css'` in `index.css` may not be working correctly with Vite.

**Evidence**:
- CSS @import can be problematic with build tools
- Vite may not process @import the same way

**Solution**:
Change from CSS @import to JavaScript import.

**Test**:
```javascript
// In main.jsx or App.jsx
import './accessibility.css'
```

---

## Hypothesis 2: CSS Specificity Issue

**Theory**: Tailwind's utility classes have higher specificity than our accessibility CSS.

**Evidence**:
- Tailwind uses utility classes directly on elements
- Our CSS uses element selectors
- Even with `!important`, specificity might not be enough

**Current CSS**:
```css
html {
  font-size: calc(16px * var(--accessibility-font-scale) / 100) !important;
}
```

**Possible Issue**:
- Tailwind's reset might be overriding
- Other styles might have higher specificity

**Solution**:
Add more specific selectors or use different approach.

---

## Hypothesis 3: CSS Variables Not Cascading

**Theory**: CSS custom properties are set but not being used in calculations.

**Evidence**:
- Variables might be set on `:root` but not accessible
- `calc()` might not be evaluating

**Test**:
Check if variables are accessible:
```javascript
getComputedStyle(document.documentElement).getPropertyValue('--accessibility-font-scale')
```

---

## Hypothesis 4: Timing Issue

**Theory**: CSS is loaded before JavaScript sets the variables.

**Evidence**:
- React renders after initial CSS load
- Variables might not exist when CSS first parses

**Solution**:
- Ensure variables have default values in CSS
- Verify useEffect runs on mount

---

## Hypothesis 5: Build Tool Issue

**Theory**: Vite is not processing the CSS correctly in development mode.

**Evidence**:
- Development mode uses different CSS handling than production
- HMR (Hot Module Replacement) might interfere

**Test**:
1. Build for production: `npm run build`
2. Serve production build: `npm run preview`
3. Test if it works in production

---

## Diagnostic Tool Created

**File**: `/src/pages/AccessibilityTest.jsx`

**Access**: http://localhost:5174/accessibility-test

**Features**:
- Real-time monitoring of CSS variables
- Display of HTML classes
- Computed styles inspection
- localStorage contents
- Auto-refresh every 2 seconds
- Console logging

**Usage**:
1. Navigate to `/accessibility-test`
2. Open browser console
3. Open accessibility widget
4. Make changes
5. Watch diagnostic output

---

## Root Cause Investigation Steps

### Step 1: Check Console Output ✅
```bash
# Navigate to diagnostic page
http://localhost:5174/accessibility-test
```

**Look for**:
- "Applying accessibility settings" messages
- CSS variable values
- Any error messages

### Step 2: Inspect HTML Element ✅
```javascript
// In browser console
const root = document.documentElement
console.log('Font scale:', root.style.getPropertyValue('--accessibility-font-scale'))
console.log('Classes:', root.className)
console.log('Computed font-size:', getComputedStyle(root).fontSize)
```

### Step 3: Check CSS File Loading ✅
```javascript
// In browser console
const sheets = Array.from(document.styleSheets)
sheets.forEach((sheet, i) => {
  try {
    console.log(`Sheet ${i}:`, sheet.href, 'Rules:', sheet.cssRules.length)
  } catch(e) {
    console.log(`Sheet ${i}: Cannot access (CORS)`)
  }
})
```

### Step 4: Test Direct CSS Application ✅
```javascript
// In browser console - manually set styles
document.documentElement.style.fontSize = '20px'
// If this works, CSS is the issue
// If this doesn't work, something else is wrong
```

---

## Potential Fixes

### Fix 1: Move CSS Import to JavaScript

**File**: `src/main.jsx`

**Change**:
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './accessibility.css'  // ADD THIS LINE
```

**Rationale**: JavaScript imports are more reliable with Vite than CSS @import.

---

### Fix 2: Increase CSS Specificity

**File**: `src/accessibility.css`

**Change**:
```css
/* Instead of */
html {
  font-size: calc(16px * var(--accessibility-font-scale) / 100) !important;
}

/* Use */
html:root {
  font-size: calc(16px * var(--accessibility-font-scale) / 100) !important;
}

/* Or even more specific */
html[lang]:root {
  font-size: calc(16px * var(--accessibility-font-scale) / 100) !important;
}
```

---

### Fix 3: Use Inline Styles Instead

**File**: `src/components/AccessibilityWidget.jsx`

**Change**: Instead of setting CSS variables, directly set inline styles:

```javascript
const applySettings = () => {
  const root = document.documentElement
  const body = document.body
  
  // Direct inline styles
  root.style.fontSize = `${(16 * settings.fontSize) / 100}px`
  body.style.letterSpacing = `${settings.letterSpacing}px`
  body.style.lineHeight = `${settings.lineHeight}`
  
  // Also set CSS variables as backup
  root.style.setProperty('--accessibility-font-scale', `${settings.fontSize}%`)
  // ... rest of code
}
```

**Rationale**: Inline styles have highest specificity.

---

### Fix 4: Use Style Tag Injection

**Alternative Approach**: Inject a `<style>` tag with high specificity:

```javascript
const applySettings = () => {
  // Remove old style tag if exists
  const oldStyle = document.getElementById('accessibility-dynamic-styles')
  if (oldStyle) oldStyle.remove()
  
  // Create new style tag
  const style = document.createElement('style')
  style.id = 'accessibility-dynamic-styles'
  style.innerHTML = `
    html {
      font-size: ${(16 * settings.fontSize) / 100}px !important;
    }
    body, body * {
      letter-spacing: ${settings.letterSpacing}px !important;
      line-height: ${settings.lineHeight} !important;
    }
  `
  document.head.appendChild(style)
  
  // Rest of class-based toggles...
}
```

**Rationale**: Dynamically injected styles can override everything.

---

## Testing Protocol

### Test 1: Verify JavaScript Execution
1. Open console
2. Change font size in widget
3. **Expected**: See "Applying accessibility settings" message
4. **If not**: JavaScript not running → Check React component

### Test 2: Verify CSS Variables Set
1. Open console
2. Run: `getComputedStyle(document.documentElement).getPropertyValue('--accessibility-font-scale')`
3. **Expected**: See "120%" or current value
4. **If not**: Variables not being set → Check applySettings function

### Test 3: Verify CSS Rules Exist
1. Open DevTools → Elements
2. Inspect `<html>` element
3. Look at Styles panel
4. **Expected**: See inline styles with CSS variables
5. **If not**: CSS not loading → Check import

### Test 4: Verify CSS Rules Apply
1. Open DevTools → Elements
2. Inspect any `<p>` element
3. Look at Computed tab
4. Check `font-size` value
5. **Expected**: Font size should reflect calculation
6. **If not**: CSS not applying → Specificity issue

### Test 5: Manual Override Test
1. Open console
2. Run: `document.documentElement.style.fontSize = '24px'`
3. **Expected**: Text gets larger
4. **If works**: CSS is the issue
5. **If doesn't work**: Browser/rendering issue

---

## Next Steps

1. ✅ Navigate to http://localhost:5174/accessibility-test
2. ✅ Open browser console (F12)
3. ✅ Open accessibility widget
4. ✅ Change font size to 120%
5. ✅ Check diagnostic output
6. ✅ Report findings

Based on the diagnostic output, we can determine:
- Are CSS variables being set? → JavaScript issue
- Are CSS rules present? → Import issue
- Are styles computed? → Specificity issue
- Does manual override work? → Rendering issue

---

## Expected Diagnostic Output

### If Working Correctly:
```
CSS Variables:
  --accessibility-font-scale: 120%
  --accessibility-letter-spacing: 0px
  --accessibility-line-height: 1.5

HTML Classes: []

Computed Styles:
  HTML font-size: 19.2px (16 * 1.2)
  Body font-size: 19.2px
  Body letter-spacing: 0px
  Body line-height: 1.5
```

### If NOT Working:
```
CSS Variables:
  --accessibility-font-scale: NOT SET or 100%
  
Computed Styles:
  HTML font-size: 16px (unchanged)
```

---

## Conclusion

The diagnostic page will reveal the exact point of failure. Once we see the output, we can apply the appropriate fix from the list above.

**Most Likely Issue**: CSS import not working correctly with Vite's @import handling.

**Most Likely Fix**: Move import to JavaScript (main.jsx) or use inline styles approach.

---

**Status**: Awaiting diagnostic results from `/accessibility-test` page.
