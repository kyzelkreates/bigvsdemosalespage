import type { Metadata } from 'next'
import { Navbar }            from '@/components/layout/Navbar'
import { UseCasesSection }   from '@/components/marketing/UseCasesSection'
import { CostOfOutdatedNav } from '@/components/marketing/CostOfOutdatedNav'
import { LeadCaptureCTA }    from '@/components/marketing/LeadCaptureCTA'
import { Footer }            from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Industries & Use Cases — Fleet Compliance, Bridge Strikes, Driver Safety',
  description: "Understand the real cost of outdated satellite navigation — bridge strikes, restricted zone fines, driver hours violations, fuel waste — and how Big V's Best Routes eliminates every risk.",
  alternates: { canonical: 'https://bigvsbestroutes.com/use-cases' },
}

export default function UseCasesPage() {
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
            Industry Applications
          </div>
          <h1 className="text-5xl font-black mb-4 tracking-[-0.03em]">
            <span style={{ color: '#F0EDE8' }}>Who It's Built For.</span>
            <br />
            <span className="shimmer-gold" style={{ backgroundSize: '300% 100%' }}>Why It Matters.</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6A6A7A' }}>
            From a 5-vehicle courier fleet to a 500-vehicle national logistics network.
            And the very real financial risks your current GPS system is silently creating.
          </p>
        </div>

        <UseCasesSection />
        <CostOfOutdatedNav />
        <LeadCaptureCTA />
      </div>
      <Footer />
    </main>
  )
}
