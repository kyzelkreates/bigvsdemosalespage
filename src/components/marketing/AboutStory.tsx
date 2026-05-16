'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield, AlertTriangle, Clock, Users, Code2,
  CheckCircle2, Zap, ChevronRight, BookOpen, Scale
} from 'lucide-react'

const TIMELINE = [
  {
    year: '2019',
    phase: 'Year One — The Problem',
    title: 'A Near-Miss That Changed Everything',
    body: `It started with a single incident. A fleet driver, exhausted after an untracked 14-hour shift, took a route flagged by basic GPS but never cross-checked against legal driving-time regulations, vehicle weight restrictions, or road-type hazard classifications. The vehicle was fine. The driver was lucky. The outcome could have been catastrophic.\n\nBig V saw what nobody in the industry wanted to admit: every routing system on the market optimised for speed and cost. Not one was built around legal compliance and driver safety as its primary constraint. The gap was not a feature request. It was a fundamental architectural failure in how fleet navigation had always been designed.\n\nYear One was not code. It was research. 2,200+ hours of legal research across UK transport law, EU driving regulations, DVSA compliance frameworks, and road-type hazard taxonomies. Every regulation that could affect a vehicle in motion was catalogued, cross-referenced, and mapped into what would become the compliance engine at the core of the platform.`,
    hours: '2,200 hrs',
    milestone: 'Compliance research & legal framework mapping',
    icon: Scale,
    tier: 'gold',
  },
  {
    year: '2020',
    phase: 'Year Two — The Architecture',
    title: 'Building the Foundation Nobody Else Had',
    body: `With the legal framework mapped, the real engineering challenge began. Standard routing algorithms — the kind every competitor uses — cannot natively enforce legal constraints as first-class routing priorities. They treat compliance as a filter applied after route generation. That's fundamentally wrong.\n\nWe rebuilt the routing engine from the ground up with a compliance-first architecture. Legal constraints — driving hour limits, vehicle restriction zones, bridge weight ratings, road classification rules, hazmat routing requirements — are embedded into the cost function itself, not bolted on afterwards. A route that violates any regulation simply cannot be generated.\n\nThis year also saw the first version of our safety data layer: a structured, continuously updated database of road-level risk factors, time-of-day hazard windows, and regulatory zones. 3,800 engineering hours. Dozens of architectural rewrites. Three complete pivots on the data model before it was right.`,
    hours: '3,800 hrs',
    milestone: 'Compliance-first routing engine v1.0',
    icon: Code2,
    tier: 'silver',
  },
  {
    year: '2021',
    phase: 'Year Three — The Intelligence Layer',
    title: 'When the Platform Started Thinking for Itself',
    body: `Year Three introduced the AI layer — but not the kind of AI that generates impressive demos. This was applied machine learning built around one question: how do you predict the conditions that cause incidents before they happen?\n\nDriver fatigue modelling. Shift-pattern analysis. Route complexity scoring against driver experience profiles. Time-of-day risk weighting integrated into dispatch decisions. The system began learning which combinations of factors — vehicle type, route characteristics, driver history, time on shift, weather conditions — elevated incident probability, and it started routing around them automatically.\n\nThis was also the year the real-time fleet intelligence layer was built — the live dashboard system that gives dispatchers a complete operational picture without the noise. 4,400 hours. The hardest technical year of the project. The AI doesn't guess. It calculates.`,
    hours: '4,400 hrs',
    milestone: 'AI safety intelligence & predictive dispatch engine',
    icon: Zap,
    tier: 'gold',
  },
  {
    year: '2022',
    phase: 'Year Four — The Trials',
    title: 'Tested in the Real World, Not Just in a Lab',
    body: `No platform built for fleet safety is worth anything until it's been tested under real operational conditions. Year Four was entirely dedicated to controlled field trials with consenting fleet operators across multiple industry sectors — logistics, passenger transport, emergency services, and industrial operations.\n\nWhat the trials revealed was invaluable and humbling. Edge cases the architecture hadn't anticipated. Operational realities that laboratory testing never surfaces. Driver behaviour patterns that required new modelling approaches. Dispatcher workflow needs that forced significant UX redesign.\n\nEvery finding was fed back into the engine. 3,100 hours of refinement, iteration, and honest reckoning with what the platform still couldn't do. By the end of Year Four, we had something genuinely different: a system that operators could trust not just to route their fleet, but to keep their people safe and their operation legally protected.`,
    hours: '3,100 hrs',
    milestone: 'Field trials, compliance validation, operator feedback integration',
    icon: Users,
    tier: 'silver',
  },
  {
    year: '2023',
    phase: 'Year Five — Production',
    title: 'Five Years. One Platform. No Shortcuts.',
    body: `Year Five was the year of hardening. Security architecture. RBAC access control. Audit trail systems that satisfy regulatory inspection requirements. Penetration testing. Performance optimisation under real fleet load. The PWA driver app. The investor intelligence layer. The SMS alert system. The AI-scoped valuation engine.\n\nEvery piece of the platform — from the compliance engine to the live map to the admin dashboard — was built to enterprise production standards. Not MVP standards. Not startup-grade standards. The kind of standards that would satisfy a fleet operator, their insurance provider, and a transport regulator looking at the same screen.\n\nTotal development across five years: over 16,000 engineering hours. Every hour logged. Every architectural decision documented. The result is the only fleet navigation and management platform in existence where legal compliance and driver safety are not features — they are the foundation everything else is built on.`,
    hours: '2,500 hrs',
    milestone: 'Production hardening, security, PWA, full platform launch',
    icon: CheckCircle2,
    tier: 'gold',
  },
]

