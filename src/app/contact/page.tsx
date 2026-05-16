import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { LeadCaptureCTA } from '@/components/marketing/LeadCaptureCTA'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Contact — Get Your Fleet Assessment',
  description: 'Contact Big V\'s Best Routes for an enterprise fleet assessment and custom scoped value estimate. No pricing tiers — AI-scoped valuation only.',
  alternates: { canonical: 'https://bigvsbestroutes.com/contact' },
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <LeadCaptureCTA />
      </div>
      <Footer />
    </main>
  )
}
