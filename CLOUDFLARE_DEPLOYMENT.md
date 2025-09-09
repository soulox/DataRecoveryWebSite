# Deploy OISDRIVE Website to Cloudflare Pages

## Overview

This guide will help you deploy your OISDRIVE website to Cloudflare Pages with Next.js runtime support for API routes.

## Prerequisites

- Cloudflare account (free tier available)
- GitHub repository with your code
- Domain name (optional, Cloudflare provides free subdomain)

## Deployment Options

### Option 1: Cloudflare Pages with Next.js Runtime (Recommended)

This option supports API routes and server-side features.

### Option 2: Static Export (Alternative)

This option creates a static site but requires removing API routes.

## Method 1: Cloudflare Pages with Next.js Runtime

### Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Cloudflare Pages deployment"
   git push origin main
   ```

2. **Verify your repository** is public or you have access to connect it to Cloudflare.

### Step 2: Connect to Cloudflare Pages

1. **Go to Cloudflare Dashboard**:
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com)
   - Sign in to your account

2. **Navigate to Pages**:
   - Click "Pages" in the left sidebar
   - Click "Create a project"

3. **Connect to Git**:
   - Click "Connect to Git"
   - Select your GitHub repository
   - Authorize Cloudflare to access your repositories

### Step 3: Configure Build Settings

1. **Project Name**: `oisdrive-website` (or your preferred name)

2. **Framework Preset**: Select "Next.js"

3. **Build Command**: 
   ```
   npm run build
   ```

4. **Build Output Directory**: 
   ```
   .next
   ```

5. **Root Directory**: 
   ```
   / (leave empty for root)
   ```

6. **Node.js Version**: 
   ```
   18.x (or latest LTS)
   ```

### Step 4: Environment Variables

Add these environment variables in Cloudflare Pages:

1. **Go to Settings → Environment Variables**

2. **Add the following variables**:

   ```
   # Mailgun Configuration
   MAILGUN_API_KEY=key-your-mailgun-api-key-here
   MAILGUN_DOMAIN=mg.oisdrive.com
   MAILGUN_FROM_EMAIL=OISDRIVE <noreply@oisdrive.com>
   MAILGUN_URL=https://api.mailgun.net
   
   # Application Settings
   NEXT_PUBLIC_SITE_URL=https://oisdrive.com
   NEXT_PUBLIC_COMPANY_EMAIL=contact@oisdrive.com
   NEXT_PUBLIC_EMERGENCY_PHONE=+33788857297
   
   # Optional: Analytics
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

3. **Set Environment**: Choose "Production" for all variables

### Step 5: Deploy

1. **Click "Save and Deploy"**
2. **Wait for build** (usually 2-5 minutes)
3. **Your site will be available** at `https://your-project-name.pages.dev`

### Step 6: Custom Domain (Optional)

1. **Go to Custom Domains** in your Pages project
2. **Add your domain**: `oisdrive.com`
3. **Configure DNS**:
   - Add CNAME record: `www` → `your-project-name.pages.dev`
   - Add CNAME record: `@` → `your-project-name.pages.dev`
4. **Enable SSL/TLS** (automatic with Cloudflare)

## Method 2: Static Export (Alternative)

If you want to use static export (no API routes), follow these steps:

### Step 1: Update Next.js Config

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
```

### Step 2: Remove API Routes

Since static export doesn't support API routes, you'll need to:

1. **Remove the contact API route**: `src/app/api/contact/route.ts`
2. **Update the contact form** to use a third-party service like:
   - Formspree
   - Netlify Forms
   - EmailJS

### Step 3: Deploy as Static Site

1. **Build Command**: `npm run build`
2. **Build Output Directory**: `out`
3. **Deploy as static site**

## Post-Deployment Configuration

### 1. Enable Cloudflare Features

1. **Go to your domain in Cloudflare Dashboard**
2. **Enable these features**:
   - ✅ Always Use HTTPS
   - ✅ Auto Minify (HTML, CSS, JS)
   - ✅ Brotli Compression
   - ✅ Rocket Loader
   - ✅ Mirage

### 2. Configure Security Headers

Add these security headers in Cloudflare:

```
# Security Headers
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;
```

### 3. Set Up Analytics

1. **Google Analytics**: Add your GA4 tracking ID
2. **Cloudflare Analytics**: Available in Pages dashboard
3. **Web Vitals**: Monitor Core Web Vitals

## Testing Your Deployment

### 1. Test All Pages

- ✅ Homepage: `https://oisdrive.com`
- ✅ Services: `https://oisdrive.com/services`
- ✅ Contact: `https://oisdrive.com/contact`
- ✅ Privacy: `https://oisdrive.com/privacy`

### 2. Test Contact Form

1. **Fill out the contact form**
2. **Submit it**
3. **Check for success message**
4. **Verify emails are sent** (check Mailgun logs)

### 3. Test Performance

- **Lighthouse**: Run Lighthouse audit
- **PageSpeed Insights**: Test with Google PageSpeed
- **GTmetrix**: Check performance metrics

## Monitoring and Maintenance

### 1. Set Up Monitoring

1. **Uptime Monitoring**: Use Cloudflare's built-in monitoring
2. **Error Tracking**: Monitor for JavaScript errors
3. **Performance Monitoring**: Track Core Web Vitals

### 2. Regular Updates

1. **Dependencies**: Keep npm packages updated
2. **Security**: Monitor for security vulnerabilities
3. **Content**: Update content regularly

### 3. Backup Strategy

1. **Code**: GitHub repository serves as backup
2. **Environment Variables**: Document all variables
3. **Domain**: Keep domain registration current

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **API Routes Not Working**:
   - Ensure you're using Next.js runtime, not static export
   - Check environment variables are set
   - Verify Mailgun configuration

3. **Email Not Sending**:
   - Check Mailgun API key and domain
   - Verify DNS records for Mailgun
   - Check Cloudflare Pages logs

4. **Custom Domain Issues**:
   - Verify DNS records
   - Check SSL certificate status
   - Ensure domain is properly configured

### Getting Help

- **Cloudflare Support**: Available in dashboard
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Mailgun Support**: Available in Mailgun dashboard

## Cost Considerations

### Cloudflare Pages (Free Tier)
- ✅ Unlimited static sites
- ✅ 500 builds per month
- ✅ 20,000 requests per month
- ✅ Global CDN
- ✅ SSL certificates

### Paid Plans
- **Pro**: $20/month for more builds and features
- **Business**: $200/month for advanced features

## Security Best Practices

1. **Environment Variables**: Never commit secrets to Git
2. **HTTPS**: Always use HTTPS (automatic with Cloudflare)
3. **Headers**: Use security headers
4. **Updates**: Keep dependencies updated
5. **Monitoring**: Monitor for security issues

Your OISDRIVE website is now ready for deployment to Cloudflare Pages! 🚀
