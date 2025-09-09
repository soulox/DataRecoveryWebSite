import React from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { TrustSection } from '@/components/sections/TrustSection'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <AboutSection />
      <CaseStudiesSection />
      <ContactSection />
    </div>
  )
}