# Cloud Storage Setup Guide - OISDRIVE Website

## Overview

This guide explains how to set up cloud storage for the OISDRIVE website's file upload functionality. The system supports AWS S3 as the primary cloud storage solution with automatic fallback to local storage.

## AWS S3 Setup

### 1. Create AWS Account and S3 Bucket

1. **Create AWS Account**
   - Go to [AWS Console](https://aws.amazon.com/console/)
   - Sign up for an AWS account if you don't have one
   - Complete the account verification process

2. **Create S3 Bucket**
   ```bash
   # Using AWS CLI
   aws s3 mb s3://oisdrive-attachments --region us-east-1
   
   # Or create via AWS Console:
   # 1. Go to S3 service
   # 2. Click "Create bucket"
   # 3. Name: oisdrive-attachments
   # 4. Region: us-east-1 (or your preferred region)
   # 5. Uncheck "Block all public access" (we'll use signed URLs)
   ```

### 2. Create IAM User and Access Keys

1. **Create IAM User**
   ```bash
   # Using AWS CLI
   aws iam create-user --user-name oisdrive-storage
   ```

2. **Create Access Policy**
   Create a file `oisdrive-s3-policy.json`:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:GetObject",
           "s3:DeleteObject",
           "s3:ListBucket"
         ],
         "Resource": [
           "arn:aws:s3:::oisdrive-attachments",
           "arn:aws:s3:::oisdrive-attachments/*"
         ]
       }
     ]
   }
   ```

3. **Attach Policy to User**
   ```bash
   aws iam put-user-policy --user-name oisdrive-storage --policy-name OISDRIVES3Policy --policy-document file://oisdrive-s3-policy.json
   ```

4. **Create Access Keys**
   ```bash
   aws iam create-access-key --user-name oisdrive-storage
   ```

### 3. Configure Environment Variables

Add these environment variables to your deployment platform:

```env
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_S3_BUCKET=oisdrive-attachments
AWS_REGION=us-east-1

# Optional: Custom S3 endpoint (for S3-compatible services)
# AWS_ENDPOINT=https://s3.amazonaws.com

# Site URL for email links
NEXT_PUBLIC_SITE_URL=https://oisdrive.com
```

### 4. Bucket Configuration

1. **Enable Versioning** (Optional)
   ```bash
   aws s3api put-bucket-versioning --bucket oisdrive-attachments --versioning-configuration Status=Enabled
   ```

2. **Set Lifecycle Policy** (Recommended)
   Create `lifecycle-policy.json`:
   ```json
   {
     "Rules": [
       {
         "ID": "DeleteOldFiles",
         "Status": "Enabled",
         "Filter": {
           "Prefix": "contact-attachments/"
         },
         "Expiration": {
           "Days": 30
         }
       }
     ]
   }
   ```
   
   Apply the policy:
   ```bash
   aws s3api put-bucket-lifecycle-configuration --bucket oisdrive-attachments --lifecycle-configuration file://lifecycle-policy.json
   ```

## Alternative Cloud Storage Options

### Google Cloud Storage

1. **Install Google Cloud SDK**
   ```bash
   npm install @google-cloud/storage
   ```

2. **Create Service Account**
   - Go to Google Cloud Console
   - Create a new service account
   - Download the JSON key file

3. **Environment Variables**
   ```env
   GOOGLE_CLOUD_PROJECT_ID=your_project_id
   GOOGLE_CLOUD_BUCKET=oisdrive-attachments
   GOOGLE_CLOUD_KEY_FILE=path/to/service-account.json
   ```

### Supabase Storage

1. **Install Supabase Client**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Environment Variables**
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   ```

### Vercel Blob Storage

1. **Install Vercel Blob**
   ```bash
   npm install @vercel/blob
   ```

2. **Environment Variables**
   ```env
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   ```

## Deployment Platform Configuration

### Vercel

