# Decap CMS Setup for Vercel
## Complete Guide for Vercel Hosting

**Your Site**: Hosted on Vercel  
**CMS**: Decap CMS (works perfectly with Vercel!)  
**Authentication**: GitHub OAuth via Netlify's free service

---

## ✅ Yes, Decap CMS Works with Vercel!

Decap CMS is **platform-agnostic** and works great with Vercel. The only difference is authentication setup.

---

## 🔧 Setup Options for Vercel

### **Option 1: Use Netlify for Auth Only (Recommended - Easiest)**

You keep your site on Vercel, but use Netlify's **free authentication service**. This is the standard approach and requires no backend code.

**Pros:**
- ✅ Free forever
- ✅ No backend code needed
- ✅ 5-minute setup
- ✅ Most common solution
- ✅ Well documented

**Cons:**
- ⚠️ Requires Netlify account (but you don't host there)

### **Option 2: Direct GitHub OAuth (More Complex)**

Set up your own OAuth backend. Requires serverless functions.

**Pros:**
- ✅ No third-party dependencies
- ✅ Full control

**Cons:**
- ⚠️ Requires custom backend code
- ⚠️ More complex setup
- ⚠️ Need to manage OAuth secrets

---

## 🚀 Recommended: Option 1 (Netlify Auth with Vercel Hosting)

This is the **standard approach** used by thousands of sites. Your site stays on Vercel, you just use Netlify for authentication.

### Step-by-Step Setup (15 minutes)

#### 1. Sign Up for Netlify (Free)

```
Go to: https://app.netlify.com/signup
Sign up with your GitHub account
```

**Note**: You're NOT moving your site to Netlify. You're just using their free auth service.

#### 2. Create a "Dummy" Site on Netlify

Even though your real site is on Vercel, Netlify needs a site to attach the Identity service to:

```
1. Click "Add new site" → "Import an existing project"
2. Choose GitHub
3. Select your repo: MrFreePress/arp-website
4. Build settings:
   - Build command: npm run build
   - Publish directory: dist
5. Click "Deploy site"
```

**Important**: You'll get a URL like `your-site-name.netlify.app` but you won't use this for your actual site. It's just for the auth service.

#### 3. Enable Netlify Identity

```
1. Go to Site Settings → Identity
2. Click "Enable Identity"
3. Under "Registration preferences":
   - Select "Invite only" (recommended)
4. Under "External providers":
   - Enable GitHub (optional, but recommended)
```

#### 4. Enable Git Gateway

```
1. Go to Settings → Identity → Services
2. Click "Enable Git Gateway"
3. This allows the CMS to commit to your GitHub repo
```

#### 5. Update Your CMS Config

Your `public/admin/config.yml` is already configured correctly! It should have:

```yaml
backend:
  name: github
  repo: MrFreePress/arp-website
  branch: main
  base_url: https://api.netlify.com
  auth_endpoint: auth
```

This tells Decap CMS to use Netlify's auth service.

#### 6. Deploy to Vercel

Your site is already on Vercel, but make sure the latest changes are deployed:

```bash
git push origin main
```

Vercel will auto-deploy.

#### 7. Invite Yourself

```
1. In Netlify: Site Settings → Identity → Invite users
2. Enter your email address
3. Click "Send invitation"
4. Check your email and accept the invitation
5. Set your password
```

#### 8. Test the CMS

```
1. Go to: https://your-vercel-site.vercel.app/admin
2. Click "Login with Netlify Identity"
3. Enter your email and password
4. You should see the CMS dashboard!
```

**Success!** Your CMS is now working on Vercel.

---

## 🔄 How It Works (Vercel + Netlify Auth)

```
User visits: your-site.vercel.app/admin
          ↓
CMS loads from Vercel
          ↓
User clicks "Login"
          ↓
Redirects to Netlify for authentication
          ↓
User logs in with Netlify Identity
          ↓
Redirects back to your-site.vercel.app/admin
          ↓
User is authenticated
          ↓
CMS commits changes to GitHub
          ↓
Vercel auto-deploys
          ↓
Changes are live!
```

**Your site**: Hosted on Vercel ✅  
**Authentication**: Handled by Netlify (free service) ✅  
**Content**: Stored in GitHub ✅  
**Deployments**: Vercel ✅

---

## 📋 Vercel Dashboard - No Changes Needed!

**Good news**: You don't need to change anything in your Vercel dashboard!

Vercel will:
- ✅ Auto-deploy when you push to GitHub
- ✅ Serve your `/admin` page
- ✅ Serve uploaded media files
- ✅ Build your site with the CMS content

**No special configuration required in Vercel.**

---

## 🔐 Alternative: Option 2 (Direct GitHub OAuth)

If you want to avoid using Netlify entirely, you can set up your own OAuth backend using Vercel Serverless Functions.

### Requirements

1. Create a GitHub OAuth App
2. Create Vercel serverless functions for OAuth
3. Store OAuth secrets in Vercel environment variables

### Setup Steps

#### 1. Create GitHub OAuth App

```
1. Go to: https://github.com/settings/developers
2. Click "OAuth Apps" → "New OAuth App"
3. Fill in:
   - Application name: ARP Website CMS
   - Homepage URL: https://your-site.vercel.app
   - Authorization callback URL: https://your-site.vercel.app/api/callback
4. Click "Register application"
5. Copy the Client ID
6. Generate and copy the Client Secret
```

#### 2. Create Serverless Functions

Create `api/auth.js`:

```javascript
export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID
  const redirectUri = `${process.env.VERCEL_URL}/api/callback`
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`
  
  res.redirect(githubAuthUrl)
}
```

Create `api/callback.js`:

```javascript
export default async function handler(req, res) {
  const { code } = req.query
  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET
  
  // Exchange code for access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code
    })
  })
  
  const { access_token } = await tokenResponse.json()
  
  // Redirect back to CMS with token
  res.redirect(`/admin/#access_token=${access_token}`)
}
```

#### 3. Update CMS Config

Update `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: MrFreePress/arp-website
  branch: main
  base_url: https://your-site.vercel.app
  auth_endpoint: api/auth
