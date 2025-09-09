# 🚀 OISDRIVE Website Deployment Guide

## Current Issue
The website is being deployed to Cloudflare Workers (`datarecoverysebsite.mediaplayer.workers.dev`) instead of Cloudflare Pages, which is causing 404 errors.

## Solution: Deploy to Cloudflare Pages

### Method 1: Using Cloudflare Pages Dashboard (Recommended)

1. **Go to [Cloudflare Pages](https://pages.cloudflare.com/)**
2. **Click "Create a project"**
3. **Connect your GitHub repository:**
   - Repository: `soulox/DataRecoveryWebSite`
   - Branch: `main`
4. **Configure build settings:**
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Root directory: `/` (leave empty)
5. **Add environment variables:**
   - `MAILGUN_API_KEY` = `your-mailgun-api-key-here`
   - `MAILGUN_DOMAIN` = `mg.oisdrive.com`
   - `MAILGUN_FROM_EMAIL` = `OISDRIVE <noreply@oisdrive.com>`
   - `MAILGUN_URL` = `https://api.mailgun.net`
6. **Deploy!**

### Method 2: Using Command Line

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
npx wrangler login

# Deploy to Pages (not Workers)
npx wrangler pages deploy .next --project-name=oisdrive-website
```

### Method 3: Update Current Deployment

If you want to keep using the current setup, you need to:

1. **Go to your Cloudflare dashboard**
2. **Find your current Workers deployment**
3. **Delete it or stop it**
4. **Create a new Pages project instead**

## Expected Result

After proper deployment to Cloudflare Pages, you should get:
- A domain like: `oisdrive-website.pages.dev`
- Or your custom domain: `oisdrive.com`

## Troubleshooting

### 404 Error on Workers Domain
- **Problem**: Deployed to Workers instead of Pages
- **Solution**: Use Cloudflare Pages dashboard to deploy

### Build Failures
- **Problem**: ESLint errors or TypeScript errors
- **Solution**: Fix the build errors first, then deploy

### Environment Variables Not Working
- **Problem**: Mailgun not configured
- **Solution**: Add environment variables in Cloudflare Pages dashboard

## Next Steps

1. ✅ Fix deployment method (use Pages, not Workers)
2. ✅ Set up custom domain (oisdrive.com)
3. ✅ Configure SSL certificate
4. ✅ Test contact form functionality
5. ✅ Set up analytics and monitoring

## Contact Form Testing

Once deployed to Pages with environment variables:
1. Go to `/contact` page
2. Fill out the form
3. Submit and check if email is sent
4. Verify Mailgun logs for delivery

---

**Important**: The current Workers deployment should be stopped and replaced with a Pages deployment for proper static site hosting.
