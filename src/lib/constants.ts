// OISDRIVE Website Constants

export const COMPANY_INFO = {
  name: 'OISDRIVE',
  fullName: 'OISDRIVE - Expert en Récupération de Données',
  description: 'OISDRIVE assure la récupération des données, le traitement des données sensibles et la gestion des données volumineuses. Laboratoire français reconnu pour son expertise, OISDRIVE vous apporte des solutions fiables pour restaurer vos données en cas de panne ou de sinistre.',
  address: '3 rue Dieudonné Costes, Suite 4, 31700 Blagnac, France',
  phone: '+33 7 88 85 72 97',
  emergencyPhone: '+33 7 88 85 72 97',
  email: 'contact@oisdrive.com',
  website: 'https://oisdrive.com',
  founded: 2006,
  experience: 18,
  certifications: [
    'ISO 27001',
    'Certification CNIL',
    'Agrément Sécurité',
    'Certification Laboratoire'
  ]
} as const

export const SERVICES = [
  {
    id: 'data-recovery',
    title: 'Récupération de Données',
    description: 'Récupération professionnelle de données perdues suite à une panne matérielle ou logicielle.',
    features: [
      'Disques durs endommagés',
      'SSD défaillants',
      'RAID corrompus',
      'Données supprimées',
      'Systèmes cryptés'
    ],
    icon: '💾',
    price: 'À partir de 150€',
    duration: '2-7 jours'
  },
  {
    id: 'sensitive-data-processing',
    title: 'Traitement des Données Sensibles',
    description: 'Gestion sécurisée et confidentielle de données sensibles avec garanties de sécurité maximales.',
    features: [
      'Données médicales',
      'Informations financières',
      'Données personnelles',
      'Secrets industriels',
      'Conformité RGPD'
    ],
    icon: '🔒',
    price: 'Sur devis',
    duration: '1-5 jours'
  },
  {
    id: 'large-scale-data-management',
    title: 'Gestion des Données Volumineuses',
    description: 'Solutions pour la gestion et la récupération de grandes quantités de données d\'entreprise.',
    features: [
      'Serveurs d\'entreprise',
      'Bases de données volumineuses',
      'Archives numériques',
      'Systèmes distribués',
      'Migration de données'
    ],
    icon: '🏢',
    price: 'Sur devis',
    duration: '3-14 jours'
  },
  {
    id: 'emergency-recovery',
    title: 'Récupération d\'Urgence',
    description: 'Service d\'urgence pour les situations critiques nécessitant une intervention immédiate.',
    features: [
      'Intervention',
      'Délai de réponse &lt; 2h',
      'Équipe d\'experts mobilisée',
      'Solutions temporaires',
      'Suivi personnalisé'
    ],
    icon: '🚨',
    price: 'À partir de 300€',
    duration: '2-24h'
  }
] as const

export const NAVIGATION_ITEMS = [
  {
    label: 'Accueil',
    href: '/'
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Récupération de Données', href: '/services/data-recovery' },
      { label: 'Données Sensibles', href: '/services/sensitive-data-processing' },
      { label: 'Données Volumineuses', href: '/services/large-scale-data-management' },
      { label: 'Urgences', href: '/services/emergency-recovery' }
    ]
  },
  {
    label: 'À Propos',
    href: '/about'
  },
  {
    label: 'Cas d\'Études',
    href: '/case-studies'
  },
  {
    label: 'Contact',
    href: '/contact'
  },
  {
    label: 'Confidentialité',
    href: '/privacy'
  }
] as const

export const CASE_STUDIES = [
  {
    id: 'medical-center',
    title: 'Centre Médical - Récupération de Dossiers Patients',
    industry: 'Santé',
    problem: 'Panne du serveur principal contenant 15 ans de dossiers patients suite à une défaillance électrique.',
    solution: 'Intervention d\'urgence avec récupération complète des données médicales en respectant la confidentialité.',
    result: '100% des dossiers patients récupérés avec intégrité totale des données sensibles.',
    dataVolume: '2.5 To',
    recoveryRate: '100%',
    timeframe: '3 jours',
    testimonial: 'OISDRIVE a sauvé 15 ans de dossiers patients. Leur expertise et leur respect de la confidentialité sont remarquables.'
  },
  {
    id: 'manufacturing-company',
    title: 'Entreprise Industrielle - Sauvegarde de Plans Techniques',
    industry: 'Industrie',
    problem: 'Corruption du système RAID contenant tous les plans techniques et la documentation de production.',
    solution: 'Récupération spécialisée des données techniques avec reconstruction du système RAID.',
    result: 'Récupération complète de 8 ans de documentation technique et plans de production.',
    dataVolume: '1.8 To',
    recoveryRate: '98%',
    timeframe: '5 jours',
    testimonial: 'Grâce à OISDRIVE, nous avons pu reprendre la production sans perdre nos plans techniques.'
  },
  {
    id: 'law-firm',
    title: 'Cabinet d\'Avocats - Archives Juridiques',
    industry: 'Droit',
    problem: 'Perte d\'accès aux archives numériques contenant 20 ans de dossiers juridiques.',
    solution: 'Récupération sécurisée des archives avec respect du secret professionnel.',
    result: 'Accès restauré à l\'ensemble des archives avec intégrité des données juridiques.',
    dataVolume: '3.2 To',
    recoveryRate: '100%',
    timeframe: '4 jours',
    testimonial: 'OISDRIVE a respecté parfaitement la confidentialité de nos dossiers clients.'
  }
] as const

export const TEAM_MEMBERS = [
  {
    id: 'jean-martin',
    name: 'Jean Martin',
    position: 'Directeur Technique',
    expertise: ['Récupération RAID', 'Systèmes d\'entreprise', 'Données sensibles'],
    experience: '15 ans',
    certifications: ['Certification RAID', 'ISO 27001']
  },
  {
    id: 'marie-dubois',
    name: 'Marie Dubois',
    position: 'Ingénieure en Récupération',
    expertise: ['Disques durs', 'SSD', 'Données supprimées'],
    experience: '12 ans',
    certifications: ['Certification Hardware', 'Sécurité des données']
  },
  {
    id: 'pierre-bernard',
    name: 'Pierre Bernard',
    position: 'Spécialiste Données Sensibles',
    expertise: ['Conformité RGPD', 'Données médicales', 'Cryptographie'],
    experience: '10 ans',
    certifications: ['RGPD', 'Certification Sécurité']
  }
] as const

export const SEO_DEFAULT = {
  title: 'OISDRIVE - Expert en Récupération de Données | Laboratoire Français',
  description: 'OISDRIVE, laboratoire français expert en récupération de données depuis 18 ans. Solutions fiables pour restaurer vos données en cas de panne ou sinistre. Intervention disponible.',
  keywords: [
    'récupération données',
    'laboratoire français',
    'expert données',
    'OISDRIVE',
    'récupération disque dur',
    'données sensibles',
    'urgence données',
    'Blagnac',
    'Toulouse'
  ]
} as const