```

#### 4. Add Environment Variables in Vercel

```
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - GITHUB_CLIENT_ID: [your client id]
   - GITHUB_CLIENT_SECRET: [your client secret]
   - VERCEL_URL: your-site.vercel.app
```

#### 5. Deploy

```bash
git add api/
git commit -m "Add OAuth serverless functions"
git push
```

**Note**: This approach is more complex and requires maintaining serverless functions. **Option 1 (Netlify Auth) is recommended** for most users.

---

## 🆚 Comparison: Netlify Auth vs Direct OAuth

| Feature | Netlify Auth | Direct OAuth |
|---------|--------------|--------------|
| **Setup Time** | 15 minutes | 45+ minutes |
| **Complexity** | Low | High |
| **Maintenance** | None | Manage functions |
| **Cost** | Free | Free |
| **Dependencies** | Netlify account | None |
| **Recommended** | ✅ Yes | For advanced users |

---

## ✅ Recommended Approach for Vercel

**Use Option 1: Netlify Auth**

Why?
1. ✅ **Faster setup** - 15 minutes vs 45+ minutes
2. ✅ **No code to maintain** - Netlify handles everything
3. ✅ **Well documented** - Standard approach
4. ✅ **Free forever** - No costs
5. ✅ **Reliable** - Used by thousands of sites
6. ✅ **Your site stays on Vercel** - Just auth is via Netlify

---

## 🔧 Vercel-Specific Configuration

### Environment Variables (Optional)

If you want to use environment variables in your CMS config:

```
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add any variables you need
```

### Build Settings

Your Vercel build settings should be:

```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**These are already configured if you deployed via GitHub integration.**

### Custom Domain (Optional)

If you have a custom domain on Vercel:

```
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Update DNS records
4. Access CMS at: https://yourdomain.com/admin
```

---

## 📊 What Happens Where

### On Vercel (Your Hosting)
- ✅ Website hosting
- ✅ `/admin` page served
- ✅ Auto-deployments from GitHub
- ✅ Media files served from `/uploads`
- ✅ Static site generation

