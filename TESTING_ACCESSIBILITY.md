# Testing the Accessibility Widget

## Quick Test Guide

### 1. Open the Website
```bash
npm run dev
```
Visit: http://localhost:5174 (or the port shown in terminal)

### 2. Open Browser Console
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- **Firefox**: Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
- **Safari**: Enable Developer menu first, then `Cmd+Option+C`

### 3. Locate the Accessibility Button
Look for the **purple gear icon** (⚙️) in the bottom-right corner of the page.

### 4. Test Each Feature

#### Test 1: Font Size
1. Click the accessibility button
2. Click the **+** button next to "Font Size"
3. **Expected**: All text on the page should get larger
4. **Check console**: Should see "Applying accessibility settings" and "Font scale set to: 110%"
5. Click **-** button
6. **Expected**: Text should get smaller

#### Test 2: Letter Spacing
1. Click the **+** button next to "Letter Spacing"
2. **Expected**: Space between letters should increase
3. **Visual check**: Words should look more spaced out

#### Test 3: Line Height
1. Click the **+** button next to "Line Height"
2. **Expected**: Space between lines should increase
3. **Visual check**: Paragraphs should have more vertical spacing

#### Test 4: Dyslexia-Friendly Font
1. Toggle the "Dyslexia-Friendly Font" switch ON
2. **Expected**: All text changes to OpenDyslexic font (looks more rounded/comic-like)
3. **Note**: Font loads from CDN, may take 1-2 seconds

#### Test 5: High Contrast
1. Toggle "High Contrast" switch ON
2. **Expected**: Page becomes more contrasty, colors more vivid
3. **Visual check**: Text should be darker, borders more prominent

#### Test 6: Highlight Links
1. Toggle "Highlight Links" switch ON
2. **Expected**: All links get yellow background
3. **Visual check**: Links in navigation, footer, and content should be highlighted

#### Test 7: Highlight Headings
1. Toggle "Highlight Headings" switch ON
2. **Expected**: All headings (h1, h2, h3, etc.) get yellow background with purple left border
3. **Visual check**: Page titles and section headings should be highlighted

#### Test 8: Grayscale Mode
1. Toggle "Grayscale Mode" switch ON
2. **Expected**: Entire page becomes black and white
3. **Visual check**: All colors removed, only shades of gray

#### Test 9: Cursor Size
1. Click "Large" button under "Cursor Size"
2. **Expected**: Mouse cursor becomes larger
3. Click "Extra-Large"
4. **Expected**: Cursor becomes even larger
5. **Note**: Cursor changes may be subtle depending on OS

#### Test 10: Settings Persistence
1. Make several changes (increase font, turn on high contrast, etc.)
2. Close the accessibility panel
3. Refresh the page (F5 or Cmd+R)
4. **Expected**: All your settings should still be applied
5. **Check**: Open panel again, all switches/sliders should be in the same position

#### Test 11: Reset to Default
1. Make several changes
2. Click "Reset to Default" button at bottom
3. **Expected**: All settings return to normal
4. **Visual check**: Page should look like it did initially

### 5. Test Keyboard Navigation

1. Refresh the page
2. Press **Tab** key
3. **Expected**: "Skip to main content" link appears at top
4. Press **Enter** to use it
5. **Expected**: Focus jumps to main content
6. Press **Tab** multiple times until accessibility button is focused
7. Press **Enter** or **Space** to open panel
8. Use **Tab** to navigate through settings
9. Use **Space** to toggle switches
10. Press **Esc** to close panel

### 6. Test on Mobile

#### Using Browser DevTools:
1. Open DevTools (F12)
2. Click device toolbar icon (or Ctrl+Shift+M)
3. Select a mobile device (iPhone, Android)
4. Test all features
5. **Expected**: Widget should be responsive and work on touch

#### On Real Device:
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Visit: `http://YOUR_IP:5174` on mobile
3. Test all features with touch
4. **Expected**: All features work, button is accessible

### 7. Common Issues & Solutions

#### Issue: Font size not changing
**Check:**
- Open browser console
- Look for "Applying accessibility settings" message
- Check if `--accessibility-font-scale` CSS variable is set
- Inspect `<html>` element, check computed font-size

**Solution:**
- Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
- Clear browser cache
- Check if another extension is interfering

#### Issue: Settings not saving
**Check:**
- Browser console for localStorage errors
- Are you in private/incognito mode?
- Check browser settings for localStorage permissions

**Solution:**
- Use regular browsing mode
- Enable localStorage in browser settings
- Try different browser

#### Issue: Dyslexic font not loading
**Check:**
- Browser console for network errors
- Internet connection active?
- CDN accessible?

**Solution:**
- Wait 2-3 seconds for font to load
- Check internet connection
- Try refreshing page

