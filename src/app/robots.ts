import { MetadataRoute } from 'next'
import { COMPANY_INFO } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: `${COMPANY_INFO.website}/sitemap.xml`,
  }
}
