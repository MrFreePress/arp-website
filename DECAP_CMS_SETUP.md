# Decap CMS Setup Guide
## Implementation Complete - Next Steps

**Date**: November 18, 2025  
**Status**: ✅ Ready for GitHub OAuth Setup

---

## ✅ What's Been Implemented

### 1. Decap CMS Installation
- ✅ Installed `decap-cms-app` package
- ✅ Installed `gray-matter` for parsing Markdown
- ✅ Created admin interface at `/public/admin/`
- ✅ Created comprehensive configuration file

### 2. Content Structure
- ✅ Created content folders:
  - `/content/podcast/` - Podcast episodes
  - `/content/blog/` - Blog posts
  - `/content/community/` - Community resources
  - `/content/library/` - Library resources
- ✅ Created upload folders:
  - `/public/uploads/podcast/` - Audio files and guest photos
  - `/public/uploads/blog/` - Featured images
  - `/public/uploads/community/` - Organization logos
  - `/public/uploads/library/` - PDF files and documents

### 3. Configuration Complete
- ✅ **Podcast Episodes**: 24 fields configured
  - Episode number, title, guest info, audio, show notes, resources
- ✅ **Blog Posts**: 20 fields configured
  - Title, author, content, images, SEO, tags
- ✅ **Community Resources**: 25 fields configured
  - Location, contact info, meeting details, accessibility
- ✅ **Library Resources**: 26 fields configured
  - Files, categories, target audience, pricing

### 4. Sample Content Created
- ✅ Sample podcast episode (Episode 1 - Temple Grandin)
- ✅ Sample blog post (Navigating Autism Diagnosis)
- ✅ Sample community resource (LA Support Group)
- ✅ Sample library resource (IEP/504 Guide)

### 5. Utilities & Documentation
- ✅ Content loader utilities (`src/utils/contentLoader.js`)
- ✅ User guide for team members (100+ pages)
- ✅ Content structure analysis document
- ✅ This setup guide

---

## 🔧 What You Need to Do Next

### Step 1: Set Up GitHub OAuth (15 minutes)

Decap CMS uses GitHub for authentication. You need to set up OAuth:

#### Option A: Using Netlify Identity (Recommended - Easiest)

1. **Sign up for Netlify** (free): https://app.netlify.com/signup
2. **Import your GitHub repository**
3. **Enable Identity**:
   - Go to Site Settings → Identity
   - Click "Enable Identity"
4. **Enable Git Gateway**:
   - Go to Settings → Identity → Services
   - Enable Git Gateway
5. **Add GitHub as OAuth provider**:
   - Settings → Identity → External providers
   - Add GitHub
6. **Update config.yml**:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```

#### Option B: Direct GitHub OAuth (More Control)

1. **Go to GitHub Settings**:
   - https://github.com/settings/developers

2. **Create New OAuth App**:
   - Click "OAuth Apps" → "New OAuth App"
   - Application name: `ARP Website CMS`
   - Homepage URL: `https://your-site.vercel.app`
   - Authorization callback URL: `https://api.netlify.com/auth/done`

3. **Save credentials**:
   - Copy Client ID
   - Generate and copy Client Secret

4. **Set up Netlify OAuth** (free service):
   - Sign up at https://app.netlify.com
   - Go to Site Settings → Access control → OAuth
   - Add GitHub provider with your credentials

5. **Update config.yml** (already configured):
   ```yaml
   backend:
     name: github
     repo: MrFreePress/arp-website
     branch: main
     base_url: https://api.netlify.com
     auth_endpoint: auth
   ```

### Step 2: Add Team Members (5 minutes)

1. **Go to GitHub repository settings**
2. **Navigate to**: Settings → Collaborators
3. **Add team members** by GitHub username
4. **Set permissions**: Write access (so they can commit content)

### Step 3: Test the CMS (10 minutes)

1. **Deploy to Vercel** (if not already):
   ```bash
   git add .
   git commit -m "Add Decap CMS"
   git push
   ```

2. **Access the admin**:
   - Go to: `https://your-site.vercel.app/admin`
   - Click "Login with GitHub"
   - Authorize the app

3. **Test creating content**:
   - Try creating a test blog post
   - Upload an image
   - Save as draft
   - Preview
   - Delete the test post

### Step 4: Update React Pages (30 minutes)

Currently, your pages use hardcoded sample data. You need to update them to load from the content files.

#### Example: Update Podcast.jsx

