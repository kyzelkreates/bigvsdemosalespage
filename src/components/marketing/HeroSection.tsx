'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Truck, Zap, Activity, MapPin } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-section relative z-10 py-24">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 mb-8"
          >
            <span className="status-live" />
            <span className="text-brand-cyan text-sm font-medium">AI Fleet Intelligence Platform — Enterprise Ready</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          >
            <span className="text-brand-text">Route Intelligence.</span>
            <br />
            <span className="gradient-text">Fleet Control.</span>
            <br />
            <span className="text-brand-text">Delivered.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-brand-muted max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Big V's Best Routes is an enterprise AI-powered logistics platform — combining real-time route optimisation,
            fleet management, driver coordination, and operational intelligence into a single control system.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/demo" className="btn-primary text-base px-8 py-4 shadow-glow-cyan">
              <Zap className="w-5 h-5" />
              Launch Live Demo
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary text-base px-8 py-4">
              Get Enterprise Quote
            </Link>
          </motion.div>

          {/* Live indicator strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-brand-muted"
          >
            {[
              { icon: Truck,    label: 'Fleet Tracking'        },
              { icon: MapPin,   label: 'Route Optimisation'    },
              { icon: Activity, label: 'Real-time Analytics'   },
              { icon: Zap,      label: 'AI Dispatch Engine'    },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-brand-cyan" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 60 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="glass rounded-3xl border border-brand-cyan/20 overflow-hidden shadow-glow-cyan">
            {/* Dashboard chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-brand-border/50 bg-brand-panel/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-brand-red/60" />
                <div className="w-3 h-3 rounded-full bg-brand-amber/60" />
                <div className="w-3 h-3 rounded-full bg-brand-green/60" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="px-3 py-1 rounded-md bg-brand-surface/60 text-brand-muted text-xs font-mono">
                  bigvsbestroutes.com/demo
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-brand-green">
                <span className="status-live" />
                <span>LIVE</span>
              </div>
            </div>

            {/* Mock dashboard content */}
            <div className="p-6 bg-brand-charcoal/60">
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Active Vehicles',  value: '24',    color: 'cyan',  delta: '+3'  },
                  { label: 'Routes Completed', value: '127',   color: 'green', delta: '+18' },
                  { label: 'Avg. ETA Score',   value: '94%',   color: 'amber', delta: '+2%' },
                  { label: 'Fleet Efficiency', value: '88.4%', color: 'blue',  delta: '+4%' },
                ].map(({ label, value, color, delta }) => (
                  <div key={label} className="glass-card p-3">
                    <p className="text-brand-muted text-xs mb-1">{label}</p>
                    <p className={`text-xl font-bold text-brand-${color}`}>{value}</p>
                    <p className="text-brand-green text-xs mt-0.5">{delta} today</p>
                  </div>
                ))}
              </div>

              {/* Mock map area */}
              <div className="relative h-40 rounded-2xl bg-brand-surface/50 border border-brand-border/30 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(0,212,255,0.1) 30px, rgba(0,212,255,0.1) 31px),
                      repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,212,255,0.1) 30px, rgba(0,212,255,0.1) 31px)
                    `,
                  }}
                />
                {/* Route lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
                  <path d="M 50 120 Q 150 40 250 80 Q 350 120 450 60 Q 520 30 560 50"
                    stroke="#00D4FF" strokeWidth="2" fill="none" strokeDasharray="8 4" opacity="0.6" />
                  <path d="M 80 140 Q 200 60 300 100 Q 400 140 500 80"
                    stroke="#00FF88" strokeWidth="2" fill="none" opacity="0.5" />
                  {/* Vehicle dots */}
                  {[
                    { cx: 250, cy: 80 }, { cx: 350, cy: 105 }, { cx: 450, cy: 60 },
                  ].map(({ cx, cy }, i) => (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="6" fill="#00D4FF" opacity="0.9" />
                      <circle cx={cx} cy={cy} r="12" fill="#00D4FF" opacity="0.2" className="animate-ping-slow" />
                    </g>
                  ))}
                </svg>
                <div className="relative z-10 text-center">
                  <p className="text-brand-cyan font-semibold text-sm">Live Fleet Map</p>
                  <p className="text-brand-muted text-xs">24 vehicles tracked in real-time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-3 -right-3 bg-brand-amber text-brand-asphalt text-xs font-bold px-3 py-1.5 rounded-full shadow-glow-amber">
            AI POWERED
          </div>
        </motion.div>
      </div>
    </section>
  )
}
