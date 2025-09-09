import React from 'react'
import Link from 'next/link'
import { COMPANY_INFO, NAVIGATION_ITEMS } from '@/lib/constants'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-lg font-bold">O</span>
              </div>
              <span className="text-xl font-bold">{COMPANY_INFO.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {COMPANY_INFO.description}
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Ouvert 24h/24 pour les urgences</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/data-recovery"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Récupération de Données
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sensitive-data"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Données Sensibles
                </Link>
              </li>
              <li>
                <Link
                  href="/services/large-scale"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Données Volumineuses
                </Link>
              </li>
              <li>
                <Link
                  href="/services/emergency"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Urgences 24h/24
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Entreprise</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cas d'Études
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <div>{COMPANY_INFO.address}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <div>Standard: {COMPANY_INFO.phone}</div>
                  <div>Urgences: {COMPANY_INFO.emergencyPhone}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} {COMPANY_INFO.name}. Tous droits réservés.
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link
                href="/legal"
                className="hover:text-foreground transition-colors"
              >
                Mentions Légales
              </Link>
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Politique de Confidentialité
              </Link>
              <Link
                href="/cookies"
                className="hover:text-foreground transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
