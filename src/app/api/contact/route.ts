import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactFormEmailsEdge } from '@/lib/email-edge'
import { validateFiles } from '@/lib/file-storage'

// Configure for Edge Runtime (required for Cloudflare Pages)
export const runtime = 'edge'

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  company: z.string().optional(),
  serviceType: z.enum(['data-recovery', 'sensitive-data-processing', 'large-scale-data-management', 'emergency-recovery', 'consultation']),
  urgency: z.enum(['low', 'medium', 'high', 'emergency']),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  files: z.array(z.string()).optional() // File IDs after upload
})

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    
    let formData: Record<string, unknown>
    let uploadedFiles: string[] = []
    
    if (contentType?.includes('multipart/form-data')) {
      // Handle FormData with file uploads
      const form = await request.formData()
      
      // Extract form fields
      formData = {
        name: form.get('name') as string,
        email: form.get('email') as string,
        phone: form.get('phone') as string,
        company: form.get('company') as string || undefined,
        serviceType: form.get('serviceType') as string,
        urgency: form.get('urgency') as string,
        description: form.get('description') as string,
      }
      
      // Handle file uploads
      const files = form.getAll('files') as File[]
      if (files.length > 0) {
        // Validate files
        const validation = validateFiles(files)
        if (!validation.valid) {
          return NextResponse.json({
            success: false,
            message: validation.error || 'Erreur lors de la validation des fichiers'
          }, { status: 400 })
        }
        
        // In Edge Runtime, we can't save files to local storage
        // For now, we'll just log the file information and include file names in the email
        const submissionId = `contact-${Date.now()}`
        uploadedFiles = files.map((file, index) => `${submissionId}-${index}-${file.name}`)
        
        console.log('Files received (not stored in Edge Runtime):', {
          count: files.length,
          files: files.map(f => ({ name: f.name, size: f.size, type: f.type }))
        })
      }
    } else {
      // Handle JSON data (fallback)
      formData = await request.json()
    }
    
    // Add uploaded file IDs to form data
    formData.files = uploadedFiles
    
    // Validate the form data
    const validatedData = contactFormSchema.parse(formData)
    
    // Log the submission
    console.log('Contact form submission:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    })
    
    // Send emails (admin notification + user confirmation)
    const emailResult = await sendContactFormEmailsEdge(validatedData)
    
    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.message)
      // Continue anyway - don't fail the form submission if email fails
    }
    
    // In production, you would also:
    // 1. Store the submission in a database
    // 2. Integrate with CRM system
    // 3. Send notifications to team chat/Slack
    // 4. Create follow-up tasks
    
    return NextResponse.json({
      success: true,
      message: 'Votre demande a été envoyée avec succès. Notre équipe vous contactera dans les plus brefs délais.',
      data: {
        id: `contact-${Date.now()}`,
        timestamp: new Date().toISOString(),
        files: uploadedFiles
      }
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Données du formulaire invalides',
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer ou nous contacter directement.'
    }, { status: 500 })
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
