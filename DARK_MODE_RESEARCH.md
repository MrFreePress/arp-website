# Dark Mode / Light Theme Research for ARP Website

**Date**: November 18, 2025  
**Project**: Autism Resource Project Website  
**Stack**: React + Vite + Tailwind CSS + shadcn/ui  
**Status**: Research Complete

---

## Executive Summary

Your project **already has dark mode CSS variables defined** in `src/index.css`! You just need to add:
1. A theme provider (using `next-themes`)
2. A theme toggle component
3. Tailwind dark mode configuration

**Recommended Solution**: `next-themes` package (works with Vite, not just Next.js)

---

## Current State Analysis

### ✅ What You Already Have:

**File**: `/src/index.css`

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 291 64% 42%;  /* ARP Purple */
  --secondary: 16 100% 66%; /* ARP Orange */
  --accent: 43 98% 54%;     /* ARP Yellow */
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  /* ... dark mode values */
}
```

**Status**: ✅ **Dark mode CSS variables are READY**

### ❌ What You're Missing:

1. **Theme Provider** - To manage theme state
2. **Theme Toggle Component** - UI to switch themes
3. **Tailwind Config** - Enable dark mode class strategy
4. **Theme Persistence** - Save user preference

---

## Recommended Solution: next-themes

### Why next-themes?

✅ **Works with Vite + React** (not just Next.js despite the name)  
✅ **Lightweight** (~2KB)  
✅ **Zero flash** on page load  
✅ **System preference detection**  
✅ **localStorage persistence**  
✅ **TypeScript support**  
✅ **Most popular** (1.4M+ weekly downloads)  
✅ **Actively maintained**  
✅ **Perfect for shadcn/ui** (official recommendation)

### Alternatives Considered:

| Package | Size | Pros | Cons | Verdict |
|---------|------|------|------|---------|
| **next-themes** | 2KB | Perfect for your stack, zero-flash, system detection | Name suggests Next.js only | ✅ **RECOMMENDED** |
| **use-dark-mode** | 3KB | Simple hook-based | No system detection, less maintained | ⚠️ Okay |
| **theme-ui** | 50KB+ | Full theming system | Too heavy, overkill | ❌ Too much |
| **Custom Hook** | 0KB | No dependencies | More code to maintain, no zero-flash | ⚠️ More work |
| **Tailwind only** | 0KB | Built-in | No persistence, no system detection | ❌ Limited |

---

## Implementation Guide

### Option 1: next-themes (RECOMMENDED) ⭐

#### Step 1: Install Package

```bash
npm install next-themes
```

**Size**: ~2KB minified  
**Dependencies**: None (peer dependency: React)

#### Step 2: Create Theme Provider

**File**: `/src/components/ThemeProvider.jsx`

```jsx
import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
```

**Props Explained**:
- `attribute="class"` - Adds `.dark` class to `<html>` element
- `defaultTheme="system"` - Uses system preference by default
- `enableSystem` - Allows "system" as a theme option
- `disableTransitionOnChange` - Prevents flash during theme switch

#### Step 3: Wrap App with Provider

**File**: `/src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeProvider'
import './index.css'
import './accessibility.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
```

#### Step 4: Update Tailwind Config

**File**: `/tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ADD THIS LINE
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ... existing config
    },
  },
  plugins: [],
}
```

#### Step 5: Create Theme Toggle Component

**File**: `/src/components/ThemeToggle.jsx`

```jsx
import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled />
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  )
}
```

#### Step 6: Add Toggle to Header

**File**: `/src/components/layout/Header.jsx`

```jsx
import { ThemeToggle } from '@/components/ThemeToggle'

// Inside your Header component, add:
<div className="flex items-center gap-4">
  <ThemeToggle />
  {/* ... other header items */}
</div>
```

#### Step 7: Update Dark Mode Colors for ARP Brand

**File**: `/src/index.css` (already exists, just verify)

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  
  /* ARP Brand Colors for Dark Mode */
  --primary: 291 64% 52%;      /* Lighter purple for dark mode */
  --primary-foreground: 0 0% 100%;
  
  --secondary: 16 100% 70%;    /* Lighter orange for dark mode */
  --secondary-foreground: 0 0% 100%;
  
  --accent: 43 98% 60%;        /* Lighter yellow for dark mode */
  --accent-foreground: 222.2 47.4% 11.2%;
  
  /* ... rest of dark mode variables */
}
```

---

### Option 2: Advanced Theme Toggle with Dropdown

For a more sophisticated UI with System/Light/Dark options:

**File**: `/src/components/ThemeToggle.jsx` (Advanced Version)

