# File Upload Implementation - OISDRIVE Contact Form

## Overview

This document describes the complete file upload implementation for the OISDRIVE contact form, including FormData handling, local file storage, validation, drag & drop functionality, and file serving.

## Features Implemented

### ✅ Complete File Upload System

1. **FormData Integration**
   - Contact form now uses FormData instead of JSON for file uploads
   - Supports both file uploads and regular form data
   - Backward compatible with JSON submissions

2. **File Storage**
   - Local filesystem storage in `/uploads/contact-attachments/`
   - Unique filename generation with timestamps and random strings
   - Organized by submission ID for easy management

3. **File Validation**
   - **File Size**: 10MB maximum per file
   - **File Count**: Maximum 5 files per submission
   - **File Types**: JPG, PNG, PDF, DOC, DOCX, TXT
   - **MIME Type Validation**: Server-side validation for security
   - **Total Size Limit**: 50MB total (5 files × 10MB)

4. **Drag & Drop Functionality**
   - Visual feedback during drag operations
   - Drop zone highlighting
   - Multiple file support via drag & drop
   - Fallback to click-to-upload

5. **File Serving**
   - Dedicated API endpoint: `/api/files/[fileId]`
   - Secure file access with proper headers
   - Download links in email notifications
   - CORS support for cross-origin requests

6. **Email Integration**
   - File download links in admin notifications
   - File download links in user confirmations
   - Both HTML and text email formats supported

## File Structure

```
src/
├── lib/
│   ├── file-storage.ts          # File storage utilities
│   └── email-edge.ts            # Updated email templates
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts         # Updated contact API
│   │   └── files/
│   │       └── [fileId]/
│   │           └── route.ts     # File serving endpoint
│   └── contact/
│       └── page.tsx             # Contact page
└── components/
    └── forms/
        └── ContactForm.tsx      # Updated form with drag & drop

uploads/
└── contact-attachments/         # File storage directory
```

## API Endpoints

### POST /api/contact

**Content-Type**: `multipart/form-data` or `application/json`

**Form Fields**:
- `name` (string, required)
- `email` (string, required)
- `phone` (string, required)
- `company` (string, optional)
- `serviceType` (string, required)
- `urgency` (string, required)
- `description` (string, required)
- `files` (File[], optional)

**Response**:
```json
{
  "success": true,
  "message": "Votre demande a été envoyée avec succès...",
  "data": {
    "id": "contact-1234567890",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "files": ["contact-1234567890-abc123.pdf"]
  }
}
```

### GET /api/files/[fileId]

**Response**: File download with appropriate headers

**Headers**:
- `Content-Type`: Based on file MIME type
- `Content-Disposition`: `attachment; filename="original-name.ext"`
- `Cache-Control`: `private, max-age=3600`

## File Storage Details

### Storage Location
- **Directory**: `/uploads/contact-attachments/`
- **Filename Format**: `{timestamp}-{random}.{extension}`
- **Example**: `1704067200000-abc123.pdf`

### File Metadata
```typescript
interface UploadedFile {
  id: string              // Unique file identifier
  originalName: string    // Original filename
  filename: string        // Stored filename
  size: number           // File size in bytes
  mimeType: string       // MIME type
  uploadedAt: Date       // Upload timestamp
  path: string          // Full file path
}
```

## Validation Rules

### Client-Side Validation
- File size: 10MB maximum
- File count: 5 files maximum
- File types: JPG, PNG, PDF, DOC, DOCX, TXT
- Total size: 50MB maximum

### Server-Side Validation
- MIME type verification
- File size verification
- File count verification
- Security checks for file content

## Security Features

1. **File Type Validation**
   - Extension-based validation
   - MIME type verification
   - Server-side content validation

2. **File Size Limits**
   - Per-file limit: 10MB
   - Total submission limit: 50MB
   - Count limit: 5 files

3. **Secure File Serving**
   - Unique file IDs prevent direct access
   - Proper Content-Type headers
   - Download-only access (no execution)

4. **Input Sanitization**
   - Filename sanitization
   - Path traversal prevention
   - XSS protection in email templates

## User Experience Features

### Drag & Drop Interface
- Visual feedback during drag operations
- Drop zone highlighting
- Multiple file support
- Error handling with user-friendly messages

### File Management
- File preview with size information
- Individual file removal
- File count display
- Progress indicators

### Email Notifications
- Download links for all attached files
- File information in email templates
- Both HTML and text formats

## Configuration

### Environment Variables
```env
NEXT_PUBLIC_SITE_URL=https://oisdrive.com  # For email download links
```

### File Storage Configuration
```typescript
const UPLOAD_DIR = join(process.cwd(), 'uploads', 'contact-attachments')
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_FILES_PER_SUBMISSION = 5
const ALLOWED_MIME_TYPES = [
  'image/jpeg', 'image/jpg', 'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
]
```

## Deployment Considerations

### File Storage
- **Local Storage**: Suitable for development and small deployments
- **Cloud Storage**: Recommended for production (AWS S3, Google Cloud Storage)
- **Database Storage**: For metadata only, not file content

### Security
- Regular file cleanup (implement cleanup job)
- File scanning for malware (consider antivirus integration)
- Access logging for audit trails
- Rate limiting for file uploads

### Performance
- File compression for large files
- CDN integration for file serving
- Caching strategies for frequently accessed files
- Background processing for file validation

## Testing

### Manual Testing Checklist
- [ ] File upload via drag & drop
- [ ] File upload via click-to-upload
- [ ] Multiple file selection
- [ ] File validation (size, type, count)
- [ ] File removal before submission
- [ ] Form submission with files
- [ ] Email notifications with download links
- [ ] File download via email links
- [ ] Error handling for invalid files
- [ ] Large file handling
- [ ] Network interruption handling

### Automated Testing
- Unit tests for file validation
- Integration tests for file upload flow
- E2E tests for complete user journey
- Performance tests for large files

## Future Enhancements

1. **Cloud Storage Integration**
   - AWS S3 integration
   - Google Cloud Storage
   - Azure Blob Storage

2. **Advanced Features**
   - File preview in browser
   - Image resizing/compression
   - PDF thumbnail generation
   - File encryption at rest

3. **Analytics**
   - File upload statistics
   - Download tracking
   - Storage usage monitoring

4. **Security Enhancements**
   - Virus scanning integration
   - Content-based file validation
   - Access control and permissions
   - Audit logging

## Troubleshooting

### Common Issues

1. **File Upload Fails**
   - Check file size limits
   - Verify file type restrictions
   - Ensure upload directory permissions
   - Check server storage space

2. **Email Links Don't Work**
   - Verify `NEXT_PUBLIC_SITE_URL` environment variable
   - Check file serving endpoint
   - Ensure file still exists in storage

3. **Drag & Drop Not Working**
   - Check browser compatibility
   - Verify JavaScript is enabled
   - Check for console errors

4. **File Download Issues**
   - Verify file ID format
   - Check file existence
   - Ensure proper MIME type headers

### Debug Mode
Enable debug logging by setting:
```env
DEBUG_FILE_UPLOAD=true
```

This will log detailed information about file uploads, validation, and storage operations.

## Support

For issues related to file uploads:
1. Check the browser console for errors
2. Verify file size and type restrictions
3. Check server logs for upload errors
4. Ensure proper environment configuration

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Status**: Production Ready
