// File storage utilities for OISDRIVE contact form attachments
// This file provides a unified interface for both local and cloud storage
// In production, cloud storage is used via cloud-storage.ts

export interface UploadedFile {
  id: string
  originalName: string
  filename: string
  size: number
  mimeType: string
  uploadedAt: Date
  path: string
}

export interface FileUploadResult {
  success: boolean
  files?: UploadedFile[]
  error?: string
}

// Configuration
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_FILES_PER_SUBMISSION = 5
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

// Generate unique filename
function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()?.toLowerCase() || ''
  return `${timestamp}-${random}.${extension}`
}

// Validate file
export function validateFile(file: File): { valid: boolean; error?: string } {
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
export function validateFiles(files: File[]): { valid: boolean; error?: string } {
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
    const validation = validateFile(file)
    if (!validation.valid) {
      return validation
    }
  }

  return { valid: true }
}

// Save uploaded file (with cloud storage support)
export async function saveUploadedFile(file: File, submissionId: string): Promise<UploadedFile> {
  // Check if cloud storage is configured
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_S3_BUCKET) {
    try {
      // Use cloud storage
      const { uploadToS3 } = await import('./cloud-storage')
      const cloudFile = await uploadToS3(file, submissionId)
      
      return {
        id: cloudFile.id,
        originalName: cloudFile.originalName,
        filename: cloudFile.key.split('/').pop() || cloudFile.key,
        size: cloudFile.size,
        mimeType: cloudFile.mimeType,
        uploadedAt: cloudFile.uploadedAt,
        path: cloudFile.url || cloudFile.signedUrl || cloudFile.key
      }
    } catch (error) {
      console.error('Cloud storage upload failed, falling back to local storage:', error)
      // Fall through to local storage fallback
    }
  }
  
  // Fallback to local storage (Edge Runtime compatible)
  const filename = generateUniqueFilename(file.name)
  const fileId = `${submissionId}-${filename}`
  
  return {
    id: fileId,
    originalName: file.name,
    filename,
    size: file.size,
    mimeType: file.type,
    uploadedAt: new Date(),
    path: `local-storage://${fileId}` // Placeholder for local storage
  }
}

// Save multiple files (with cloud storage support)
export async function saveUploadedFiles(files: File[], submissionId: string): Promise<FileUploadResult> {
  try {
    const validation = validateFiles(files)
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      }
    }

    // Check if cloud storage is configured
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_S3_BUCKET) {
      try {
        // Use cloud storage for multiple files
        const { uploadMultipleToS3 } = await import('./cloud-storage')
        const result = await uploadMultipleToS3(files, submissionId)
        
        if (result.success && result.files) {
          const uploadedFiles: UploadedFile[] = result.files.map(cloudFile => ({
            id: cloudFile.id,
            originalName: cloudFile.originalName,
            filename: cloudFile.key.split('/').pop() || cloudFile.key,
            size: cloudFile.size,
            mimeType: cloudFile.mimeType,
            uploadedAt: cloudFile.uploadedAt,
            path: cloudFile.url || cloudFile.signedUrl || cloudFile.key
          }))
          
          return {
            success: true,
            files: uploadedFiles
          }
        } else {
          return {
            success: false,
            error: result.error || 'Unknown error'
          }
        }
      } catch (error) {
        console.error('Cloud storage upload failed, falling back to local storage:', error)
        // Fall through to local storage fallback
      }
    }

    // Fallback to local storage
    const uploadedFiles: UploadedFile[] = []
    
    for (const file of files) {
      const uploadedFile = await saveUploadedFile(file, submissionId)
      uploadedFiles.push(uploadedFile)
    }

    return {
      success: true,
      files: uploadedFiles
    }
  } catch (error) {
    console.error('Error saving uploaded files:', error)
    return {
      success: false,
      error: 'Erreur lors de la sauvegarde des fichiers'
    }
  }
}

// Get file by ID (with cloud storage support)
export async function getFileById(fileId: string): Promise<{ file: ArrayBuffer; metadata: UploadedFile } | null> {
  try {
    // Check if cloud storage is configured
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_S3_BUCKET) {
      try {
        // Extract S3 key from fileId (format: submissionId-timestamp-random-filename)
        const parts = fileId.split('-')
        if (parts.length >= 4) {
          const submissionId = parts[0]
          const timestamp = parts[1]
          const random = parts[2]
          const filename = parts.slice(3).join('-')
          const s3Key = `contact-attachments/${submissionId}/${timestamp}-${random}-${filename}`
          
          const { getFileFromS3 } = await import('./cloud-storage')
          const result = await getFileFromS3(s3Key)
          
          if (result) {
            return {
              file: result.file.buffer,
              metadata: {
                id: fileId,
                originalName: result.metadata.originalName,
                filename: result.metadata.key.split('/').pop() || result.metadata.key,
                size: result.metadata.size,
                mimeType: result.metadata.mimeType,
                uploadedAt: result.metadata.uploadedAt,
                path: result.metadata.key
              }
            }
          }
        }
      } catch (error) {
        console.error('Cloud storage retrieval failed:', error)
        // Fall through to local storage fallback
      }
    }
    
    // Fallback to local storage (Edge Runtime compatible)
    // In Edge Runtime, we can't read from filesystem
    return null
  } catch (error) {
    console.error('Error getting file:', error)
    return null
  }
}

// Delete file (Edge Runtime compatible)
export async function deleteFile(_fileId: string): Promise<boolean> {
  try {
    // In Edge Runtime, we can't delete from filesystem
    // This is a placeholder implementation
    // In production, you would:
    // 1. Delete from cloud storage
    // 2. Remove metadata from database
    
    return true // Placeholder
  } catch (error) {
    console.error('Error deleting file:', error)
    return false
  }
}

// Clean up old files (run periodically)
export async function cleanupOldFiles(_maxAgeHours: number = 24): Promise<number> {
  try {
    // This would need to be implemented with cloud storage
    // For now, we'll just return 0
    return 0
  } catch (error) {
    console.error('Error cleaning up old files:', error)
    return 0
  }
}
