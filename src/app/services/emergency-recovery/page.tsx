import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, Clock, Phone, Shield, Zap, Users, Award } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Récupération d&apos;Urgence 24h/24 - OISDRIVE | Service d&apos;Urgence',
  description: 'Service d&apos;urgence 24h/24 pour la récupération de données critiques. Intervention immédiate, délai de réponse &lt; 2h. OISDRIVE, votre partenaire de confiance.',
  keywords: ['urgence données', 'récupération 24h', 'service d&apos;urgence', 'données critiques', 'intervention immédiate', 'OISDRIVE'],
}

export default function EmergencyRecoveryPage() {
  const emergencySituations = [
    'Données critiques pour l&apos;entreprise',
    'Délais contractuels serrés',
    'Données médicales ou légales',
    'Risque de dégradation rapide',
    'Systèmes de production arrêtés',
    'Données de sécurité nationale',
    'Informations financières critiques',
    'Archives irremplaçables',
    'Données de recherche scientifique',
    'Systèmes de surveillance'
  ]

  const emergencyServices = [
    {
      title: 'Intervention Immédiate',
      description: 'Équipe d&apos;experts mobilisée en moins de 2 heures',
      features: [
        'Réponse sous 2 heures',
        'Équipe d&apos;experts sur site',
        'Diagnostic immédiat',
        'Solutions temporaires'
      ],
      icon: <Zap className="h-8 w-8" />,
      timeframe: '&lt; 2h',
      price: 'À partir de 300€'
    },
    {
      title: 'Récupération Express',
      description: 'Récupération prioritaire avec délais accélérés',
      features: [
        'Traitement prioritaire',
        'Ressources dédiées',
        'Suivi en temps réel',
        'Livraison express'
      ],
      icon: <Clock className="h-8 w-8" />,
      timeframe: '2-24h',
      price: 'Sur devis'
    },
    {
      title: 'Support 24h/24',
      description: 'Disponibilité permanente pour situations critiques',
      features: [
        'Hotline dédiée',
        'Ingénieurs de garde',
        'Accès laboratoire 24h/24',
        'Coordination équipe'
      ],
      icon: <Phone className="h-8 w-8" />,
      timeframe: '24h/24',
      price: 'Inclus'
    },
    {
      title: 'Solutions Temporaires',
      description: 'Mise en place de solutions de contournement',
      features: [
        'Récupération partielle rapide',
        'Accès aux données critiques',
        'Continuity business',
        'Migration temporaire'
      ],
      icon: <Shield className="h-8 w-8" />,
      timeframe: 'Immédiat',
      price: 'Sur devis'
    }
  ]

  const processSteps = [
    {
      title: 'Appel d&apos;Urgence',
      description: 'Contact immédiat avec notre équipe d&apos;urgence 24h/24.',
      duration: 'Immédiat',
      icon: <Phone className="h-6 w-6" />
    },
    {
      title: 'Mobilisation',
      description: 'Déploiement de l&apos;équipe d&apos;experts et des ressources nécessaires.',
      duration: '&lt; 2h',
      icon: <Users className="h-6 w-6" />
    },
    {
      title: 'Intervention',
      description: 'Diagnostic et mise en œuvre des solutions de récupération.',
      duration: '2-24h',
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: 'Livraison',
      description: 'Remise des données récupérées avec rapport d&apos;urgence.',
      duration: 'Immédiat',
      icon: <CheckCircle className="h-6 w-6" />
    }
  ]

  const emergencyFeatures = [
    {
      title: 'Réponse Ultra-Rapide',
      description: 'Délai de réponse garanti sous 2 heures',
      stats: '&lt; 2h'
    },
    {
      title: 'Équipe d&apos;Experts',
      description: 'Ingénieurs spécialisés disponibles 24h/24',
      stats: '15+ experts'
    },
    {
      title: 'Laboratoire 24h/24',
      description: 'Accès permanent à nos équipements de pointe',
      stats: '24h/24'
    },
    {
      title: 'Taux de Réussite',
      description: 'Excellence dans la récupération d&apos;urgence',
      stats: '95%+'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-destructive/10 via-background to-destructive/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Service d&apos;Urgence
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Récupération d&apos;Urgence 24h/24
              </h1>
              <p className="text-xl text-muted-foreground">
                Service d&apos;urgence pour situations critiques nécessitant une intervention immédiate. 
                Notre équipe d&apos;experts est disponible 24h/24 pour sauver vos données les plus précieuses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="destructive">
                  <Link href="/contact">
                    <Phone className="h-4 w-4 mr-2" />
                    Urgence - Appel Immédiat
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="tel:+33788857297">
                    +33 7 88 85 72 97
                  </Link>
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              {/* Service Image */}
              <div className="mb-6 w-full">
                <Image
                  src="/images/services/emergency.svg"
                  alt="Service d&apos;urgence 24h/24 - OISDRIVE"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-4 bg-background border rounded-lg border-destructive/20">
                    <div className="text-2xl font-bold text-destructive">&lt; 2h</div>
                    <div className="text-sm text-muted-foreground">Délai de réponse</div>
                  </div>
                  <div className="p-4 bg-background border rounded-lg border-destructive/20">
                    <div className="text-2xl font-bold text-destructive">24h/24</div>
                    <div className="text-sm text-muted-foreground">Disponibilité</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-background border rounded-lg border-destructive/20">
                    <div className="text-2xl font-bold text-destructive">95%+</div>
                    <div className="text-sm text-muted-foreground">Taux de réussite</div>
                  </div>
                  <div className="p-4 bg-background border rounded-lg border-destructive/20">
                    <div className="text-2xl font-bold text-destructive">15+</div>
                    <div className="text-sm text-muted-foreground">Experts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Situations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Situations d&apos;Urgence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Notre service d&apos;urgence intervient dans les situations les plus critiques 
              nécessitant une action immédiate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencySituations.map((situation, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-background border rounded-lg border-destructive/20">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                <span className="text-sm">{situation}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Nos Services d&apos;Urgence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des solutions d&apos;urgence adaptées à chaque situation critique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {emergencyServices.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-destructive/20">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-destructive">{service.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                        <span className="font-medium text-destructive">{service.price}</span>
                        <span>Délai: {service.timeframe}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Inclus dans le Service
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <Button asChild className="w-full group-hover:bg-destructive/90" variant="destructive">
                      <Link href="/contact">
                        Demander Intervention
                      </Link>
                    </Button>
                  </div>
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
              Processus d&apos;Urgence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un processus optimisé pour une intervention rapide et efficace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="text-center h-full border-destructive/20">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
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

      {/* Emergency Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Pourquoi Choisir Notre Service d&apos;Urgence ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Notre expertise et nos ressources en font le service d&apos;urgence de référence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emergencyFeatures.map((feature, index) => (
              <div key={index} className="text-center space-y-4 p-6 bg-background rounded-lg border shadow-sm border-destructive/20">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                    <Zap className="h-8 w-8 text-destructive" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  <div className="text-sm font-medium text-destructive">
                    {feature.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-destructive text-2xl">
                <Phone className="h-8 w-8" />
                <span>Contact d&apos;Urgence 24h/24</span>
              </CardTitle>
              <CardDescription className="text-lg">
                En cas d&apos;urgence, contactez-nous immédiatement. Notre équipe est disponible 24h/24.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Numéros d&apos;Urgence</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-destructive" />
                        <div>
                          <div className="font-medium">Hotline Urgence</div>
                          <div className="text-lg font-bold text-destructive">+33 7 88 85 72 97</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-destructive" />
                        <div>
                          <div className="font-medium">Email Urgence</div>
                          <div className="text-lg font-bold text-destructive">urgence@oisdrive.com</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Informations à Fournir</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-destructive" />
                        <span>Nature de l&apos;urgence</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-destructive" />
                        <span>Type de support endommagé</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-destructive" />
                        <span>Volume de données</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-destructive" />
                        <span>Délai critique</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Nos Engagements</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Réponse garantie sous 2 heures</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Équipe d&apos;experts mobilisée</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Intervention 24h/24</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Suivi personnalisé</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {['ISO 27001', 'CNIL', 'HDS', 'Sécurité'].map((cert, index) => (
                        <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <div className="text-lg font-semibold">
                  En cas d&apos;urgence, n&apos;hésitez pas à nous appeler immédiatement
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="destructive">
                    <Link href="tel:+33788857297">
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler Maintenant
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">
                      Formulaire d&apos;Urgence
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-destructive/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ne Perdez Plus Jamais Vos Données
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              En cas d&apos;urgence, chaque minute compte. Notre service d&apos;urgence 24h/24 
              est là pour vous aider à récupérer vos données les plus critiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="destructive">
                <Link href="tel:+33788857297">
                  <Phone className="h-4 w-4 mr-2" />
                  Urgence - Appel Immédiat
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
