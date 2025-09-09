import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactFormEmails } from '@/lib/email'

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  company: z.string().optional(),
  serviceType: z.enum(['data-recovery', 'sensitive-data-processing', 'large-scale-data-management', 'emergency-recovery', 'consultation']),
  urgency: z.enum(['low', 'medium', 'high', 'emergency']),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  files: z.array(z.string()).optional() // File names only, actual files would be handled separately
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const validatedData = contactFormSchema.parse(body)
    
    // Log the submission
    console.log('Contact form submission:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    })
    
    // Send emails (admin notification + user confirmation)
    const emailResult = await sendContactFormEmails(validatedData)
    
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
        timestamp: new Date().toISOString()
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
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
