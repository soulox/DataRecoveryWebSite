import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { COMPANY_INFO } from '@/lib/constants'
import { Phone, Shield, Clock, Award } from 'lucide-react'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                Expert depuis {COMPANY_INFO.experience} ans
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Expert en{' '}
                <span className="text-primary">Récupération de Données</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {COMPANY_INFO.description}
              </p>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {COMPANY_INFO.experience}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Années d&apos;expérience
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">
                  Taux de réussite
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">24h/24</div>
                <div className="text-sm text-muted-foreground">
                  Service d&apos;urgence
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">
                  Clients satisfaits
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/contact">
                  Demander un Devis Gratuit
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/services">
                  Nos Services
                </Link>
              </Button>
            </div>

            {/* Emergency Contact */}
            <div className="flex items-center space-x-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <Phone className="h-6 w-6 text-destructive" />
              <div>
                <div className="font-semibold text-destructive">
                  Urgence 24h/24
                </div>
                <a
                  href={`tel:${COMPANY_INFO.emergencyPhone}`}
                  className="text-lg font-bold text-destructive hover:underline"
                >
                  {COMPANY_INFO.emergencyPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative">
            {/* Hero Image */}
            <div className="mb-8 w-full">
              <Image
                src="/images/hero/data-recovery-hero.svg"
                alt="Récupération de données - Laboratoire OISDRIVE"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
                priority
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Trust Indicators */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-background border rounded-lg shadow-sm">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold">Données Sécurisées</div>
                    <div className="text-sm text-muted-foreground">
                      Conformité RGPD
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-background border rounded-lg shadow-sm">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold">Intervention Rapide</div>
                    <div className="text-sm text-muted-foreground">
                      Réponse &lt; 2h
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-background border rounded-lg shadow-sm">
                  <Award className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold">Expertise Certifiée</div>
                    <div className="text-sm text-muted-foreground">
                      ISO 27001
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-background border rounded-lg shadow-sm">
                  <Phone className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold">Support Français</div>
                    <div className="text-sm text-muted-foreground">
                      Laboratoire local
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
