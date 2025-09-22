# OISDRIVE Website

Site web professionnel pour OISDRIVE, laboratoire français expert en récupération de données depuis 18 ans.

## 🚀 Aperçu

OISDRIVE assure la récupération des données, le traitement des données sensibles et la gestion des données volumineuses. Ce site web présente nos services, notre expertise et permet aux clients de nous contacter facilement.

## 🛠️ Technologies Utilisées

- **Framework**: Next.js 14+ avec App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Fonctionnalités

### Pages Principales
- **Accueil**: Présentation de l'entreprise avec sections hero, services, à propos, cas d'études
- **Services**: Détail de tous les services de récupération de données
- **À Propos**: Histoire de l'entreprise, équipe, valeurs
- **Cas d'Études**: Témoignages et exemples de succès
- **Contact**: Formulaire de contact complet avec upload de fichiers

### Fonctionnalités Techniques
- Design responsive (mobile-first)
- SEO optimisé avec métadonnées complètes
- Accessibilité WCAG 2.1 AA
- Performance optimisée (Core Web Vitals)
- Formulaire de contact avec validation
- Navigation avec menu déroulant
- Service d'urgence mis en avant

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd OISDRIVE

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### Scripts Disponibles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint
```

## 📁 Structure du Projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── (routes)/          # Groupes de routes
│   ├── about/             # Page À Propos
│   ├── case-studies/      # Page Cas d'Études
│   ├── contact/           # Page Contact
│   ├── services/          # Pages Services
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout racine
│   ├── page.tsx           # Page d'accueil
│   ├── robots.ts          # Configuration robots.txt
│   └── sitemap.ts         # Sitemap XML
├── components/            # Composants réutilisables
│   ├── ui/               # Composants shadcn/ui
│   ├── forms/            # Composants de formulaires
│   ├── layout/           # Composants de layout
│   └── sections/         # Sections de pages
├── lib/                  # Utilitaires et constantes
├── types/                # Types TypeScript
└── hooks/                # Hooks React personnalisés
```

## 🎨 Design System

Le site utilise un design system cohérent basé sur :
- **Couleurs**: Palette primaire avec tons de bleu professionnel
- **Typographie**: Inter pour une lisibilité optimale
- **Espacement**: Système de spacing Tailwind CSS
- **Composants**: shadcn/ui pour la cohérence

## 📱 Responsive Design

Le site est entièrement responsive avec :
- **Mobile**: 375px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large**: 1280px+

## 🔍 SEO et Performance

### Optimisations SEO
- Métadonnées complètes sur toutes les pages
- Sitemap XML automatique
- Robots.txt configuré
- Structure sémantique HTML5
- Open Graph et Twitter Cards

### Performance
- Images optimisées avec Next.js Image
- Code splitting automatique
- Lazy loading des composants
- Optimisation des Core Web Vitals

## 🛡️ Sécurité

- Validation des formulaires côté client et serveur
- Protection CSRF
- Headers de sécurité
- Conformité RGPD

## 📞 Informations de Contact

**OISDRIVE**
- **Adresse**: 3 rue Dieudonné Costes, Suite 4, 31700 Blagnac, France
- **Téléphone**: +33 7 88 85 72 97
- **Urgences**: +33 7 88 85 72 97
- **Email**: contact@oisdrive.com
- **Site**: https://oisdrive.com

## 📄 Licence

Ce projet est propriétaire d'OISDRIVE. Tous droits réservés.

## 🤝 Contribution

Pour toute contribution ou suggestion, veuillez contacter l'équipe de développement.

---

**Développé avec ❤️ pour OISDRIVE**