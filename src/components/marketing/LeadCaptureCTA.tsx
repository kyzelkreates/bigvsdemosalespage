'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronRight, Loader2, CheckCircle2 } from 'lucide-react'
import type { LeadFormData } from '@/types'

const schema = z.object({
  name:      z.string().min(2, 'Name required'),
  email:     z.string().email('Valid email required'),
  phone:     z.string().min(7, 'Phone number required'),
  company:   z.string().min(2, 'Company name required'),
  industry:  z.enum(['logistics','fleet','delivery','transport','emergency','other']),
  fleetSize: z.enum(['micro','small','medium','enterprise','national']),
})

export function LeadCaptureCTA() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LeadFormData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/leads', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, source: 'seo' }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-28 relative overflow-hidden" id="contact">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-blue/5 pointer-events-none" />

      <div className="container-section relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="badge-cyan inline-flex mb-4">Enterprise Enquiry</div>
            <h2 className="text-4xl font-black mb-4">
              <span className="text-brand-text">Get Your</span>{' '}
              <span className="gradient-text">Fleet Assessment</span>
            </h2>
            <p className="text-brand-muted text-lg">
              Tell us about your operation. We'll score your fleet fit and follow up with a
              scoped value estimate — no pricing tiers, no generic quotes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-brand-green mx-auto mb-4" />
                <h3 className="text-brand-text text-2xl font-bold mb-2">We've received your enquiry</h3>
                <p className="text-brand-muted">
                  Our team will reach out within 24 hours with your fleet assessment and scoped value estimate.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-brand-muted text-xs font-medium mb-1.5">Full Name *</label>
                  <input {...register('name')} placeholder="Jane Smith" className="input-field" />
                  {errors.name && <p className="text-brand-red text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-brand-muted text-xs font-medium mb-1.5">Work Email *</label>
                  <input {...register('email')} type="email" placeholder="jane@company.com" className="input-field" />
                  {errors.email && <p className="text-brand-red text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-brand-muted text-xs font-medium mb-1.5">Phone Number *</label>
                  <input {...register('phone')} type="tel" placeholder="+44 7000 000000" className="input-field" />
                  {errors.phone && <p className="text-brand-red text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-brand-muted text-xs font-medium mb-1.5">Company Name *</label>
                  <input {...register('company')} placeholder="Acme Logistics Ltd" className="input-field" />
                  {errors.company && <p className="text-brand-red text-xs mt-1">{errors.company.message}</p>}
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-brand-muted text-xs font-medium mb-1.5">Industry *</label>
                  <select {...register('industry')} className="input-field">
                    <option value="">Select industry...</option>
                    <option value="logistics">Logistics & Freight</option>
                    <option value="fleet">Fleet Operations</option>
                    <option value="delivery">Last-Mile Delivery</option>
                    <option value="transport">Passenger Transport</option>
                    <option value="emergency">Emergency Services</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.industry && <p className="text-brand-red text-xs mt-1">{errors.industry.message}</p>}
                </div>

                {/* Fleet size */}
                <div>
                  <label className="block text-brand-muted text-xs font-medium mb-1.5">Fleet Size *</label>
                  <select {...register('fleetSize')} className="input-field">
                    <option value="">Select fleet size...</option>
                    <option value="micro">1–5 vehicles</option>
                    <option value="small">6–20 vehicles</option>
                    <option value="medium">21–100 vehicles</option>
                    <option value="enterprise">101–500 vehicles</option>
                    <option value="national">500+ vehicles</option>
                  </select>
                  {errors.fleetSize && <p className="text-brand-red text-xs mt-1">{errors.fleetSize.message}</p>}
                </div>

                {/* Error */}
                {error && (
                  <div className="sm:col-span-2 p-3 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-4 text-base"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : (
                      <>Get My Fleet Assessment <ChevronRight className="w-4 h-4" /></>
                    )}
                  </button>
                  <p className="text-center text-brand-subtle text-xs mt-3">
                    No pricing commitments. Your data is handled with enterprise confidentiality.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