1. **Add Environment Variables**
   ```bash
   vercel env add AWS_ACCESS_KEY_ID
   vercel env add AWS_SECRET_ACCESS_KEY
   vercel env add AWS_S3_BUCKET
   vercel env add AWS_REGION
   vercel env add NEXT_PUBLIC_SITE_URL
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Cloudflare Pages

1. **Add Environment Variables**
   - Go to Cloudflare Pages dashboard
   - Navigate to your project
   - Go to Settings > Environment Variables
   - Add all required variables

2. **Deploy**
   ```bash
   wrangler pages deploy
   ```

### Netlify

1. **Add Environment Variables**
   - Go to Netlify dashboard
   - Navigate to your site
   - Go to Site Settings > Environment Variables
   - Add all required variables

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Testing Cloud Storage

### 1. Health Check

Test the storage health endpoint:
```bash
curl https://your-domain.com/api/health/storage
```

Expected response:
```json
{
  "status": "healthy",
  "message": "Cloud storage is working correctly",
  "cloudStorage": true,
  "localStorage": false,
  "provider": "AWS S3",
  "bucket": "oisdrive-attachments",
  "region": "us-east-1",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. File Upload Test

1. Go to the contact page
2. Fill out the form
3. Upload a test file
4. Submit the form
5. Check the email for download links
6. Test the download links

### 3. Manual Testing

```bash
# Test file upload via API
curl -X POST https://your-domain.com/api/contact \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "phone=+33123456789" \
  -F "serviceType=data-recovery" \
  -F "urgency=medium" \
  -F "description=Test file upload" \
  -F "files=@test-file.pdf"
```

## Security Considerations

### 1. Access Control

- Use IAM roles with minimal permissions
- Rotate access keys regularly
- Use signed URLs for file access
- Implement proper CORS policies

### 2. File Validation

- Validate file types on both client and server
- Implement file size limits
- Scan files for malware (consider AWS GuardDuty)
- Use content-type validation

### 3. Data Protection

- Enable encryption at rest
- Use HTTPS for all communications
- Implement proper access logging
- Follow GDPR compliance requirements

## Monitoring and Maintenance

### 1. CloudWatch Monitoring

Set up CloudWatch alarms for:
- S3 request metrics
- Error rates
- Storage usage
- Cost monitoring

### 2. Logging

Enable S3 access logging:
```bash
aws s3api put-bucket-logging --bucket oisdrive-attachments --bucket-logging-status file://logging-config.json
```

### 3. Backup Strategy

- Enable S3 versioning
- Set up cross-region replication
- Implement lifecycle policies
- Regular backup testing

## Troubleshooting

### Common Issues

1. **Access Denied Errors**
   - Check IAM permissions
   - Verify bucket policy
   - Ensure correct region

2. **File Upload Failures**
   - Check file size limits
   - Verify file type restrictions
   - Check network connectivity

3. **Download Link Issues**
   - Verify signed URL generation
   - Check file existence in S3
   - Ensure proper CORS configuration

### Debug Commands

```bash
# Check S3 bucket contents
aws s3 ls s3://oisdrive-attachments/contact-attachments/ --recursive

# Test S3 connectivity
aws s3 ls s3://oisdrive-attachments

# Check IAM permissions
aws iam get-user-policy --user-name oisdrive-storage --policy-name OISDRIVES3Policy
```

## Cost Optimization

### 1. Storage Classes

- Use S3 Standard for frequently accessed files
- Use S3 Infrequent Access for older files
- Use S3 Glacier for long-term archival

### 2. Lifecycle Policies

- Automatically delete old files
- Move files to cheaper storage classes
- Implement intelligent tiering

### 3. Monitoring

- Set up billing alerts
- Monitor usage patterns
- Optimize based on actual usage

## Support

For issues related to cloud storage:

1. Check the health endpoint: `/api/health/storage`
2. Review the troubleshooting guide
3. Check AWS CloudWatch logs
4. Verify environment variables
5. Test with a simple file upload

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Status**: Production Ready
