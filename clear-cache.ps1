# Clear Next.js cache and restart development server
# This script helps resolve build manifest and cache issues

Write-Host "🧹 Clearing Next.js cache..." -ForegroundColor Yellow

# Remove .next directory
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ Removed .next directory" -ForegroundColor Green
} else {
    Write-Host "ℹ️  .next directory not found" -ForegroundColor Blue
}

# Clear npm cache
Write-Host "🧹 Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "✅ npm cache cleared" -ForegroundColor Green

# Clear node_modules if needed (uncomment if you want to reinstall dependencies)
# Write-Host "🧹 Removing node_modules..." -ForegroundColor Yellow
# if (Test-Path "node_modules") {
#     Remove-Item -Recurse -Force "node_modules"
#     Write-Host "✅ Removed node_modules" -ForegroundColor Green
#     Write-Host "📦 Reinstalling dependencies..." -ForegroundColor Yellow
#     npm install
#     Write-Host "✅ Dependencies reinstalled" -ForegroundColor Green
# }

Write-Host "🚀 Cache cleared successfully!" -ForegroundColor Green
Write-Host "You can now run 'npm run dev' to start the development server" -ForegroundColor Cyan
