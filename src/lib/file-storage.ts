// File storage utilities for OISDRIVE contact form attachments
// Note: This is a simplified version for Edge Runtime compatibility
// In production, consider using cloud storage (AWS S3, Google Cloud Storage, etc.)

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

// Save uploaded file (Edge Runtime compatible)
export async function saveUploadedFile(file: File, submissionId: string): Promise<UploadedFile> {
  const filename = generateUniqueFilename(file.name)
  const fileId = `${submissionId}-${filename}`
  
  // In Edge Runtime, we can't write to filesystem
  // This is a placeholder implementation
  // In production, you would:
  // 1. Upload to cloud storage (AWS S3, Google Cloud Storage, etc.)
  // 2. Store metadata in a database
  // 3. Return the cloud storage URL
  
  return {
    id: fileId,
    originalName: file.name,
    filename,
    size: file.size,
    mimeType: file.type,
    uploadedAt: new Date(),
    path: `cloud-storage://${fileId}` // Placeholder for cloud storage path
  }
}

// Save multiple files (Edge Runtime compatible)
export async function saveUploadedFiles(files: File[], submissionId: string): Promise<FileUploadResult> {
  try {
    const validation = validateFiles(files)
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      }
    }

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

// Get file by ID (Edge Runtime compatible)
export async function getFileById(_fileId: string): Promise<{ file: ArrayBuffer; metadata: UploadedFile } | null> {
  try {
    // In Edge Runtime, we can't read from filesystem
    // This is a placeholder implementation
    // In production, you would:
    // 1. Retrieve from cloud storage
    // 2. Get metadata from database
    // 3. Return the file content and metadata
    
    // For now, return null to indicate file not found
    // This will be handled by the file serving endpoint
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
