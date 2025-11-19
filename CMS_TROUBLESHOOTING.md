# CMS Troubleshooting - Root Cause Analysis
## Issues and Resolutions

**Date**: November 18, 2025  
**Status**: 🔍 Investigating

---

## 🐛 **Issue 1: Local Dev Server Shows Header/Footer But No Content**

### **Symptoms**
- Header displays correctly ✅
- Footer displays correctly ✅
- Main content area is blank/empty ❌
- No console errors (likely)

### **Root Cause Analysis**

This is **NORMAL BEHAVIOR** for the local dev server when:

1. **Content files don't exist yet** - The sample content is in `content/` folder but pages are still using hardcoded data
2. **Pages haven't been updated** - React pages still reference `sampleEpisodes`, `samplePosts`, etc.
3. **No CMS login required locally** - You can see the site structure without logging in

### **Why This Happens**

Your pages (Podcast.jsx, Blog.jsx, etc.) currently use hardcoded sample data:

```jsx
// Example from Podcast.jsx
const sampleEpisodes = [
  {
    id: 1,
    title: 'Understanding Autism Spectrum Disorder',
    // ... hardcoded data
  },
]
```

The local dev server shows the layout (header/footer) but the content area depends on this sample data being present in the component state.

### **Resolution**

**Option A: Keep Using Sample Data (Quick Fix)**

The sample data should be displaying. If it's not, check:

1. **Browser console for errors** (F12)
2. **React DevTools** to see component state
3. **Network tab** for failed requests

**Option B: Update Pages to Load from CMS (Proper Fix)**

Update your pages to load content from the `content/` folder:

```jsx
// Example: Update Podcast.jsx
import { useEffect, useState } from 'react'
import { loadPodcastEpisodes } from '@/utils/contentLoader'

function Podcast() {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEpisodes() {
      const data = await loadPodcastEpisodes()
      setEpisodes(data)
      setLoading(false)
    }
    fetchEpisodes()
  }, [])

  if (loading) {
    return <div>Loading episodes...</div>
  }

  // ... rest of component
}
```

### **Do You Need to Be Logged In?**

**NO!** ❌ You do NOT need to be logged in to see content on the website.

- **CMS Login** (`/admin`) - Only for content creators/editors
- **Website** (all other pages) - Public, no login required
- **Content** - Loaded from files, not behind authentication

The CMS login is ONLY for the `/admin` page where you create/edit content.

---

## 🐛 **Issue 2: Vercel /admin Returns "Failed to load config.yml (404)"**

### **Symptoms**
```
Error loading the CMS configuration
Config Errors:
Error: Failed to load config.yml (404)
Check your config.yml file.
```

### **Root Cause Analysis**

The 404 error means Vercel cannot find the `config.yml` file. Possible causes:

#### **Cause 1: File Not Deployed** ⚠️ MOST LIKELY

Vite builds to `dist/` folder, but `public/admin/config.yml` might not be copied correctly.

**Check**:
```bash
# Locally, after build
ls -la dist/admin/
# Should show: config.yml and index.html
```

If files are missing from `dist/admin/`, Vite isn't copying them.

#### **Cause 2: Wrong MIME Type** ⚠️ POSSIBLE

Vercel might be serving `.yml` files with wrong MIME type, causing browser to reject them.

#### **Cause 3: Path Issue** ⚠️ LESS LIKELY

The CMS is looking in the wrong location for the config file.

### **Resolution Steps**

#### **Step 1: Verify Local Build**

```bash
# Clean build
rm -rf dist/
npm run build

# Check output
ls -la dist/admin/
# Should show:
# config.yml
# index.html
```

If files are there ✅, proceed to Step 2.  
If files are missing ❌, see "Fix Missing Files" below.

#### **Step 2: Add Vercel Configuration**

Create `vercel.json` to ensure proper MIME types and routing:

```json
{
  "headers": [
    {
      "source": "/admin/config.yml",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/yaml; charset=utf-8"
        }
      ]
    }
  ],
  "routes": [
    {
      "src": "/admin/(.*)",
      "dest": "/admin/$1"
    }
  ]
}
```

This ensures:
- Correct MIME type for YAML files
- Proper routing to admin folder

#### **Step 3: Verify Vite Public Directory**

Vite should automatically copy `public/` contents to `dist/`. Verify in `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Explicitly set public directory (should be default)
  publicDir: 'public',
})
```

#### **Step 4: Check Vercel Build Settings**

In Vercel Dashboard:
1. Go to Project Settings → General
2. Verify:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### **Step 5: Force Redeploy**

After making changes:
```bash
git add .
git commit -m "Fix admin config deployment"
git push
```

Or in Vercel Dashboard:
- Go to Deployments
- Click "..." on latest deployment
- Click "Redeploy"

### **Fix Missing Files (If Needed)**

