# Edge Runtime File Storage Limitations & Solutions

## Problem

The OISDRIVE website is configured to use **Edge Runtime** for optimal performance and compatibility with Cloudflare Pages. However, Edge Runtime has limitations that prevent traditional file storage approaches:

### Edge Runtime Limitations:
- ❌ No access to Node.js `fs` module
- ❌ No local filesystem access
- ❌ No persistent storage
- ❌ Limited to Web APIs only

## Current Implementation Status

### ✅ What Works:
- **File Upload UI**: Drag & drop, file selection, validation
- **FormData Handling**: Files are received by the API
- **File Validation**: Size, type, and count validation
- **Email Notifications**: File information included in emails
- **Form Submission**: Complete contact form functionality

### ⚠️ What's Limited:
- **File Storage**: Files are received but not permanently stored
- **File Serving**: Download links return placeholder responses
- **File Persistence**: Files are lost after request completion

## Solutions for Production

### Option 1: Cloud Storage Integration (Recommended)

#### AWS S3 Integration
```typescript
// Example implementation
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function uploadToS3(file: File, key: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: await file.arrayBuffer(),
    ContentType: file.type,
  })
  
  return await s3Client.send(command)
}
```

#### Google Cloud Storage Integration
```typescript
// Example implementation
import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
})

export async function uploadToGCS(file: File, filename: string) {
  const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET)
  const fileUpload = bucket.file(filename)
  
  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.type,
    },
  })
  
  return new Promise((resolve, reject) => {
    stream.on('error', reject)
    stream.on('finish', resolve)
    stream.end(await file.arrayBuffer())
  })
}
```

### Option 2: Database + CDN Integration

#### Supabase Storage
```typescript
// Example implementation
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export async function uploadToSupabase(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from('contact-attachments')
    .upload(path, file)
    
  if (error) throw error
  return data
}
```

#### Vercel Blob Storage
```typescript
// Example implementation
import { put } from '@vercel/blob'

export async function uploadToVercelBlob(file: File, filename: string) {
  const blob = await put(filename, file, {
    access: 'public',
  })
  
  return blob
}
```

### Option 3: Hybrid Approach

#### Temporary Storage + Background Processing
```typescript
// Example implementation
export async function handleFileUpload(files: File[]) {
  // 1. Validate files
  const validation = validateFiles(files)
  if (!validation.valid) {
    throw new Error(validation.error)
  }
  
  // 2. Store file metadata in database
  const fileRecords = await Promise.all(
    files.map(async (file) => {
      const fileId = generateFileId()
      await db.files.create({
        data: {
          id: fileId,
          originalName: file.name,
          size: file.size,
          mimeType: file.type,
          status: 'pending',
        },
      })
      return { fileId, file }
    })
  )
  
  // 3. Queue background job for file processing
  await queueFileUploadJob(fileRecords)
  
  return fileRecords.map(r => r.fileId)
}
```

## Implementation Steps

### Step 1: Choose Storage Solution
1. **AWS S3**: Best for scalability and reliability
2. **Google Cloud Storage**: Good for Google Cloud ecosystem
3. **Supabase**: Easy setup, good for smaller projects
4. **Vercel Blob**: Seamless integration with Vercel

### Step 2: Update Environment Variables
```env
# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=oisdrive-attachments

# Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_CLOUD_BUCKET=oisdrive-attachments
GOOGLE_CLOUD_KEY_FILE=path/to/service-account.json

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

### Step 3: Update File Storage Implementation
Replace the placeholder functions in `src/lib/file-storage.ts` with actual cloud storage integration.

### Step 4: Update File Serving Endpoint
Modify `src/app/api/files/[fileId]/route.ts` to serve files from cloud storage.

### Step 5: Update Email Templates
Ensure download links point to the correct cloud storage URLs.

## Security Considerations

### File Validation
- ✅ File type validation (already implemented)
- ✅ File size limits (already implemented)
- ✅ File count limits (already implemented)
- ⚠️ Content scanning for malware (recommended)
- ⚠️ Virus scanning (recommended)

### Access Control
- ✅ Unique file IDs (already implemented)
- ⚠️ Signed URLs for secure access (recommended)
- ⚠️ Time-limited access (recommended)
- ⚠️ IP-based restrictions (optional)

### Data Protection
- ⚠️ Encryption at rest (recommended)
- ⚠️ Encryption in transit (recommended)
- ⚠️ GDPR compliance (required)
- ⚠️ Data retention policies (recommended)

## Cost Considerations

### AWS S3
- **Storage**: $0.023 per GB per month
- **Requests**: $0.0004 per 1,000 PUT requests
- **Data Transfer**: $0.09 per GB for first 10TB

### Google Cloud Storage
- **Storage**: $0.020 per GB per month
- **Requests**: $0.0004 per 1,000 PUT requests
- **Data Transfer**: $0.12 per GB for first 10TB

### Supabase
- **Free Tier**: 1GB storage, 2GB bandwidth
- **Pro Plan**: $25/month for 8GB storage, 100GB bandwidth

### Vercel Blob
- **Free Tier**: 1GB storage, 1GB bandwidth
- **Pro Plan**: $0.15 per GB storage, $0.40 per GB bandwidth

## Recommended Implementation

For OISDRIVE, I recommend **AWS S3** for the following reasons:

1. **Reliability**: 99.999999999% (11 9's) durability
2. **Scalability**: Handles any amount of data
3. **Security**: Advanced security features
4. **Cost**: Competitive pricing for enterprise use
5. **Integration**: Easy integration with other AWS services
6. **Compliance**: Meets various compliance requirements

### Implementation Priority:
1. **Phase 1**: Basic S3 integration for file storage
2. **Phase 2**: Signed URLs for secure access
3. **Phase 3**: Content scanning and virus protection
4. **Phase 4**: Advanced security and compliance features

## Testing Strategy

### Unit Tests
- File validation functions
- Cloud storage integration
- Error handling

### Integration Tests
- End-to-end file upload flow
- Email notification with download links
- File serving endpoint

### Load Tests
- Multiple concurrent uploads
- Large file handling
- High volume scenarios

## Monitoring and Alerting

### Metrics to Track
- File upload success rate
- File download success rate
- Storage usage
- Error rates
- Response times

### Alerts to Set Up
- High error rates
- Storage quota approaching limits
- Unusual download patterns
- Failed uploads

## Conclusion

The current implementation provides a solid foundation with proper validation and user experience. The main limitation is the lack of persistent file storage due to Edge Runtime constraints.

**Next Steps:**
1. Choose a cloud storage solution (recommend AWS S3)
2. Implement cloud storage integration
3. Update file serving endpoint
4. Test thoroughly
5. Deploy to production

The file upload functionality is ready for production once cloud storage integration is implemented.

---

**Last Updated**: January 2024
**Status**: Ready for Cloud Storage Integration
**Priority**: High (Required for Production)
