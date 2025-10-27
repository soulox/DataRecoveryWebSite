/**
 * Google Analytics 4 Implementation with GDPR Consent
 * Only loads and tracks when user has given consent for analytics cookies
 */

import { hasConsentFor, ConsentPreferences } from './consent'

// Google Analytics configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// Check if we're in the browser
const isBrowser = typeof window !== 'undefined'

// Google Analytics script loading
let gaLoaded = false
let gaInitialized = false

/**
 * Load Google Analytics script
 */
function loadGoogleAnalytics(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isBrowser || gaLoaded) {
      resolve()
      return
    }

    // Check if script already exists
    if (document.querySelector(`script[src*="googletagmanager.com"]`)) {
      gaLoaded = true
      resolve()
      return
    }

    // Load the Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    
    script.onload = () => {
      gaLoaded = true
      resolve()
    }
    
    script.onerror = () => {
      console.error('Failed to load Google Analytics')
      reject(new Error('Failed to load Google Analytics'))
    }

    document.head.appendChild(script)
  })
}

/**
 * Initialize Google Analytics
 */
function initializeGoogleAnalytics(): void {
  if (!isBrowser || gaInitialized) return

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  
  // Make gtag available globally
  ;(window as { gtag: typeof gtag }).gtag = gtag

  // Configure Google Analytics
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    // Privacy-focused configuration
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_flags: 'SameSite=Strict;Secure',
    // Custom parameters for GDPR compliance
    custom_map: {
      'custom_parameter_1': 'consent_given'
    }
  })

  gaInitialized = true
}

/**
 * Initialize analytics if consent is given
 */
export async function initializeAnalytics(): Promise<void> {
  if (!isBrowser) return

  // Check if user has consented to analytics
  if (!hasConsentFor('analytics')) {
    console.log('Analytics disabled: No consent for analytics cookies')
    return
  }

  try {
    await loadGoogleAnalytics()
    initializeGoogleAnalytics()
    console.log('Google Analytics initialized with consent')
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error)
  }
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string): void {
  if (!isBrowser || !gaInitialized || !hasConsentFor('analytics')) return

  const gtag = (window as { gtag: (...args: unknown[]) => void }).gtag
  if (gtag) {
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: title || document.title,
      page_location: url,
    })
  }
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string, 
  parameters?: Record<string, unknown>
): void {
  if (!isBrowser || !gaInitialized || !hasConsentFor('analytics')) return

  const gtag = (window as { gtag: (...args: unknown[]) => void }).gtag
  if (gtag) {
    gtag('event', eventName, {
      ...parameters,
      consent_given: true,
    })
  }
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean = true): void {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  })
}

/**
 * Track contact form submission
 */
export function trackContactFormSubmission(serviceType: string, urgency: string): void {
  trackEvent('contact_form_submit', {
    service_type: serviceType,
    urgency: urgency,
    form_type: 'contact',
  })
}

/**
 * Track service page view
 */
export function trackServicePageView(serviceName: string): void {
  trackEvent('service_page_view', {
    service_name: serviceName,
    page_type: 'service',
  })
}

/**
 * Track emergency contact usage
 */
export function trackEmergencyContact(method: 'phone' | 'email' | 'form'): void {
  trackEvent('emergency_contact', {
    contact_method: method,
    urgency: 'high',
  })
}

/**
 * Track cookie consent
 */
export function trackCookieConsent(action: 'accept_all' | 'reject_all' | 'customize' | 'save_preferences'): void {
  trackEvent('cookie_consent', {
    consent_action: action,
  })
}

/**
 * Disable analytics (when user withdraws consent)
 */
export function disableAnalytics(): void {
  if (!isBrowser) return

  // Clear Google Analytics cookies
  const cookies = document.cookie.split(';')
  cookies.forEach(cookie => {
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
    
    // Remove GA cookies
    if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    }
  })

  // Reset analytics state
  gaInitialized = false
  console.log('Analytics disabled: Consent withdrawn')
}

// Listen for consent changes
if (isBrowser) {
  window.addEventListener('consent-updated', (event: Event) => {
    const customEvent = event as CustomEvent<{ preferences: ConsentPreferences }>
    const { preferences } = customEvent.detail
    
    if (preferences.analytics) {
      initializeAnalytics()
    } else {
      disableAnalytics()
    }
  })

  window.addEventListener('consent-cleared', () => {
    disableAnalytics()
  })
}

// Type declarations for gtag
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}
