import type { Metadata } from 'next'
import { Navbar }            from '@/components/layout/Navbar'
import { FeaturesGrid }      from '@/components/marketing/FeaturesGrid'
import { CostOfOutdatedNav } from '@/components/marketing/CostOfOutdatedNav'
import { LeadCaptureCTA }    from '@/components/marketing/LeadCaptureCTA'
import { Footer }            from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Platform Features — Compliance-First Fleet Navigation',
  description: "Every feature in Big V's Best Routes is built to eliminate the risks consumer GPS creates: bridge strikes, restricted zone violations, driver hours breaches, insurance liability.",
  alternates: { canonical: 'https://bigvsbestroutes.com/features' },
}

export default function FeaturesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">

        {/* Page header */}
        <div className="container-section py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.18)',
              color: '#D4AF37',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
            Platform Capabilities
          </div>
          <h1 className="text-5xl font-black mb-4 tracking-[-0.03em]">
            <span style={{ color: '#F0EDE8' }}>Enterprise-Grade</span>
            <br />
            <span className="shimmer-gold" style={{ backgroundSize: '300% 100%' }}>Fleet Intelligence</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6A6A7A' }}>
            Every feature purpose-built to eliminate the risks that outdated navigation creates — legally, financially, and operationally.
          </p>
        </div>

        <FeaturesGrid />
        <CostOfOutdatedNav />
        <LeadCaptureCTA />
      </div>
      <Footer />
    </main>
  )
}
