'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Shield, Zap, Loader2, CheckCircle2, Lock } from 'lucide-react'

const schema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Alphanumeric + underscore only'),
  password: z.string().min(12, 'Minimum 12 characters'),
  confirm:  z.string(),
}).refine(d => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] })

type FormData = z.infer<typeof schema>

export default function SetupPage() {
  const router = useRouter()
  const [loading,  setLoading]  = useState(false)
  const [checking, setChecking] = useState(true)
  const [locked,   setLocked]   = useState(false)
  const [done,     setDone]     = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    fetch('/api/auth/setup').then(r => r.json()).then(d => {
      if (d.ownerExists) setLocked(true)
      setChecking(false)
    })
  }, [])

  const onSubmit = async (data: FormData) => {
    setLoading(true); setError(null)
    try {
      const res  = await fetch('/api/auth/setup', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ username: data.username, password: data.password }) })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setDone(true)
      setTimeout(() => router.push('/auth/login'), 2000)
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  if (checking) return <div className="min-h-screen flex items-center justify-center bg-brand-asphalt"><Loader2 className="w-6 h-6 text-brand-cyan animate-spin" /></div>

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-asphalt p-4">
      <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} className="glass rounded-3xl border border-brand-cyan/20 p-10 max-w-md w-full shadow-glow-cyan">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-cyan-blue flex items-center justify-center"><Zap className="w-6 h-6 text-brand-asphalt" /></div>
          <div><p className="text-brand-cyan text-xs font-semibold tracking-widest uppercase">Big V's Best Routes</p><p className="text-brand-text font-bold">Owner Setup</p></div>
        </div>

        {locked ? (
          <div className="text-center py-8">
            <Lock className="w-12 h-12 text-brand-amber mx-auto mb-4" />
            <h2 className="text-brand-text font-bold text-xl mb-2">Setup Locked</h2>
            <p className="text-brand-muted text-sm mb-6">An owner account already exists. Setup is permanently locked.</p>
            <a href="/auth/login" className="btn-primary justify-center">Go to Login</a>
          </div>
        ) : done ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto mb-4" />
            <h2 className="text-brand-text font-bold text-xl mb-2">Owner Created</h2>
            <p className="text-brand-muted text-sm">Redirecting to login…</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-amber/10 border border-brand-amber/20 mb-6">
              <Shield className="w-4 h-4 text-brand-amber flex-shrink-0" />
              <p className="text-brand-amber text-xs">This screen is shown only once. Create your owner credentials securely.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-brand-muted text-xs mb-1.5 block">Username</label>
                <input {...register('username')} placeholder="owner_username" className="input-field" />
                {errors.username && <p className="text-brand-red text-xs mt-1">{errors.username.message}</p>}
              </div>
              <div>
                <label className="text-brand-muted text-xs mb-1.5 block">Password (min 12 chars)</label>
                <input {...register('password')} type="password" placeholder="••••••••••••" className="input-field" />
                {errors.password && <p className="text-brand-red text-xs mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="text-brand-muted text-xs mb-1.5 block">Confirm Password</label>
                <input {...register('confirm')} type="password" placeholder="••••••••••••" className="input-field" />
                {errors.confirm && <p className="text-brand-red text-xs mt-1">{errors.confirm.message}</p>}
              </div>
              {error && <p className="text-brand-red text-xs text-center">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 mt-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating Owner…</> : <>Create Owner Account</>}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  )
}
