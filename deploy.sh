#!/bin/bash

# OISDRIVE Website Deployment Script for Cloudflare Pages
# This script helps prepare your project for deployment

echo "🚀 OISDRIVE Website Deployment Preparation"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Found package.json"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "⚠️  Git not initialized. Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - OISDRIVE website"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository found"
fi

# Check for environment variables file
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating template..."
    cat > .env.local << EOF
# OISDRIVE Website Environment Variables
# Fill in your actual values before deployment

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
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
# NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
EOF
    echo "✅ Created .env.local template"
    echo "⚠️  Please edit .env.local with your actual values"
else
    echo "✅ .env.local found"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the project
echo "🏗️  Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Check if we have a remote repository
if git remote -v | grep -q "origin"; then
    echo "✅ Remote repository configured"
    echo "📤 Pushing to remote repository..."
    git add .
    git commit -m "Prepare for Cloudflare Pages deployment"
    git push origin main
    echo "✅ Code pushed to remote repository"
else
    echo "⚠️  No remote repository configured"
    echo "Please add a remote repository:"
    echo "git remote add origin https://github.com/yourusername/oisdrive-website.git"
    echo "git push -u origin main"
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://dash.cloudflare.com"
echo "2. Navigate to Pages → Create a project"
echo "3. Connect your GitHub repository"
echo "4. Configure build settings:"
echo "   - Framework: Next.js"
echo "   - Build command: npm run build"
echo "   - Build output: .next"
echo "5. Add environment variables from .env.local"
echo "6. Deploy!"
echo ""
echo "📖 For detailed instructions, see CLOUDFLARE_DEPLOYMENT.md"
