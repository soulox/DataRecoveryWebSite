# Email Configuration Guide for OISDRIVE Website

## Current Status
✅ **Contact form is now properly routed to handle emails with Mailgun!**

The contact form now:
- Validates form data using Zod
- Sends emails to both admin and user via Mailgun
- Provides proper error handling
- Logs submissions for debugging
- **Uses Mailgun for reliable email delivery**

## Email Service Implementation

The current implementation includes:
- **API Route**: `/api/contact` - handles form submissions
- **Email Service**: `src/lib/email.ts` - generates and sends emails via Mailgun
- **Form Component**: Updated to use real API endpoint
- **Mailgun Integration**: Professional email delivery service

## Mailgun Configuration

Mailgun is now configured as the email service. To enable real email sending:

### 1. Get Mailgun Account

1. Sign up for Mailgun at [mailgun.com](https://www.mailgun.com)
2. Verify your domain (e.g., `oisdrive.com`)
3. Get your API key from the Mailgun dashboard

### 2. Configure Environment Variables

Create a `.env.local` file with your Mailgun configuration:

```env
# Mailgun Configuration
MAILGUN_API_KEY=key-your-mailgun-api-key-here
MAILGUN_DOMAIN=mg.oisdrive.com
MAILGUN_FROM_EMAIL=OISDRIVE <noreply@oisdrive.com>
MAILGUN_URL=https://api.mailgun.net

# Optional: For EU region
# MAILGUN_URL=https://api.eu.mailgun.net
```

### 3. Domain Setup

In your Mailgun dashboard:

1. **Add Domain**: Add your domain (e.g., `mg.oisdrive.com`)
2. **DNS Records**: Add the required DNS records to your domain:
   - TXT record for domain verification
   - CNAME record for tracking
   - MX record for receiving emails
3. **Verify Domain**: Wait for domain verification (can take up to 24 hours)

### 4. Test Configuration

The email service is already configured! It will:
- ✅ Use Mailgun when environment variables are set
- ✅ Fall back to console logging if not configured
- ✅ Handle errors gracefully

## Alternative Email Services

If you prefer other email services, here are the configurations:

### SendGrid
```env
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=contact@oisdrive.com
```

### Resend
```env
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=contact@oisdrive.com
```

### SMTP/Nodemailer
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=contact@oisdrive.com
```

## Email Templates

The system generates two emails:

1. **Admin Notification**: Sent to `contact@oisdrive.com`
   - Contains all form data
   - Highlights urgency level
   - Includes contact information

2. **User Confirmation**: Sent to the user's email
   - Confirms receipt of their request
   - Provides next steps
   - Includes emergency contact info

## Features

- ✅ Form validation with Zod
- ✅ Professional email templates
- ✅ Urgency level handling
- ✅ File attachment support (names only)
- ✅ Error handling and logging
- ✅ CORS support
- ✅ TypeScript support

## Testing

To test the contact form:

1. Fill out the form on `/contact`
2. Check the console for email logs
3. Verify the success message appears
4. Check your email service logs

## Production Considerations

For production deployment:

1. **Rate Limiting**: Add rate limiting to prevent spam
2. **Database Storage**: Store submissions in a database
3. **CRM Integration**: Connect to your CRM system
4. **Monitoring**: Set up email delivery monitoring
5. **Backup**: Implement backup email sending methods

## Security

- Form data is validated server-side
- No sensitive data is exposed in client-side code
- CORS is properly configured
- Input sanitization is handled by Zod validation

The contact form is now fully functional and ready for production use!
