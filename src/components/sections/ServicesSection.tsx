import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SERVICES } from '@/lib/constants'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Nos Services de Récupération
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des solutions complètes pour tous vos besoins de récupération de données, 
            du simple disque dur aux systèmes d'entreprise les plus complexes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
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

        {/* Emergency Service Highlight */}
        <div className="mt-16 p-8 bg-destructive/5 border border-destructive/20 rounded-lg">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-destructive">
              🚨 Service d'Urgence 24h/24
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              En cas de perte de données critique, notre équipe d'experts est disponible 
              24h/24 pour une intervention immédiate. Délai de réponse garanti : moins de 2 heures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="destructive">
                <Link href="/services/emergency">
                  Urgence - Appel Immédiat
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">
                  Demander un Devis
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
