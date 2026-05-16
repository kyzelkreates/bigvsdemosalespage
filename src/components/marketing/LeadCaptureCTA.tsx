'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronRight, Loader2, CheckCircle2, Zap, Shield, Clock } from 'lucide-react'
import type { LeadFormData } from '@/types'

const schema = z.object({
  name:      z.string().min(2, 'Name required'),
  email:     z.string().email('Valid email required'),
  phone:     z.string().min(7, 'Phone number required'),
  company:   z.string().min(2, 'Company name required'),
  industry:  z.enum(['logistics','fleet','delivery','transport','emergency','other']),
  fleetSize: z.enum(['micro','small','medium','enterprise','national']),
})

const TRUST_ITEMS = [
  { icon: Shield, text: 'No commitment required' },
  { icon: Clock,  text: 'Response within 24 hours' },
  { icon: Zap,    text: 'Custom AI-scoped quote' },
]

export function LeadCaptureCTA() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LeadFormData) => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/leads', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, source: 'seo' }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-32 relative overflow-hidden" id="contact">

      {/* Background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 60%)' }} />
        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-40 h-40 opacity-20"
          style={{ background: 'radial-gradient(circle at top left, rgba(212,175,55,0.3), transparent 60%)' }} />
        <div className="absolute bottom-8 right-8 w-40 h-40 opacity-20"
          style={{ background: 'radial-gradient(circle at bottom right, rgba(192,192,192,0.2), transparent 60%)' }} />
      </div>

      <div className="container-section relative z-10">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="badge-gold inline-flex mb-5">
              <Zap className="w-3 h-3" />
              Enterprise Enquiry
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-[-0.03em]">
              <span style={{ color: '#F0EDE8' }}>Get Your</span>
              <br />
              <span className="shimmer-gold" style={{ backgroundSize: '300% 100%' }}>Custom Quote</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#6A6A7A' }}>
              Tell us about your fleet and we'll generate an AI-scoped investment range and ROI projection — specific to your operation.
            </p>
            <div className="gold-line max-w-xs mx-auto mt-6" />
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-3xl p-8 sm:p-10"
            style={{
              background: 'linear-gradient(145deg, rgba(22,22,34,0.95) 0%, rgba(14,14,22,0.98) 100%)',
              border: '1px solid rgba(212,175,55,0.18)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(245,215,110,0.08)',
            }}
          >
            {/* Corner accent lines */}
            <div className="absolute top-0 left-0 w-12 h-px" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
            <div className="absolute top-0 left-0 w-px h-12" style={{ background: 'linear-gradient(180deg, #D4AF37, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-12 h-px" style={{ background: 'linear-gradient(270deg, #D4AF37, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-px h-12" style={{ background: 'linear-gradient(0deg, #D4AF37, transparent)' }} />

            {submitted ? (
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="text-center py-12">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(184,134,11,0.08))', border: '1px solid rgba(212,175,55,0.3)' }}>
                  <CheckCircle2 className="w-10 h-10" style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="text-2xl font-black mb-3 gradient-text-gold">Enquiry Received</h3>
                <p className="text-lg mb-1" style={{ color: '#E8E5E0' }}>Thank you — we'll be in touch within 24 hours.</p>
                <p className="text-sm" style={{ color: '#6A6A7A' }}>For immediate assistance, try our full AI onboarding below.</p>
                <a href="/onboarding" className="btn-primary mt-6 inline-flex">
                  <Zap className="w-4 h-4" /> Start AI Onboarding
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={{ color: '#8A8A9A' }}>Full Name</label>
                    <input {...register('name')} placeholder="Victoria Johnson" className="input-field" />
                    {errors.name && <p className="text-xs mt-1.5" style={{ color: '#FF3B3B' }}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={{ color: '#8A8A9A' }}>Work Email</label>
                    <input {...register('email')} type="email" placeholder="v@company.com" className="input-field" />
                    {errors.email && <p className="text-xs mt-1.5" style={{ color: '#FF3B3B' }}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={{ color: '#8A8A9A' }}>Phone</label>
                    <input {...register('phone')} type="tel" placeholder="+44 7000 000000" className="input-field" />
                    {errors.phone && <p className="text-xs mt-1.5" style={{ color: '#FF3B3B' }}>{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={{ color: '#8A8A9A' }}>Company</label>
                    <input {...register('company')} placeholder="Acme Logistics Ltd" className="input-field" />
                    {errors.company && <p className="text-xs mt-1.5" style={{ color: '#FF3B3B' }}>{errors.company.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={{ color: '#8A8A9A' }}>Industry</label>
                    <select {...register('industry')} className="input-field">
                      <option value="">Select industry…</option>
                      <option value="logistics">Logistics & Freight</option>
                      <option value="fleet">Fleet Operations</option>
                      <option value="delivery">Delivery Services</option>
                      <option value="transport">Passenger Transport</option>
                      <option value="emergency">Emergency Services</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && <p className="text-xs mt-1.5" style={{ color: '#FF3B3B' }}>{errors.industry.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={{ color: '#8A8A9A' }}>Fleet Size</label>
                    <select {...register('fleetSize')} className="input-field">
                      <option value="">Select fleet size…</option>
                      <option value="micro">Micro (1–5)</option>
                      <option value="small">Small (6–20)</option>
                      <option value="medium">Medium (21–100)</option>
                      <option value="enterprise">Enterprise (101–500)</option>
                      <option value="national">National (500+)</option>
                    </select>
                    {errors.fleetSize && <p className="text-xs mt-1.5" style={{ color: '#FF3B3B' }}>{errors.fleetSize.message}</p>}
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl text-sm" style={{ background: 'rgba(255,59,59,0.08)', border: '1px solid rgba(255,59,59,0.2)', color: '#FF3B3B' }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60">
                  {loading
                    ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</>
                    : <><Zap className="w-5 h-5" /> Request Enterprise Quote <ChevronRight className="w-4 h-4" /></>
                  }
                </button>

                <p className="text-center text-xs" style={{ color: '#4A4A6A' }}>
                  Or{' '}
                  <a href="/onboarding" className="underline transition-colors" style={{ color: '#D4AF37' }}>
                    complete our full AI onboarding
                  </a>
                  {' '}for an instant scoped quote.
                </p>
              </form>
            )}
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            {TRUST_ITEMS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm" style={{ color: '#4A4A6A' }}>
                <Icon className="w-4 h-4" style={{ color: '#D4AF37', opacity: 0.6 }} />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
