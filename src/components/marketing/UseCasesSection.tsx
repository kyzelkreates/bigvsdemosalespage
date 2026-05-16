'use client'

import { motion } from 'framer-motion'
import { Truck, Package, AlertTriangle, Bus, Factory, ShoppingBag } from 'lucide-react'

const USE_CASES = [
  {
    icon:  Truck,
    title: 'Logistics & Freight',
    desc:  'Multi-vehicle long-haul and regional logistics operations. Load planning, hub-to-hub routing, and cargo tracking at scale.',
    tags:  ['Freight routing', 'Load optimisation', 'Hub management'],
    tier:  'gold',
  },
  {
    icon:  Package,
    title: 'Last-Mile Delivery',
    desc:  'High-density urban delivery route compression with customer time-window management and real-time delivery confirmation.',
    tags:  ['Last-mile routing', 'Customer ETAs', 'Proof of delivery'],
    tier:  'silver',
  },
  {
    icon:  AlertTriangle,
    title: 'Emergency Services',
    desc:  'High-priority vehicle routing with fastest-path algorithms, real-time traffic bypass, and live incident coordination.',
    tags:  ['Priority routing', 'Incident response', 'Fleet coordination'],
    tier:  'gold',
  },
  {
    icon:  Bus,
    title: 'Passenger Transport',
    desc:  'Fleet scheduling, route adherence monitoring, and passenger capacity optimisation for coaches, shuttles, and transport networks.',
    tags:  ['Schedule management', 'Route adherence', 'Passenger analytics'],
    tier:  'silver',
  },
  {
    icon:  Factory,
    title: 'Industrial & Field Ops',
    desc:  'Field service fleet coordination — engineering teams, technicians, and maintenance crews with asset tracking and job dispatch.',
    tags:  ['Field dispatch', 'Job management', 'Asset tracking'],
    tier:  'gold',
  },
  {
    icon:  ShoppingBag,
    title: 'E-Commerce Fulfilment',
    desc:  'Multi-warehouse, multi-carrier fulfilment route planning with SLA adherence tracking and exception management.',
    tags:  ['Fulfilment routing', 'SLA tracking', 'Multi-carrier ops'],
    tier:  'silver',
  },
]

export function UseCasesSection() {
  return (
    <section className="py-32 relative overflow-hidden" id="use-cases">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)' }} />

      <div className="container-section relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="badge-gold inline-flex mb-5">
            <Truck className="w-3 h-3" />
            Industry Applications
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-[-0.03em]">
            <span style={{ color: '#F0EDE8' }}>Built For</span>
            <br />
            <span className="shimmer-silver" style={{ backgroundSize: '300% 100%' }}>Every Fleet Type</span>
          </h2>

          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#6A6A7A' }}>
            From a 5-vehicle courier fleet to a 500-vehicle national logistics network — the platform
            scales to your operational complexity.
          </p>

          <div className="gold-line max-w-xs mx-auto mt-8" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((uc, i) => {
            const Icon = uc.icon
            const isGold = uc.tier === 'gold'
            return (
              <motion.article
                key={uc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-7 rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, rgba(22,22,34,0.9) 0%, rgba(15,15,22,0.95) 100%)',
                  border: `1px solid ${isGold ? 'rgba(212,175,55,0.14)' : 'rgba(192,192,192,0.1)'}`,
                  transition: 'all 0.35s ease',
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{
                    boxShadow: isGold
                      ? 'inset 0 0 0 1px rgba(212,175,55,0.2), 0 20px 60px rgba(212,175,55,0.08)'
                      : 'inset 0 0 0 1px rgba(192,192,192,0.15), 0 20px 60px rgba(192,192,192,0.05)',
                  }} />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: isGold
                      ? 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(184,134,11,0.05))'
                      : 'linear-gradient(135deg, rgba(192,192,192,0.08), rgba(128,128,128,0.04))',
                    border: `1px solid ${isGold ? 'rgba(212,175,55,0.2)' : 'rgba(192,192,192,0.15)'}`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: isGold ? '#D4AF37' : '#C0C0C0' }} />
                </div>

                <h3 className="font-bold text-lg mb-3 tracking-tight" style={{ color: '#E8E5E0' }}>
                  {uc.title}
                </h3>

                <p className="text-sm leading-relaxed mb-6" style={{ color: '#6A6A7A' }}>
                  {uc.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {uc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: isGold ? 'rgba(212,175,55,0.07)' : 'rgba(192,192,192,0.06)',
                        border: `1px solid ${isGold ? 'rgba(212,175,55,0.18)' : 'rgba(192,192,192,0.14)'}`,
                        color: isGold ? '#B8860B' : '#909090',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
