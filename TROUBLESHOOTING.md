# Troubleshooting Guide - OISDRIVE Website

## Common Issues and Solutions

### 1. Build Manifest Errors (ENOENT)

**Error:**
```
⨯ [Error: ENOENT: no such file or directory, open 'C:\Website\DataRecoveryWebSite\.next\static\development\_buildManifest.js.tmp.xxx']
```

**Solution:**
```powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm cache clean --force
npm run dev
```

**Or use the provided script:**
```powershell
.\clear-cache.ps1
```

### 2. Edge Runtime Compatibility Issues

**Error:**
```
Module not found: Can't resolve 'fs'
```

**Solution:**
- Edge Runtime doesn't support Node.js modules like `fs`
- Use Web APIs instead
- For file storage, implement cloud storage integration
- See `EDGE_RUNTIME_FILE_STORAGE.md` for details

### 3. TypeScript Build Errors

**Error:**
```
Type error: Property 'params' is missing in type 'Promise<{ fileId: string; }>'
```

**Solution:**
```typescript
// Next.js 15 requires awaiting params
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params
  // ... rest of the function
}
```

### 4. File Upload Issues

**Problem:** Files not being uploaded or stored

**Solution:**
1. Check if Edge Runtime is being used
2. Implement cloud storage integration
3. Verify FormData is being sent correctly
4. Check file validation rules

### 5. Email Configuration Issues

**Error:**
```
Email sending failed: Invalid API key
```

**Solution:**
1. Verify environment variables:
   ```env
   MAILGUN_API_KEY=your_api_key
   MAILGUN_DOMAIN=your_domain
   MAILGUN_FROM_EMAIL=OISDRIVE <noreply@oisdrive.com>
   ```
2. Check Mailgun account status
3. Verify domain configuration

### 6. Development Server Issues

**Problem:** Server not starting or responding

**Solution:**
```powershell
# Kill any existing processes
Get-Process -Name "node" | Stop-Process -Force

# Clear cache and restart
.\clear-cache.ps1
npm run dev
```

### 7. Linting Errors

**Common Issues:**
- Unescaped entities (`'` and `"` in JSX)
- `any` type usage
- Unused variables

**Solution:**
```typescript
// Fix unescaped entities
<p>Don&apos;t use unescaped quotes</p>

// Fix any types
const data: Record<string, unknown> = {}

// Fix unused variables
export async function myFunction(_unusedParam: string) {
  // Use underscore prefix for intentionally unused parameters
}
```

### 8. Build Performance Issues

**Problem:** Slow builds or memory issues

**Solution:**
```powershell
# Increase Node.js memory limit
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or use Turbopack for faster builds
npm run dev -- --turbo
```

### 9. Deployment Issues

**Problem:** Build fails on deployment platform

**Solution:**
1. Check Node.js version compatibility
2. Verify environment variables
3. Check build output for errors
4. Ensure all dependencies are in package.json

### 10. File Storage Issues

**Problem:** Files not persisting or accessible

**Solution:**
1. **Development:** Files are not stored (Edge Runtime limitation)
2. **Production:** Implement cloud storage (AWS S3, Google Cloud Storage, etc.)
3. **Testing:** Use mock file storage for development

## Quick Fixes

### Clear All Caches
```powershell
# PowerShell script
.\clear-cache.ps1

# Manual commands
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
npm cache clean --force
npm install
npm run dev
```

### Reset to Clean State
```powershell
# Remove all generated files
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Reinstall everything
npm install
npm run dev
```

### Check System Requirements
```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# Check available memory
Get-ComputerInfo | Select-Object TotalPhysicalMemory
```

## Environment-Specific Issues

### Windows PowerShell
- Use `Remove-Item -Recurse -Force` instead of `rm -rf`
- Use `Get-Process` and `Stop-Process` for process management
- Use `Invoke-WebRequest` instead of `curl`

### Cloudflare Pages
- Ensure Edge Runtime compatibility
- Check environment variables
- Verify build settings

### Vercel
- Check build logs
- Verify environment variables
- Ensure proper Next.js configuration

## Debugging Tools

### Enable Debug Logging
```env
DEBUG=*
NODE_ENV=development
```

### Check Build Output
```powershell
npm run build 2>&1 | Tee-Object -FilePath build.log
```

### Monitor Development Server
```powershell
# Check if server is running
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
    Write-Host "Server is running: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Server is not responding" -ForegroundColor Red
}
```

## Prevention Tips

1. **Regular Cache Clearing:** Clear `.next` directory regularly
2. **Dependency Updates:** Keep dependencies up to date
3. **Environment Variables:** Document all required environment variables
4. **Error Monitoring:** Set up proper error logging
5. **Testing:** Test builds before deployment

## Getting Help

If you encounter issues not covered in this guide:

1. Check the console output for specific error messages
2. Review the relevant documentation files:
   - `FILE_UPLOAD_IMPLEMENTATION.md`
   - `EDGE_RUNTIME_FILE_STORAGE.md`
   - `DEPLOYMENT_GUIDE.md`
3. Check Next.js documentation
4. Review the project's GitHub issues

## Emergency Recovery

If the project is completely broken:

```powershell
# 1. Backup your changes
git add .
git commit -m "Backup before recovery"

# 2. Reset to last working state
git reset --hard HEAD~1

# 3. Clean everything
.\clear-cache.ps1

# 4. Reinstall dependencies
npm install

# 5. Start development server
npm run dev
```

---

**Last Updated:** January 2024
**Version:** 1.0.0
