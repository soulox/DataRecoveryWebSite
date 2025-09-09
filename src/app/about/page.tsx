import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { COMPANY_INFO, TEAM_MEMBERS } from '@/lib/constants'
import { Award, Users, MapPin, Calendar, Shield, Clock, Database, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À Propos - OISDRIVE | Laboratoire Français Expert en Récupération de Données',
  description: 'Découvrez OISDRIVE, laboratoire français expert en récupération de données depuis 18 ans. Notre équipe d\'ingénieurs et notre expertise.',
  keywords: ['à propos', 'OISDRIVE', 'laboratoire français', 'équipe', 'expertise', 'récupération données', 'Blagnac'],
}

export default function AboutPage() {
  const milestones = [
    {
      year: '2006',
      title: 'Fondation d\'OISDRIVE',
      description: 'Création du laboratoire de récupération de données à Blagnac'
    },
    {
      year: '2010',
      title: 'Certification ISO 27001',
      description: 'Obtention de la certification sécurité de l\'information'
    },
    {
      year: '2015',
      title: 'Expansion de l\'Équipe',
      description: 'Recrutement d\'ingénieurs spécialisés en données sensibles'
    },
    {
      year: '2020',
      title: 'Service d\'Urgence 24h/24',
      description: 'Mise en place du service d\'urgence pour situations critiques'
    },
    {
      year: '2024',
      title: 'Leader Français',
      description: 'Reconnaissance comme leader français en récupération de données'
    }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Confidentialité',
      description: 'Respect absolu de la confidentialité de vos données avec conformité RGPD'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Recherche constante de l\'excellence technique et du meilleur taux de réussite'
    },
    {
      icon: Users,
      title: 'Service Client',
      description: 'Accompagnement personnalisé et suivi détaillé de chaque intervention'
    },
    {
      icon: Clock,
      title: 'Réactivité',
      description: 'Intervention rapide avec service d\'urgence disponible 24h/24'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              À Propos d'OISDRIVE
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {COMPANY_INFO.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Nous Contacter
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/case-studies">
                  Nos Succès
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  {COMPANY_INFO.experience} Ans d'Expertise Française
                </h2>
                <p className="text-lg text-muted-foreground">
                  Depuis {COMPANY_INFO.founded}, OISDRIVE s'est imposé comme le leader français 
                  de la récupération de données. Notre laboratoire situé à Blagnac dispose 
                  des équipements les plus avancés et d'une équipe d'experts certifiés.
                </p>
              </div>

              {/* Key Facts */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Fondé en {COMPANY_INFO.founded}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {COMPANY_INFO.experience} années d'expérience
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Blagnac, France</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Laboratoire local
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Équipe Certifiée</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ingénieurs spécialisés
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Certifications</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ISO 27001, RGPD
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Laboratory Image */}
              <div className="mb-6 w-full">
                <Image
                  src="/images/about/laboratory.svg"
                  alt="Laboratoire OISDRIVE - Blagnac, France"
                  width={500}
                  height={350}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-background border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Taux de réussite</div>
                </div>
                <div className="p-6 bg-background border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                  <div className="text-sm text-muted-foreground">Clients satisfaits</div>
                </div>
                <div className="p-6 bg-background border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24h/24</div>
                  <div className="text-sm text-muted-foreground">Service d&apos;urgence</div>
                </div>
                <div className="p-6 bg-background border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">18</div>
                  <div className="text-sm text-muted-foreground">Années d'expérience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Notre Mission et Nos Valeurs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Chez OISDRIVE, nous comprenons que la perte de données peut avoir des conséquences 
              dramatiques. Notre mission est de vous offrir les solutions les plus avancées 
              et fiables pour récupérer vos données les plus précieuses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Notre Histoire
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez les étapes clés qui ont fait d'OISDRIVE le leader français 
              de la récupération de données.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Notre Équipe d'Experts
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des professionnels certifiés et expérimentés à votre service
            </p>
          </div>

          {/* Team Image */}
          <div className="mb-12 flex justify-center w-full">
            <Image
              src="/images/about/team.svg"
              alt="Équipe d'experts OISDRIVE"
              width={400}
              height={300}
              className="w-full max-w-md h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <Card key={member.id} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.position}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {member.experience} d'expérience
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Expertise</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {member.certifications && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Certifications</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Prêt à Faire Confiance à Nos Experts ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Contactez notre équipe d'experts pour une évaluation gratuite de vos besoins 
              en récupération de données.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Demander un Devis Gratuit
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">
                  Découvrir Nos Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
