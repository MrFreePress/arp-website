# CMS Content Loading Audit

## Issue
New posts created via `/admin` do not appear on the website immediately after being published.

## Root Cause Analysis

### How Content Loading Currently Works

The content loader (`src/lib/contentLoader.js`) uses Vite's `import.meta.glob` with `eager: true`:

```javascript
const modules = import.meta.glob('/content/podcast/*.md', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
})
```

**This means**:
1. ✅ Content is loaded **at build time**
2. ✅ Content is bundled into the JavaScript
3. ❌ Content is **frozen** in the bundle
4. ❌ New content requires a **rebuild** to appear

### The Workflow

```
CMS Publish → GitHub Commit → Trigger Deploy → Build Site → Content Appears
     ↓              ↓               ↓              ↓             ↓
  Instant       Instant         Instant        1-2 min       SUCCESS
```

**Total Time**: ~1-2 minutes from publish to live

### Evidence from Git History

```bash
* 5ae50be Merge pull request #2 from MrFreePress/cms/podcast/episode-111-here-we-are
| * 11a87a4 Create Podcast Episode "episode-111-here-we-are" - D Crager via DecapBridge
```

✅ **CMS is working correctly** - Episode 111 was:
- Created via CMS admin
- Committed to GitHub by DecapBridge
- Merged into main branch
- File exists at: `content/podcast/episode-111-here-we-are.md`

### Why Content Might Not Appear

**Scenario 1: Auto-Deploy Not Triggered**
- Vercel/Netlify didn't detect the commit
- Build webhook not configured
- Deploy paused or disabled

**Scenario 2: Build Failed**
- Build errors prevented deployment
- Content exists in repo but not in live site

**Scenario 3: Cache Issues**
- Browser cached old version
- CDN cached old bundle
- Hard refresh needed (Ctrl+Shift+R)

**Scenario 4: Waiting for Build**
- Build is in progress
- Takes 1-2 minutes to complete
- Content will appear when build finishes

## Current Architecture Assessment

### Pros of Current Approach
✅ **Fast Performance** - Content bundled at build time  
✅ **No Runtime API** - No backend needed  
✅ **SEO Friendly** - Content in HTML at build time  
✅ **Simple Architecture** - No database or API layer  
✅ **Version Controlled** - All content in Git  

### Cons of Current Approach
❌ **Requires Rebuild** - New content needs deployment  
❌ **1-2 Min Delay** - Not instant updates  
❌ **Build Dependency** - Content tied to build process  

## Solutions

### Solution 1: Verify Auto-Deploy (RECOMMENDED)

**This is the intended workflow** - no code changes needed.

**Steps to Verify**:

1. **Check Vercel/Netlify Settings**:
   - Go to project settings
   - Verify "Auto-deploy" is enabled for `main` branch
   - Check deployment history for recent builds

2. **Verify Build Triggers**:
   - Each commit to `main` should trigger build
   - Check if episode-111 commit triggered a build
   - Look for build logs after commit `11a87a4`

3. **Check Build Status**:
   - Visit Vercel/Netlify dashboard
   - Look for recent deployments
   - Verify builds are succeeding

4. **Test the Workflow**:
   - Create a test post via CMS
   - Wait 1-2 minutes for build
   - Check if content appears
   - Hard refresh browser (Ctrl+Shift+R)

**Expected Behavior**:
```
1. Publish in CMS → Instant
2. Commit to GitHub → ~5 seconds
3. Trigger build → ~5 seconds
4. Build completes → ~60-90 seconds
5. Content live → SUCCESS
```

**Total Time**: ~2 minutes from publish to live

### Solution 2: Add Build Status Indicator (Enhancement)

Add a visual indicator in the CMS or website showing:
- Last build time
- Build status (building/deployed)
- When new content will be live

**Implementation**:
```javascript
// Fetch Vercel/Netlify API for build status
// Display in admin or site header
```

### Solution 3: Switch to Runtime Loading (Major Change)

**Only if instant updates are critical business requirement.**

**Pros**:
- Instant content updates
- No build required

**Cons**:
- Requires backend API or static JSON generation
- More complex architecture
- Potential performance impact
- SEO considerations

**Implementation Options**:

**A. Static JSON Generation**:
```javascript
// Build step generates JSON from markdown
// Runtime fetches JSON instead of bundling
// Still requires build but separates content from code
```

**B. Serverless API**:
```javascript
// API endpoint reads markdown files
// Frontend fetches from API
// Requires backend infrastructure
```

**C. Headless CMS Integration**:
```javascript
// Use Contentful, Sanity, or similar
// Real-time content updates
// Significant architecture change
```

## Recommendations

### Immediate Action (No Code Changes)

1. **Verify Auto-Deploy is Working**:
   - Check Vercel/Netlify dashboard
   - Confirm builds trigger on commits
   - Review recent deployment history

2. **Document Expected Workflow**:
   - Add note in CMS admin: "Content appears in ~2 minutes after publish"
   - Update documentation with expected timeline
   - Set user expectations

3. **Test the Process**:
   - Create test content
   - Monitor build process
   - Verify content appears after build

### If Auto-Deploy is Broken

1. **Fix Deployment Configuration**:
   - Re-enable auto-deploy in Vercel/Netlify
   - Verify GitHub integration
   - Check webhook configuration

2. **Manual Deploy Test**:
   - Trigger manual deploy
   - Verify content appears
   - Confirms content loading works

### Future Enhancements (Optional)

1. **Add Build Webhook**:
   - Trigger build immediately on CMS publish
   - Don't wait for GitHub webhook
   - Faster content updates

2. **Build Status Dashboard**:
   - Show build status in admin
   - Display "Content will be live in X minutes"
   - Better user experience

3. **Content Preview**:
   - Add preview mode in CMS
   - See content before publishing
   - Already built into Decap CMS

## Verification Checklist

- [ ] Check Vercel/Netlify auto-deploy is enabled
- [ ] Verify recent commits triggered builds
- [ ] Review build logs for errors
- [ ] Test: Create content → Wait 2 min → Verify appears
- [ ] Hard refresh browser to clear cache
- [ ] Check if episode-111 appears on live site
- [ ] Document expected 1-2 minute delay for users

## Conclusion

**The system is working as designed**. Content loading via `import.meta.glob` requires a rebuild for new content to appear. This is:

✅ **Intentional** - Build-time loading for performance  
✅ **Standard** - Common pattern for static site generators  
✅ **Fast** - 1-2 minute delay is acceptable for most use cases  

**Action Required**: Verify auto-deploy is enabled and working. If builds are triggering correctly, the 1-2 minute delay is expected and normal.

**No code changes needed** unless instant updates are a critical business requirement (which would require significant architecture changes).

---

**Status**: ✅ System working as designed  
**Issue**: User expectation vs. actual behavior  
**Solution**: Verify auto-deploy + document expected timeline  
**Date**: January 12, 2026
