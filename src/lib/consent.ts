/**
 * GDPR Cookie Consent Management
 * Handles user consent for different types of cookies and tracking
 */

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface ConsentState {
  hasConsented: boolean;
  consentDate: string | null;
  preferences: ConsentPreferences;
}

const CONSENT_STORAGE_KEY = 'oisdrive-consent';
const CONSENT_VERSION = '1.0';

// Default consent preferences
const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true, // Always true - required for site functionality
  analytics: false,
  marketing: false,
  preferences: false,
};

/**
 * Get current consent state from localStorage
 */
export function getConsentState(): ConsentState {
  if (typeof window === 'undefined') {
    return {
      hasConsented: false,
      consentDate: null,
      preferences: DEFAULT_PREFERENCES,
    };
  }

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) {
      return {
        hasConsented: false,
        consentDate: null,
        preferences: DEFAULT_PREFERENCES,
      };
    }

    const parsed = JSON.parse(stored);
    
    // Check if consent version is current
    if (parsed.version !== CONSENT_VERSION) {
      return {
        hasConsented: false,
        consentDate: null,
        preferences: DEFAULT_PREFERENCES,
      };
    }

    return {
      hasConsented: parsed.hasConsented || false,
      consentDate: parsed.consentDate || null,
      preferences: {
        necessary: true, // Always true
        analytics: parsed.preferences?.analytics || false,
        marketing: parsed.preferences?.marketing || false,
        preferences: parsed.preferences?.preferences || false,
      },
    };
  } catch (error) {
    console.error('Error reading consent state:', error);
    return {
      hasConsented: false,
      consentDate: null,
      preferences: DEFAULT_PREFERENCES,
    };
  }
}

/**
 * Save consent state to localStorage
 */
export function saveConsentState(preferences: ConsentPreferences): void {
  if (typeof window === 'undefined') return;

  try {
    const consentState: ConsentState = {
      hasConsented: true,
      consentDate: new Date().toISOString(),
      preferences: {
        ...preferences,
        necessary: true, // Always true
      },
    };

    const dataToStore = {
      ...consentState,
      version: CONSENT_VERSION,
    };

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(dataToStore));
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('consent-updated', { 
      detail: consentState 
    }));
  } catch (error) {
    console.error('Error saving consent state:', error);
  }
}

/**
 * Clear consent state (for testing or user request)
 */
export function clearConsentState(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('consent-cleared'));
  } catch (error) {
    console.error('Error clearing consent state:', error);
  }
}

/**
 * Check if user has given consent for a specific cookie type
 */
export function hasConsentFor(cookieType: keyof ConsentPreferences): boolean {
  const state = getConsentState();
  return state.hasConsented && state.preferences[cookieType];
}

/**
 * Get consent banner visibility state
 */
export function shouldShowConsentBanner(): boolean {
  const state = getConsentState();
  return !state.hasConsented;
}

/**
 * Cookie type descriptions for UI
 */
export const COOKIE_DESCRIPTIONS = {
  necessary: {
    title: 'Cookies Techniques (Obligatoires)',
    description: 'Ces cookies sont nécessaires au fonctionnement du site web. Ils ne peuvent pas être désactivés.',
    examples: ['Session utilisateur', 'Sécurité', 'Préférences de base'],
  },
  analytics: {
    title: 'Cookies Analytiques (Optionnels)',
    description: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web.',
    examples: ['Google Analytics', 'Statistiques de visite', 'Pages les plus consultées'],
  },
  marketing: {
    title: 'Cookies Marketing (Optionnels)',
    description: 'Ces cookies sont utilisés pour afficher des publicités pertinentes et mesurer leur efficacité.',
    examples: ['Publicité ciblée', 'Réseaux sociaux', 'Campagnes marketing'],
  },
  preferences: {
    title: 'Cookies de Préférences (Optionnels)',
    description: 'Ces cookies permettent au site de se souvenir de vos choix et préférences.',
    examples: ['Langue préférée', 'Thème sombre/clair', 'Paramètres d\'affichage'],
  },
} as const;
