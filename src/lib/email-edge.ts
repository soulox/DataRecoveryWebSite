// Edge Runtime compatible email service for OISDRIVE contact form using Mailgun
// This version uses fetch API instead of Node.js form-data package

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  serviceType: string
  urgency: string
  description: string
  files?: string[]
}

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

// Generate email templates
export function generateContactEmailTemplates(data: ContactFormData): {
  adminEmail: EmailTemplate
  userEmail: EmailTemplate
} {
  const urgencyLabels = {
    low: 'Faible',
    medium: 'Moyenne', 
    high: 'Élevée',
    emergency: 'Critique'
  }

  const serviceLabels = {
    'data-recovery': 'Récupération de Données',
    'sensitive-data-processing': 'Traitement des Données Sensibles',
    'large-scale-data-management': 'Gestion des Données Volumineuses',
    'emergency-recovery': 'Récupération d\'Urgence',
    'consultation': 'Consultation'
  }

  // Admin notification email
  const adminEmail: EmailTemplate = {
    subject: `[OISDRIVE] Nouvelle demande de contact - ${data.serviceType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Nouvelle Demande de Contact</h1>
          <p style="margin: 5px 0 0 0;">OISDRIVE - Récupération de Données</p>
        </div>
        
        <div style="padding: 20px; background: #f8fafc;">
          <h2 style="color: #1e40af; margin-top: 0;">Informations du Client</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Nom :</td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email :</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Téléphone :</td>
              <td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Entreprise :</td>
              <td style="padding: 8px 0;">${data.company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Service :</td>
              <td style="padding: 8px 0;">${serviceLabels[data.serviceType as keyof typeof serviceLabels]}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Urgence :</td>
              <td style="padding: 8px 0; color: ${data.urgency === 'emergency' ? '#dc2626' : data.urgency === 'high' ? '#ea580c' : '#059669'};">
                ${urgencyLabels[data.urgency as keyof typeof urgencyLabels]}
              </td>
            </tr>
          </table>
          
          <h3 style="color: #1e40af; margin-top: 20px;">Description de la Situation</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #1e40af; margin: 10px 0;">
            ${data.description.replace(/\n/g, '<br>')}
          </div>
          
          ${data.files && data.files.length > 0 ? `
          <h3 style="color: #1e40af; margin-top: 20px;">Fichiers Joints</h3>
          <ul style="background: white; padding: 15px; margin: 10px 0;">
            ${data.files.map(file => `<li>${file}</li>`).join('')}
          </ul>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background: ${data.urgency === 'emergency' ? '#fef2f2' : '#f0f9ff'}; border: 1px solid ${data.urgency === 'emergency' ? '#fecaca' : '#bae6fd'}; border-radius: 5px;">
            <p style="margin: 0; font-weight: bold; color: ${data.urgency === 'emergency' ? '#dc2626' : '#0369a1'};">
              ${data.urgency === 'emergency' ? '🚨 URGENCE CRITIQUE - Réponse immédiate requise' : 'Action requise - Répondre dans les 24h'}
            </p>
          </div>
        </div>
        
        <div style="background: #1f2937; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">OISDRIVE - 3 rue Dieudonné Costes, Suite 4, 31700 Blagnac, France</p>
          <p style="margin: 5px 0 0 0;">Tél: +33 7 88 85 72 97 | Email: contact@oisdrive.com</p>
        </div>
      </div>
    `,
    text: `
NOUVELLE DEMANDE DE CONTACT - OISDRIVE

Informations du Client:
- Nom: ${data.name}
- Email: ${data.email}
- Téléphone: ${data.phone}
${data.company ? `- Entreprise: ${data.company}` : ''}
- Service: ${serviceLabels[data.serviceType as keyof typeof serviceLabels]}
- Urgence: ${urgencyLabels[data.urgency as keyof typeof urgencyLabels]}

Description:
${data.description}

${data.files && data.files.length > 0 ? `Fichiers joints: ${data.files.join(', ')}` : ''}

${data.urgency === 'emergency' ? '🚨 URGENCE CRITIQUE - Réponse immédiate requise' : 'Action requise - Répondre dans les 24h'}

---
OISDRIVE - 3 rue Dieudonné Costes, Suite 4, 31700 Blagnac, France
Tél: +33 7 88 85 72 97 | Email: contact@oisdrive.com
    `
  }

  // User confirmation email
  const userEmail: EmailTemplate = {
    subject: 'Confirmation de votre demande - OISDRIVE',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">OISDRIVE</h1>
          <p style="margin: 5px 0 0 0;">Expert en Récupération de Données</p>
        </div>
        
        <div style="padding: 20px;">
          <h2 style="color: #1e40af;">Bonjour ${data.name},</h2>
          
          <p>Nous avons bien reçu votre demande concernant nos services de <strong>${serviceLabels[data.serviceType as keyof typeof serviceLabels]}</strong>.</p>
          
          <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #1e40af; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Récapitulatif de votre demande</h3>
            <p><strong>Service :</strong> ${serviceLabels[data.serviceType as keyof typeof serviceLabels]}</p>
            <p><strong>Niveau d&apos;urgence :</strong> ${urgencyLabels[data.urgency as keyof typeof urgencyLabels]}</p>
            <p><strong>Description :</strong> ${data.description}</p>
          </div>
          
          <h3 style="color: #1e40af;">Prochaines étapes</h3>
          <ul>
            <li>Notre équipe d'experts examine votre demande</li>
            <li>Nous vous contactons dans les plus brefs délais</li>
            <li>Nous vous proposons une solution personnalisée</li>
          </ul>
          
          ${data.urgency === 'emergency' ? `
          <div style="background: #fef2f2; padding: 15px; border: 1px solid #fecaca; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #dc2626; font-weight: bold;">
              🚨 URGENCE DÉTECTÉE - Notre équipe d&apos;urgence vous contactera dans les 2 heures.
            </p>
          </div>
          ` : ''}
          
          <h3 style="color: #1e40af;">Besoin d'aide immédiate ?</h3>
          <p>Pour toute urgence, n'hésitez pas à nous appeler directement :</p>
          <p style="text-align: center; margin: 20px 0;">
            <a href="tel:+33788857297" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              📞 +33 7 88 85 72 97
            </a>
          </p>
          
          <p>Merci de votre confiance.</p>
          <p>L'équipe OISDRIVE</p>
        </div>
        
        <div style="background: #1f2937; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">OISDRIVE - 3 rue Dieudonné Costes, Suite 4, 31700 Blagnac, France</p>
          <p style="margin: 5px 0 0 0;">Tél: +33 7 88 85 72 97 | Email: contact@oisdrive.com</p>
          <p style="margin: 10px 0 0 0;">
            <a href="https://oisdrive.com/privacy" style="color: #93c5fd;">Politique de confidentialité</a>
          </p>
        </div>
      </div>
    `,
    text: `
Bonjour ${data.name},

Nous avons bien reçu votre demande concernant nos services de ${serviceLabels[data.serviceType as keyof typeof serviceLabels]}.

Récapitulatif de votre demande:
- Service: ${serviceLabels[data.serviceType as keyof typeof serviceLabels]}
- Niveau d&apos;urgence: ${urgencyLabels[data.urgency as keyof typeof urgencyLabels]}
- Description: ${data.description}

Prochaines étapes:
1. Notre équipe d'experts examine votre demande
2. Nous vous contactons dans les plus brefs délais
3. Nous vous proposons une solution personnalisée

${data.urgency === 'emergency' ? '🚨 URGENCE DÉTECTÉE - Notre équipe d\'urgence vous contactera dans les 2 heures.' : ''}

Besoin d'aide immédiate ?
Pour toute urgence, appelez-nous directement : +33 7 88 85 72 97

Merci de votre confiance.
L'équipe OISDRIVE

---
OISDRIVE - 3 rue Dieudonné Costes, Suite 4, 31700 Blagnac, France
Tél: +33 7 88 85 72 97 | Email: contact@oisdrive.com
Politique de confidentialité: https://oisdrive.com/privacy
    `
  }

  return { adminEmail, userEmail }
}

