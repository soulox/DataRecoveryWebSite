import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { COMPANY_INFO, TEAM_MEMBERS } from '@/lib/constants'
import { Award, Users, MapPin, Calendar } from 'lucide-react'

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                Laboratoire français depuis {COMPANY_INFO.founded}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">
                {COMPANY_INFO.experience} Ans d&apos;Expertise en Récupération de Données
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {COMPANY_INFO.description}
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
                  {COMPANY_INFO.experience} années d&apos;expérience
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

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Notre Mission</h3>
              <p className="text-muted-foreground">
                Chez OISDRIVE, nous comprenons que la perte de données peut avoir des conséquences 
                dramatiques pour votre entreprise. Notre mission est de vous offrir les solutions 
                les plus avancées et fiables pour récupérer vos données les plus précieuses, 
                en respectant les plus hauts standards de sécurité et de confidentialité.
              </p>
            </div>

            <Button asChild size="lg">
              <Link href="/about">
                Découvrir Notre Histoire
              </Link>
            </Button>
          </div>

          {/* Team Preview */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Notre Équipe d&apos;Experts</h3>
              <p className="text-muted-foreground">
                Des professionnels certifiés à votre service
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {TEAM_MEMBERS.slice(0, 2).map((member) => (
                <div key={member.id} className="p-6 bg-background rounded-lg border shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-primary font-medium">{member.position}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {member.experience} d&apos;expérience
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.slice(0, 2).map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline">
                <Link href="/about#team">
                  Voir Toute l&apos;Équipe
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
