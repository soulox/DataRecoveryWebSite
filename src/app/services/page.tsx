import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SERVICES, COMPANY_INFO } from '@/lib/constants'
import { CheckCircle, ArrowRight, Clock, Shield, Users, Award } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - OISDRIVE | Récupération de Données Professionnelle',
  description: 'Découvrez nos services de récupération de données : disques durs, SSD, RAID, données sensibles. Laboratoire français expert depuis 18 ans.',
  keywords: ['services', 'récupération données', 'disque dur', 'SSD', 'RAID', 'données sensibles', 'OISDRIVE'],
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Nos Services de Récupération
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des solutions complètes pour tous vos besoins de récupération de données, 
              du simple disque dur aux systèmes d&apos;entreprise les plus complexes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Demander un Devis Gratuit
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Urgence
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES.map((service) => (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-5xl">{service.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                        {service.price && (
                          <span className="font-medium text-primary">{service.price}</span>
                        )}
                        {service.duration && (
                          <span>Délai: {service.duration}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Nos Capacités
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <Button asChild className="w-full group-hover:bg-primary/90">
                      <Link href={`/services/${service.id}`}>
                        En Savoir Plus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Pourquoi Choisir OISDRIVE ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Notre expertise et notre engagement en font le partenaire de confiance 
              pour la récupération de vos données les plus précieuses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Sécurité Garantie</h3>
                <p className="text-sm text-muted-foreground">
                  Conformité RGPD et certifications ISO 27001
                </p>
              </div>
            </div>

            <div className="text-center space-y-4 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Expertise Reconnue</h3>
                <p className="text-sm text-muted-foreground">
                  {COMPANY_INFO.experience} ans d&apos;expérience en récupération de données
                </p>
              </div>
            </div>

            <div className="text-center space-y-4 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Équipe Certifiée</h3>
                <p className="text-sm text-muted-foreground">
                  Ingénieurs et techniciens spécialisés
                </p>
              </div>
            </div>

            <div className="text-center space-y-4 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Disponibilité</h3>
                <p className="text-sm text-muted-foreground">
                  Service d&apos;urgence pour situations critiques
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Notre Processus de Récupération
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un processus éprouvé en 4 étapes pour maximiser vos chances de récupération
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Diagnostic Gratuit',
                description: 'Analyse complète de votre support de stockage pour évaluer les dommages et les possibilités de récupération.'
              },
              {
                step: '02',
                title: 'Devis Personnalisé',
                description: 'Proposition de solution adaptée avec devis détaillé, délais et taux de réussite estimé.'
              },
              {
                step: '03',
                title: 'Récupération',
                description: 'Intervention de nos experts avec les outils les plus avancés dans notre laboratoire sécurisé.'
              },
              {
                step: '04',
                title: 'Livraison',
                description: 'Remise de vos données récupérées sur un support neuf avec rapport détaillé de l&apos;intervention.'
              }
            ].map((process, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    {process.step}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {process.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Prêt à Récupérer Vos Données ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Contactez nos experts pour une évaluation gratuite de votre situation. 
              Plus vous agissez rapidement, plus les chances de récupération sont élevées.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Demander un Devis Gratuit
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/case-studies">
                  Voir Nos Succès
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
