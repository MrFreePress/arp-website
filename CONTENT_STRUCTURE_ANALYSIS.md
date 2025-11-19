# ARP Website Content Structure Analysis
## Complete Field Mapping for Decap CMS Implementation

**Date**: November 18, 2025  
**Purpose**: Document all fields needed for content management

---

## 📊 Content Type Analysis

### 1. **Podcast Episodes** 🎙️

#### List View Fields (Podcast.jsx)
```javascript
{
  id: number,
  title: string,
  guest: string,
  topic: string,
  date: string (YYYY-MM-DD),
  duration: string (MM:SS),
  description: string,
  audioUrl: string
}
```

#### Detail View Fields (PodcastEpisode.jsx)
```javascript
{
  // From List View
  id: number,
  title: string,
  guest: string,
  topic: string,
  date: string,
  duration: string,
  description: string,
  audioUrl: string,
  
  // Additional Detail Fields
  guestBio: string (long text),
  guestWebsite: string (URL, optional),
  showNotes: string (markdown),
  resources: array of {
    title: string,
    url: string
  }
}
```

#### Complete Podcast Episode Schema
```yaml
Fields Required:
1. ✅ Episode Number (auto-increment)
2. ✅ Title (required)
3. ✅ Guest Name (required)
4. ✅ Guest Bio (long text, required)
5. ✅ Guest Website (URL, optional)
6. ✅ Topic/Category (select dropdown)
7. ✅ Publish Date (datetime)
8. ✅ Duration (time format MM:SS)
9. ✅ Short Description (for list view, ~200 chars)
10. ✅ Audio File URL (required)
11. ✅ Show Notes (markdown editor)
12. ✅ Resources List (repeatable fields)
    - Resource Title
    - Resource URL
13. ✅ Featured (boolean, for homepage)
14. ✅ Status (Draft/Published)
```

---

### 2. **Blog Posts** 📝

#### List View Fields (Blog.jsx)
```javascript
{
  id: number,
  title: string,
  slug: string,
  author: string,
  date: string (YYYY-MM-DD),
  category: string,
  tags: array of strings,
  excerpt: string,
  image: string (URL),
  readTime: string
}
```

#### Detail View Fields (BlogPost.jsx)
```javascript
{
  // From List View
  title: string,
  author: string,
  date: string,
  category: string,
  tags: array of strings,
  readTime: string,
  
  // Additional Detail Fields
  content: string (HTML/Markdown),
  
  // Social Sharing (auto-generated from URL)
}
```

#### Complete Blog Post Schema
```yaml
Fields Required:
1. ✅ Title (required)
2. ✅ Slug (auto-generated from title, editable)
3. ✅ Author (select from list or text)
4. ✅ Publish Date (datetime)
5. ✅ Category (select dropdown)
   - Getting Started
   - Education
   - Communication
   - Daily Living
   - Parenting
   - Resources
   - Personal Stories
6. ✅ Tags (list, comma-separated)
7. ✅ Excerpt/Summary (text, ~200 chars)
8. ✅ Featured Image (image upload)
9. ✅ Featured Image Alt Text (accessibility)
10. ✅ Read Time (auto-calculate or manual)
11. ✅ Content (rich text/markdown editor)
12. ✅ SEO Title (optional, defaults to title)
13. ✅ SEO Description (optional, defaults to excerpt)
14. ✅ Featured (boolean, for homepage)
15. ✅ Status (Draft/In Review/Published)
```

---

### 3. **Community Resources** 🤝

#### List View Fields (Community.jsx)
```javascript
{
  id: number,
  name: string,
  state: string,
  city: string,
  type: string,
  description: string,
  contact: string (email),
  website: string (URL),
  meetingSchedule: string
}
```

