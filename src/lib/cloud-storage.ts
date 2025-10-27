// Cloud storage utilities for OISDRIVE contact form attachments
// Supports AWS S3, Google Cloud Storage, and other cloud providers

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export interface CloudFile {
  id: string
  originalName: string
  key: string
  size: number
  mimeType: string
  uploadedAt: Date
  url?: string
  signedUrl?: string
}

export interface CloudStorageResult {
  success: boolean
  files?: CloudFile[]
  error?: string
}

export interface CloudStorageConfig {
  provider: 'aws-s3' | 'google-cloud' | 'supabase' | 'vercel-blob'
  bucket: string
  region?: string
  accessKeyId?: string
  secretAccessKey?: string
  endpoint?: string
}

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  ...(process.env.AWS_ENDPOINT && { endpoint: process.env.AWS_ENDPOINT }),
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'oisdrive-attachments'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_FILES_PER_SUBMISSION = 5
const SIGNED_URL_EXPIRY = 3600 // 1 hour

// Allowed file types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
]

const ALLOWED_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.pdf',
  '.doc',
  '.docx',
  '.txt'
]

// Generate unique S3 key
function generateS3Key(originalName: string, submissionId: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const _extension = originalName.split('.').pop()?.toLowerCase() || ''
  const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_')
  
  return `contact-attachments/${submissionId}/${timestamp}-${random}-${sanitizedName}`
}

// Validate file for cloud storage
export function validateCloudFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Le fichier "${file.name}" est trop volumineux. Taille maximale: 10MB`
    }
  }

  // Check file type
  const extension = '.' + file.name.split('.').pop()?.toLowerCase()
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `Le fichier "${file.name}" n'est pas dans un format accepté. Formats autorisés: ${ALLOWED_EXTENSIONS.join(', ')}`
    }
  }

  // Check MIME type if available
  if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Le fichier "${file.name}" n'est pas dans un format accepté.`
    }
  }

  return { valid: true }
}

// Validate multiple files
export function validateCloudFiles(files: File[]): { valid: boolean; error?: string } {
  // Check number of files
  if (files.length > MAX_FILES_PER_SUBMISSION) {
    return {
      valid: false,
      error: `Trop de fichiers. Maximum autorisé: ${MAX_FILES_PER_SUBMISSION}`
    }
  }

  // Check total size
  const totalSize = files.reduce((sum, file) => sum + file.size, 0)
  if (totalSize > MAX_FILE_SIZE * MAX_FILES_PER_SUBMISSION) {
    return {
      valid: false,
      error: 'La taille totale des fichiers est trop importante.'
    }
  }

  // Validate each file
  for (const file of files) {
    const validation = validateCloudFile(file)
    if (!validation.valid) {
      return validation
    }
  }

  return { valid: true }
}

// Upload file to AWS S3
export async function uploadToS3(file: File, submissionId: string): Promise<CloudFile> {
  const key = generateS3Key(file.name, submissionId)
  const fileId = `${submissionId}-${key.split('/').pop()}`
  
  try {
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type || 'application/octet-stream',
      ContentLength: file.size,
      Metadata: {
        originalName: file.name,
        submissionId: submissionId,
        uploadedAt: new Date().toISOString(),
      },
    })
    
    await s3Client.send(command)
    
    // Generate signed URL for immediate access
    const signedUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
      { expiresIn: SIGNED_URL_EXPIRY }
    )
    
    return {
      id: fileId,
      originalName: file.name,
      key,
      size: file.size,
      mimeType: file.type || 'application/octet-stream',
      uploadedAt: new Date(),
      url: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`,
      signedUrl,
    }
  } catch (error) {
    console.error('Error uploading to S3:', error)
    throw new Error(`Erreur lors de l'upload vers S3: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
  }
}

// Upload multiple files to S3
export async function uploadMultipleToS3(files: File[], submissionId: string): Promise<CloudStorageResult> {
  try {
    const validation = validateCloudFiles(files)
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      }
    }

    const uploadedFiles: CloudFile[] = []
    
    // Upload files in parallel for better performance
    const uploadPromises = files.map(file => uploadToS3(file, submissionId))
    const results = await Promise.all(uploadPromises)
    
    uploadedFiles.push(...results)

    return {
      success: true,
      files: uploadedFiles
    }
  } catch (error) {
    console.error('Error uploading multiple files to S3:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors de l\'upload des fichiers'
    }
  }
}

// Get file from S3
export async function getFileFromS3(key: string): Promise<{ file: Buffer; metadata: CloudFile } | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
    
    const response = await s3Client.send(command)
    
    if (!response.Body) {
      return null
    }
    
    // Convert stream to buffer
    const chunks: Uint8Array[] = []
    const reader = response.Body.transformToWebStream().getReader()
    
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
    }
    
    const buffer = Buffer.concat(chunks)
    
    const metadata: CloudFile = {
      id: key.split('/').pop() || key,
      originalName: response.Metadata?.originalname || key.split('/').pop() || key,
      key,
      size: buffer.length,
      mimeType: response.ContentType || 'application/octet-stream',
      uploadedAt: new Date(response.LastModified || Date.now()),
    }
    
    return { file: buffer, metadata }
  } catch (error) {
    console.error('Error getting file from S3:', error)
    return null
  }
}

// Generate signed URL for file access
export async function generateSignedUrl(key: string, expiresIn: number = SIGNED_URL_EXPIRY): Promise<string | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
    
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn })
    return signedUrl
  } catch (error) {
    console.error('Error generating signed URL:', error)
    return null
  }
}

// Delete file from S3
export async function deleteFileFromS3(key: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
    
    await s3Client.send(command)
    return true
  } catch (error) {
    console.error('Error deleting file from S3:', error)
    return false
  }
}

// List files for a submission
export async function listFilesForSubmission(_submissionId: string): Promise<CloudFile[]> {
  try {
    // This would require ListObjectsV2Command
    // For now, we'll return an empty array
    // In a real implementation, you'd list objects with the submission prefix
    return []
  } catch (error) {
    console.error('Error listing files for submission:', error)
    return []
  }
}

// Clean up old files (run periodically)
export async function cleanupOldFiles(_maxAgeHours: number = 24): Promise<number> {
  try {
    // This would require ListObjectsV2Command and DeleteObjectsCommand
    // For now, we'll return 0
    // In a real implementation, you'd:
    // 1. List all objects in the bucket
    // 2. Filter by age
    // 3. Delete old objects
    return 0
  } catch (error) {
    console.error('Error cleaning up old files:', error)
    return 0
  }
}

// Health check for S3 connection
export async function checkS3Health(): Promise<{ healthy: boolean; error?: string }> {
  try {
    // Try to list objects in the bucket (with a limit of 1)
    // This is a lightweight operation to test connectivity
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: 'health-check', // This will fail, but we can catch the error
    })
    
    await s3Client.send(command)
    return { healthy: true }
  } catch (error: unknown) {
    // If it's a NoSuchKey error, the connection is working
    if (error && typeof error === 'object' && 'name' in error && error.name === 'NoSuchKey') {
      return { healthy: true }
    }
    
    // If it's an access denied error, the connection is working but permissions might be wrong
    if (error && typeof error === 'object' && 'name' in error && error.name === 'AccessDenied') {
      return { healthy: true }
    }
    
    return { 
      healthy: false, 
      error: (error && typeof error === 'object' && 'message' in error ? error.message : 'Unknown error') as string
    }
  }
}
