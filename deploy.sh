#!/bin/bash

# Cloudflare Pages deployment script for OISDRIVE website

echo "🚀 Deploying OISDRIVE website to Cloudflare Pages..."

# Build the project
echo "📦 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Cloudflare Pages using Wrangler
    echo "🌐 Deploying to Cloudflare Pages..."
    npx wrangler pages deploy .next --project-name=oisdrive-website --compatibility-date=2025-09-09
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
    echo "📧 Don't forget to add environment variables in Cloudflare Pages dashboard:"
    echo "   - MAILGUN_API_KEY (your Mailgun API key)"
    echo "   - MAILGUN_DOMAIN=mg.oisdrive.com"
    echo "   - MAILGUN_FROM_EMAIL=OISDRIVE <noreply@oisdrive.com>"
    echo "   - MAILGUN_URL=https://api.mailgun.net"
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi