'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  AlertTriangle, TrendingDown, Scale, Clock,
  Fuel, ShieldOff, Wrench, FileWarning,
  ChevronRight, Zap
} from 'lucide-react'

const INCIDENTS = [
  {
    icon: AlertTriangle,
    category: 'Bridge Strikes',
    cost: '£100,000 – £500,000+',
    detail: 'A single bridge strike can write off a HGV instantly, close a major road for hours, and trigger a Network Rail or Highways England claim. Insurance excess alone routinely exceeds £25,000. Legal proceedings, driver suspension, and HSE investigation follow. Consumer GPS has no height or weight data — it routes trucks under bridges they cannot fit through.',
    source: 'Network Rail / DVSA incident data',
    gold: true,
  },
  {
    icon: TrendingDown,
    category: 'Low Clearance & Width Restriction Damage',
    cost: '£8,000 – £80,000 per incident',
    detail: 'Weight-restricted rural roads, low railway bridges, and narrow lanes cause vehicle damage, cargo loss, and structural damage. The DVSA logged over 60,000 bridge strike near-misses in a single year. Standard sat-nav has no knowledge of 7.5T weight limit signs, temporary road closures, or bridge strengthening orders.',
    source: 'DVSA Annual Road Safety Report',
    gold: false,
  },
  {
    icon: Scale,
    category: 'Restricted Zone & Weight Penalties',
    cost: '£300 – £5,000 per violation',
    detail: 'Driving through a weight-restricted zone is a criminal offence with unlimited fines and vehicle impoundment. Clean Air Zones, ULEZ, and Congestion Zones add £100–£600 per vehicle daily for non-compliant routes. Consumer navigation does not know your vehicle\'s GVW, axle load, or emission class.',
    source: 'DVSA / TfL Zone Compliance Data',
    gold: true,
  },
  {
    icon: Clock,
    category: 'Driver Hours Violations',
    cost: '£1,500 – £11,000 per infringement',
    detail: 'EC Regulation 561/2006 mandates strict driving hour limits with mandatory rest breaks. A single tachograph infringement can result in a fixed penalty of £1,500 per driver and suspension of the operator\'s licence. Routing systems that ignore accumulated drive time set drivers up to break the law without knowing it.',
    source: 'EC Regulation 561/2006 / DVSA Enforcement',
    gold: false,
  },
  {
    icon: Fuel,
    category: 'Fuel Waste from Suboptimal Routing',
    cost: '£12,000 – £85,000 per fleet per year',
    detail: 'Outdated navigation routes on major roads even when faster compliant alternatives exist. It ignores real-time fuel pricing and traffic buildup. For a 20-vehicle fleet averaging 80,000 miles per year, suboptimal routing wastes 15–30% of annual fuel spend. At current diesel prices, that compounds fast.',
    source: 'Fleet News Annual Cost Survey 2024',
    gold: true,
  },
  {
    icon: Wrench,
    category: 'Preventable Vehicle Wear & Breakdown',
    cost: '£3,500 – £28,000 per incident',
    detail: 'Routing HGVs through potholed B-roads, excessive gradient routes, and surfaces unsuitable for vehicle weight accelerates tyre wear, suspension damage, and drivetrain stress. A single roadside breakdown costs an average of £3,500 in recovery, lost load, and missed SLAs — before the repair bill.',
    source: 'RAC Commercial Fleet Breakdown Data',
    gold: false,
  },
  {
    icon: FileWarning,
    category: 'Operator Licence Risk',
    cost: 'Licence revocation · Unlimited fines',
    detail: 'Fleet operators have a legal duty to prove their routing decisions were safe and compliant. When an incident occurs and investigation reveals consumer GPS was used without any compliance layer, the Traffic Commissioner can revoke the operator\'s licence entirely — ending the business. This has happened.',
    source: 'Traffic Commissioner Public Inquiry Records',
    gold: true,
  },
  {
    icon: ShieldOff,
    category: 'Insurance Premium Inflation',
    cost: '£15,000 – £60,000+ annual increase',
    detail: 'Fleet insurers now request routing and telematics data as standard during underwriting. Operators who cannot demonstrate a compliance-first routing system pay higher premiums — and face claim rejection if an incident involves a non-compliant route.',
    source: 'Fleet insurance underwriting benchmarks 2024',
    gold: false,
  },
]

const SUMMARY_STATS = [
  { value: '£500K+',  label: 'Max single bridge strike cost',   gold: true  },
  { value: '60,000',  label: 'Bridge near-misses per year (UK)', gold: false },
  { value: '£11,000', label: 'Max driver hours fine per driver',  gold: true  },
  { value: '100%',    label: 'Of these costs are preventable',   gold: false },
]