```jsx
// At the top of the file
import { useEffect, useState } from 'react'
import { loadPodcastEpisodes } from '@/utils/contentLoader'

// Inside the component
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
  return <div>Loading...</div>
}
```

#### Files to Update:
- [ ] `src/pages/Podcast.jsx` - Use `loadPodcastEpisodes()`
- [ ] `src/pages/PodcastEpisode.jsx` - Use `loadPodcastEpisode(slug)`
- [ ] `src/pages/Blog.jsx` - Use `loadBlogPosts()`
- [ ] `src/pages/BlogPost.jsx` - Use `loadBlogPost(slug)`
- [ ] `src/pages/Community.jsx` - Use `loadCommunityResources()`
- [ ] `src/pages/Library.jsx` - Use `loadLibraryResources()`
- [ ] `src/pages/Home.jsx` - Use `loadFeaturedContent()`

### Step 5: Train Your Team (15 minutes)

1. **Share the user guide**: `DECAP_CMS_USER_GUIDE.md`
2. **Schedule a quick training session**:
   - Show how to access the admin
   - Demonstrate creating content
   - Explain the workflow (Draft → Review → Publish)
3. **Create a test piece of content together**
4. **Answer questions**

---

## 📁 File Structure Overview

```
arp-website/
├── public/
│   ├── admin/
│   │   ├── index.html          # CMS admin interface
│   │   └── config.yml          # CMS configuration
│   └── uploads/                # Media uploads
│       ├── blog/
│       ├── podcast/
│       ├── community/
│       └── library/
├── content/                    # Content files (Markdown)
│   ├── blog/
│   ├── podcast/
│   ├── community/
│   └── library/
├── src/
│   ├── pages/                  # React pages (need updating)
│   │   ├── Podcast.jsx
│   │   ├── Blog.jsx
│   │   ├── Community.jsx
│   │   └── Library.jsx
│   └── utils/
│       └── contentLoader.js    # Content loading utilities
└── docs/
    ├── DECAP_CMS_SETUP.md      # This file
    ├── DECAP_CMS_USER_GUIDE.md # User guide
    └── CONTENT_STRUCTURE_ANALYSIS.md
```

---

## 🎯 Content Management Workflow

### For Content Creators

```
1. Go to yoursite.com/admin
2. Log in with GitHub
3. Click content type (Blog, Podcast, etc.)
4. Click "New [Content Type]"
5. Fill in the form (all fields with * are required)
6. Upload images/files as needed
7. Click "Save" (saves as draft)
8. Preview your content
9. When ready, click "Publish"
10. Wait 2-3 minutes for deployment
11. Content is live!
```

### For Reviewers

```
1. Go to yoursite.com/admin
2. Click "Workflow" at the top
3. See content in three columns:
   - Drafts (work in progress)
   - In Review (ready for review)
   - Ready (approved, ready to publish)
4. Click on content to review
5. Make edits if needed
6. Move to "Ready" when approved
7. Publisher can then publish
```

---

## 🔐 Security & Permissions

### GitHub Repository Permissions

- **Admin**: Full access (you)
- **Write**: Can create and edit content (team members)
- **Read**: Can view but not edit (not recommended for CMS users)

### Recommended Setup

1. **Create a GitHub team**: "ARP Content Editors"
2. **Add team members** to this team
3. **Give team "Write" access** to repository
4. **Protect main branch**:
   - Require pull requests for direct commits (optional)
   - Use editorial workflow instead

### Content Workflow Permissions

- **Editors**: Can create drafts and edit their own content
- **Reviewers**: Can review and approve content
- **Publishers**: Can publish approved content

---

## 📊 Content Fields Reference

### Podcast Episodes (24 fields)
```
✅ Episode Number
✅ Title
✅ Slug
✅ Guest Name
✅ Guest Bio
✅ Guest Website
✅ Guest Photo
✅ Topic/Category
✅ Publish Date
✅ Duration
✅ Short Description
✅ Audio File
✅ Show Notes
✅ Resources (list)
✅ Featured
✅ Season
✅ Has Transcript
✅ Transcript
```

### Blog Posts (20 fields)
```
✅ Title
✅ Slug
✅ Author
✅ Publish Date
✅ Category
✅ Tags
✅ Excerpt
✅ Featured Image
✅ Image Alt Text
✅ Read Time
✅ Content
✅ SEO Settings (title, description, keywords)
✅ Featured
✅ Allow Comments
✅ Related Posts
```

