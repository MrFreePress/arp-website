# Quick Start Guide - Autism Resource Project Website

## Get Up and Running in 5 Minutes

### Step 1: Install Dependencies (2 minutes)

```bash
cd /home/mrfreepress/CascadeProjects/arp-website
npm install
```

### Step 2: Start Development Server (1 minute)

```bash
npm run dev
```

The site will open at `http://localhost:5173`

### Step 3: Explore the Site (2 minutes)

Visit these pages to see what's been built:

- **Homepage**: `http://localhost:5173/`
- **Podcast**: `http://localhost:5173/podcast`
- **Sample Episode**: `http://localhost:5173/podcast/1`
- **Community**: `http://localhost:5173/community`
- **Library**: `http://localhost:5173/library`
- **Marketplace**: `http://localhost:5173/marketplace`
- **Blog**: `http://localhost:5173/blog`
- **Sample Blog Post**: `http://localhost:5173/blog/navigating-autism-diagnosis-tips`
- **About**: `http://localhost:5173/about`
- **Contact**: `http://localhost:5173/contact`
- **Donate**: `http://localhost:5173/donate`

---

## What You Have

### ✅ Complete Website
- 11 fully functional pages
- Modern, responsive design
- Mobile-friendly navigation
- Professional UI components

### ✅ Key Features
- **Podcast System**: Filters, search, individual episode pages
- **Community Directory**: Dropdown filters for state, city, type
- **Resource Library**: Searchable, filterable resources
- **Blog Platform**: SEO-optimized with starter posts
- **Marketplace**: Ready for Shopify/ThriveCart integration
- **Email Marketing**: Complete template library

### ✅ Documentation
- `README.md` - Complete project documentation
- `IMPLEMENTATION_GUIDE.md` - Step-by-step setup instructions
- `SEO_STRATEGY.md` - Comprehensive SEO plan
- `EMAIL_TEMPLATES.md` - Ready-to-use email templates
- `PROJECT_SUMMARY.md` - Full project overview
- `QUICK_START.md` - This file!

---

## Next Steps

### 1. Customize Content (Priority: HIGH)

Replace sample data with your actual content:

**Podcast Episodes** (`src/pages/Podcast.jsx`):
```javascript
const sampleEpisodes = [
  // Replace with your actual episodes
]
```

**Community Listings** (`src/pages/Community.jsx`):
```javascript
const sampleCommunities = [
  // Replace with your actual communities
]
```

**Library Resources** (`src/pages/Library.jsx`):
```javascript
const sampleResources = [
  // Replace with your actual resources
]
```

**Blog Posts** (`src/pages/Blog.jsx`):
```javascript
const samplePosts = [
  // Replace with your actual blog posts
]
```

### 2. Integrate Third-Party Services (Priority: HIGH)

**Marketplace** (`src/pages/Marketplace.jsx`):
- Add your Shopify or ThriveCart embed code
- Instructions are in the file

**Email Newsletter** (`src/components/layout/Footer.jsx`):
- Connect to Mailchimp, ConvertKit, or your email platform
- Update the `handleNewsletterSubmit` function

**Contact Form** (`src/pages/Contact.jsx`):
- Set up backend to receive form submissions
- Update the `handleSubmit` function

### 3. Deploy to Production (Priority: MEDIUM)

**Option A: Netlify (Recommended)**
```bash
npm run build
# Upload 'dist' folder to Netlify
```

**Option B: Vercel**
```bash
# Connect your Git repository
# Vercel auto-detects Vite projects
```

See `README.md` for detailed deployment instructions.

---

## Common Tasks

### Add a New Page

1. Create component in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`:
   ```javascript
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add navigation link in `src/components/layout/Header.jsx`

### Change Colors

Edit `src/index.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Change this */
}
```

### Add New Blog Post

1. Add post data to `src/pages/Blog.jsx`
2. Create individual post page or use dynamic routing
3. Update sitemap

### Update Social Media Links

Edit `src/components/layout/Footer.jsx`:
```javascript
<a href="YOUR_FACEBOOK_URL">...</a>
<a href="YOUR_INSTAGRAM_URL">...</a>
```

---

## Build for Production

```bash
npm run build
```

Production files will be in the `dist` folder.

---

## Test Production Build Locally

```bash
npm run preview
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
# Then restart
npm run dev
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check for syntax errors
npm run lint
```

---

## Getting Help

1. **Check Documentation**: Start with `README.md`
2. **Implementation Guide**: See `IMPLEMENTATION_GUIDE.md`
3. **Code Comments**: Most files have helpful comments
4. **SEO Questions**: Review `SEO_STRATEGY.md`
5. **Email Templates**: Check `EMAIL_TEMPLATES.md`

---

## Project Structure Quick Reference

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   └── ui/              # Reusable UI components
├── pages/               # All page components
├── lib/                 # Utility functions
├── App.jsx             # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

---

## Important Files

- `package.json` - Dependencies and scripts
- `vite.config.js` - Build configuration
- `tailwind.config.js` - Styling configuration
- `index.html` - HTML template with meta tags

---

## Development Tips

### Hot Reload
Changes to files automatically refresh the browser.

### Component Development
All components use React functional components with hooks.

### Styling
Uses TailwindCSS utility classes. Check [TailwindCSS docs](https://tailwindcss.com) for reference.

### Icons
Uses Lucide React. Browse icons at [lucide.dev](https://lucide.dev).

---

## Ready to Launch?

Follow the complete launch checklist in `IMPLEMENTATION_GUIDE.md` section "Testing & Launch".

---

## Questions?

Refer to the comprehensive documentation files:
- Technical questions → `README.md`
- Setup questions → `IMPLEMENTATION_GUIDE.md`
- SEO questions → `SEO_STRATEGY.md`
- Email questions → `EMAIL_TEMPLATES.md`
- Overview → `PROJECT_SUMMARY.md`

---

**You're all set! Start customizing and make this website your own.** 🚀

Together, we build community. 💙