#### Issue: Styles not applying
**Check:**
- Browser console for CSS errors
- Check if accessibility.css is loaded
- Inspect element to see if classes are applied

**Solution:**
- Hard refresh page
- Check if build is up to date: `npm run dev`
- Clear browser cache

### 8. Browser Compatibility Test

Test on each browser:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 9. Screen Reader Test

#### With NVDA (Windows - Free):
1. Download NVDA from https://www.nvaccess.org/
2. Start NVDA
3. Navigate website with keyboard
4. **Expected**: All elements announced properly
5. **Check**: Accessibility button has proper label

#### With JAWS (Windows - Trial):
1. Download JAWS trial
2. Start JAWS
3. Navigate website
4. **Expected**: All elements accessible

#### With VoiceOver (Mac - Built-in):
1. Press Cmd+F5 to enable VoiceOver
2. Use VO+Right Arrow to navigate
3. **Expected**: All elements announced
4. Press Cmd+F5 to disable when done

### 10. Performance Test

1. Open DevTools Performance tab
2. Start recording
3. Open accessibility widget
4. Make several changes
5. Stop recording
6. **Check**: No significant performance issues
7. **Expected**: Changes apply smoothly, no lag

### 11. Console Check

Throughout testing, monitor browser console for:
- ✅ "Applying accessibility settings" messages
- ✅ "Font scale set to: X%" messages
- ❌ No error messages
- ❌ No warning messages (except Vite dev warnings)

### 12. Visual Regression Test

Take screenshots before and after each setting:
1. Default state
2. Font size 150%
3. High contrast ON
4. All settings ON
5. Compare to ensure changes are visible

### 13. Accessibility Audit

#### Using Lighthouse:
1. Open DevTools
2. Go to "Lighthouse" tab
3. Select "Accessibility" category
4. Click "Analyze page load"
5. **Target**: Score 90+

#### Using axe DevTools:
1. Install axe DevTools extension
2. Open extension
3. Click "Scan ALL of my page"
4. **Expected**: No critical issues
5. Review and fix any issues found

### 14. WCAG Compliance Check

Verify compliance with:
- [ ] **1.4.4 Resize Text (AA)**: Font can scale to 200%
- [ ] **1.4.8 Visual Presentation (AAA)**: Line spacing, letter spacing adjustable
- [ ] **1.4.12 Text Spacing (AA)**: Text spacing adjustable
- [ ] **2.4.1 Bypass Blocks (A)**: Skip to main content link present
- [ ] **2.4.7 Focus Visible (AA)**: Focus indicators visible
- [ ] **1.4.3 Contrast (Minimum) (AA)**: High contrast mode available
- [ ] **2.1.1 Keyboard (A)**: All features keyboard accessible

### 15. Edge Cases

Test unusual scenarios:
- [ ] Very long page (lots of scrolling)
- [ ] Page with many images
- [ ] Page with forms
- [ ] Page with tables
- [ ] Page with embedded videos
- [ ] Page with animations
- [ ] Multiple tabs open
- [ ] Browser zoom at 200%
- [ ] Browser zoom at 50%

### 16. Integration Test

Test with other site features:
- [ ] Navigation menu works with accessibility on
- [ ] Forms submit correctly
- [ ] Links navigate properly
- [ ] Buttons function correctly
- [ ] Modals/dialogs work
- [ ] Search functionality works
- [ ] Filters work (podcast, community, library)

---

## Quick Test Checklist

Use this for rapid testing:

- [ ] Widget button visible
- [ ] Widget opens on click
- [ ] Font size changes visible
- [ ] Letter spacing changes visible
- [ ] Line height changes visible
- [ ] Dyslexic font loads and applies
- [ ] High contrast mode works
- [ ] Links highlight with yellow
- [ ] Headings highlight with yellow/purple
- [ ] Grayscale mode works
- [ ] Cursor size changes (subtle)
- [ ] Settings persist after refresh
- [ ] Reset button works
- [ ] Keyboard navigation works
- [ ] Skip link appears and works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Lighthouse accessibility score 90+

---

## Reporting Issues

If you find issues, report with:
1. **Browser**: Name and version
2. **OS**: Operating system and version
3. **Steps**: How to reproduce
4. **Expected**: What should happen
5. **Actual**: What actually happens
6. **Console**: Any error messages
7. **Screenshot**: If visual issue

---

## Success Criteria

✅ All features work as expected
✅ Settings persist across sessions
✅ No console errors
✅ Keyboard accessible
✅ Mobile responsive
✅ Lighthouse accessibility score 90+
✅ No performance issues
✅ WCAG 2.1 AA compliant

---

**Last Updated**: November 2024
**Version**: 1.0
