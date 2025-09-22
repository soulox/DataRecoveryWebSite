import React from 'react'
import { COMPANY_INFO } from '@/lib/constants'
import { Shield, Award, Users, Clock } from 'lucide-react'

export const TrustSection: React.FC = () => {
  const trustItems = [
    {
      icon: Shield,
      title: 'Sécurité Garantie',
      description: 'Conformité RGPD et certifications ISO 27001',
      highlight: 'Données protégées'
    },
    {
      icon: Award,
      title: 'Expertise Reconnue',
      description: `${COMPANY_INFO.experience} ans d'expérience en récupération de données`,
      highlight: 'Leader français'
    },
    {
      icon: Users,
      title: 'Équipe Certifiée',
      description: 'Ingénieurs et techniciens spécialisés',
      highlight: 'Professionnels qualifiés'
    },
    {
      icon: Clock,
      title: 'Disponibilité',
      description: 'Service d\'urgence pour situations critiques',
      highlight: 'Intervention immédiate'
    }
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Pourquoi Choisir OISDRIVE ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Notre expertise et notre engagement en font le partenaire de confiance 
            pour la récupération de vos données les plus précieuses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="text-center space-y-4 p-6 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {item.highlight}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Certifications */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8">
            Certifications et Agréments
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {COMPANY_INFO.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 bg-background border rounded-lg"
              >
                <Award className="h-5 w-5 text-primary" />
                <span className="font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
