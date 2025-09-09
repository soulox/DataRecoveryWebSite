import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Shield, Lock, FileText, Users, AlertTriangle, Clock, Database } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Traitement des Données Sensibles - OISDRIVE | Conformité RGPD',
  description: 'Service spécialisé dans le traitement sécurisé des données sensibles : médicales, financières, personnelles. Conformité RGPD garantie par OISDRIVE.',
  keywords: ['données sensibles', 'RGPD', 'données médicales', 'confidentialité', 'sécurité données', 'OISDRIVE'],
}

export default function SensitiveDataProcessingPage() {
  const dataTypes = [
    'Données de santé (dossiers médicaux)',
    'Informations financières et bancaires',
    'Données personnelles identifiantes',
    'Secrets industriels et commerciaux',
    'Données de géolocalisation',
    'Biométrie et données génétiques',
    'Données de communication privée',
    'Informations sur les mineurs',
    'Données de vulnérabilité sociale',
    'Données de sécurité nationale'
  ]

  const complianceFeatures = [
    {
      title: 'Conformité RGPD',
      description: 'Respect strict du Règlement Général sur la Protection des Données',
      features: [
        'Consentement explicite documenté',
        'Droit à l\'oubli respecté',
        'Minimisation des données',
        'Transparence totale'
      ]
    },
    {
      title: 'Certifications Sécurité',
      description: 'Certifications et agréments pour la gestion de données sensibles',
      features: [
        'ISO 27001 - Sécurité de l\'information',
        'Agrément CNIL',
        'Certification HDS (Hébergeur de Données de Santé)',
        'Audit de sécurité régulier'
      ]
    },
    {
      title: 'Chiffrement Avancé',
      description: 'Protection maximale des données par chiffrement de bout en bout',
      features: [
        'Chiffrement AES-256',
        'Clés de chiffrement sécurisées',
        'Transmission chiffrée',
        'Stockage sécurisé'
      ]
    },
    {
      title: 'Traçabilité Complète',
      description: 'Journalisation et audit trail pour toutes les opérations',
      features: [
        'Logs d\'accès détaillés',
        'Traçabilité des modifications',
        'Rapports d\'audit',
        'Archivage sécurisé'
      ]
    }
  ]

  const processSteps = [
    {
      title: 'Analyse de Sensibilité',
      description: 'Évaluation du niveau de sensibilité et classification des données selon la réglementation.',
      duration: '1-2 heures',
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: 'Mise en Conformité',
      description: 'Application des mesures de protection appropriées selon le type de données.',
      duration: '2-4 heures',
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: 'Traitement Sécurisé',
      description: 'Récupération et traitement dans un environnement ultra-sécurisé.',
      duration: '1-5 jours',
      icon: <Lock className="h-6 w-6" />
    },
    {
      title: 'Livraison Contrôlée',
      description: 'Remise sécurisée avec documentation complète de conformité.',
      duration: 'Immédiat',
      icon: <Database className="h-6 w-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Shield className="h-4 w-4 mr-2" />
                Service Spécialisé
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Traitement des Données Sensibles
              </h1>
              <p className="text-xl text-muted-foreground">
                Service spécialisé dans la récupération et le traitement sécurisé de données sensibles 
                avec garanties de conformité RGPD et certifications de sécurité maximales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Consultation Gratuite
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    Urgence Sensible
                  </Link>
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              {/* Service Image */}
              <div className="mb-6 w-full">
                <Image
                  src="/images/services/sensitive-data.svg"
                  alt="Traitement sécurisé des données sensibles - OISDRIVE"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Conformité RGPD</div>
                  </div>
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">ISO 27001</div>
                    <div className="text-sm text-muted-foreground">Certifié</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">AES-256</div>
                    <div className="text-sm text-muted-foreground">Chiffrement</div>
                  </div>
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">24h/24</div>
                    <div className="text-sm text-muted-foreground">Surveillance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Types de Données Sensibles Traitées
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nous traitons tous types de données sensibles avec les plus hauts standards 
              de sécurité et de conformité réglementaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataTypes.map((dataType, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-background border rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">{dataType}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Garanties de Conformité et Sécurité
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nos certifications et processus garantissent la protection maximale 
              de vos données sensibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {complianceFeatures.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span>{feature.title}</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Processus de Traitement Sécurisé
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un processus rigoureux en 4 étapes pour garantir la sécurité et la conformité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {step.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{step.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Alert Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-destructive">
                <AlertTriangle className="h-6 w-6" />
                <span>Protection Maximale des Données Sensibles</span>
              </CardTitle>
              <CardDescription>
                Pour les données les plus sensibles nécessitant une protection absolue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Mesures de Protection</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-primary" />
                      <span>Chiffrement de bout en bout</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Accès restreint et contrôlé</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Audit de sécurité continu</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>Documentation de conformité</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Nos Engagements</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Confidentialité absolue</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Conformité réglementaire</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Traçabilité complète</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Destruction sécurisée</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <Button asChild size="lg" variant="destructive">
                  <Link href="/contact">
                    Consultation Sécurisée
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Protégez Vos Données Sensibles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Faites confiance à notre expertise pour le traitement sécurisé de vos données 
              les plus sensibles. Conformité RGPD garantie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Consultation Gratuite
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">
                  Autres Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
