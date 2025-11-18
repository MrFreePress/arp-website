# Accessibility Widget User Guide

## Overview

The ARP website now includes a comprehensive accessibility widget that allows users to customize their browsing experience based on their individual needs. This free, open-source solution provides extensive accessibility features without any monthly fees.

---

## How to Access the Widget

Look for the **purple accessibility icon** (⚙️) in the bottom-right corner of every page. Click or tap it to open the accessibility settings panel.

---

## Available Features

### 1. **Font Size Adjustment**
- **What it does**: Makes all text on the website larger or smaller
- **Range**: 80% to 150% of normal size
- **How to use**: Click the zoom out (-) or zoom in (+) buttons
- **Best for**: Users with visual impairments or those who prefer larger text

### 2. **Letter Spacing**
- **What it does**: Adds extra space between letters for easier reading
- **Range**: 0px to 5px additional spacing
- **How to use**: Click the minus (-) or plus (+) buttons
- **Best for**: Users with dyslexia or reading difficulties

### 3. **Line Height**
- **What it does**: Adjusts the vertical space between lines of text
- **Range**: 1.2 to 2.5 line spacing
- **How to use**: Click the minus (-) or plus (+) buttons
- **Best for**: Improving readability and reducing eye strain

### 4. **Dyslexia-Friendly Font**
- **What it does**: Switches to OpenDyslexic font, designed specifically for dyslexic readers
- **How to use**: Toggle the switch on/off
- **Best for**: Users with dyslexia
- **Note**: The font has weighted bottoms and unique letter shapes to reduce confusion

### 5. **High Contrast Mode**
- **What it does**: Increases the contrast between text and background
- **How to use**: Toggle the switch on/off
- **Best for**: Users with low vision or color blindness
- **Effect**: Makes text darker and borders more prominent

### 6. **Highlight Links**
- **What it does**: Adds a bright yellow background to all clickable links
- **How to use**: Toggle the switch on/off
- **Best for**: Users who have difficulty identifying links
- **Effect**: Links become bold and underlined with yellow highlighting

### 7. **Highlight Headings**
- **What it does**: Adds a light yellow background and purple border to all headings
- **How to use**: Toggle the switch on/off
- **Best for**: Users who need help navigating page structure
- **Effect**: Makes page organization more visible

### 8. **Grayscale Mode**
- **What it does**: Removes all colors and displays the site in black and white
- **How to use**: Toggle the switch on/off
- **Best for**: Users with certain types of color blindness or light sensitivity
- **Effect**: Entire site becomes grayscale

### 9. **Cursor Size**
- **What it does**: Makes the mouse pointer larger and easier to see
- **Options**: Normal, Large, Extra-Large
- **How to use**: Click one of the three size buttons
- **Best for**: Users with motor impairments or visual tracking difficulties

### 10. **Reset to Default**
- **What it does**: Returns all settings to their original state
- **How to use**: Click the "Reset to Default" button at the bottom of the panel
- **When to use**: If you want to start over or if settings aren't working as expected

---

## Settings Persistence

All your accessibility preferences are **automatically saved** to your browser. This means:
- ✅ Settings remain active when you navigate to different pages
- ✅ Settings are remembered when you return to the site later
- ✅ Settings are specific to your browser on this device
- ❌ Settings do NOT sync across different devices or browsers

---

## Keyboard Navigation

The accessibility widget is fully keyboard accessible:

1. **Tab** - Navigate to the accessibility button
2. **Enter/Space** - Open the widget panel
3. **Tab** - Move through settings
4. **Space** - Toggle switches on/off
5. **Arrow Keys** - Select cursor size options
6. **Esc** - Close the widget panel

### Skip to Main Content

Press **Tab** immediately after the page loads to reveal a "Skip to main content" link. This allows keyboard users to bypass the navigation menu and jump directly to the page content.

---

## Recommended Settings for Common Needs

### For Dyslexia
1. Enable **Dyslexia-Friendly Font**
2. Increase **Letter Spacing** to 2-3px
3. Increase **Line Height** to 1.8-2.0
4. Consider **Highlight Headings** for better structure

### For Low Vision
1. Increase **Font Size** to 120-150%
2. Enable **High Contrast Mode**
3. Enable **Highlight Links**
4. Increase **Cursor Size** to Large or Extra-Large

### For ADHD/Focus Issues
1. Enable **Highlight Headings** for structure
2. Enable **Highlight Links** to reduce distractions
3. Adjust **Line Height** to 1.8 for better focus
4. Consider **Grayscale Mode** to reduce visual stimulation

### For Motor Impairments
1. Increase **Cursor Size** to Extra-Large
2. Increase **Font Size** for easier clicking
3. Enable **Highlight Links** for better target visibility

