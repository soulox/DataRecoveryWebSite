import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Server, Database, Cloud, HardDrive, Clock, Users, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestion des Données Volumineuses - OISDRIVE | Solutions Entreprise',
  description: 'Solutions complètes pour la gestion et récupération de grandes quantités de données d&apos;entreprise : serveurs, bases de données, archives numériques.',
  keywords: ['données volumineuses', 'serveurs entreprise', 'bases de données', 'archives numériques', 'migration données', 'OISDRIVE'],
}

export default function LargeScaleDataManagementPage() {
  const capabilities = [
    'Serveurs d&apos;entreprise (Windows, Linux, Unix)',
    'Bases de données volumineuses (SQL Server, Oracle, MySQL)',
    'Systèmes de stockage SAN/NAS',
    'Archives numériques et documentaires',
    'Systèmes distribués et clusters',
    'Virtualisation (VMware, Hyper-V)',
    'Cloud et hybrid cloud',
    'Systèmes de sauvegarde complexes',
    'Migration de données massives',
    'Optimisation de performance'
  ]

  const solutions = [
    {
      title: 'Récupération Serveurs',
      description: 'Récupération complète de serveurs d&apos;entreprise endommagés',
      features: [
        'Serveurs Windows Server',
        'Systèmes Linux/Unix',
        'Virtualisation VMware/Hyper-V',
        'Clusters haute disponibilité'
      ],
      icon: <Server className="h-8 w-8" />,
      price: 'Sur devis',
      timeframe: '3-7 jours'
    },
    {
      title: 'Bases de Données',
      description: 'Récupération et réparation de bases de données volumineuses',
      features: [
        'SQL Server, Oracle, MySQL',
        'PostgreSQL, MongoDB',
        'Bases de données corrompues',
        'Optimisation de performance'
      ],
      icon: <Database className="h-8 w-8" />,
      price: 'Sur devis',
      timeframe: '2-5 jours'
    },
    {
      title: 'Stockage Entreprise',
      description: 'Récupération de systèmes de stockage SAN/NAS',
      features: [
        'Systèmes SAN (Fibre Channel, iSCSI)',
        'NAS et systèmes de fichiers',
        'RAID d&apos;entreprise',
        'Systèmes de réplication'
      ],
      icon: <HardDrive className="h-8 w-8" />,
      price: 'Sur devis',
      timeframe: '3-10 jours'
    },
    {
      title: 'Migration Cloud',
      description: 'Migration sécurisée vers le cloud ou solutions hybrides',
      features: [
        'Migration vers Azure/AWS',
        'Solutions hybrides',
        'Optimisation des coûts',
        'Sécurité renforcée'
      ],
      icon: <Cloud className="h-8 w-8" />,
      price: 'Sur devis',
      timeframe: '5-14 jours'
    }
  ]

  const processSteps = [
    {
      title: 'Audit et Analyse',
      description: 'Évaluation complète de votre infrastructure et identification des besoins.',
      duration: '1-2 jours',
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: 'Planification',
      description: 'Développement d&apos;une stratégie personnalisée avec planning détaillé.',
      duration: '1 jour',
      icon: <Users className="h-6 w-6" />
    },
    {
      title: 'Exécution',
      description: 'Mise en œuvre de la solution avec suivi en temps réel.',
      duration: '3-14 jours',
      icon: <Server className="h-6 w-6" />
    },
    {
      title: 'Validation',
      description: 'Tests complets et validation de la récupération des données.',
      duration: '1-2 jours',
      icon: <CheckCircle className="h-6 w-6" />
    }
  ]

  const enterpriseFeatures = [
    {
      title: 'Expertise Technique',
      description: 'Équipe d&apos;ingénieurs spécialisés dans les infrastructures d&apos;entreprise',
      stats: '15+ ans d&apos;expérience'
    },
    {
      title: 'Équipements Avancés',
      description: 'Laboratoire équipé des dernières technologies de récupération',
      stats: '2M€ d&apos;équipements'
    },
    {
      title: 'Disponibilité',
      description: 'Support technique pour les infrastructures critiques',
      stats: '99.9% de disponibilité'
    },
    {
      title: 'Sécurité',
      description: 'Conformité aux standards de sécurité d&apos;entreprise',
      stats: 'ISO 27001 certifié'
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
                <Server className="h-4 w-4 mr-2" />
                Solution Entreprise
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Gestion des Données Volumineuses
              </h1>
              <p className="text-xl text-muted-foreground">
                Solutions complètes pour la récupération et la gestion de grandes quantités 
                de données d&apos;entreprise. Expertise reconnue dans les infrastructures complexes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Audit Gratuit
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    Urgence Entreprise
                  </Link>
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              {/* Service Image */}
              <div className="mb-6 w-full">
                <Image
                  src="/images/services/large-scale.svg"
                  alt="Gestion des données volumineuses - OISDRIVE"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">100+</div>
                    <div className="text-sm text-muted-foreground">To récupérés</div>
                  </div>
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Entreprises</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">99.9%</div>
                    <div className="text-sm text-muted-foreground">Disponibilité</div>
                  </div>
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="text-2xl font-bold text-primary">7j/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
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
              Nos Capacités Techniques
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nous gérons tous types d&apos;infrastructures d&apos;entreprise, 
              des serveurs aux systèmes de stockage les plus complexes.
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

      {/* Solutions Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Solutions Spécialisées
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des solutions adaptées à chaque type d&apos;infrastructure d&apos;entreprise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-primary">{solution.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{solution.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                        <span className="font-medium text-primary">{solution.price}</span>
                        <span>Délai: {solution.timeframe}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Technologies Supportées
                    </h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <Button asChild className="w-full group-hover:bg-primary/90">
                      <Link href="/contact">
                        Demander un Devis
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
              Notre Processus d&apos;Intervention
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un processus structuré pour garantir la réussite de votre projet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
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

      {/* Enterprise Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Pourquoi Choisir OISDRIVE pour l&apos;Entreprise ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Notre expertise et nos ressources en font le partenaire idéal 
              pour vos projets de données volumineuses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <div key={index} className="text-center space-y-4 p-6 bg-background rounded-lg border shadow-sm">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Server className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  <div className="text-sm font-medium text-primary">
                    {feature.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Nos Réussites en Entreprise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez comment nous avons aidé des entreprises à récupérer 
              leurs données les plus critiques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Centre Médical</CardTitle>
                <CardDescription>Récupération de 2.5 To de dossiers patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Taux de réussite:</span>
                    <span className="font-medium text-primary">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Délai:</span>
                    <span className="font-medium">3 jours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entreprise Industrielle</CardTitle>
                <CardDescription>Récupération de plans techniques critiques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Taux de réussite:</span>
                    <span className="font-medium text-primary">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Délai:</span>
                    <span className="font-medium">5 jours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cabinet d&apos;Avocats</CardTitle>
                <CardDescription>Récupération d&apos;archives juridiques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Taux de réussite:</span>
                    <span className="font-medium text-primary">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Délai:</span>
                    <span className="font-medium">4 jours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/case-studies">
                Voir Tous les Cas d&apos;Études
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Prêt à Récupérer Vos Données d&apos;Entreprise ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Contactez nos experts pour un audit gratuit de votre infrastructure. 
              Nous évaluons vos besoins et proposons la solution la plus adaptée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Audit Gratuit
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