If `dist/admin/` is empty after build, Vite isn't copying the public folder correctly.

**Solution**: Add explicit copy in build process.

Install `vite-plugin-static-copy`:
```bash
npm install --save-dev vite-plugin-static-copy
```

Update `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/admin/*',
          dest: 'admin'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

## 🔍 **Diagnostic Commands**

### **Check Local Build**
```bash
npm run build
ls -la dist/admin/
cat dist/admin/config.yml | head -10
```

### **Check What's in Git**
```bash
git ls-files public/admin/
```

### **Check File Permissions**
```bash
ls -la public/admin/
```

### **Test Config YAML Syntax**
```bash
# Install yamllint if needed
npm install -g js-yaml

# Validate YAML
js-yaml public/admin/config.yml
```

### **Check Vercel Deployment Logs**
1. Go to Vercel Dashboard
2. Click on your project
3. Click on latest deployment
4. Check "Build Logs"
5. Look for errors or warnings about admin folder

---

## 🎯 **Quick Fix Checklist**

### **For Local Dev Server (No Content)**

- [ ] Check browser console for errors (F12)
- [ ] Verify sample data exists in component files
- [ ] Check if pages are rendering correctly
- [ ] Try hard refresh (Ctrl+Shift+R)
- [ ] Check React DevTools for component state

**Note**: You do NOT need to log in to see website content!

### **For Vercel /admin (404 Error)**

- [ ] Verify `dist/admin/` has files after local build
- [ ] Create `vercel.json` with MIME type config
- [ ] Verify Vite config has correct publicDir
- [ ] Check Vercel build settings
- [ ] Force redeploy on Vercel
- [ ] Check Vercel build logs for errors

---

## 📋 **Expected Behavior**

### **Local Development**
```
npm run dev
→ Site loads at localhost:5175
→ Header/Footer visible
→ Content pages show sample data
→ /admin page loads (may need Netlify setup)
→ No login required for public pages
```

### **Vercel Production**
```
Visit: your-site.vercel.app
→ All pages load correctly
→ Content displays
→ /admin page loads
→ /admin/config.yml accessible
→ Can log in with Netlify Identity
```

---

## 🆘 **Still Having Issues?**

### **Local Dev Server**

1. **Check console errors**:
   - Open browser DevTools (F12)
   - Look for red errors
   - Share error messages

2. **Check component state**:
   - Install React DevTools extension
   - Inspect component state
   - Verify data is loading

3. **Try clean install**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

### **Vercel /admin 404**

1. **Check build output**:
   - Vercel Dashboard → Deployment → Build Logs
   - Look for "dist/admin/" in output
   - Check for copy errors

2. **Check deployed files**:
   - Visit: `your-site.vercel.app/admin/config.yml`
   - Should download or display YAML
   - If 404, files aren't deployed

3. **Check Vercel Functions**:
   - Vercel Dashboard → Functions
   - Should be empty (we're not using functions)

---

## 💡 **Understanding the Setup**

### **File Structure**
```
project/
├── public/
│   └── admin/
│       ├── index.html      ← CMS interface
│       └── config.yml      ← CMS configuration
├── content/
│   ├── podcast/           ← Content files
│   ├── blog/
│   ├── community/
│   └── library/
├── src/
│   ├── pages/             ← React pages
│   └── utils/
│       └── contentLoader.js ← Load content from files
└── dist/                  ← Build output (Vercel serves this)
    ├── admin/
    │   ├── index.html
    │   └── config.yml     ← MUST be here!
    └── assets/
```

### **Build Process**
```
1. npm run build
2. Vite compiles React app → dist/
3. Vite copies public/ → dist/
4. dist/admin/ should contain CMS files
5. Vercel deploys dist/ folder
6. /admin URL serves dist/admin/index.html
7. CMS loads dist/admin/config.yml
```

### **What Needs to Happen**
```
✅ public/admin/config.yml exists
✅ Vite copies it to dist/admin/config.yml
✅ Vercel deploys dist/ folder
✅ /admin/config.yml is accessible
✅ CMS can load configuration
✅ Login works via Netlify Identity
```

---

## 🔧 **Immediate Action Items**

### **Priority 1: Fix Vercel 404**

1. Create `vercel.json` (see Step 2 above)
2. Commit and push
3. Wait for deployment
4. Test `/admin` page

### **Priority 2: Verify Local Build**

1. Run `npm run build`
2. Check `dist/admin/` has files
3. If missing, add vite-plugin-static-copy

### **Priority 3: Update Pages (Optional)**

1. Update React pages to load from content files
2. Use contentLoader.js utilities
3. Test locally
4. Deploy

---

**Status**: 🔍 **Analysis Complete**  
**Root Cause**: Vercel can't find config.yml (404)  
**Solution**: Add vercel.json + verify build output  
**Next**: Implement fixes and redeploy
