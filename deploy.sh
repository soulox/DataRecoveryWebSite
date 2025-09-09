#!/bin/bash

# Cloudflare Pages deployment script for OISDRIVE website
# IMPORTANT: This deploys to Cloudflare Pages, NOT Workers

echo "🚀 Deploying OISDRIVE website to Cloudflare Pages..."

# Build the project
echo "📦 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Cloudflare Pages using Wrangler
    echo "🌐 Deploying to Cloudflare Pages (NOT Workers)..."
    echo "⚠️  Make sure you have a Pages project created in Cloudflare dashboard"
    npx wrangler pages deploy .next --project-name=oisdrive-website
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "🌍 Your site should be available at: https://oisdrive-website.pages.dev"
        echo ""
        echo "📧 Don't forget to add environment variables in Cloudflare Pages dashboard:"
        echo "   - MAILGUN_API_KEY (your Mailgun API key)"
        echo "   - MAILGUN_DOMAIN=mg.oisdrive.com"
        echo "   - MAILGUN_FROM_EMAIL=OISDRIVE <noreply@oisdrive.com>"
        echo "   - MAILGUN_URL=https://api.mailgun.net"
        echo ""
        echo "🔧 To set up custom domain:"
        echo "   1. Go to Cloudflare Pages dashboard"
        echo "   2. Select your project"
        echo "   3. Go to Custom domains"
        echo "   4. Add your domain (oisdrive.com)"
    else
        echo "❌ Deployment failed!"
        echo "💡 Try creating a Pages project in Cloudflare dashboard first"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi