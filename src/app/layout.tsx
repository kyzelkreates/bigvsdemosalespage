// ══════════════════════════════════════════════════════════════
// ROOT LAYOUT — SEO + PWA + ANALYTICS
// ══════════════════════════════════════════════════════════════

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bigvsbestroutes.com'),

  title: {
    default:  "Big V's Best Routes | AI Route Optimisation & Fleet Management System",
    template: "%s | Big V's Best Routes",
  },
  description:
    "Enterprise AI-powered route optimisation software and fleet management system. Real-time delivery tracking, intelligent dispatch, and logistics control for transport operations.",

  keywords: [
    'AI route optimisation software',
    'fleet management system',
    'logistics control dashboard',
    'real-time delivery tracking system',
    'intelligent dispatch platform',
    'transport operations SaaS',
    'fleet intelligence software',
    'logistics AI platform',
    'route planning software',
    'fleet tracking system',
    'delivery optimisation',
    'transport management system',
  ],

  authors:   [{ name: "Big V's Best Routes" }],
  creator:   "Big V's Best Routes",
  publisher: "Big V's Best Routes",

  openGraph: {
    type:        'website',
    locale:      'en_GB',
    url:         'https://bigvsbestroutes.com',
    siteName:    "Big V's Best Routes",
    title:       "Big V's Best Routes | AI Fleet Management & Route Optimisation",
    description: "Enterprise AI-powered logistics platform. Route optimisation, fleet intelligence, real-time dispatch. Purpose-built for serious transport operations.",
    images: [{
      url:    '/og-image.jpg',
      width:  1200,
      height: 630,
      alt:    "Big V's Best Routes — AI Logistics Intelligence Platform",
    }],
  },

  twitter: {
    card:        'summary_large_image',
    title:       "Big V's Best Routes | AI Route Optimisation",
    description: "Enterprise AI-powered logistics platform. Route optimisation, fleet intelligence, real-time dispatch.",
    images:      ['/og-image.jpg'],
    creator:     '@BigVsBestRoutes',
  },

  robots: {
    index:                 true,
    follow:                true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },

  alternates: {
    canonical: 'https://bigvsbestroutes.com',
  },
}

export const viewport: Viewport = {
  themeColor:        '#00D4FF',
  width:             'device-width',
  initialScale:      1,
  maximumScale:      5,
  userScalable:      true,
  colorScheme:       'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* PWA */}
        <link rel="manifest"    href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable"          content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title"            content="BVR Routes" />
        <meta name="mobile-web-app-capable"                content="yes" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context':           'https://schema.org',
              '@type':              ['SoftwareApplication', 'WebApplication'],
              name:                 "Big V's Best Routes",
              description:          "Enterprise AI-powered route optimisation and fleet management platform for logistics and transport operations.",
              url:                  'https://bigvsbestroutes.com',
              applicationCategory: 'BusinessApplication',
              operatingSystem:     'Web, iOS, Android (PWA)',
              offers: {
                '@type':    'Offer',
                priceCurrency: 'GBP',
                description:   'Custom enterprise valuation — contact for scoped deployment quote.',
              },
              featureList: [
                'AI route optimisation',
                'Real-time fleet tracking',
                'Intelligent dispatch system',
                'Driver performance analytics',
                'Delivery timeline management',
                'Fleet health monitoring',
                'PWA mobile driver app',
              ],
              applicationSubCategory: 'LogisticsApplication',
              audience: {
                '@type':       'BusinessAudience',
                audienceType:  'Fleet Operators, Logistics Companies, Transport Businesses',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-brand-asphalt text-brand-text min-h-screen">
        {children}
      </body>
    </html>
  )
}
