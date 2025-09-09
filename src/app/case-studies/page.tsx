import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CASE_STUDIES } from '@/lib/constants'
import { CheckCircle, Clock, Database, ArrowRight, Quote } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cas d&apos;Études - OISDRIVE | Succès en Récupération de Données',
  description: 'Découvrez nos cas d&apos;études et succès en récupération de données : centres médicaux, entreprises industrielles, cabinets d&apos;avocats.',
  keywords: ['cas d&apos;études', 'succès', 'récupération données', 'témoignages', 'OISDRIVE', 'exemples'],
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Cas d&apos;Études et Succès
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez comment nous avons aidé nos clients à récupérer leurs données 
              les plus critiques dans des situations complexes. Chaque cas est unique 
              et témoigne de notre expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Votre Cas d&apos;Étude
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">
                  Nos Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((caseStudy) => (
              <Card key={caseStudy.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {caseStudy.industry}
                    </div>
                    <CardTitle className="text-xl leading-tight">
                      {caseStudy.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {caseStudy.problem}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Solution */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Solution
                    </h4>
                    <p className="text-sm">{caseStudy.solution}</p>
                  </div>

                  {/* Results */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Résultat
                    </h4>
                    <p className="text-sm font-medium text-primary">
                      {caseStudy.result}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center space-y-1">
                      <Database className="h-4 w-4 mx-auto text-muted-foreground" />
                      <div className="text-xs text-muted-foreground">Volume</div>
                      <div className="text-sm font-semibold">{caseStudy.dataVolume}</div>
                    </div>
                    <div className="text-center space-y-1">
                      <CheckCircle className="h-4 w-4 mx-auto text-primary" />
                      <div className="text-xs text-muted-foreground">Réussite</div>
                      <div className="text-sm font-semibold text-primary">{caseStudy.recoveryRate}</div>
                    </div>
                    <div className="text-center space-y-1">
                      <Clock className="h-4 w-4 mx-auto text-muted-foreground" />
                      <div className="text-xs text-muted-foreground">Délai</div>
                      <div className="text-sm font-semibold">{caseStudy.timeframe}</div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  {caseStudy.testimonial && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Quote className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <p className="text-sm italic text-muted-foreground">
                          {caseStudy.testimonial}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Nos Statistiques de Succès
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des chiffres qui témoignent de notre expertise et de notre engagement 
              envers nos clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 bg-background rounded-lg border shadow-sm">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-lg font-semibold">Taux de Réussite</div>
              <div className="text-sm text-muted-foreground">
                Moyenne sur tous nos projets de récupération
              </div>
            </div>

            <div className="text-center space-y-4 p-6 bg-background rounded-lg border shadow-sm">
              <div className="text-4xl font-bold text-primary">1000+</div>
              <div className="text-lg font-semibold">Clients Satisfaits</div>
              <div className="text-sm text-muted-foreground">
                Entreprises et particuliers depuis 2006
              </div>
            </div>

            <div className="text-center space-y-4 p-6 bg-background rounded-lg border shadow-sm">
              <div className="text-4xl font-bold text-primary">18</div>
              <div className="text-lg font-semibold">Années d&apos;Expérience</div>
              <div className="text-sm text-muted-foreground">
                Expertise accumulée depuis notre création
              </div>
            </div>

            <div className="text-center space-y-4 p-6 bg-background rounded-lg border shadow-sm">
              <div className="text-4xl font-bold text-primary">24h/24</div>
              <div className="text-lg font-semibold">Service d&apos;Urgence</div>
              <div className="text-sm text-muted-foreground">
                Disponibilité pour situations critiques
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Secteurs d&apos;Activité Servis
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Notre expertise s&apos;étend à tous les secteurs d&apos;activité, 
              avec une attention particulière aux données sensibles.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Santé', icon: '🏥' },
              { name: 'Finance', icon: '🏦' },
              { name: 'Industrie', icon: '🏭' },
              { name: 'Droit', icon: '⚖️' },
              { name: 'Éducation', icon: '🎓' },
              { name: 'Technologie', icon: '💻' }
            ].map((sector, index) => (
              <div key={index} className="text-center space-y-3 p-4 bg-background border rounded-lg">
                <div className="text-3xl">{sector.icon}</div>
                <div className="font-semibold">{sector.name}</div>
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
              Votre Projet de Récupération
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Chaque situation est unique. Contactez-nous pour une évaluation gratuite 
              de vos besoins en récupération de données et découvrez comment nous pouvons 
              vous aider à récupérer vos données les plus précieuses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Demander une Évaluation Gratuite
                  <ArrowRight className="ml-2 h-4 w-4" />
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
