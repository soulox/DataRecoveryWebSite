// OISDRIVE Website Types

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  serviceType: ServiceType
  urgency: UrgencyLevel
  description: string
  files?: File[]
}

export type ServiceType = 
  | 'data-recovery'
  | 'sensitive-data-processing'
  | 'large-scale-data-management'
  | 'emergency-recovery'
  | 'consultation'

export type UrgencyLevel = 
  | 'low'
  | 'medium'
  | 'high'
  | 'emergency'

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
  price?: string
  duration?: string
}

export interface CaseStudy {
  id: string
  title: string
  industry: string
  problem: string
  solution: string
  result: string
  dataVolume: string
  recoveryRate: string
  timeframe: string
  image?: string
  testimonial?: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  expertise: string[]
  experience: string
  image?: string
  certifications?: string[]
}

export interface CompanyInfo {
  name: string
  description: string
  address: string
  phone: string
  email: string
  website: string
  founded: number
  experience: number
  certifications: string[]
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
}
