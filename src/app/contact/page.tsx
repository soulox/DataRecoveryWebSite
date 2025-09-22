import React from 'react'
import { ContactForm } from '@/components/forms/ContactForm'
import { COMPANY_INFO } from '@/lib/constants'
import { Phone, Mail, MapPin, Clock, AlertTriangle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - OISDRIVE | Expert en Récupération de Données',
  description: 'Contactez OISDRIVE pour une évaluation gratuite de vos besoins en récupération de données. Service d&apos;urgence disponible.',
  keywords: ['contact', 'récupération données', 'urgence', 'devis gratuit', 'OISDRIVE'],
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Contactez Nos Experts
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Notre équipe d&apos;experts est à votre disposition pour évaluer vos besoins 
              et vous proposer la solution la plus adaptée à votre situation.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-destructive/10 border-b border-destructive/20 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <div className="text-center">
              <span className="font-semibold text-destructive">URGENCE : </span>
              <a
                href={`tel:${COMPANY_INFO.emergencyPhone}`}
                className="text-xl font-bold text-destructive hover:underline"
              >
                {COMPANY_INFO.emergencyPhone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Demandez un Devis Gratuit</h2>
                  <p className="text-muted-foreground">
                    Remplissez le formulaire ci-dessous pour recevoir une évaluation 
                    personnalisée de vos besoins en récupération de données.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Standard Contact */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Informations de Contact</h3>
                
                <div className="space-y-4">
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
                        <p>Urgences</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">Pourquoi nous faire confiance ?</h4>
                <div className="space-y-3">
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

              {/* Emergency Contact */}
              <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-lg">
                <h4 className="font-semibold text-destructive mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Urgence
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Pour les situations critiques nécessitant une intervention immédiate
                </p>
                <a
                  href={`tel:${COMPANY_INFO.emergencyPhone}`}
                  className="text-xl font-bold text-destructive hover:underline"
                >
                  {COMPANY_INFO.emergencyPhone}
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Délai de réponse garanti : moins de 2 heures
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
