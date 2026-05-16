'use client'

import { motion } from 'framer-motion'

const STATS = [
  { value: '94%',    label: 'Route Efficiency Gain'   },
  { value: '£180K+', label: 'Avg. Annual Fleet Savings'},
  { value: '40%',    label: 'Fuel Cost Reduction'      },
  { value: '3.2×',   label: 'Dispatch Throughput'      },
  { value: '99.9%',  label: 'Platform Uptime'          },
  { value: '500+',   label: 'Vehicles Supported'       },
]

export function StatsBar() {
  return (
    <section className="py-12 border-y border-brand-border/40 bg-brand-panel/30 backdrop-blur-sm">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <p className="text-2xl font-black gradient-text mb-1">{stat.value}</p>
              <p className="text-brand-muted text-xs font-medium leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
