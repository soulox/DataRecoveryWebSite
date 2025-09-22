'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Cookie, Settings, Check, X } from 'lucide-react'
import { 
  getConsentState, 
  saveConsentState, 
  shouldShowConsentBanner,
  type ConsentPreferences 
} from '@/lib/consent'

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    // Check if banner should be shown
    const shouldShow = shouldShowConsentBanner()
    setIsVisible(shouldShow)

    // Load current preferences if user has partially consented
    const currentState = getConsentState()
    if (currentState.preferences) {
      setPreferences(currentState.preferences)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    saveConsentState(allAccepted)
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    saveConsentState(onlyNecessary)
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    saveConsentState(preferences)
    setIsVisible(false)
    setShowPreferences(false)
  }

  const handlePreferenceChange = (key: keyof ConsentPreferences, value: boolean) => {
    if (key === 'necessary') return // Cannot change necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-lg">
          <CardContent className="p-6">
            {!showPreferences ? (
              // Main consent banner
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 mt-1">
                    <Cookie className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold">
                      Gestion des Cookies
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Nous utilisons des cookies pour améliorer votre expérience de navigation, 
                      analyser l'utilisation du site et personnaliser le contenu. 
                      Vous pouvez choisir quels cookies accepter.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      En continuant à naviguer sur ce site, vous acceptez notre{' '}
                      <a 
                        href="/privacy" 
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Politique de Confidentialité
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleAcceptAll}
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Accepter Tout
                  </Button>
                  
                  <Button 
                    onClick={handleRejectAll}
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Refuser Tout
                  </Button>
                  
                  <Button 
                    onClick={() => setShowPreferences(true)}
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Personnaliser
                  </Button>
                </div>
              </div>
            ) : (
              // Detailed preferences
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Préférences des Cookies
                  </h3>
                  <Button 
                    onClick={() => setShowPreferences(false)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Cookies Techniques</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Nécessaires au fonctionnement du site (session, sécurité, préférences de base)
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-4 bg-primary rounded-full flex items-center justify-end px-1">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">Obligatoire</span>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between space-x-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Cookies Analytiques</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Google Analytics pour analyser l'utilisation du site et améliorer nos services
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePreferenceChange('analytics', !preferences.analytics)}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          preferences.analytics ? 'bg-primary' : 'bg-muted'
                        }`}
                        aria-label={`${preferences.analytics ? 'Désactiver' : 'Activer'} les cookies analytiques`}
                        title={`${preferences.analytics ? 'Désactiver' : 'Activer'} les cookies analytiques`}
                      >
                        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                          preferences.analytics ? 'translate-x-4' : 'translate-x-1'
                        }`}></div>
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {preferences.analytics ? 'Activé' : 'Désactivé'}
                      </span>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between space-x-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Cookies Marketing</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Publicité ciblée et intégration avec les réseaux sociaux
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePreferenceChange('marketing', !preferences.marketing)}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          preferences.marketing ? 'bg-primary' : 'bg-muted'
                        }`}
                        aria-label={`${preferences.marketing ? 'Désactiver' : 'Activer'} les cookies marketing`}
                        title={`${preferences.marketing ? 'Désactiver' : 'Activer'} les cookies marketing`}
                      >
                        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                          preferences.marketing ? 'translate-x-4' : 'translate-x-1'
                        }`}></div>
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {preferences.marketing ? 'Activé' : 'Désactivé'}
                      </span>
                    </div>
                  </div>

                  {/* Preferences Cookies */}
                  <div className="flex items-start justify-between space-x-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Cookies de Préférences</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Mémorisation de vos choix et préférences d'affichage
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePreferenceChange('preferences', !preferences.preferences)}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          preferences.preferences ? 'bg-primary' : 'bg-muted'
                        }`}
                        aria-label={`${preferences.preferences ? 'Désactiver' : 'Activer'} les cookies de préférences`}
                        title={`${preferences.preferences ? 'Désactiver' : 'Activer'} les cookies de préférences`}
                      >
                        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                          preferences.preferences ? 'translate-x-4' : 'translate-x-1'
                        }`}></div>
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {preferences.preferences ? 'Activé' : 'Désactivé'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button 
                    onClick={handleSavePreferences}
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Sauvegarder les Préférences
                  </Button>
                  
                  <Button 
                    onClick={handleAcceptAll}
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    Accepter Tout
                  </Button>
                  
                  <Button 
                    onClick={handleRejectAll}
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    Refuser Tout
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
