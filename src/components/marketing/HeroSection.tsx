'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Truck, Zap, Activity, Shield, Scale, Clock } from 'lucide-react'

const FLOATING_STATS = [
  { value: '5 Years',  label: 'In Development',        icon: Clock  },
  { value: '16,000+',  label: 'Engineering Hours',      icon: Activity },
  { value: 'UK & EU',  label: 'Legal Compliance',       icon: Scale  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-18 overflow-hidden">

      {/* Deep space background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, rgba(184,134,11,0.06) 40%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, rgba(192,192,192,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        {/* Corner accents */}
        <div className="absolute top-24 left-8 w-px h-32 opacity-30" style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.8), transparent)' }} />
        <div className="absolute top-24 left-8 w-32 h-px opacity-30" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.8), transparent)' }} />
        <div className="absolute top-24 right-8 w-px h-32 opacity-30" style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.8), transparent)' }} />
        <div className="absolute top-24 right-8 w-32 h-px opacity-30" style={{ background: 'linear-gradient(270deg, rgba(212,175,55,0.8), transparent)' }} />
      </div>

      <div className="container-section relative z-10 py-24">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10"
            style={{
              background: 'rgba(212,175,55,0.05)',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 0 30px rgba(212,175,55,0.08), inset 0 1px 0 rgba(245,215,110,0.1)',
            }}
          >
            <span className="status-live" />
            <span className="text-sm font-semibold tracking-wide" style={{ color: '#D4AF37' }}>
              Safety-First Fleet Navigation — Built for Legal Compliance
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="font-black leading-[1.02] tracking-[-0.04em] mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-8xl text-[#F0EDE8]">Fleet Safety.</span>
              <span className="block text-5xl sm:text-6xl lg:text-8xl shimmer-gold" style={{ backgroundSize: '300% 100%' }}>
                Legally Built.
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-8xl mt-1" style={{ color: '#C0C0C0' }}>
                Finally Done Right.
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{ color: '#8A8A9A' }}
          >
            Big V's Best Routes is the only fleet navigation platform built from the ground up with
            driver safety and legal compliance as the primary architectural foundation — not as an afterthought.
            5 years. 16,000+ engineering hours. No shortcuts.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Link href="/demo" className="btn-primary text-base px-10 py-4">
              <Zap className="w-5 h-5" />
              Launch Live Demo
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/onboarding" className="btn-secondary text-base px-10 py-4">
              Get Enterprise Quote
            </Link>
          </motion.div>

          {/* Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-20"
          >
            {FLOATING_STATS.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl"
                style={{
                  background: 'rgba(20,20,30,0.8)',
                  border: '1px solid rgba(212,175,55,0.18)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(245,215,110,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(212,175,55,0.1)' }}>
                  <Icon className="w-4 h-4" style={{ color: '#D4AF37' }} />
                </div>
                <div className="text-left">
                  <p className="text-lg font-black leading-none gradient-text-gold">{value}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#8A8A9A' }}>{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Capability strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { icon: Truck,    label: 'Fleet Navigation'     },
              { icon: Scale,    label: 'Legal Compliance'     },
              { icon: Shield,   label: 'Driver Safety First'  },
              { icon: Activity, label: 'Real-time Intelligence' },
              { icon: Zap,      label: 'AI Dispatch Engine'   },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm" style={{ color: '#4A4A6A' }}>
                <Icon className="w-4 h-4" style={{ color: '#D4AF37', opacity: 0.7 }} />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050507, transparent)' }} />
    </section>
  )
}
