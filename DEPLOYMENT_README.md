# 🚀 Quick Deployment Guide

## Deploy to Cloudflare Pages in 5 Minutes

### Prerequisites
- ✅ GitHub repository with your code
- ✅ Cloudflare account (free)
- ✅ Mailgun account (for contact form)

### Quick Start

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Cloudflare Pages"
   git push origin main
   ```

2. **Go to Cloudflare Pages**:
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com)
   - Click "Pages" → "Create a project"
   - Connect your GitHub repository

3. **Configure Build**:
   - Framework: **Next.js**
   - Build command: `npm run build`
   - Build output: `.next`
   - Node.js version: `18.x`

4. **Add Environment Variables**:
   ```
   MAILGUN_API_KEY=key-your-api-key
   MAILGUN_DOMAIN=mg.oisdrive.com
   MAILGUN_FROM_EMAIL=OISDRIVE <noreply@oisdrive.com>
   NEXT_PUBLIC_SITE_URL=https://oisdrive.com
   ```

5. **Deploy**: Click "Save and Deploy"

### Your site will be live at: `https://your-project.pages.dev`

## 📖 Detailed Instructions

For complete setup instructions, see [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)

## 🔧 Troubleshooting

- **Build fails**: Check Node.js version (use 18.x)
- **API routes not working**: Ensure you're using Next.js runtime, not static export
- **Emails not sending**: Verify Mailgun configuration

## 📞 Support

- Cloudflare: [support.cloudflare.com](https://support.cloudflare.com)
- Mailgun: Available in dashboard
- OISDRIVE: contact@oisdrive.com