#### Complete Community Resource Schema
```yaml
Fields Required:
1. ✅ Resource Name (required)
2. ✅ Type (select dropdown)
   - Support Group
   - Network
   - Resource Center
   - Online Community
   - Event
   - Organization
3. ✅ Description (text area, ~300 chars)
4. ✅ State (select dropdown - US states)
5. ✅ City (text)
6. ✅ Address (optional, text)
7. ✅ Contact Email (email format)
8. ✅ Contact Phone (optional, phone format)
9. ✅ Website URL (URL format)
10. ✅ Meeting Schedule (text)
11. ✅ Virtual/In-Person (select)
12. ✅ Cost (Free/Paid/Donation)
13. ✅ Age Group (select multiple)
    - Early Childhood (0-5)
    - Children (6-12)
    - Teens (13-17)
    - Adults (18+)
    - All Ages
14. ✅ Languages Offered (list)
15. ✅ Accessibility Features (list)
16. ✅ Featured (boolean)
17. ✅ Status (Active/Inactive)
```

---

### 4. **Library Resources** 📚

#### List View Fields (Library.jsx)
```javascript
{
  id: number,
  title: string,
  category: string,
  type: string,
  description: string,
  url: string,
  downloadable: boolean
}
```

#### Complete Library Resource Schema
```yaml
Fields Required:
1. ✅ Title (required)
2. ✅ Category (select dropdown)
   - Education
   - Daily Living
   - Communication
   - Employment
   - Early Childhood
   - Social Skills
   - Health & Wellness
   - Legal & Advocacy
   - Technology
3. ✅ Resource Type (select dropdown)
   - PDF Guide
   - Article
   - Video
   - Resource List
   - Activity Guide
   - Tool/App
   - Book
   - Research Paper
4. ✅ Description (text area, ~300 chars)
5. ✅ URL/Link (URL format)
6. ✅ Downloadable (boolean)
7. ✅ File Upload (if downloadable, PDF/DOC)
8. ✅ Author/Source (text)
9. ✅ Publication Date (date, optional)
10. ✅ Age Group (select multiple)
    - Early Childhood (0-5)
    - Children (6-12)
    - Teens (13-17)
    - Adults (18+)
    - All Ages
11. ✅ Language (select)
12. ✅ Cost (Free/Paid)
13. ✅ External Link (if not hosted)
14. ✅ Tags (list for search)
15. ✅ Featured (boolean)
16. ✅ Status (Published/Archived)
```

---

## 🎯 Decap CMS Configuration Summary

### Collections to Create
1. **Podcast Episodes** (`content/podcast/`)
2. **Blog Posts** (`content/blog/`)
3. **Community Resources** (`content/community/`)
4. **Library Resources** (`content/library/`)

### Folder Structure
```
content/
├── blog/
│   ├── 2024-01-20-navigating-autism-diagnosis.md
│   ├── 2024-01-18-sensory-processing-guide.md
│   └── ...
├── podcast/
│   ├── episode-001-temple-grandin.md
│   ├── episode-002-special-education.md
│   └── ...
├── community/
│   ├── la-autism-support-group.md
│   ├── bay-area-network.md
│   └── ...
└── library/
    ├── iep-504-guide.md
    ├── sensory-strategies.md
    └── ...
```

### Media Storage
```
public/
└── uploads/
    ├── blog/
    │   ├── featured-images/
    │   └── inline-images/
    ├── podcast/
    │   ├── audio/
    │   └── guest-photos/
    ├── community/
    │   └── logos/
    └── library/
        └── documents/
```

---

## 📋 Widget Types Needed

### Decap CMS Widgets
1. **string** - Short text (titles, names)
2. **text** - Long text (descriptions)
3. **markdown** - Rich text content
4. **datetime** - Dates and times
5. **select** - Dropdown menus
6. **list** - Repeatable items (tags, resources)
7. **object** - Nested fields (resources with title+URL)
8. **boolean** - True/false (featured, downloadable)
9. **image** - Image uploads
10. **file** - File uploads (PDFs, audio)
11. **number** - Numbers (episode numbers)
12. **relation** - Link to other content

---

## 🔄 Content Workflow

### Editorial Workflow Stages
1. **Drafts** - Work in progress
2. **In Review** - Ready for review
3. **Ready** - Approved, ready to publish

### Permissions
- **Editors** - Can create and edit drafts
- **Reviewers** - Can review and approve
- **Publishers** - Can publish to live site

---

## 🎨 User Interface Preview

### What Team Members Will See