### On Netlify (Auth Only)
- ✅ User authentication
- ✅ Identity management
- ✅ Git Gateway (allows CMS to commit)
- ❌ NOT hosting your site

### On GitHub (Content Storage)
- ✅ Content files (Markdown)
- ✅ Media files
- ✅ Version control
- ✅ Triggers Vercel deployments

---

## 🚀 Quick Start for Vercel Users

### 5-Minute Setup

1. **Sign up for Netlify**: https://app.netlify.com/signup
2. **Import your repo** (just for auth service)
3. **Enable Identity** (Site Settings → Identity)
4. **Enable Git Gateway** (Identity → Services)
5. **Invite yourself** (Identity → Invite users)
6. **Go to your Vercel site**: `your-site.vercel.app/admin`
7. **Log in** with Netlify Identity
8. **Done!** ✅

**Your site stays on Vercel. You're just using Netlify for authentication.**

---

## 🆘 Troubleshooting

### "Can't access /admin on Vercel"
- Make sure `public/admin/` folder is in your repo
- Verify Vercel deployed successfully
- Check Vercel deployment logs

### "Login redirects to Netlify site instead of Vercel"
- This is normal! It authenticates on Netlify, then redirects back to Vercel
- Make sure you're accessing `your-vercel-site.vercel.app/admin`

### "Changes not deploying on Vercel"
- Check Vercel deployment logs
- Verify GitHub webhook is working
- May take 2-3 minutes to deploy

### "Media uploads not working"
- Verify `public/uploads/` folder exists
- Check Vercel build logs
- Make sure folder is committed to Git

---

## 💡 Pro Tips for Vercel Users

1. **Use Vercel's GitHub integration** - Auto-deploys on push
2. **Enable preview deployments** - Test changes before merging
3. **Set up custom domain** - Professional URL for your CMS
4. **Use Vercel Analytics** - Track site performance
5. **Enable automatic HTTPS** - Secure your CMS

---

## ✅ Vercel Setup Checklist

### Before Starting
- [x] Site deployed to Vercel
- [x] Decap CMS installed (already done!)
- [x] Content folders created (already done!)
- [x] Config file created (already done!)

### Authentication Setup
- [ ] Sign up for Netlify (free)
- [ ] Import repo to Netlify (for auth only)
- [ ] Enable Netlify Identity
- [ ] Enable Git Gateway
- [ ] Invite yourself
- [ ] Test login at `your-vercel-site.vercel.app/admin`

### Verification
- [ ] Can access `/admin` on Vercel
- [ ] Can log in successfully
- [ ] Can create content
- [ ] Changes commit to GitHub
- [ ] Vercel auto-deploys
- [ ] Changes appear on site

---

## 🎉 Summary

### For Vercel Users:

1. ✅ **Decap CMS works perfectly with Vercel**
2. ✅ **No changes needed in Vercel dashboard**
3. ✅ **Use Netlify for authentication only** (recommended)
4. ✅ **Your site stays on Vercel**
5. ✅ **Setup takes 15 minutes**
6. ✅ **Free forever**

### The Setup:

```
Your Site (Vercel) → Serves website and /admin
Authentication (Netlify) → Handles login only
Content (GitHub) → Stores all content
Deployment (Vercel) → Auto-deploys on push
```

**Everything works together seamlessly!**

---

## 📞 Next Steps

1. **Follow the setup above** (Option 1 - Netlify Auth)
2. **Test the CMS** at `your-vercel-site.vercel.app/admin`
3. **Invite your team** via Netlify Identity
4. **Update React pages** to load content (see `QUICK_START_GUIDE.md`)
5. **Go live!**

---

**Questions?** 
- Check `DECAP_CMS_SETUP.md` for detailed instructions
- Check `QUICK_START_GUIDE.md` for the action plan
- Decap CMS + Vercel is a very common setup!

**Status**: ✅ **READY FOR VERCEL**  
**Setup Time**: 15 minutes  
**Cost**: $0/month  
**Your site stays on Vercel**: ✅