// Edge Runtime compatible email sending function using fetch API
export async function sendEmailEdge(to: string, template: EmailTemplate): Promise<boolean> {
  try {
    // Check if Mailgun is configured
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      console.warn('⚠️ Mailgun not configured, logging email instead:')
      console.log('📧 To:', to)
      console.log('📧 Subject:', template.subject)
      console.log('📧 Content preview:', template.text.substring(0, 200) + '...')
      return true // Return true to not break the form submission
    }

    // Create form data using URLSearchParams (Edge Runtime compatible)
    const formData = new URLSearchParams()
    formData.append('from', process.env.MAILGUN_FROM_EMAIL || 'OISDRIVE <noreply@oisdrive.com>')
    formData.append('to', to)
    formData.append('subject', template.subject)
    formData.append('text', template.text)
    formData.append('html', template.html)

    // Send email via Mailgun using fetch API
    const response = await fetch(
      `${process.env.MAILGUN_URL || 'https://api.mailgun.net'}/v3/${process.env.MAILGUN_DOMAIN}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`api:${process.env.MAILGUN_API_KEY}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Mailgun API error: ${response.status} ${errorText}`)
    }

    const result = await response.json()
    console.log('✅ Email sent successfully via Mailgun:', result.id)
    return true
  } catch (error) {
    console.error('❌ Mailgun email sending error:', error)
    
    // Fallback: log the email if Mailgun fails
    console.log('📧 Fallback - Email would be sent to:', to)
    console.log('📧 Subject:', template.subject)
    console.log('📧 Content preview:', template.text.substring(0, 200) + '...')
    
    return false
  }
}

// Main function to handle contact form email sending (Edge Runtime compatible)
export async function sendContactFormEmailsEdge(data: ContactFormData): Promise<{
  success: boolean
  message: string
}> {
  try {
    const templates = generateContactEmailTemplates(data)
    
    // Send email to admin/team
    const adminEmailSent = await sendEmailEdge('contact@oisdrive.com', templates.adminEmail)
    
    // Send confirmation email to user
    const userEmailSent = await sendEmailEdge(data.email, templates.userEmail)
    
    if (adminEmailSent && userEmailSent) {
      return {
        success: true,
        message: 'Emails envoyés avec succès'
      }
    } else {
      return {
        success: false,
        message: 'Erreur lors de l\'envoi des emails'
      }
    }
  } catch (error) {
    console.error('Contact form email error:', error)
    return {
      success: false,
      message: 'Erreur lors du traitement des emails'
    }
  }
}