const TOTALS = [
  { value: '5',      label: 'Years in Development' },
  { value: '16,000+', label: 'Engineering Hours'   },
  { value: '100%',   label: 'Legal Compliance First'},
  { value: '0',      label: 'Shortcuts Taken'      },
]

const PILLARS = [
  {
    icon: Shield,
    title: 'Safety as Architecture',
    desc: 'Driver safety and legal compliance are not features added on top of the platform. They are the constraint the entire routing engine is built around. No other platform can say the same.',
  },
  {
    icon: Scale,
    title: 'Fully Legal by Design',
    desc: 'Every route generated by the platform is compliant with UK transport law, EU driving time regulations, DVSA standards, and road-classification restrictions — automatically, every time.',
  },
  {
    icon: AlertTriangle,
    title: 'Incident Prevention First',
    desc: 'The platform is built to stop incidents before they happen — not to report on them after. Predictive fatigue modelling, hazard scoring, and risk-weighted dispatch decisions are core to every routing calculation.',
  },
  {
    icon: BookOpen,
    title: 'Documented & Auditable',
    desc: 'Every route decision, dispatch action, and system event is logged with full audit trails. Fleet operators can satisfy regulatory inspection requirements with a single export.',
  },
]

export function AboutStory() {
  return (
    <main className="relative overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-20"
            style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.18), transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="container-section relative z-10 text-center">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <div className="badge-gold inline-flex mb-6">
              <Clock className="w-3 h-3" />
              5 Years · 16,000+ Hours
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] mb-6">
              <span style={{ color: '#F0EDE8' }}>Built to</span>
              <br />
              <span className="shimmer-gold" style={{ backgroundSize: '300% 100%' }}>Keep People Safe.</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-4" style={{ color: '#8A8A9A' }}>
              Big V's Best Routes is not a startup pivot. It is not a repurposed logistics tool. It is a platform built from a blank page, with one non-negotiable principle: driver safety and legal compliance are not optional. They are the architecture.
            </p>
            <p className="text-base max-w-2xl mx-auto" style={{ color: '#4A4A6A' }}>
              This is the story of how it was built — year by year, hour by hour.
            </p>
            <div className="gold-line max-w-sm mx-auto mt-10" />
          </motion.div>
        </div>
      </section>

      {/* ── TOTALS STRIP ─────────────────────────────────────── */}
      <section className="py-12 relative">
        <div className="absolute inset-0"
          style={{ background: 'rgba(12,12,18,0.8)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }} />
        <div className="container-section relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {TOTALS.map((t, i) => (
              <motion.div key={t.label}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}>
                <p className="text-4xl font-black mb-2 gradient-text-gold">{t.value}</p>
                <p className="text-xs tracking-widest uppercase" style={{ color: '#6A6A7A' }}>{t.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="container-section relative z-10">

          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-4">
              <span style={{ color: '#F0EDE8' }}>The Journey.</span>{' '}
              <span className="shimmer-silver" style={{ backgroundSize: '300% 100%' }}>Year by Year.</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#6A6A7A' }}>
              No part of this platform was rushed. Every year had a purpose. Every hour is accounted for.
            </p>
          </motion.div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Centre line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
              style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.05), rgba(212,175,55,0.3) 20%, rgba(212,175,55,0.3) 80%, rgba(212,175,55,0.05))' }} />

            <div className="space-y-16">
              {TIMELINE.map((item, i) => {
                const Icon = item.icon
                const isGold = item.tier === 'gold'
                const isRight = i % 2 === 0

                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity:0, x: isRight ? -30 : 30 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ duration:0.6, delay:0.1 }}
                    className={`relative flex items-start gap-8 md:gap-16 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                  >
                    {/* Year bubble — desktop centre */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 -translate-y-1 z-10">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm ml-[-22px] md:ml-0"
                        style={{
                          background: isGold
                            ? 'linear-gradient(135deg, #B8860B, #D4AF37, #F5D76E)'
                            : 'linear-gradient(135deg, #707070, #C0C0C0, #E8E8E8)',
                          color: '#050507',
                          boxShadow: isGold ? '0 0 20px rgba(212,175,55,0.4)' : '0 0 20px rgba(192,192,192,0.3)',
                        }}>
                        {item.year.slice(2)}
                      </div>
                    </div>

                    {/* Spacer for desktop layout */}
                    <div className="hidden md:block md:w-1/2 flex-shrink-0" />

                    {/* Card */}
                    <div className="ml-12 md:ml-0 md:w-1/2 flex-shrink-0">
                      <div
                        className="p-8 rounded-3xl relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(145deg, rgba(22,22,34,0.95), rgba(14,14,22,0.98))',
                          border: `1px solid ${isGold ? 'rgba(212,175,55,0.18)' : 'rgba(192,192,192,0.12)'}`,
                          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        }}
                      >
                        {/* Top corner accent */}
                        <div className="absolute top-0 left-0 w-16 h-px"
                          style={{ background: isGold ? 'linear-gradient(90deg, #D4AF37, transparent)' : 'linear-gradient(90deg, #C0C0C0, transparent)' }} />
                        <div className="absolute top-0 left-0 w-px h-16"
                          style={{ background: isGold ? 'linear-gradient(180deg, #D4AF37, transparent)' : 'linear-gradient(180deg, #C0C0C0, transparent)' }} />

                        {/* Header */}
                        <div className="flex items-start gap-4 mb-5">
                          <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: isGold ? 'rgba(212,175,55,0.1)' : 'rgba(192,192,192,0.08)',
                              border: `1px solid ${isGold ? 'rgba(212,175,55,0.2)' : 'rgba(192,192,192,0.15)'}`,
                            }}>
                            <Icon className="w-5 h-5" style={{ color: isGold ? '#D4AF37' : '#C0C0C0' }} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold tracking-widest uppercase mb-1"
                              style={{ color: isGold ? '#D4AF37' : '#C0C0C0' }}>
                              {item.phase}
                            </p>
                            <h3 className="text-xl font-black tracking-tight" style={{ color: '#F0EDE8' }}>
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        {/* Body */}
                        {item.body.split('\n\n').map((para, j) => (
                          <p key={j} className="text-sm leading-7 mb-4 last:mb-0" style={{ color: '#7A7A8A' }}>
                            {para}
                          </p>
                        ))}

                        {/* Footer metric */}
                        <div className="mt-6 pt-5 flex items-center justify-between"
                          style={{ borderTop: `1px solid ${isGold ? 'rgba(212,175,55,0.1)' : 'rgba(192,192,192,0.08)'}` }}>
                          <div>
                            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#4A4A6A' }}>Dev Hours</p>
                            <p className="text-2xl font-black" style={{ color: isGold ? '#D4AF37' : '#C0C0C0' }}>{item.hours}</p>
                          </div>
                          <div className="text-right max-w-xs">
                            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#4A4A6A' }}>Milestone</p>
                            <p className="text-xs font-medium" style={{ color: '#8A8A9A' }}>{item.milestone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ───────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,175,55,0.03), transparent 70%)' }} />
        <div className="container-section relative z-10">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-4">
              <span className="shimmer-gold" style={{ backgroundSize: '300% 100%' }}>What We Stand For</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6A6A7A' }}>
              Four non-negotiable principles that every line of code in this platform is written around.
            </p>
            <div className="gold-line max-w-xs mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <motion.div key={pillar.title}
                  initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.08 }}
                  className="p-8 rounded-3xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(22,22,34,0.9), rgba(14,14,22,0.95))',
                    border: '1px solid rgba(212,175,55,0.14)',
                  }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#D4AF37' }} />
                  </div>
                  <h3 className="text-xl font-black mb-3 tracking-tight" style={{ color: '#F0EDE8' }}>{pillar.title}</h3>
                  <p className="text-sm leading-7" style={{ color: '#6A6A7A' }}>{pillar.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="container-section relative z-10 text-center">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <h2 className="text-4xl font-black mb-4 tracking-[-0.03em]" style={{ color: '#F0EDE8' }}>
              Ready to See It in Action?
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#6A6A7A' }}>
              Five years of engineering. One live demo. No setup required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo" className="btn-primary text-base px-10 py-4">
                <Zap className="w-5 h-5" /> Launch Live Demo
              </Link>
              <Link href="/onboarding" className="btn-secondary text-base px-10 py-4">
                Get Enterprise Quote <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
