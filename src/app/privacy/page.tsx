import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Eye, Database, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - OISDRIVE | Protection des Données',
  description: 'Politique de confidentialité d&apos;OISDRIVE. Découvrez comment nous protégeons vos données personnelles et respectons le RGPD.',
  keywords: ['politique confidentialité', 'RGPD', 'protection données', 'OISDRIVE', 'données personnelles'],
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Shield className="h-4 w-4 mr-2" />
              Protection des Données
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              OISDRIVE s&apos;engage à protéger votre vie privée et vos données personnelles. 
              Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
            </p>
            <div className="text-sm text-muted-foreground">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg">Sécurité Maximale</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Vos données sont protégées par des mesures de sécurité de niveau bancaire
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg">Transparence Totale</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nous vous informons clairement sur l&apos;utilisation de vos données
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg">Conformité RGPD</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Respect strict du Règlement Général sur la Protection des Données
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* 1. Responsable du traitement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-6 w-6 text-primary" />
                  <span>1. Responsable du Traitement</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  OISDRIVE, société française spécialisée dans la récupération de données, 
                  est responsable du traitement de vos données personnelles.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Adresse :</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      3 rue Dieudonné Costes, Suite 4<br />
                      31700 Blagnac, France
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Email :</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      contact@oisdrive.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Données collectées */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-6 w-6 text-primary" />
                  <span>2. Données Personnelles Collectées</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Nous collectons uniquement les données personnelles nécessaires à la 
                  fourniture de nos services de récupération de données.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Données d&apos;identification :</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li>Nom et prénom</li>
                      <li>Adresse email</li>
                      <li>Numéro de téléphone</li>
                      <li>Adresse postale (si nécessaire pour la livraison)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Données techniques :</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li>Type de support de stockage</li>
                      <li>Description du problème</li>
                      <li>Historique des communications</li>
                      <li>Données de navigation (cookies techniques)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Finalités du traitement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-6 w-6 text-primary" />
                  <span>3. Finalités du Traitement</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Vos données personnelles sont traitées pour les finalités suivantes :
                </p>
                
                <div className="space-y-3">
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Fourniture de services</h4>
                    <p className="text-sm text-muted-foreground">
                      Traitement de vos demandes de récupération de données, 
                      établissement de devis, suivi des interventions.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Communication</h4>
                    <p className="text-sm text-muted-foreground">
                      Réponse à vos questions, informations sur nos services, 
                      notifications importantes concernant votre dossier.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Obligations légales</h4>
                    <p className="text-sm text-muted-foreground">
                      Respect des obligations comptables, fiscales et réglementaires 
                      applicables à notre activité.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Amélioration des services</h4>
                    <p className="text-sm text-muted-foreground">
                      Analyse anonymisée des données pour améliorer la qualité 
                      de nos services (avec votre consentement).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. Base légale */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-6 w-6 text-primary" />
                  <span>4. Base Légale du Traitement</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Le traitement de vos données personnelles est fondé sur :
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Exécution du contrat</h4>
                      <p className="text-sm text-muted-foreground">
                        Traitement nécessaire à l&apos;exécution du contrat de service 
                        de récupération de données.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Intérêt légitime</h4>
                      <p className="text-sm text-muted-foreground">
                        Amélioration de nos services et communication commerciale 
                        dans le respect de vos droits.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Obligation légale</h4>
                      <p className="text-sm text-muted-foreground">
                        Respect des obligations comptables, fiscales et 
                        réglementaires applicables.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5. Conservation des données */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-6 w-6 text-primary" />
                  <span>5. Durée de Conservation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Nous conservons vos données personnelles pendant les durées suivantes :
                </p>
                
                <div className="space-y-3">
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Données clients actifs</h4>
                    <p className="text-sm text-muted-foreground">
                      Pendant toute la durée de la relation contractuelle + 3 ans 
                      pour les obligations légales.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Données de prospection</h4>
                    <p className="text-sm text-muted-foreground">
                      3 ans à compter du dernier contact ou jusqu&apos;à votre demande 
                      de suppression.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Données techniques</h4>
                    <p className="text-sm text-muted-foreground">
                      Données de récupération conservées 5 ans maximum, 
                      puis destruction sécurisée.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 6. Partage des données */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-6 w-6 text-primary" />
                  <span>6. Partage et Communication des Données</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Vos données personnelles ne sont jamais vendues à des tiers. 
                  Elles peuvent être partagées uniquement dans les cas suivants :
                </p>
                
                <div className="space-y-3">
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Prestataires de services</h4>
                    <p className="text-sm text-muted-foreground">
                      Sous-traitants liés par des accords de confidentialité stricts 
                      (hébergement, maintenance, transport).
                    </p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Autorités compétentes</h4>
                    <p className="text-sm text-muted-foreground">
                      En cas d&apos;obligation légale ou de demande des autorités 
                      judiciaires ou administratives.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Avec votre consentement</h4>
                    <p className="text-sm text-muted-foreground">
                      Partage avec des partenaires uniquement avec votre 
                      consentement explicite.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 7. Sécurité */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span>7. Sécurité des Données</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles 
                  appropriées pour protéger vos données :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Mesures techniques :</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li>Chiffrement des données (AES-256)</li>
                      <li>Accès sécurisé et authentification</li>
                      <li>Sauvegarde régulière et sécurisée</li>
                      <li>Surveillance continue des systèmes</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Mesures organisationnelles :</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li>Formation du personnel à la sécurité</li>
                      <li>Accès restreint aux données</li>
                      <li>Audits de sécurité réguliers</li>
                      <li>Certification ISO 27001</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 8. Vos droits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-6 w-6 text-primary" />
                  <span>8. Vos Droits</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-background border rounded-lg">
                      <h4 className="font-semibold text-sm">Droit d&apos;accès</h4>
                      <p className="text-xs text-muted-foreground">
                        Obtenir une copie de vos données personnelles
                      </p>
                    </div>
                    
                    <div className="p-3 bg-background border rounded-lg">
                      <h4 className="font-semibold text-sm">Droit de rectification</h4>
                      <p className="text-xs text-muted-foreground">
                        Corriger des données inexactes ou incomplètes
                      </p>
                    </div>
                    
                    <div className="p-3 bg-background border rounded-lg">
                      <h4 className="font-semibold text-sm">Droit d&apos;effacement</h4>
                      <p className="text-xs text-muted-foreground">
                        Demander la suppression de vos données
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-background border rounded-lg">
                      <h4 className="font-semibold text-sm">Droit à la limitation</h4>
                      <p className="text-xs text-muted-foreground">
                        Limiter le traitement de vos données
                      </p>
                    </div>
                    
                    <div className="p-3 bg-background border rounded-lg">
                      <h4 className="font-semibold text-sm">Droit à la portabilité</h4>
                      <p className="text-xs text-muted-foreground">
                        Récupérer vos données dans un format structuré
                      </p>
                    </div>
                    
                    <div className="p-3 bg-background border rounded-lg">
                      <h4 className="font-semibold text-sm">Droit d&apos;opposition</h4>
                      <p className="text-xs text-muted-foreground">
                        Vous opposer au traitement de vos données
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm">
                    <strong>Pour exercer vos droits :</strong> Contactez-nous à 
                    <a href="mailto:privacy@oisdrive.com" className="text-primary hover:underline ml-1">
                      privacy@oisdrive.com
                    </a> ou par courrier à notre adresse. Nous vous répondrons dans un délai d&apos;un mois.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 9. Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-6 w-6 text-primary" />
                  <span>9. Cookies et Technologies Similaires</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation :
                </p>
                
                <div className="space-y-3">
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Cookies techniques (obligatoires)</h4>
                    <p className="text-sm text-muted-foreground">
                      Nécessaires au fonctionnement du site (session, sécurité, préférences).
                    </p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Cookies analytiques (optionnels)</h4>
                    <p className="text-sm text-muted-foreground">
                      Google Analytics pour analyser l&apos;utilisation du site (avec votre consentement).
                    </p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h4 className="font-semibold mb-2">Cookies de marketing (optionnels)</h4>
                    <p className="text-sm text-muted-foreground">
                      Publicité ciblée et réseaux sociaux (avec votre consentement).
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Vous pouvez gérer vos préférences de cookies via notre bannière de consentement 
                  qui apparaît lors de votre première visite, ou en cliquant sur &quot;Gestion des Cookies&quot; 
                  dans le pied de page. Vous pouvez également modifier vos préférences à tout moment 
                  via les paramètres de votre navigateur.
                </p>
                
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">Gestion de vos Préférences</h4>
                  <p className="text-sm text-muted-foreground">
                    Notre bannière de consentement vous permet de choisir précisément quels types 
                    de cookies vous souhaitez accepter. Vous pouvez modifier vos préférences à tout 
                    moment en cliquant sur le lien &quot;Gestion des Cookies&quot; présent dans le pied de page 
                    de notre site.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 10. Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-6 w-6 text-primary" />
                  <span>10. Contact et Réclamations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Pour toute question concernant cette politique de confidentialité ou 
                  pour exercer vos droits :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Contact OISDRIVE</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>privacy@oisdrive.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>+33 7 88 85 72 97</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>3 rue Dieudonné Costes, 31700 Blagnac</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Autorité de contrôle</h4>
                    <p className="text-sm text-muted-foreground">
                      Vous pouvez également adresser une réclamation à la CNIL :
                    </p>
                    <div className="text-sm">
                      <div>CNIL - Commission Nationale de l&apos;Informatique et des Libertés</div>
                      <div>3 Place de Fontenoy - TSA 80715</div>
                      <div>75334 PARIS CEDEX 07</div>
                      <div>Site web : <a href="https://www.cnil.fr" className="text-primary hover:underline">www.cnil.fr</a></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 11. Modifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span>11. Modifications de la Politique</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cette politique de confidentialité peut être modifiée pour refléter les évolutions 
                  de nos pratiques ou de la réglementation. Toute modification substantielle vous 
                  sera notifiée par email ou via notre site web. Nous vous encourageons à consulter 
                  régulièrement cette page pour rester informé de nos pratiques de protection des données.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Questions sur la Protection de Vos Données ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions 
              concernant la protection de vos données personnelles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Nous Contacter
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="mailto:privacy@oisdrive.com">
                  Email Privacy
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