### For Light Sensitivity
1. Enable **Grayscale Mode**
2. Consider **High Contrast Mode** (but test if it's comfortable)
3. Adjust **Font Size** as needed

### For Color Blindness
1. Enable **Grayscale Mode** OR **High Contrast Mode**
2. Enable **Highlight Links** (uses yellow, which is usually visible)
3. Enable **Highlight Headings** for structure

---

## Browser Compatibility

The accessibility widget works on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Mobile Usage

On mobile devices:
- The accessibility button appears in the bottom-right corner
- Tap to open the settings panel
- The panel is optimized for touch interaction
- All features work the same as on desktop
- Settings are saved to your mobile browser

---

## Troubleshooting

### Settings aren't saving
- **Solution**: Check if your browser allows localStorage
- **Solution**: Ensure you're not in private/incognito mode
- **Solution**: Check browser settings for cookie/storage permissions

### Font size isn't changing
- **Solution**: Try refreshing the page
- **Solution**: Click "Reset to Default" and try again
- **Solution**: Check if another browser extension is interfering

### Dyslexic font not loading
- **Solution**: Check your internet connection (font loads from CDN)
- **Solution**: Wait a few seconds for the font to download
- **Solution**: Try refreshing the page

### Widget button is hidden
- **Solution**: Scroll to the bottom of the page
- **Solution**: Check if another element is covering it
- **Solution**: Try zooming out your browser

### Settings reset when I close the browser
- **Solution**: This is normal in private/incognito mode
- **Solution**: Use regular browsing mode to save settings
- **Solution**: Check browser privacy settings

---

## Privacy & Data

The accessibility widget:
- ✅ Stores settings **only** in your browser (localStorage)
- ✅ Does **NOT** send any data to external servers
- ✅ Does **NOT** track your usage
- ✅ Does **NOT** collect personal information
- ✅ Is completely **privacy-friendly**

The only external resource is the OpenDyslexic font, loaded from a public CDN when you enable the dyslexic font option.

---

## Technical Details

### For Developers

**Component Location**: `/src/components/AccessibilityWidget.jsx`
**Styles Location**: `/src/accessibility.css`
**Storage**: Browser localStorage with key `arp-accessibility-settings`

**Settings Object Structure**:
```javascript
{
  fontSize: 100,           // 80-150
  letterSpacing: 0,        // 0-5
  lineHeight: 1.5,         // 1.2-2.5
  dyslexicFont: false,     // boolean
  highContrast: false,     // boolean
  cursorSize: 'normal',    // 'normal' | 'large' | 'extra-large'
  highlightLinks: false,   // boolean
  highlightHeadings: false,// boolean
  grayscale: false,        // boolean
  invertColors: false      // boolean (reserved for future use)
}
```

---

## WCAG Compliance

This accessibility widget helps the ARP website meet:
- ✅ **WCAG 2.1 Level AA** standards
- ✅ **ADA** (Americans with Disabilities Act) requirements
- ✅ **Section 508** federal accessibility standards

### Specific WCAG Success Criteria Addressed:

**1.4.4 Resize Text (AA)**
- Font size adjustment up to 200% (we provide up to 150%)

**1.4.8 Visual Presentation (AAA)**
- Line spacing adjustment
- Letter spacing adjustment
- Text and background color control

**1.4.12 Text Spacing (AA)**
- Letter spacing control
- Line height control

**2.4.1 Bypass Blocks (A)**
- Skip to main content link

**2.4.7 Focus Visible (AA)**
- Enhanced focus indicators

**1.4.3 Contrast (Minimum) (AA)**
- High contrast mode

**2.1.1 Keyboard (A)**
- Full keyboard navigation support

---

## Feedback & Support

If you experience any issues with the accessibility widget or have suggestions for improvements:

1. **Contact Us**: Use the contact form on the website
2. **Email**: [Your support email]
3. **Report Issues**: Describe what's not working and what browser you're using

We're committed to making the ARP website accessible to everyone and welcome your feedback!

---

## Future Enhancements

We're considering adding:
- 🔄 Reading mask/ruler for line-by-line reading
- 🔄 Text-to-speech functionality
- 🔄 Additional color schemes
- 🔄 Profile presets (one-click settings for common needs)
- 🔄 Keyboard shortcut customization

---

## Credits

This accessibility widget is built on open-source principles and inspired by:
- Web Content Accessibility Guidelines (WCAG)
- OpenDyslexic font project
- Accessibility best practices from the W3C

---

**Last Updated**: November 2024
**Version**: 1.0
**License**: Open Source (MIT)
**Cost**: FREE - No subscription required

---

## Quick Reference Card

| Feature | Keyboard Shortcut | Mouse Action |
|---------|------------------|--------------|
| Open Widget | Tab + Enter | Click gear icon |
| Increase Font | - | Click + button |
| Decrease Font | - | Click - button |
| Toggle Setting | Space | Click switch |
| Close Widget | Esc | Click X |
| Reset All | - | Click Reset button |

---

**Remember**: Your accessibility settings are personal. Experiment with different combinations to find what works best for you!
