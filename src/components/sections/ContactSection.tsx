import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { COMPANY_INFO } from '@/lib/constants'
import { Phone, Mail, MapPin, Clock, AlertTriangle } from 'lucide-react'

export const ContactSection: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Contactez Nos Experts
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Notre équipe d'experts est à votre disposition pour évaluer vos besoins 
            et vous proposer la solution la plus adaptée à votre situation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Informations de Contact</h3>
              
              {/* Emergency Contact */}
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Urgence 24h/24</span>
                  </CardTitle>
                  <CardDescription>
                    Pour les situations critiques nécessitant une intervention immédiate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={`tel:${COMPANY_INFO.emergencyPhone}`}
                    className="text-2xl font-bold text-destructive hover:underline"
                  >
                    {COMPANY_INFO.emergencyPhone}
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Délai de réponse garanti : moins de 2 heures
                  </p>
                </CardContent>
              </Card>

              {/* Standard Contact */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Téléphone</h4>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Du lundi au vendredi, 9h-18h
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Réponse sous 24h
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Adresse</h4>
                    <p className="text-lg text-muted-foreground">
                      {COMPANY_INFO.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Laboratoire de récupération de données
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Horaires</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>Lundi - Vendredi : 9h00 - 18h00</p>
                      <p>Urgences : 24h/24, 7j/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form CTA */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Demandez un Devis Gratuit</h3>
              <p className="text-muted-foreground">
                Remplissez notre formulaire de contact pour recevoir une évaluation 
                personnalisée de vos besoins en récupération de données.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Formulaire de Contact</CardTitle>
                <CardDescription>
                  Décrivez votre situation et nos experts vous contacteront rapidement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type de service</label>
                      <div className="text-sm text-muted-foreground">
                        Récupération de données, Urgence, Consultation
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Urgence</label>
                      <div className="text-sm text-muted-foreground">
                        Faible, Moyenne, Élevée, Critique
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <div className="text-sm text-muted-foreground">
                      Décrivez votre situation et vos besoins
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/contact">
                      Accéder au Formulaire Complet
                    </Link>
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Ou appelez directement :{' '}
                      <a
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="space-y-4">
              <h4 className="font-semibold">Pourquoi nous faire confiance ?</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Évaluation gratuite et sans engagement</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Confidentialité absolue garantie</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Devis personnalisé sous 24h</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Paiement uniquement en cas de succès</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
