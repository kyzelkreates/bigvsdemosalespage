'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, Zap, ChevronRight, Activity } from 'lucide-react'

export function DemoPreview() {
  return (
    <section className="py-28 bg-brand-panel/20" id="demo">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="badge-green inline-flex mb-6">
              <Activity className="w-3.5 h-3.5" />
              Live Demo System
            </div>
            <h2 className="text-4xl font-black mb-5 tracking-tight">
              <span className="text-brand-text">See the Platform</span>
              <br />
              <span className="gradient-text">In Full Operation</span>
            </h2>
            <p className="text-brand-muted text-lg leading-relaxed mb-8">
              Our high-fidelity fleet simulation lets you explore the full logistics control system
              — route maps, driver panels, delivery timelines, and analytics — without any setup required.
            </p>

            <div className="space-y-4 mb-10">
              {[
                'Live fleet map with 24+ simulated vehicles',
                'AI dispatch command panel',
                'Delivery progress and ETA tracking',
                'Driver status and performance view',
                'Traffic condition overlays',
                'Real-time fleet health indicators',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-brand-muted text-sm">
                  <div className="status-live flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/demo" className="btn-primary text-base px-8 py-4">
                <Play className="w-5 h-5" />
                Launch Fleet Demo
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-6 py-4">
                Request Private Demo
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right: preview panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="glass rounded-3xl border border-brand-green/20 overflow-hidden shadow-glow-green">
              {/* Nav sidebar mock */}
              <div className="flex">
                <div className="w-14 bg-brand-charcoal/80 flex flex-col items-center py-4 gap-4 border-r border-brand-border/40">
                  {['M','R','D','A'].map((l, i) => (
                    <div key={l} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${i === 0 ? 'bg-brand-cyan/20 text-brand-cyan' : 'text-brand-subtle hover:text-brand-muted'}`}>
                      {l}
                    </div>
                  ))}
                </div>

                <div className="flex-1 p-4">
                  {/* Status header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-brand-text font-semibold text-sm">Fleet Overview</p>
                      <p className="text-brand-muted text-xs">Live simulation — 24 vehicles</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-brand-green text-xs">
                      <span className="status-live" />
                      <span>LIVE</span>
                    </div>
                  </div>

                  {/* Vehicle list mock */}
                  <div className="space-y-2">
                    {[
                      { id: 'VAN-01', driver: 'M. Clarke',  status: 'in-transit', progress: 72, color: 'cyan'  },
                      { id: 'VAN-07', driver: 'S. Patel',   status: 'in-transit', progress: 45, color: 'blue'  },
                      { id: 'TRK-03', driver: 'R. Johnson', status: 'idle',       progress: 0,  color: 'amber' },
                      { id: 'VAN-11', driver: 'L. Barnes',  status: 'in-transit', progress: 88, color: 'green' },
                    ].map((v) => (
                      <div key={v.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-brand-surface/40 border border-brand-border/30">
                        <div className={`status-dot bg-brand-${v.color} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-brand-text text-xs font-semibold">{v.id}</span>
                            <span className="text-brand-muted text-xs">{v.status}</span>
                          </div>
                          <div className="h-1 bg-brand-border/50 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-brand-${v.color} rounded-full transition-all`}
                              style={{ width: `${v.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-brand-muted text-xs font-mono flex-shrink-0">{v.progress}%</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick metrics */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[
                      { label: 'On Time',  value: '91%', c: 'green' },
                      { label: 'Dispatch', value: '18',  c: 'cyan'  },
                      { label: 'Alerts',   value: '2',   c: 'amber' },
                    ].map((m) => (
                      <div key={m.label} className="text-center p-2 rounded-xl bg-brand-surface/30">
                        <p className={`text-brand-${m.c} font-bold text-sm`}>{m.value}</p>
                        <p className="text-brand-subtle text-xs">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating CTA */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              <Link href="/demo" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-green text-brand-asphalt font-semibold text-sm shadow-glow-green hover:scale-105 transition-transform">
                <Zap className="w-4 h-4" />
                Open Full Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
