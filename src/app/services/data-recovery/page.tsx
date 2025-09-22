import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, Clock, Shield, HardDrive } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Récupération de Données - OISDRIVE | Disques Durs, SSD, RAID',
  description: 'Service de récupération de données professionnel : disques durs endommagés, SSD défaillants, RAID corrompus. Laboratoire français expert.',
  keywords: ['récupération données', 'disque dur', 'SSD', 'RAID', 'données supprimées', 'panne matérielle', 'OISDRIVE'],
}

export default function DataRecoveryPage() {
  const capabilities = [
    'Disques durs mécaniques (HDD)',
    'Disques SSD (Solid State Drive)',
    'Systèmes RAID (0, 1, 5, 6, 10)',
    'Données supprimées accidentellement',
    'Systèmes de fichiers corrompus',
    'Pannes de contrôleur',
    'Dégâts des eaux',
    'Chutes et chocs physiques',
    'Surchauffe et défaillances électriques',
    'Virus et malwares'
  ]

  const processSteps = [
    {
      title: 'Diagnostic Gratuit',
      description: 'Analyse complète de votre support pour identifier la cause de la panne et évaluer les possibilités de récupération.',
      duration: '1-2 heures'
    },
    {
      title: 'Devis Détaillé',
      description: 'Proposition de solution avec coût, délai et taux de réussite estimé. Aucun engagement de votre part.',
      duration: 'Sous 24h'
    },
    {
      title: 'Récupération en Laboratoire',
      description: 'Intervention de nos experts avec les outils les plus avancés dans notre laboratoire sécurisé.',
      duration: '2-7 jours'
    },
    {
      title: 'Livraison des Données',
      description: 'Remise de vos données sur un support neuf avec rapport détaillé de l&apos;intervention.',
      duration: 'Immédiat'
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
                <HardDrive className="h-4 w-4 mr-2" />
                Service Principal
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Récupération de Données Professionnelle
              </h1>
              <p className="text-xl text-muted-foreground">
                Récupération professionnelle de données perdues suite à une panne matérielle 
                ou logicielle. Notre laboratoire français dispose des équipements les plus 
                avancés pour maximiser vos chances de récupération.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Diagnostic Gratuit
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    Urgence
                  </Link>
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              {/* Service Image */}
              <div className="mb-6 w-full">
                <Image
                  src="/images/services/data-recovery.svg"
                  alt="Processus de récupération de données - OISDRIVE"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">Taux de réussite</div>
                  </div>
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">2-7j</div>
                    <div className="text-sm text-muted-foreground">Délai moyen</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">150€</div>
                    <div className="text-sm text-muted-foreground">À partir de</div>
                  </div>
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">7j/7</div>
                    <div className="text-sm text-muted-foreground">Disponibilité</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Nos Capacités de Récupération
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nous récupérons les données de tous types de supports de stockage, 
              dans toutes les situations de panne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((capability, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-background border rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
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
            {processSteps.map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                      {index + 1}
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

      {/* Emergency Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-destructive">
                <AlertTriangle className="h-6 w-6" />
                <span>Service d&apos;Urgence</span>
              </CardTitle>
              <CardDescription>
                Pour les situations critiques nécessitant une intervention immédiate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Situations d&apos;Urgence</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span>Données critiques pour l&apos;entreprise</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span>Délais contractuels serrés</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span>Données médicales ou légales</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span>Risque de dégradation rapide</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Nos Engagements</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Réponse sous 2 heures</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Équipe d&apos;experts mobilisée</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Intervention</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Suivi personnalisé</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <Button asChild size="lg" variant="destructive">
                  <Link href="/contact">
                    Urgence - Appel Immédiat
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
              Commencez Votre Récupération
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plus vous agissez rapidement, plus les chances de récupération sont élevées. 
              Contactez nos experts pour un diagnostic gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Diagnostic Gratuit
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
