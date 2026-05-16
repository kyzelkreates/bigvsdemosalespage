'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, ChevronRight, Activity, Zap, Truck, MapPin } from 'lucide-react'

const FEATURES_LIST = [
  'Live fleet map with 24+ simulated vehicles',
  'AI dispatch command panel',
  'Delivery progress and ETA tracking',
  'Driver status and performance view',
  'Traffic condition overlays',
  'Real-time fleet health indicators',
]

const MOCK_VEHICLES = [
  { id: 'VAN-01', driver: 'M. Clarke',  progress: 72, status: 'in-transit', gold: true  },
  { id: 'VAN-07', driver: 'S. Patel',   progress: 45, status: 'in-transit', gold: false },
  { id: 'TRK-03', driver: 'R. Johnson', progress: 0,  status: 'idle',       gold: false },
  { id: 'VAN-11', driver: 'L. Barnes',  progress: 88, status: 'in-transit', gold: true  },
]

export function DemoPreview() {
  return (
    <section className="py-32 relative overflow-hidden" id="demo">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(14,14,20,0.8) 0%, rgba(10,10,15,0.95) 100%)' }} />
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }} />

      <div className="container-section relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="badge-gold inline-flex mb-6">
              <Activity className="w-3 h-3" />
              Live Demo System
            </div>

            <h2 className="text-4xl sm:text-5xl font-black mb-5 tracking-[-0.03em]">
              <span style={{ color: '#F0EDE8' }}>See the Platform</span>
              <br />
              <span className="shimmer-gold" style={{ backgroundSize: '300% 100%' }}>In Full Operation</span>
            </h2>

            <p className="text-lg leading-relaxed mb-10" style={{ color: '#6A6A7A' }}>
              Our high-fidelity fleet simulation lets you explore the full logistics control system
              — route maps, driver panels, delivery timelines, and analytics — without any setup required.
            </p>

            <div className="space-y-3.5 mb-10">
              {FEATURES_LIST.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: '#8A8A9A' }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4AF37' }} />
                  </div>
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/demo" className="btn-primary text-base px-8 py-4">
                <Play className="w-4 h-4" />
                Launch Fleet Demo
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-6 py-4">
                Request Private Demo
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right: mock dashboard panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            {/* Glow behind panel */}
            <div className="absolute -inset-4 rounded-3xl opacity-30 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15), transparent 70%)' }} />

            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(18,18,28,0.98) 0%, rgba(12,12,20,1) 100%)',
                border: '1px solid rgba(212,175,55,0.18)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(245,215,110,0.08)',
              }}
            >
              {/* Title bar */}
              <div className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: '1px solid rgba(212,175,55,0.1)', background: 'rgba(8,8,14,0.6)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,59,59,0.6)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,184,0,0.6)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(0,255,136,0.6)' }} />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="status-live" />
                  <span className="text-xs font-semibold" style={{ color: '#D4AF37' }}>Fleet Control — LIVE</span>
                </div>
                <div className="w-16" />
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div className="w-14 flex flex-col items-center py-4 gap-3"
                  style={{ borderRight: '1px solid rgba(212,175,55,0.08)', background: 'rgba(8,8,12,0.5)' }}>
                  {[
                    { icon: Truck,   active: true  },
                    { icon: MapPin,  active: false },
                    { icon: Activity,active: false },
                    { icon: Zap,     active: false },
                  ].map(({ icon: Icon, active }, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: active ? 'rgba(212,175,55,0.12)' : 'transparent',
                        border: active ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: active ? '#D4AF37' : '#4A4A6A' }} />
                    </div>
                  ))}
                </div>

                {/* Main panel */}
                <div className="flex-1 p-5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#E8E5E0' }}>Fleet Overview</p>
                      <p className="text-xs mt-0.5" style={{ color: '#6A6A7A' }}>Live simulation · 24 vehicles</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono" style={{ color: '#D4AF37' }}>21 active</p>
                      <p className="text-xs" style={{ color: '#6A6A7A' }}>3 idle</p>
                    </div>
                  </div>

                  {/* Vehicle cards */}
                  <div className="space-y-2.5 mb-4">
                    {MOCK_VEHICLES.map((v) => (
                      <div
                        key={v.id}
                        className="rounded-xl p-3"
                        style={{
                          background: 'rgba(22,22,34,0.8)',
                          border: v.gold ? '1px solid rgba(212,175,55,0.15)' : '1px solid rgba(192,192,192,0.08)',
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: v.status === 'idle' ? '#6A6A7A' : v.gold ? '#D4AF37' : '#C0C0C0' }}
                            />
                            <span className="text-xs font-bold font-mono" style={{ color: '#E8E5E0' }}>{v.id}</span>
                            <span className="text-xs" style={{ color: '#6A6A7A' }}>{v.driver}</span>
                          </div>
                          <span className="text-xs font-semibold" style={{ color: v.status === 'idle' ? '#4A4A6A' : v.gold ? '#D4AF37' : '#C0C0C0' }}>
                            {v.status === 'idle' ? 'IDLE' : `${v.progress}%`}
                          </span>
                        </div>
                        {v.status !== 'idle' && (
                          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <motion.div
                              className="h-full rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${v.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.3 }}
                              style={{
                                background: v.gold
                                  ? 'linear-gradient(90deg, #B8860B, #D4AF37, #F5D76E)'
                                  : 'linear-gradient(90deg, #808080, #C0C0C0, #E8E8E8)',
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Bottom metric strip */}
                  <div
                    className="grid grid-cols-3 gap-2 rounded-xl p-3"
                    style={{ background: 'rgba(12,12,18,0.6)', border: '1px solid rgba(212,175,55,0.08)' }}
                  >
                    {[
                      { label: 'Routes', value: '18' },
                      { label: 'Delivered', value: '142' },
                      { label: 'Efficiency', value: '94%' },
                    ].map(({ label, value }) => (
                      <div key={label} className="text-center">
                        <p className="text-sm font-black gradient-text-gold">{value}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#4A4A6A' }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
