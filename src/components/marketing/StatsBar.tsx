'use client'

import { motion } from 'framer-motion'

const STATS = [
  { value: '94%',    label: 'Route Efficiency Gain',    gold: true  },
  { value: '£180K+', label: 'Avg. Annual Fleet Savings', gold: true  },
  { value: '40%',    label: 'Fuel Cost Reduction',       gold: false },
  { value: '3.2×',   label: 'Dispatch Throughput',       gold: false },
  { value: '99.9%',  label: 'Platform Uptime',           gold: true  },
  { value: '500+',   label: 'Vehicles Supported',        gold: false },
]

export function StatsBar() {
  return (
    <section className="relative py-14 overflow-hidden">
      {/* Background panel */}
      <div className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(18,18,25,0.9) 0%, rgba(22,22,34,0.95) 100%)',
          borderTop: '1px solid rgba(212,175,55,0.1)',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
        }}
      />
      {/* Subtle gold shimmer bar */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

      <div className="container-section relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative"
            >
              {/* Separator line */}
              {i > 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block"
                  style={{
                    width: '1px', height: '40px',
                    background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.2), transparent)',
                  }} />
              )}
              <p className={`text-3xl font-black mb-1.5 tracking-tight ${stat.gold ? 'gradient-text-gold' : 'gradient-text-silver'}`}>
                {stat.value}
              </p>
              <p className="text-xs font-medium leading-tight" style={{ color: '#6A6A7A', letterSpacing: '0.04em' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