export function CostOfOutdatedNav() {
  return (
    <section className="py-32 relative overflow-hidden" id="cost-of-bad-nav">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: '#050507' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,80,0,0.06), transparent 70%)' }} />
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,100,0,0.35), transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)' }} />

      <div className="container-section relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(255,80,0,0.08)',
              border: '1px solid rgba(255,100,0,0.28)',
            }}>
            <AlertTriangle className="w-3 h-3" style={{ color: '#FF6400' }} />
            <span style={{ color: '#FF6400', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              The Real Cost of Outdated Satellite Navigation
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] mb-6">
            <span style={{ color: '#F0EDE8' }}>What Consumer GPS</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #FF6400 0%, #FFB800 55%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Is Actually Costing You
            </span>
          </h2>

          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#7A7A8A' }}>
            Standard satellite navigation was built for car drivers. It has no knowledge of your vehicle's height, weight, axle load, emission class, or driving hours. Every time a fleet uses consumer GPS, it is one wrong turn away from any of the following.
          </p>

          <div className="h-px max-w-xs mx-auto mt-8"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />
        </motion.div>

        {/* ── Summary stat strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {SUMMARY_STATS.map((s) => (
            <div key={s.label} className="text-center p-5 rounded-2xl"
              style={{
                background: 'rgba(15,10,8,0.8)',
                border: s.gold ? '1px solid rgba(255,100,0,0.18)' : '1px solid rgba(212,175,55,0.1)',
              }}>
              <p className="text-3xl font-black mb-1.5"
                style={{
                  background: s.gold
                    ? 'linear-gradient(135deg, #FF6400, #FFB800)'
                    : 'linear-gradient(135deg, #C0C0C0, #E8E8E8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                {s.value}
              </p>
              <p className="text-xs" style={{ color: '#6A6A7A', letterSpacing: '0.04em' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Incident cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-20">
          {INCIDENTS.map((item, i) => {
            const Icon = item.icon
            const accentColour = item.gold ? '#FF6400' : '#D4AF37'
            const borderColour = item.gold ? 'rgba(255,100,0,0.18)' : 'rgba(212,175,55,0.12)'
            const bgIcon       = item.gold ? 'rgba(255,100,0,0.09)' : 'rgba(212,175,55,0.07)'
            const borderIcon   = item.gold ? 'rgba(255,100,0,0.22)' : 'rgba(212,175,55,0.15)'

            return (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                className="p-7 rounded-3xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, rgba(18,12,10,0.96), rgba(12,10,8,0.98))',
                  border: `1px solid ${borderColour}`,
                }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${accentColour}44, transparent)` }} />

                {/* Icon + heading */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: bgIcon, border: `1px solid ${borderIcon}` }}>
                    <Icon className="w-5 h-5" style={{ color: accentColour }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-base mb-1 tracking-tight" style={{ color: '#F0EDE8' }}>
                      {item.category}
                    </h3>
                    <p className="text-lg font-black"
                      style={{
                        background: item.gold
                          ? 'linear-gradient(135deg, #FF6400, #FFB800)'
                          : 'linear-gradient(135deg, #D4AF37, #F5D76E)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>
                      {item.cost}
                    </p>
                  </div>
                </div>

                {/* Detail */}
                <p className="text-sm leading-7 mb-5" style={{ color: '#6A6A7A' }}>
                  {item.detail}
                </p>

                {/* Source */}
                <div className="flex items-center gap-2 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <FileWarning className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#3A3A4A' }} />
                  <p className="text-xs" style={{ color: '#3A3A4A' }}>Source: {item.source}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Resolution CTA banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-10 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(22,22,34,0.96), rgba(14,14,22,0.98))',
            border: '1px solid rgba(212,175,55,0.22)',
            boxShadow: '0 0 80px rgba(212,175,55,0.04)',
          }}
        >
          {/* Corner lines */}
          <div className="absolute top-0 left-0 w-20 h-px" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          <div className="absolute top-0 left-0 w-px h-20" style={{ background: 'linear-gradient(180deg, #D4AF37, transparent)' }} />
          <div className="absolute bottom-0 right-0 w-20 h-px" style={{ background: 'linear-gradient(270deg, #D4AF37, transparent)' }} />
          <div className="absolute bottom-0 right-0 w-px h-20" style={{ background: 'linear-gradient(0deg, #D4AF37, transparent)' }} />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.22)' }}>
            <Zap className="w-3.5 h-3.5" style={{ color: '#D4AF37' }} />
            <span style={{ color: '#D4AF37', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              The Solution
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black tracking-[-0.03em] mb-4"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F5D76E 50%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '300% 100%',
            }}>
            Every one of these costs is preventable.
          </h3>

          <p className="text-base leading-7 max-w-2xl mx-auto mb-8" style={{ color: '#7A7A8A' }}>
            Big V's Best Routes was built specifically because consumer GPS cannot protect fleet operators from these risks. Our compliance-first routing engine knows your vehicle's height, weight, axle configuration, and emission class. It knows every restricted zone, every weight limit, every bridge clearance on your route. It enforces EU driving hour limits automatically. Routes that are not just fast — they are legal, safe, and defensible.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo" className="btn-primary text-base px-10 py-4">
              <Zap className="w-5 h-5" />
              See It In Action
            </Link>
            <Link href="/onboarding" className="btn-secondary text-base px-10 py-4">
              Get Your Fleet Protected
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
