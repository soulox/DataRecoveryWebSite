'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cookie, Settings, Check, X, RotateCcw } from 'lucide-react'
import { 
  getConsentState, 
  saveConsentState, 
  clearConsentState,
  type ConsentPreferences,
  COOKIE_DESCRIPTIONS 
} from '@/lib/consent'

interface CookiePreferencesProps {
  trigger?: React.ReactNode;
  className?: string;
}

export const CookiePreferences: React.FC<CookiePreferencesProps> = ({ 
  trigger,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })
  const [hasConsented, setHasConsented] = useState(false)

  useEffect(() => {
    const state = getConsentState()
    setPreferences(state.preferences)
    setHasConsented(state.hasConsented)
  }, [])

  const handlePreferenceChange = (key: keyof ConsentPreferences, value: boolean) => {
    if (key === 'necessary') return // Cannot change necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSavePreferences = () => {
    saveConsentState(preferences)
    setHasConsented(true)
    setIsOpen(false)
  }

  const handleAcceptAll = () => {
    const allAccepted: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    saveConsentState(allAccepted)
    setPreferences(allAccepted)
    setHasConsented(true)
    setIsOpen(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    saveConsentState(onlyNecessary)
    setPreferences(onlyNecessary)
    setHasConsented(true)
    setIsOpen(false)
  }

  const handleResetConsent = () => {
    clearConsentState()
    setHasConsented(false)
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    })
    setIsOpen(false)
  }

  const cookieTypes = [
    { key: 'necessary' as const, ...COOKIE_DESCRIPTIONS.necessary },
    { key: 'analytics' as const, ...COOKIE_DESCRIPTIONS.analytics },
    { key: 'marketing' as const, ...COOKIE_DESCRIPTIONS.marketing },
    { key: 'preferences' as const, ...COOKIE_DESCRIPTIONS.preferences },
  ]

  return (
    <>
      {/* Trigger Button */}
      {trigger ? (
        <div onClick={() => setIsOpen(true)} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="sm"
          className={className}
        >
          <Settings className="h-4 w-4 mr-2" />
          Gestion des Cookies
        </Button>
      )}

      {/* Modal/Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cookie className="h-5 w-5 text-primary" />
                  <CardTitle>Gestion des Cookies</CardTitle>
                </div>
                <Button 
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Gérez vos préférences de cookies pour personnaliser votre expérience sur notre site.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Current Status */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Statut actuel :</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    hasConsented 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {hasConsented ? 'Consentement donné' : 'En attente de consentement'}
                  </span>
                </div>
              </div>

              {/* Cookie Types */}
              <div className="space-y-4">
                {cookieTypes.map(({ key, title, description, examples }) => (
                  <div key={key} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {description}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Exemples :</span>{' '}
                          {examples.join(', ')}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {key === 'necessary' ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-4 bg-primary rounded-full flex items-center justify-end px-1">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <span className="text-xs text-muted-foreground">Obligatoire</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handlePreferenceChange(key, !preferences[key])}
                              className={`w-8 h-4 rounded-full transition-colors ${
                                preferences[key] ? 'bg-primary' : 'bg-muted'
                              }`}
                              aria-label={`${preferences[key] ? 'Désactiver' : 'Activer'} ${title.toLowerCase()}`}
                              title={`${preferences[key] ? 'Désactiver' : 'Activer'} ${title.toLowerCase()}`}
                            >
                              <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                                preferences[key] ? 'translate-x-4' : 'translate-x-1'
                              }`}></div>
                            </button>
                            <span className="text-xs text-muted-foreground">
                              {preferences[key] ? 'Activé' : 'Désactivé'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button 
                  onClick={handleSavePreferences}
                  size="sm"
                  className="flex-1 sm:flex-none"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Sauvegarder
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
                
                {hasConsented && (
                  <Button 
                    onClick={handleResetConsent}
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none text-destructive hover:text-destructive"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </Button>
                )}
              </div>

              {/* Privacy Policy Link */}
              <div className="text-center pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Pour plus d&apos;informations, consultez notre{' '}
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
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
