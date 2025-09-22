import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CookieConsentBanner } from "@/components/gdpr/CookieConsentBanner";
import { AnalyticsProvider } from "@/components/gdpr/AnalyticsProvider";
import { COMPANY_INFO, SEO_DEFAULT } from "@/lib/constants";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: SEO_DEFAULT.title,
  description: SEO_DEFAULT.description,
  keywords: [...SEO_DEFAULT.keywords],
  authors: [{ name: COMPANY_INFO.name }],
  creator: COMPANY_INFO.name,
  publisher: COMPANY_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(COMPANY_INFO.website),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO_DEFAULT.title,
    description: SEO_DEFAULT.description,
    url: COMPANY_INFO.website,
    siteName: COMPANY_INFO.name,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULT.title,
    description: SEO_DEFAULT.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AnalyticsProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsentBanner />
          </div>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
