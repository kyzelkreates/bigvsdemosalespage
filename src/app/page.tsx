import type { Metadata } from 'next'
import { Navbar }             from '@/components/layout/Navbar'
import { HeroSection }        from '@/components/marketing/HeroSection'
import { StatsBar }           from '@/components/marketing/StatsBar'
import { FeaturesGrid }       from '@/components/marketing/FeaturesGrid'
import { AboutSnippet }       from '@/components/marketing/AboutSnippet'
import { CostOfOutdatedNav }  from '@/components/marketing/CostOfOutdatedNav'
import { UseCasesSection }    from '@/components/marketing/UseCasesSection'
import { DemoPreview }        from '@/components/marketing/DemoPreview'
import { LeadCaptureCTA }     from '@/components/marketing/LeadCaptureCTA'
import { Footer }             from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: "AI Fleet Navigation & Legal Compliance Platform",
  description: "Big V's Best Routes — the only fleet navigation platform built with driver safety and legal compliance as the primary architectural foundation. 5 years. 16,000+ hours. No shortcuts.",
  alternates: { canonical: 'https://bigvsbestroutes.com' },
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesGrid />
      <AboutSnippet />
      <CostOfOutdatedNav />
      <UseCasesSection />
      <DemoPreview />
      <LeadCaptureCTA />
      <Footer />
    </main>
  )
}
