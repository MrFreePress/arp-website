# ARP Brand Colors & Design System

## Official Logo Analysis

The Autism Resource Project logo features a vibrant, warm gradient color scheme that conveys energy, hope, and inclusivity.

### Logo Color Breakdown

**Gradient Flow (Left to Right):**
1. **Golden Yellow** → **Orange** → **Coral** → **Pink/Rose** → **Purple/Magenta**

**Specific Color Values:**

#### Primary Colors

**Purple/Magenta** (Main Brand Color)
- Hex: `#8B3A7E`
- RGB: `rgb(139, 58, 126)`
- HSL: `hsl(291, 64%, 42%)`
- Used in: "autism resource project" text, primary buttons, links

**Warm Orange** (Secondary)
- Hex: `#FF7043`
- RGB: `rgb(255, 112, 67)`
- HSL: `hsl(16, 100%, 66%)`
- Used in: Secondary buttons, accents, gradients

**Golden Yellow** (Accent)
- Hex: `#FDB913`
- RGB: `rgb(253, 185, 19)`
- HSL: `hsl(43, 98%, 54%)`
- Used in: Accent elements, dots in text, highlights

#### Supporting Colors

**Rose/Pink**
- Hex: `#E91E63`
- RGB: `rgb(233, 30, 99)`
- HSL: `hsl(339, 82%, 52%)`
- Used in: Dandelion stem, gradient transitions

**Coral/Salmon**
- Hex: `#F06292`
- RGB: `rgb(240, 98, 146)`
- HSL: `hsl(340, 82%, 66%)`
- Used in: Gradient middle tones

## Implementation in Website

### CSS Custom Properties

```css
:root {
  /* Primary - Purple/Magenta from logo */
  --primary: 291 64% 42%;
  --primary-foreground: 0 0% 100%;
  
  /* Secondary - Warm Orange from logo */
  --secondary: 16 100% 66%;
  --secondary-foreground: 0 0% 100%;
  
  /* Accent - Golden Yellow from logo */
  --accent: 43 98% 54%;
  --accent-foreground: 222.2 47.4% 11.2%;
}
```

### Gradient Patterns

**Hero Sections:**
```css
background: linear-gradient(to bottom right, 
  from-yellow-50 via-orange-50 to-pink-50
);
```

**CTA Sections:**
```css
background: linear-gradient(to right,
  from-purple-600 via-pink-600 to-orange-500
);
```

**Alternate Hero:**
```css
background: linear-gradient(to bottom right,
  from-purple-50 via-pink-50 to-orange-50
);
```

## Color Psychology

### Why These Colors Work for ARP

**Purple/Magenta:**
- Represents creativity, wisdom, and compassion
- Associated with understanding and empathy
- Creates a sense of calm and support

**Orange:**
- Conveys warmth, enthusiasm, and energy
- Represents community and connection
- Encourages action and engagement

**Yellow:**
- Symbolizes hope, optimism, and happiness
- Represents enlightenment and awareness
- Creates a welcoming, positive atmosphere

**Pink/Rose:**
- Represents care, nurturing, and love
- Associated with compassion and understanding
- Creates an approachable, friendly feel

### Gradient Effect

The smooth gradient from yellow through orange to pink and purple creates:
- **Visual flow** - Guides the eye naturally
- **Warmth** - Inviting and approachable
- **Energy** - Dynamic and engaging
- **Unity** - Connects all brand elements
- **Inclusivity** - Represents diversity and spectrum

## Usage Guidelines

### Primary Color (Purple)
**Use for:**
- Primary buttons
- Main navigation links (hover state)
- Important headings
- Key CTAs
- Links

**Don't use for:**
- Large background areas (use tints instead)
- Body text (use gray)

### Secondary Color (Orange)
**Use for:**
- Secondary buttons
- Accent elements
- Icons and graphics
- Hover states
- Highlights

**Don't use for:**
- Primary navigation
- Body text

### Accent Color (Yellow)
**Use for:**
- Small accent elements
- Icons
- Badges or tags
- Highlights
- Call-out boxes

**Don't use for:**
- Large areas (can be overwhelming)
- Text on white backgrounds (poor contrast)

### Gradients
**Use for:**
- Hero sections
- CTA sections
- Feature highlights
- Section dividers

**Don't use for:**
- Body text backgrounds
- Form inputs
- Small UI elements

## Accessibility Considerations

### Color Contrast Ratios

**Purple (#8B3A7E) on White:**
- Contrast Ratio: 5.8:1
- WCAG AA: ✅ Pass (Large text)
- WCAG AAA: ✅ Pass (Large text)

**Orange (#FF7043) on White:**
- Contrast Ratio: 3.2:1
- WCAG AA: ✅ Pass (Large text only)
- Use white text on orange backgrounds

**Yellow (#FDB913) on White:**
- Contrast Ratio: 2.1:1
- WCAG AA: ❌ Fail
- Always use with sufficient contrast or as accent only

### Best Practices

1. **Text on Colored Backgrounds:**
   - Purple backgrounds → Use white text
   - Orange backgrounds → Use white text
   - Yellow backgrounds → Use dark gray or black text
   - Gradient backgrounds → Ensure text has sufficient contrast

2. **Interactive Elements:**
   - Maintain 3:1 contrast ratio minimum
   - Use focus indicators with sufficient contrast
   - Don't rely on color alone to convey information

3. **Icons and Graphics:**
   - Ensure 3:1 contrast against backgrounds
   - Provide text alternatives
   - Use multiple visual cues (not just color)

## Brand Consistency

### Logo Usage

**Header:**
- Full color logo
- Height: 48px (h-12)
- Maintains aspect ratio
- Links to homepage

**Footer:**
- Inverted logo (white) on dark background
- Height: 64px (h-16)
- Maintains aspect ratio

**Favicon:**
- Uses full logo
- Browser tab icon
- Theme color: #8B3A7E (purple)

### Color Combinations

**Recommended Pairings:**

1. **Purple + Orange**
   - High energy, warm
   - Use for CTAs and important actions

2. **Purple + Pink**
   - Soft, compassionate
   - Use for supportive content

3. **Orange + Yellow**
   - Bright, optimistic
   - Use for positive messaging

4. **Full Gradient**
   - All colors together
   - Use for hero sections and major CTAs

**Avoid:**
- Purple + Yellow (poor contrast)
- All colors at once in small spaces
- Gradients on text

## File Locations

**Logo File:**
- `/public/arp-logo.jpg`
- Format: JPEG
- Size: 174KB
- Dimensions: Original aspect ratio maintained

**Color Definitions:**
- `/src/index.css` - CSS custom properties
- All page components use these variables

## Future Considerations

### Potential Additions

1. **Tints and Shades:**
   - Create lighter versions for backgrounds
   - Create darker versions for text
   - Maintain brand consistency

2. **Extended Palette:**
   - Success: Green (for positive actions)
   - Warning: Amber (for cautions)
   - Error: Red (for errors)
   - Info: Blue (for informational content)

3. **Dark Mode:**
   - Adjust colors for dark backgrounds
   - Maintain contrast ratios
   - Keep brand recognition

### Testing

- Test colors on different devices
- Verify accessibility with tools
- Gather user feedback
- Monitor brand recognition
- Adjust as needed

---

**Last Updated:** January 2024
**Version:** 1.0
**Maintained by:** ARP Development Team