#### Creating a New Podcast Episode
```
┌─────────────────────────────────────┐
│ New Podcast Episode                 │
├─────────────────────────────────────┤
│ Episode Number: [____]              │
│ Title: [_________________________]  │
│ Guest Name: [____________________]  │
│ Guest Bio:                          │
│ [________________________________]  │
│ [________________________________]  │
│ Guest Website: [_________________]  │
│ Topic: [▼ Select Topic]             │
│ Publish Date: [📅 Pick Date]        │
│ Duration: [__:__]                   │
│ Description:                        │
│ [________________________________]  │
│ Audio File: [📎 Upload Audio]       │
│ Show Notes: [Rich Text Editor]     │
│                                     │
│ Resources:                          │
│ ┌─────────────────────────────┐   │
│ │ + Add Resource              │   │
│ │ Title: [__________________] │   │
│ │ URL: [____________________] │   │
│ │ [Remove]                    │   │
│ └─────────────────────────────┘   │
│                                     │
│ Featured: ☐                         │
│ Status: [▼ Draft]                   │
│                                     │
│ [Save Draft] [Publish]              │
└─────────────────────────────────────┘
```

#### Creating a New Blog Post
```
┌─────────────────────────────────────┐
│ New Blog Post                       │
├─────────────────────────────────────┤
│ Title: [_________________________]  │
│ Slug: [auto-generated-slug]         │
│ Author: [▼ Select Author]           │
│ Publish Date: [📅 Pick Date]        │
│ Category: [▼ Select Category]       │
│ Tags: [tag1, tag2, tag3]            │
│ Excerpt:                            │
│ [________________________________]  │
│ Featured Image: [📎 Upload Image]   │
│ Alt Text: [_____________________]   │
│ Read Time: [__ min read]            │
│                                     │
│ Content: [Rich Text Editor]         │
│ [B] [I] [U] [Link] [Image] [H1-H6] │
│ [________________________________]  │
│ [________________________________]  │
│                                     │
│ SEO Settings (Optional):            │
│ SEO Title: [____________________]   │
│ SEO Description: [______________]   │
│                                     │
│ Featured: ☐                         │
│ Status: [▼ Draft]                   │
│                                     │
│ [Save Draft] [Publish]              │
└─────────────────────────────────────┘
```

---

## ✅ Implementation Checklist

### Phase 1: Setup (30 minutes)
- [ ] Install Decap CMS package
- [ ] Create admin folder and files
- [ ] Configure GitHub OAuth
- [ ] Set up basic config.yml

### Phase 2: Configuration (1 hour)
- [ ] Configure Podcast collection
- [ ] Configure Blog collection
- [ ] Configure Community collection
- [ ] Configure Library collection
- [ ] Set up media folders
- [ ] Configure editorial workflow

### Phase 3: Integration (1 hour)
- [ ] Create content loading utilities
- [ ] Update Podcast page to load from content
- [ ] Update Blog page to load from content
- [ ] Update Community page to load from content
- [ ] Update Library page to load from content
- [ ] Update detail pages

### Phase 4: Testing (30 minutes)
- [ ] Test creating podcast episode
- [ ] Test creating blog post
- [ ] Test creating community resource
- [ ] Test creating library resource
- [ ] Test editorial workflow
- [ ] Test media uploads
- [ ] Test preview functionality

### Phase 5: Training (15 minutes)
- [ ] Create user guide
- [ ] Train team members
- [ ] Set up permissions

---

## 🎓 Team Training Guide

### How to Create Content (Simple Steps)

#### For Podcast Episodes:
1. Go to `yoursite.com/admin`
2. Click "Podcast Episodes"
3. Click "New Podcast Episode"
4. Fill in all the blanks:
   - Episode number
   - Title
   - Guest name and bio
   - Upload audio file
   - Write show notes
   - Add resources
5. Click "Save Draft" or "Publish"
6. Done! Changes live in 2-3 minutes

#### For Blog Posts:
1. Go to `yoursite.com/admin`
2. Click "Blog Posts"
3. Click "New Blog Post"
4. Fill in the blanks:
   - Title
   - Author
   - Category
   - Upload featured image
   - Write content
5. Click "Save Draft" or "Publish"
6. Done!

---

**Status**: ✅ **READY FOR IMPLEMENTATION**  
**Next Step**: Install and configure Decap CMS  
**Estimated Time**: 2-3 hours total
