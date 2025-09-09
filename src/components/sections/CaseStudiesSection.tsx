import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CASE_STUDIES } from '@/lib/constants'
import { ArrowRight, CheckCircle, Clock, Database } from 'lucide-react'

export const CaseStudiesSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Cas d'Études et Succès
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment nous avons aidé nos clients à récupérer leurs données 
            les plus critiques dans des situations complexes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((caseStudy) => (
            <Card key={caseStudy.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {caseStudy.industry}
                  </div>
                  <CardTitle className="text-lg leading-tight">
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
                    <p className="text-sm italic text-muted-foreground">
                      "{caseStudy.testimonial}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Votre Projet de Récupération de Données
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chaque situation est unique. Contactez-nous pour une évaluation gratuite 
              de vos besoins en récupération de données.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/case-studies">
                Voir Tous les Cas d'Études
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Demander une Évaluation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
