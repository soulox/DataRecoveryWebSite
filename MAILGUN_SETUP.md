# Mailgun Setup Guide for OISDRIVE

## Quick Setup

### 1. Create Mailgun Account
1. Go to [mailgun.com](https://www.mailgun.com)
2. Sign up for a free account (10,000 emails/month free)
3. Verify your email address

### 2. Add Your Domain
1. In Mailgun dashboard, go to "Domains"
2. Click "Add New Domain"
3. Enter your domain: `mg.oisdrive.com` (or `oisdrive.com`)
4. Choose region: US or EU

### 3. Configure DNS Records
Mailgun will provide DNS records to add to your domain:

**TXT Record (Domain Verification):**
```
Name: mg.oisdrive.com
Value: v=spf1 include:mailgun.org ~all
```

**CNAME Record (Tracking):**
```
Name: email.mg.oisdrive.com
Value: mailgun.org
```

**MX Record (Receiving):**
```
Name: mg.oisdrive.com
Value: mxa.mailgun.org (Priority: 10)
Value: mxb.mailgun.org (Priority: 10)
```

### 4. Get API Key
1. Go to "API Keys" in Mailgun dashboard
2. Copy your Private API key (starts with `key-`)

### 5. Environment Configuration
Create `.env.local` file:

```env
# Mailgun Configuration
MAILGUN_API_KEY=key-your-actual-api-key-here
MAILGUN_DOMAIN=mg.oisdrive.com
MAILGUN_FROM_EMAIL=OISDRIVE <noreply@oisdrive.com>
MAILGUN_URL=https://api.mailgun.net

# For EU region:
# MAILGUN_URL=https://api.eu.mailgun.net
```

### 6. Test the Setup
1. Start your development server: `npm run dev`
2. Go to `/contact` page
3. Fill out and submit the form
4. Check console for email logs
5. Check your email inbox

## Mailgun Features

✅ **Reliable Delivery**: 99.9% delivery rate
✅ **Professional Templates**: HTML and text emails
✅ **Tracking**: Open and click tracking
✅ **Analytics**: Detailed email statistics
✅ **EU Compliance**: GDPR compliant
✅ **Free Tier**: 10,000 emails/month free

## Troubleshooting

### Domain Not Verified
- Wait up to 24 hours for DNS propagation
- Check DNS records are correctly added
- Use `dig` command to verify DNS records

### API Key Issues
- Ensure API key starts with `key-`
- Check API key has correct permissions
- Verify domain is active in Mailgun

### Email Not Sending
- Check console logs for error messages
- Verify environment variables are set
- Test with Mailgun's API directly

## Production Considerations

1. **Domain Authentication**: Use your main domain for better deliverability
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Monitoring**: Set up email delivery monitoring
4. **Backup**: Consider backup email service
5. **Compliance**: Ensure GDPR compliance for EU users

## Support

- Mailgun Documentation: [documentation.mailgun.com](https://documentation.mailgun.com)
- Mailgun Support: Available in dashboard
- OISDRIVE Contact: contact@oisdrive.com
