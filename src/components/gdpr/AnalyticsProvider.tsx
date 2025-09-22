'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initializeAnalytics, trackPageView } from '@/lib/analytics'

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize analytics on mount
    initializeAnalytics()
  }, [])

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      trackPageView(window.location.href, document.title)
    }
  }, [pathname])

  return <>{children}</>
}
