'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Shield, ChevronRight, Scale, Code2 } from 'lucide-react'

export function AboutSnippet() {
  return (
    <section className="py-28 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(10,10,16,0.95) 0%, rgba(14,14,22,0.98) 100%)' }} />
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }} />
        {/* Gold glow left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.4), transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="container-section relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: numbers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="badge-gold inline-flex mb-6">
              <Clock className="w-3 h-3" />
              Our Story
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-6">
              <span style={{ color: '#F0EDE8' }}>5 Years.</span>
              <br />
              <span className="shimmer-gold" style={{ backgroundSize: '300% 100%' }}>16,000 Hours.</span>
              <br />
              <span className="shimmer-silver" style={{ backgroundSize: '300% 100%' }}>One Mission.</span>
            </h2>

            <p className="text-base leading-7 mb-5" style={{ color: '#7A7A8A' }}>
              Big V's Best Routes was not built to compete with existing fleet tools. It was built because existing fleet tools had a fundamental flaw: they optimised for speed and cost. Not one was built with driver safety and legal compliance as the primary architectural constraint.
            </p>

            <p className="text-base leading-7 mb-8" style={{ color: '#7A7A8A' }}>
              What started with a near-miss incident and 2,200 hours of legal research became a five-year engineering project unlike anything else in the industry. The result is the only fleet navigation platform where legal compliance is not a feature — it is the foundation.
            </p>

            <Link
              href="/about"
              className="btn-primary inline-flex text-base px-8 py-4"
            >
              Read the Full Story
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right: milestone cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { year: '2019', label: 'Legal Research', detail: '2,200 hrs of compliance mapping', icon: Scale, gold: true },
              { year: '2020', label: 'Engine Built',   detail: 'Compliance-first routing architecture', icon: Code2, gold: false },
              { year: '2021', label: 'AI Layer',       detail: 'Predictive safety intelligence', icon: Shield, gold: true },
              { year: '2022', label: 'Field Trials',   detail: 'Real-world operator testing', icon: Clock, gold: false },
              { year: '2023', label: 'Full Launch',    detail: 'Production-grade platform', icon: Shield, gold: true },
              {
                year: '16K+',
                label: 'Total Hours',
                detail: 'Every hour logged & documented',
                icon: Clock,
                gold: false,
                wide: true,
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.year}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`p-5 rounded-2xl relative overflow-hidden ${(item as any).wide ? 'col-span-2' : ''}`}
                  style={{
                    background: 'linear-gradient(145deg, rgba(22,22,34,0.9), rgba(14,14,22,0.95))',
                    border: `1px solid ${item.gold ? 'rgba(212,175,55,0.18)' : 'rgba(192,192,192,0.1)'}`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: item.gold ? 'rgba(212,175,55,0.1)' : 'rgba(192,192,192,0.07)',
                        border: `1px solid ${item.gold ? 'rgba(212,175,55,0.2)' : 'rgba(192,192,192,0.12)'}`,
                      }}>
                      <Icon className="w-4 h-4" style={{ color: item.gold ? '#D4AF37' : '#C0C0C0' }} />
                    </div>
                    <div>
                      <p className="text-xl font-black tracking-tight"
                        style={{ color: item.gold ? '#D4AF37' : '#C0C0C0' }}>{item.year}</p>
                      <p className="text-xs font-bold mb-0.5" style={{ color: '#E8E5E0' }}>{item.label}</p>
                      <p className="text-xs" style={{ color: '#4A4A6A' }}>{item.detail}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