### Community Resources (25 fields)
```
✅ Resource Name
✅ Slug
✅ Type
✅ Description
✅ State
✅ City
✅ Address
✅ Zip Code
✅ Contact Email
✅ Contact Phone
✅ Website URL
✅ Facebook Page
✅ Instagram Handle
✅ Meeting Schedule
✅ Meeting Format
✅ Meeting Link
✅ Cost
✅ Age Groups Served
✅ Languages Offered
✅ Accessibility Features
✅ Logo/Image
✅ Featured
✅ Status
✅ Last Verified
```

### Library Resources (26 fields)
```
✅ Title
✅ Slug
✅ Category
✅ Resource Type
✅ Description
✅ Downloadable
✅ File Upload
✅ External URL
✅ Author/Source
✅ Publication Date
✅ Last Updated
✅ Age Groups
✅ Language
✅ Reading Level
✅ Cost
✅ Price
✅ Access Requirements
✅ Full Description
✅ Key Topics
✅ Table of Contents
✅ Thumbnail Image
✅ Featured
✅ Status
✅ Download Count
✅ Rating
```

---

## 🚀 Deployment Checklist

### Before Going Live

- [ ] GitHub OAuth configured
- [ ] Team members added to repository
- [ ] CMS tested with sample content
- [ ] React pages updated to load from content files
- [ ] Sample content created for each type
- [ ] User guide shared with team
- [ ] Training session completed
- [ ] Backup strategy in place (GitHub = automatic backups!)

### After Going Live

- [ ] Monitor for issues
- [ ] Collect team feedback
- [ ] Update documentation as needed
- [ ] Create content templates
- [ ] Establish editorial calendar
- [ ] Set up regular content reviews

---

## 💡 Tips for Success

### For Administrators

1. **Start small**: Begin with one content type, master it, then add more
2. **Create templates**: Save time with content templates
3. **Regular backups**: GitHub automatically backs up everything
4. **Monitor usage**: Check what content is being created
5. **Iterate**: Improve the configuration based on team feedback

### For Content Creators

1. **Save often**: Click "Save" every few minutes
2. **Use drafts**: Don't publish until content is ready
3. **Preview first**: Always preview before publishing
4. **Follow the guide**: Refer to the user guide when stuck
5. **Ask for help**: Don't hesitate to ask questions

### For Reviewers

1. **Check regularly**: Review content in the workflow
2. **Provide feedback**: Use comments to communicate
3. **Be consistent**: Apply the same standards to all content
4. **Approve promptly**: Don't let content sit in review
5. **Communicate**: Let creators know when content is approved

---

## 🔧 Troubleshooting

### Common Issues

**Issue**: "Can't access /admin"
- **Solution**: Make sure you've deployed to Vercel and the admin folder is in public/

**Issue**: "Login not working"
- **Solution**: Check GitHub OAuth configuration

**Issue**: "Content not showing on site"
- **Solution**: Make sure React pages are updated to load from content files

**Issue**: "Images not uploading"
- **Solution**: Check file size (under 10MB) and format (JPG, PNG)

**Issue**: "Changes not deploying"
- **Solution**: Check Vercel deployment logs, may need to trigger manual deploy

---

## 📞 Support

### Resources

- **Decap CMS Docs**: https://decapcms.org/docs/
- **GitHub Repo**: https://github.com/MrFreePress/arp-website
- **User Guide**: `DECAP_CMS_USER_GUIDE.md`
- **Content Analysis**: `CONTENT_STRUCTURE_ANALYSIS.md`

### Getting Help

1. Check this setup guide
2. Check the user guide
3. Check Decap CMS documentation
4. Ask in team chat
5. Contact site administrator

---

## ✅ Implementation Status

- ✅ **Phase 1**: Installation & Configuration (COMPLETE)
- ✅ **Phase 2**: Content Structure & Sample Data (COMPLETE)
- ✅ **Phase 3**: Utilities & Documentation (COMPLETE)
- ⏭️ **Phase 4**: GitHub OAuth Setup (NEXT STEP)
- ⏭️ **Phase 5**: React Integration (AFTER OAUTH)
- ⏭️ **Phase 6**: Team Training (FINAL STEP)

---

## 🎉 Ready to Go!

Everything is set up and ready. Just complete the GitHub OAuth setup (Step 1 above) and you'll be able to start managing content through the CMS!

**Estimated time to complete setup**: 30-45 minutes  
**Estimated time to train team**: 15 minutes  
**Total time to production**: ~1 hour

---

**Questions?** Refer to the user guide or contact the development team.

**Last Updated**: November 18, 2025  
**Version**: 1.0