```jsx
import React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {theme === 'dark' ? (
            <Moon className="h-5 w-5" />
          ) : theme === 'light' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Monitor className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

**Note**: This requires the dropdown-menu component from shadcn/ui:
```bash
npx shadcn-ui@latest add dropdown-menu
```

---

## Integration with Accessibility Widget

### Coordinating with Existing Accessibility Features

Your accessibility widget already has settings. You can integrate theme switching:

**Option A**: Keep Separate
- Accessibility widget for font/spacing/contrast
- Theme toggle in header for dark/light mode
- Both work independently

**Option B**: Integrate into Accessibility Widget

Add theme toggle to your AccessibilityWidget:

```jsx
// In AccessibilityWidget.jsx
import { useTheme } from 'next-themes'

export default function AccessibilityWidget() {
  const { theme, setTheme } = useTheme()
  // ... existing code
  
  return (
    <>
      {/* ... existing widget content */}
      
      {/* Add theme section */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Theme
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setTheme('light')}
            className={`px-3 py-2 text-xs rounded border ${
              theme === 'light' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`px-3 py-2 text-xs rounded border ${
              theme === 'dark' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setTheme('system')}
            className={`px-3 py-2 text-xs rounded border ${
              theme === 'system' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            System
          </button>
        </div>
      </div>
    </>
  )
}
```

---

## Dark Mode Best Practices

### 1. Color Contrast in Dark Mode

Ensure WCAG compliance:
- **Light text on dark background**: Minimum 4.5:1 contrast
- **Links**: Should be distinguishable (use lighter shades)
- **Borders**: Increase visibility in dark mode

**Test with**:
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- axe DevTools

### 2. Images and Media

```css
/* Adjust images in dark mode */
.dark img {
  opacity: 0.9;
}

/* Invert logos if needed */
.dark .logo-invert {
  filter: invert(1);
}
```

### 3. Gradients

Update your gradient backgrounds for dark mode:

```jsx
// In Home.jsx
<section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 
                    dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-pink-900/20">
```

### 4. Shadows

Adjust shadows for dark mode:

```css
.card {
  @apply shadow-lg dark:shadow-gray-900/50;
}
```

---

## ARP Brand Colors for Dark Mode

### Recommended Dark Mode Palette

Based on your existing ARP brand colors:

```css
.dark {
  /* Purple - Lighter for visibility */
  --primary: 291 64% 55%;
  --primary-foreground: 0 0% 100%;
  
  /* Orange - Warmer, lighter */
  --secondary: 16 100% 72%;
  --secondary-foreground: 0 0% 100%;
  
  /* Yellow - Softer, less intense */
  --accent: 43 90% 65%;
  --accent-foreground: 222.2 47.4% 11.2%;
  
  /* Background - Dark but not pure black */
  --background: 240 10% 10%;
  --foreground: 0 0% 95%;
  
  /* Cards - Slightly lighter than background */
  --card: 240 10% 15%;
  --card-foreground: 0 0% 95%;
  
  /* Muted - For secondary text */
  --muted: 240 10% 20%;
  --muted-foreground: 240 5% 65%;
  
  /* Borders - Subtle */
  --border: 240 10% 25%;
  --input: 240 10% 25%;
  --ring: 291 64% 55%;
}
```

---

## Testing Checklist

### Before Deployment

- [ ] Install `next-themes` package
- [ ] Create ThemeProvider component
- [ ] Wrap app with ThemeProvider
- [ ] Update tailwind.config.js with `darkMode: 'class'`
- [ ] Create ThemeToggle component
- [ ] Add toggle to Header
- [ ] Test light mode
- [ ] Test dark mode
- [ ] Test system mode
- [ ] Verify theme persists on refresh
- [ ] Check all pages in dark mode
- [ ] Verify contrast ratios (WCAG AA)
- [ ] Test with accessibility widget
- [ ] Check images/logos in dark mode
- [ ] Test gradients in dark mode
- [ ] Verify mobile responsiveness
- [ ] Test browser compatibility

### Manual Testing

1. **Toggle between themes**
   - Click theme toggle
   - Verify smooth transition
   - Check all colors update

2. **System preference**
   - Set OS to dark mode
   - Refresh page with theme="system"
   - Verify it matches OS

3. **Persistence**
   - Set theme to dark
   - Refresh page
   - Verify still dark

4. **Accessibility**
   - Use with screen reader
   - Check keyboard navigation
   - Verify ARIA labels

---

## Performance Considerations

### next-themes Performance

✅ **Bundle Size**: ~2KB (negligible)  
✅ **Runtime**: Minimal overhead  
✅ **Zero Flash**: No FOUC (Flash of Unstyled Content)  
✅ **localStorage**: Fast, synchronous  
✅ **Re-renders**: Only when theme changes  

### Optimization Tips

1. **Lazy load theme toggle** (if not in header):
```jsx
const ThemeToggle = React.lazy(() => import('./ThemeToggle'))
```

2. **Disable transitions during theme change**:
```jsx
<ThemeProvider disableTransitionOnChange>
```

3. **Memoize theme-dependent components**:
```jsx
const ThemedComponent = React.memo(({ theme }) => {
  // ...
})
```

---

## Browser Compatibility

### next-themes Support

✅ **Chrome**: 90+  
✅ **Firefox**: 88+  
✅ **Safari**: 14+  
✅ **Edge**: 90+  
✅ **Mobile**: iOS 14+, Android Chrome  

### Features Used

- localStorage (universal support)
- CSS custom properties (IE11+ with polyfill)
- CSS class toggle (universal)
- matchMedia for system detection (IE10+)

---

## Migration Path

### Phase 1: Basic Implementation (1-2 hours)

1. ✅ Install next-themes
2. ✅ Create ThemeProvider
3. ✅ Update Tailwind config
4. ✅ Create simple toggle button
5. ✅ Add to header
6. ✅ Test basic functionality

### Phase 2: Refinement (2-3 hours)

1. ✅ Adjust dark mode colors for ARP brand
2. ✅ Update gradients for dark mode
3. ✅ Fix any contrast issues
4. ✅ Test all pages
5. ✅ Add to accessibility widget (optional)

### Phase 3: Polish (1-2 hours)

1. ✅ Add dropdown with System option
2. ✅ Optimize images for dark mode
3. ✅ Add transitions
4. ✅ Comprehensive testing
5. ✅ Documentation

**Total Time**: 4-7 hours

---

## Code Examples

### Complete Implementation Files

#### 1. ThemeProvider.jsx
```jsx
import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
```

#### 2. ThemeToggle.jsx (Simple)
```jsx
import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
```

#### 3. Updated Header.jsx
```jsx
import { ThemeToggle } from '@/components/ThemeToggle'

// In your navigation section:
<div className="flex items-center gap-4">
  <ThemeToggle />
  <Button asChild>
    <Link to="/donate">Donate</Link>
  </Button>
</div>
```

#### 4. Updated main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeProvider'
import './index.css'
import './accessibility.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
```

#### 5. Updated tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ADD THIS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // ... rest of your colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## Troubleshooting

### Common Issues

#### 1. Flash of Wrong Theme on Load

**Problem**: Page loads in light mode then switches to dark  
**Solution**: Ensure ThemeProvider wraps entire app in main.jsx

#### 2. Theme Not Persisting

**Problem**: Theme resets on page refresh  
**Solution**: Check localStorage permissions, not in incognito mode

#### 3. Styles Not Applying in Dark Mode

**Problem**: Dark mode class added but styles don't change  
**Solution**: Verify `darkMode: 'class'` in tailwind.config.js

#### 4. Hydration Mismatch Warning

**Problem**: React hydration warning  
**Solution**: Use `mounted` state in ThemeToggle (see example above)

---

## Comparison with Alternatives

### vs. Custom Implementation

| Feature | next-themes | Custom Hook |
|---------|-------------|-------------|
| Bundle Size | 2KB | 0KB |
| Zero Flash | ✅ Yes | ❌ No |
| System Detection | ✅ Yes | ⚠️ Manual |
| Persistence | ✅ Built-in | ⚠️ Manual |
| Maintenance | ✅ Community | ❌ You |
| Time to Implement | 30 min | 2-3 hours |

**Verdict**: next-themes is worth the 2KB

### vs. theme-ui

| Feature | next-themes | theme-ui |
|---------|-------------|----------|
| Bundle Size | 2KB | 50KB+ |
| Purpose | Theme switching | Full design system |
| Complexity | Simple | Complex |
| shadcn/ui Compatible | ✅ Perfect | ⚠️ Conflicts |

**Verdict**: theme-ui is overkill for just dark mode

---

## Final Recommendation

### ✅ Implement next-themes

**Why**:
1. ✅ Your CSS variables are already set up
2. ✅ Works perfectly with Vite + React
3. ✅ Official shadcn/ui recommendation
4. ✅ Minimal code required
5. ✅ Zero flash, system detection, persistence
6. ✅ Only 2KB bundle size
7. ✅ Actively maintained
8. ✅ 30-minute implementation

### Implementation Priority

**High Priority** (Do First):
1. Install next-themes
2. Create ThemeProvider
3. Update Tailwind config
4. Create simple toggle
5. Add to header

**Medium Priority** (Do Soon):
1. Refine dark mode colors
2. Test all pages
3. Fix contrast issues

**Low Priority** (Nice to Have):
1. Add dropdown with System option
2. Integrate with accessibility widget
3. Optimize images for dark mode

---

## Resources

### Documentation
- [next-themes GitHub](https://github.com/pacocoursey/next-themes)
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)

### Tools
- [Realtime Colors](https://realtimecolors.com/) - Preview color schemes
- [Coolors](https://coolors.co/) - Generate dark mode palettes
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Status**: ✅ **READY TO IMPLEMENT**  
**Estimated Time**: 30 minutes - 2 hours  
**Complexity**: Low  
**Recommendation**: Proceed with next-themes
