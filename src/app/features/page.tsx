import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { FeaturesGrid } from '@/components/marketing/FeaturesGrid'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Features — AI Route Optimisation & Fleet Intelligence',
  description: 'Complete feature list: AI route optimisation, real-time fleet tracking, intelligent dispatch, driver management, analytics, SMS alerts, and PWA mobile app.',
  alternates: { canonical: 'https://bigvsbestroutes.com/features' },
}

export default function FeaturesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <div className="container-section py-16 text-center">
          <h1 className="text-5xl font-black mb-4 tracking-tight">
            <span className="text-brand-text">Platform</span>{' '}
            <span className="gradient-text">Features</span>
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Every feature built specifically for fleet operators and logistics teams who need
            production-grade intelligence, not a dashboard toy.
          </p>
        </div>
        <FeaturesGrid />
      </div>
      <Footer />
    </main>
  )
}
