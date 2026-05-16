'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Zap, Loader2, ChevronRight } from 'lucide-react'

const schema = z.object({
  name:      z.string().min(2),
  email:     z.string().email(),
  company:   z.string().min(2),
  fleetSize: z.enum(['micro','small','medium','enterprise','national']),
})

type FormData = z.infer<typeof schema>

interface Props { onComplete: (leadId?: string) => void }

export function LeadGateModal({ onComplete }: Props) {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/leads', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, phone: 'demo-entry', industry: 'fleet', source: 'demo' }),
      })
      const json = await res.json()
      onComplete(json.data?.leadId)
    } catch {
      setError('Could not save — entering demo anyway.')
      setTimeout(() => onComplete(), 1200)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-brand-asphalt/90 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{    scale: 0.92, opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="glass rounded-3xl border border-brand-cyan/20 p-8 max-w-md w-full shadow-glow-cyan"
        >
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-cyan-blue flex items-center justify-center mx-auto mb-6 shadow-glow-cyan">
            <Zap className="w-7 h-7 text-brand-asphalt" />
          </div>

          <h2 className="text-2xl font-black text-brand-text text-center mb-2">Access Live Demo</h2>
          <p className="text-brand-muted text-sm text-center mb-8">
            Enter your details to launch the full fleet simulation dashboard.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input {...register('name')} placeholder="Your name" className="input-field" />
              {errors.name && <p className="text-brand-red text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input {...register('email')} type="email" placeholder="Work email" className="input-field" />
              {errors.email && <p className="text-brand-red text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input {...register('company')} placeholder="Company name" className="input-field" />
              {errors.company && <p className="text-brand-red text-xs mt-1">{errors.company.message}</p>}
            </div>
            <div>
              <select {...register('fleetSize')} className="input-field">
                <option value="">Fleet size...</option>
                <option value="micro">1–5 vehicles</option>
                <option value="small">6–20 vehicles</option>
                <option value="medium">21–100 vehicles</option>
                <option value="enterprise">101–500 vehicles</option>
                <option value="national">500+ vehicles</option>
              </select>
              {errors.fleetSize && <p className="text-brand-red text-xs mt-1">{errors.fleetSize.message}</p>}
            </div>

            {error && <p className="text-brand-amber text-xs text-center">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 mt-2">
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading Fleet...</>
                : <>Launch Fleet Demo <ChevronRight className="w-4 h-4" /></>
              }
            </button>
          </form>

          <p className="text-center text-brand-subtle text-xs mt-4">
            No commitment. Demo data is fully simulated.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
