import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { UseCasesSection } from '@/components/marketing/UseCasesSection'
import { LeadCaptureCTA } from '@/components/marketing/LeadCaptureCTA'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Use Cases — Logistics, Fleet Management, Delivery & Transport',
  description: 'Big V\'s Best Routes supports logistics companies, delivery fleets, emergency services, passenger transport, industrial field ops, and retail fulfilment.',
  alternates: { canonical: 'https://bigvsbestroutes.com/use-cases' },
}

export default function UseCasesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <div className="container-section py-16 text-center">
          <h1 className="text-5xl font-black mb-4 tracking-tight">
            <span className="text-brand-text">Industry</span>{' '}
            <span className="gradient-text-amber">Use Cases</span>
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Whether you run a courier fleet or a national logistics network,
            the platform adapts to your operational complexity.
          </p>
        </div>
        <UseCasesSection />
        <LeadCaptureCTA />
      </div>
      <Footer />
    </main>
  )
}
