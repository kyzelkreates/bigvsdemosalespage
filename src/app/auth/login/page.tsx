'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Zap, Loader2 } from 'lucide-react'

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setLoading(true); setError(null)
    try {
      const res  = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Invalid credentials')
      router.push('/admin/dashboard')
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-asphalt p-4">
      <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} className="glass rounded-3xl border border-brand-cyan/20 p-10 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-cyan-blue flex items-center justify-center shadow-glow-cyan"><Zap className="w-6 h-6 text-brand-asphalt" /></div>
          <div><p className="text-brand-cyan text-xs font-semibold tracking-widest uppercase">Big V's Best Routes</p><p className="text-brand-text font-bold">Admin Login</p></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-brand-muted text-xs mb-1.5 block">Username</label>
            <input {...register('username')} placeholder="username" className="input-field" autoComplete="username" />
          </div>
          <div>
            <label className="text-brand-muted text-xs mb-1.5 block">Password</label>
            <input {...register('password')} type="password" placeholder="••••••••••••" className="input-field" autoComplete="current-password" />
          </div>
          {error && <p className="text-brand-red text-xs text-center">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 mt-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
