# Dark Mode Fix Guide - Remaining Light Sections

## Issue Identified

When dark mode is activated, large sections of the pages remain light because they have hardcoded light backgrounds without dark mode variants.

## Common Patterns to Fix

### 1. White Backgrounds
```jsx
// BEFORE (stays white in dark mode)
<section className="bg-white">

// AFTER (dark gray in dark mode)
<section className="bg-white dark:bg-gray-900">
```

### 2. Light Gray Backgrounds
```jsx
// BEFORE
<section className="bg-gray-50">

// AFTER
<section className="bg-gray-50 dark:bg-gray-800">
```

### 3. Light Gradients
```jsx
// BEFORE
<section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">

// AFTER
<section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-yellow-950/20 dark:via-orange-950/20 dark:to-pink-950/20">
```

### 4. Text Colors
```jsx
// BEFORE
<h1 className="text-gray-900">

// AFTER
<h1 className="text-gray-900 dark:text-white">

// BEFORE
<p className="text-gray-600">

// AFTER
<p className="text-gray-600 dark:text-gray-300">
```

### 5. Borders
```jsx
// BEFORE
<div className="border-b">

// AFTER
<div className="border-b dark:border-gray-800">
```

## Pages That Need Fixing

- [x] Home.jsx - FIXED
- [ ] About.jsx
- [ ] Podcast.jsx
- [ ] PodcastEpisode.jsx
- [ ] Community.jsx
- [ ] Library.jsx
- [ ] Marketplace.jsx
- [ ] Blog.jsx
- [ ] BlogPost.jsx
- [ ] Contact.jsx
- [ ] Donate.jsx

## Quick Fix Script

For each page, search and replace:
1. `bg-white"` → `bg-white dark:bg-gray-900"`
2. `bg-gray-50"` → `bg-gray-50 dark:bg-gray-800"`
3. `text-gray-900"` → `text-gray-900 dark:text-white"`
4. `text-gray-600"` → `text-gray-600 dark:text-gray-300"`
5. `border-b"` → `border-b dark:border-gray-800"`
6. Update gradients with dark variants

## Status

Home.jsx has been updated as a template. Other pages need similar updates.
