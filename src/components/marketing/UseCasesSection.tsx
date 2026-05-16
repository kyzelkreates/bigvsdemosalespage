'use client'

import { motion } from 'framer-motion'
import { Truck, Package, AlertTriangle, Bus, Factory, ShoppingBag } from 'lucide-react'

const USE_CASES = [
  {
    icon:  Truck,
    title: 'Logistics & Freight',
    desc:  'Multi-vehicle long-haul and regional logistics operations. Load planning, hub-to-hub routing, and cargo tracking at scale.',
    tags:  ['Freight routing', 'Load optimisation', 'Hub management'],
    color: 'cyan',
  },
  {
    icon:  Package,
    title: 'Last-Mile Delivery Fleets',
    desc:  'High-density urban delivery route compression with customer time-window management and real-time delivery confirmation.',
    tags:  ['Last-mile routing', 'Customer ETAs', 'Proof of delivery'],
    color: 'blue',
  },
  {
    icon:  AlertTriangle,
    title: 'Emergency Services',
    desc:  'High-priority vehicle routing with fastest-path algorithms, real-time traffic bypass, and live incident coordination.',
    tags:  ['Priority routing', 'Incident response', 'Fleet coordination'],
    color: 'amber',
  },
  {
    icon:  Bus,
    title: 'Passenger Transport',
    desc:  'Fleet scheduling, route adherence monitoring, and passenger capacity optimisation for coaches, shuttles, and transport networks.',
    tags:  ['Schedule management', 'Route adherence', 'Passenger analytics'],
    color: 'green',
  },
  {
    icon:  Factory,
    title: 'Industrial & Field Operations',
    desc:  'Field service fleet coordination — engineering teams, technicians, and maintenance crews with asset tracking and job dispatch.',
    tags:  ['Field dispatch', 'Job management', 'Asset tracking'],
    color: 'cyan',
  },
  {
    icon:  ShoppingBag,
    title: 'Retail & E-Commerce Fulfilment',
    desc:  'Multi-warehouse, multi-carrier fulfilment route planning with SLA adherence tracking and exception management.',
    tags:  ['Fulfilment routing', 'SLA tracking', 'Multi-carrier ops'],
    color: 'blue',
  },
]

const COLOR_MAP: Record<string, string> = {
  cyan:  'bg-brand-cyan/10 text-brand-cyan',
  blue:  'bg-brand-blue/10 text-brand-blue',
  amber: 'bg-brand-amber/10 text-brand-amber',
  green: 'bg-brand-green/10 text-brand-green',
}

const TAG_MAP: Record<string, string> = {
  cyan:  'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
  blue:  'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
  amber: 'bg-brand-amber/10 text-brand-amber border-brand-amber/20',
  green: 'bg-brand-green/10 text-brand-green border-brand-green/20',
}

export function UseCasesSection() {
  return (
    <section className="py-28" id="use-cases">
      <div className="container-section">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge-amber inline-flex mb-4">
            <Truck className="w-3.5 h-3.5" />
            Industry Applications
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            <span className="text-brand-text">Built For</span>{' '}
            <span className="gradient-text-amber">Every Fleet Type</span>
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            From a 5-vehicle courier fleet to a 500-vehicle national logistics network — the platform
            scales to your operational complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((uc, i) => {
            const Icon = uc.icon
            return (
              <motion.article
                key={uc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-7 group hover:-translate-y-1 hover:border-brand-amber/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${COLOR_MAP[uc.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-brand-text font-bold text-lg mb-3">{uc.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-5">{uc.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {uc.tags.map((tag) => (
                    <span key={tag} className={`badge border text-xs ${TAG_MAP[uc.color]}`}>
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
