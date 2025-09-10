import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure for Cloudflare Pages with Next.js runtime
  // Note: We need API routes for the contact form, so we can't use static export
  
  // Enable experimental features for Cloudflare
  experimental: {
    // Enable if needed for Cloudflare compatibility
  },
  
  // Configure for Cloudflare Pages deployment with Next.js runtime
  // Remove output: 'standalone' for Cloudflare Pages
  
  // Configure images for Cloudflare
  images: {
    // Use Cloudflare's image optimization
    domains: ['oisdrive.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Environment variables that should be available at build time
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://oisdrive.com',
    NEXT_PUBLIC_COMPANY_EMAIL: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'contact@oisdrive.com',
    NEXT_PUBLIC_EMERGENCY_PHONE: process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '+33788857297',
  },
  
  // Configure headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
