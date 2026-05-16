// ══════════════════════════════════════════════════════════════
// HOME PAGE — SEO LANDING PAGE
// ══════════════════════════════════════════════════════════════

import type { Metadata } from 'next'
import { Navbar }       from '@/components/layout/Navbar'
import { HeroSection }  from '@/components/marketing/HeroSection'
import { StatsBar }     from '@/components/marketing/StatsBar'
import { FeaturesGrid } from '@/components/marketing/FeaturesGrid'
import { UseCasesSection } from '@/components/marketing/UseCasesSection'
import { DemoPreview }  from '@/components/marketing/DemoPreview'
import { LeadCaptureCTA } from '@/components/marketing/LeadCaptureCTA'
import { Footer }       from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: "AI Route Optimisation & Fleet Management System",
  description: "Big V's Best Routes delivers enterprise AI-powered route optimisation, real-time fleet management, and intelligent dispatch. Built for serious logistics operations.",
  alternates: { canonical: 'https://bigvsbestroutes.com' },
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Social proof metrics */}
      <StatsBar />

      {/* Feature grid */}
      <FeaturesGrid />

      {/* Use Cases */}
      <UseCasesSection />

      {/* Live demo preview */}
      <DemoPreview />

      {/* Lead capture CTA */}
      <LeadCaptureCTA />

      <Footer />
    </main>
  )
}
