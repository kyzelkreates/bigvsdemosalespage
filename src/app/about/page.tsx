import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AboutStory } from '@/components/marketing/AboutStory'

export const metadata: Metadata = {
  title: "Our Story — 5 Years Building the Future of Fleet Safety",
  description: "Big V's Best Routes wasn't built overnight. Discover the 5-year journey, thousands of development hours, and relentless commitment to creating the most legally compliant, safety-first fleet navigation platform ever built.",
  alternates: { canonical: 'https://bigvsbestroutes.com/about' },
}

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutStory />
      <Footer />
    </main>
  )
}
