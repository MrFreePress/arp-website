# DecapBridge Authentication Setup

## Overview

This project has been configured to use **DecapBridge** for CMS authentication instead of Netlify Identity. DecapBridge provides a modern, user-friendly authentication experience that allows non-technical users to access Decap CMS without needing a GitHub/GitLab account.

## What Changed

### Configuration Updates

The `public/admin/config.yml` file has been updated with DecapBridge PKCE authentication:

```yaml
backend:
  name: git-gateway
  repo: MrFreePress/arp-website
  branch: main
  auth_type: pkce
  base_url: https://auth.decapbridge.com
  auth_endpoint: /sites/352b82ab-a6a2-4381-abd8-ddac4f878d30/pkce
  auth_token_endpoint: /sites/352b82ab-a6a2-4381-abd8-ddac4f878d30/token
  gateway_url: https://gateway.decapbridge.com
```

### Features Added

1. **PKCE Authentication** - More secure OAuth 2.0 flow
2. **Custom Commit Messages** - Track who made changes with author attribution
3. **User Profile Fields** - Email, first name, last name, and avatar support
4. **DecapBridge Logo** - Branded CMS interface
5. **Site URL** - Quick link back to your live site

## Benefits of DecapBridge

### For Site Owners
- ✅ **Easy User Management** - Invite collaborators by email
- ✅ **No GitHub Required** - Users don't need technical accounts
- ✅ **Self-Service** - Users can reset passwords without your help
- ✅ **Multiple Login Options** - Google, Microsoft, or password
- ✅ **Better Tracking** - See who made each change in commit messages

### For Content Editors
- ✅ **Familiar Login** - Use Google/Microsoft or set a password
- ✅ **Password Reset** - Self-service password recovery
- ✅ **Simple Access** - Just visit `/admin` and log in
- ✅ **No Technical Setup** - No GitHub knowledge needed

## How to Access the CMS

### Production (Netlify)
1. Visit: `https://arp-website1.netlify.app/admin`
2. Click "Login with DecapBridge"
3. Choose your authentication method:
   - Login with Google
   - Login with Microsoft
   - Login with Email/Password
4. Start editing content!

### Production (Vercel)
1. Visit: `https://your-vercel-site.vercel.app/admin`
2. Follow the same login process as above

### Local Development
**Note**: DecapBridge requires a deployed environment for authentication. Local development will redirect to the authentication server, which requires your site to be accessible via HTTPS.

**Options for Local Testing**:
1. **Use Production** (Recommended) - Test on Netlify/Vercel
2. **Use Test Backend** - Temporarily switch to `test-repo` backend for local-only testing
3. **Use Decap Server Proxy** - Advanced setup for local auth

## User Management

### Inviting Users

1. Log into your DecapBridge dashboard at: https://decapbridge.com
2. Navigate to your site settings
3. Click "Invite User"
4. Enter their email address
5. They'll receive an invitation to set up their account

### User Roles

DecapBridge supports different access levels:
- **Admin** - Full access to all content and settings
- **Editor** - Can create, edit, and publish content
- **Contributor** - Can create and edit drafts (requires approval)

### Removing Access

1. Go to DecapBridge dashboard
2. Find the user in your site's user list
3. Click "Remove Access"
4. They'll immediately lose CMS access

## Commit Attribution

All changes made through the CMS will now include author information:

```
Create blog "new-post" - John Doe <john@example.com> via DecapBridge
Update podcast "episode-5" - Jane Smith <jane@example.com> via DecapBridge
```

This makes it easy to:
- Track who made what changes
- Audit content modifications
- Understand your team's contributions

## Authentication Flow

```
1. User visits /admin
2. Decap CMS loads and reads config.yml
3. User clicks "Login with DecapBridge"
4. Redirected to DecapBridge auth server
5. User authenticates (Google/Microsoft/Password)
6. DecapBridge validates and creates session
7. User redirected back to CMS
8. Git Gateway authenticates with GitHub
9. User can now edit content
10. Changes commit to GitHub with attribution
11. Site auto-deploys with new content
```

## Troubleshooting

### Can't Access CMS Locally

**Expected Behavior** - DecapBridge requires HTTPS and a deployed environment. Use Netlify or Vercel for testing instead.

### Login Redirects Not Working

1. Check that your site URL is correctly configured in DecapBridge dashboard
2. Verify the site ID in `config.yml` matches your DecapBridge account
3. Clear browser cache and try again

### Changes Not Appearing on Site

1. Check that the commit was made to GitHub (check repository commits)
2. Verify Netlify/Vercel deployment succeeded
3. Check that your React pages are loading content from the correct files

### User Can't Log In

1. Verify they were invited through DecapBridge dashboard
2. Check they're using the correct email address
3. Have them try password reset if using email/password
4. Verify their access hasn't been revoked

## Migration from Netlify Identity

If you were previously using Netlify Identity:

1. ✅ **Config Updated** - Already done
2. ✅ **No Code Changes** - React components work the same
3. ⚠️ **User Migration** - Users need to be re-invited through DecapBridge
4. ⚠️ **New Login Flow** - Users will see DecapBridge login instead of Netlify

**Action Required**: Invite your existing users through the DecapBridge dashboard.

## Security Notes

- **PKCE Flow** - More secure than implicit OAuth flow
- **No Client Secrets** - Credentials never exposed in frontend
- **GitHub Access** - DecapBridge acts as secure proxy to GitHub
- **Session Management** - Automatic token refresh and expiration
- **HTTPS Required** - All authentication over secure connections

## Cost & Pricing

DecapBridge offers:
- **Free Tier** - Perfect for small teams and personal projects
- **Paid Tiers** - For larger teams with more users

Check current pricing at: https://decapbridge.com/pricing

## Support & Documentation

- **DecapBridge Docs**: https://decapbridge.com/docs/introduction
- **Decap CMS Docs**: https://decapcms.org/docs/intro/
- **Contact Support**: https://decapbridge.com/contact

## Next Steps

1. **Test the Login** - Visit `/admin` and try logging in
2. **Invite Team Members** - Add users through DecapBridge dashboard
3. **Create Test Content** - Make a test blog post or podcast episode
4. **Verify Commits** - Check GitHub to see attributed commits
5. **Update Documentation** - Share this guide with your team

## Configuration Reference

Your site ID: `352b82ab-a6a2-4381-abd8-ddac4f878d30`

### Auth Endpoints
- **Base URL**: `https://auth.decapbridge.com`
- **PKCE Endpoint**: `/sites/352b82ab-a6a2-4381-abd8-ddac4f878d30/pkce`
- **Token Endpoint**: `/sites/352b82ab-a6a2-4381-abd8-ddac4f878d30/token`
- **Gateway URL**: `https://gateway.decapbridge.com`

### Site Configuration
- **Repository**: `MrFreePress/arp-website`
- **Branch**: `main`
- **Site URL**: `https://arp-website1.netlify.app`
- **Logo**: DecapBridge + Decap CMS branded logo

---

**Status**: ✅ **CONFIGURED AND READY**  
**Last Updated**: January 12, 2026  
**Authentication Provider**: DecapBridge PKCE
