'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Zap, ChevronRight, ChevronLeft, Check, Truck, Users,
  MapPin, Shield, Camera, Radio, Shuffle, Globe, Wrench,
  Star, Loader2, CheckCircle2
} from 'lucide-react'

// ── TYPES ───────────────────────────────────────────────────────

interface FormState {
  // Step 1 — Contact
  name: string
  email: string
  phone: string
  company: string

  // Step 2 — Fleet profile
  industry: string
  fleetSize: string
  driverCount: number
  vehicleTypes: string[]
  country: string

  // Step 3 — Operations
  deliveryVolume: number
  routeRequirements: string
  urgency: string
  complianceNeeds: string[]

  // Step 4 — Features
  trackingNeeds: string
  cameraNeeds: string
  safetyFeatures: string[]
  dispatchNeeds: string
  whiteLabel: boolean
  integrations: string[]
}

const INITIAL: FormState = {
  name: '', email: '', phone: '', company: '',
  industry: '', fleetSize: '', driverCount: 1, vehicleTypes: [], country: 'United Kingdom',
  deliveryVolume: 10, routeRequirements: '', urgency: 'medium', complianceNeeds: [],
  trackingNeeds: '', cameraNeeds: '', safetyFeatures: [], dispatchNeeds: '', whiteLabel: false, integrations: [],
}

// ── OPTION HELPERS ───────────────────────────────────────────────

function Toggle({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
        selected
          ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan'
          : 'bg-white/5 border-white/10 text-brand-muted hover:border-white/20'
      }`}
    >
      {selected && <Check className="w-3 h-3 inline mr-1.5" />}
      {label}
    </button>
  )
}

function Radio2({ label, value, selected, onChange }: { label: string; value: string; selected: boolean; onChange: (v: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex items-center gap-3 p-4 rounded-xl border w-full text-left transition-all ${
        selected
          ? 'bg-brand-cyan/10 border-brand-cyan'
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${selected ? 'border-brand-cyan bg-brand-cyan' : 'border-brand-muted'}`} />
      <span className={`text-sm ${selected ? 'text-brand-text font-semibold' : 'text-brand-muted'}`}>{label}</span>
    </button>
  )
}

function NumberStepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div>
      <p className="text-brand-muted text-sm mb-2">{label}</p>
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => onChange(Math.max(min, value - (value > 50 ? 10 : 1)))}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-brand-text hover:bg-white/10 transition-colors text-lg font-bold">
          −
        </button>
        <span className="text-2xl font-black text-brand-text w-16 text-center">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + (value >= 50 ? 10 : 1)))}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-brand-text hover:bg-white/10 transition-colors text-lg font-bold">
          +
        </button>
      </div>
    </div>
  )
}

// ── STEPS ────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Contact',    icon: Users    },
  { id: 2, label: 'Fleet',      icon: Truck    },
  { id: 3, label: 'Operations', icon: MapPin   },
  { id: 4, label: 'Features',   icon: Wrench   },
  { id: 5, label: 'Quote',      icon: Star     },
]

// ── MAIN COMPONENT ───────────────────────────────────────────────

export default function OnboardingPage() {
  const router      = useRouter()
  const [step,      setStep]      = useState(1)
  const [form,      setForm]      = useState<FormState>(INITIAL)
  const [submitting,setSubmitting]= useState(false)
  const [result,    setResult]    = useState<any>(null)
  const [error,     setError]     = useState<string | null>(null)

  const set = (key: keyof FormState, val: any) => setForm(f => ({ ...f, [key]: val }))

  const toggleArr = (key: keyof FormState, val: string) => {
    const arr = (form[key] as string[])
    set(key, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const canNext = () => {
    if (step === 1) return form.name && form.email && form.company
    if (step === 2) return form.industry && form.fleetSize && form.driverCount >= 1
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const res  = await fetch('/api/quiz', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error ?? 'Submission failed')
      setResult(json.data)
      setStep(5)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-brand-asphalt flex flex-col">

      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center gap-3">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-cyan-blue flex items-center justify-center">
            <Zap className="w-4 h-4 text-brand-asphalt" />
          </div>
          <span className="text-brand-text font-bold text-sm hidden sm:block">Big V's Best Routes</span>
        </a>
        <span className="text-brand-muted text-sm ml-2">/ Fleet Assessment</span>
      </div>

      {/* Progress bar */}
      <div className="px-6 pt-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > s.id ? 'bg-brand-cyan text-brand-asphalt'
                  : step === s.id ? 'bg-brand-cyan/20 border border-brand-cyan text-brand-cyan'
                  : 'bg-white/5 border border-white/10 text-brand-muted'
                }`}>
                  {step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
                </div>
                <span className={`text-xs hidden sm:block ${step === s.id ? 'text-brand-text font-semibold' : 'text-brand-muted'}`}>{s.label}</span>
                {i < STEPS.length - 1 && <div className={`h-px w-6 sm:w-12 mx-2 ${step > s.id ? 'bg-brand-cyan' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >

              {/* ── STEP 1: CONTACT ─────────────────────────── */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-brand-text">Let's get to know you</h2>
                    <p className="text-brand-muted mt-1">Your fleet assessment starts here. Takes about 3 minutes.</p>
                  </div>

                  {[
                    { key: 'name',    label: 'Your Name',       placeholder: 'John Smith',               type: 'text'  },
                    { key: 'email',   label: 'Email Address',   placeholder: 'john@company.com',         type: 'email' },
                    { key: 'phone',   label: 'Phone (optional)',placeholder: '+44 7000 000000',           type: 'tel'   },
                    { key: 'company', label: 'Company Name',    placeholder: 'Smith Logistics Ltd.',      type: 'text'  },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="text-brand-text text-sm font-semibold block mb-2">{label}</label>
                      <input
                        type={type}
                        value={(form as any)[key]}
                        onChange={e => set(key as any, e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-text placeholder-brand-muted/50 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ── STEP 2: FLEET PROFILE ───────────────────── */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-brand-text">Tell us about your fleet</h2>
                    <p className="text-brand-muted mt-1">This helps us tailor the right solution for your operation.</p>
                  </div>

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-3">Industry</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ['logistics',  '📦 Logistics & Freight'],
                        ['delivery',   '🛵 Last-Mile Delivery'],
                        ['transport',  '🚌 Passenger Transport'],
                        ['fleet',      '🚛 Fleet Management'],
                        ['emergency',  '🚨 Emergency Services'],
                        ['other',      '⚙️ Other'],
                      ].map(([val, label]) => (
                        <Radio2 key={val} label={label} value={val} selected={form.industry === val} onChange={v => set('industry', v)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-3">Fleet Size</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        ['micro',      '1–5 vehicles',     'Getting started'],
                        ['small',      '6–20 vehicles',    'Growing fleet'],
                        ['medium',     '21–100 vehicles',  'Established operation'],
                        ['enterprise', '101–500 vehicles', 'Enterprise scale'],
                        ['national',   '500+ vehicles',    'National network'],
                      ].map(([val, label, sub]) => (
                        <button key={val} type="button" onClick={() => set('fleetSize', val)}
                          className={`flex items-center justify-between p-4 rounded-xl border w-full text-left transition-all ${
                            form.fleetSize === val ? 'bg-brand-cyan/10 border-brand-cyan' : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}>
                          <span className={`text-sm font-semibold ${form.fleetSize === val ? 'text-brand-text' : 'text-brand-muted'}`}>{label}</span>
                          <span className="text-brand-muted text-xs">{sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <NumberStepper label="Number of Drivers" value={form.driverCount} min={1} max={1000} onChange={v => set('driverCount', v)} />

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-3">Vehicle Types (select all that apply)</label>
                    <div className="flex flex-wrap gap-2">
                      {['Vans', 'HGVs', 'Motorcycles', 'Trucks', 'Buses', 'Refrigerated', 'Tankers', 'Cars', 'Bikes', 'Specialist'].map(v => (
                        <Toggle key={v} label={v} selected={form.vehicleTypes.includes(v)} onToggle={() => toggleArr('vehicleTypes', v)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-2">Country / Region of Operation</label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={e => set('country', e.target.value)}
                      placeholder="e.g. United Kingdom, Europe, Global"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-text placeholder-brand-muted/50 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 3: OPERATIONS ──────────────────────── */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-brand-text">Operational requirements</h2>
                    <p className="text-brand-muted mt-1">Help us understand the scale and complexity of your operation.</p>
                  </div>

                  <NumberStepper label="Average daily routes / deliveries" value={form.deliveryVolume} min={1} max={10000} onChange={v => set('deliveryVolume', v)} />

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-3">How urgent is this for you?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ['low',      '🔵 Exploring options',    'No immediate rush'],
                        ['medium',   '🟡 Planning ahead',       '3–6 month horizon'],
                        ['high',     '🟠 Need it soon',         'Within 1–3 months'],
                        ['critical', '🔴 Urgent deployment',    'ASAP'],
                      ].map(([val, label, sub]) => (
                        <button key={val} type="button" onClick={() => set('urgency', val)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            form.urgency === val ? 'bg-brand-cyan/10 border-brand-cyan' : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}>
                          <p className={`text-sm font-semibold ${form.urgency === val ? 'text-brand-text' : 'text-brand-muted'}`}>{label}</p>
                          <p className="text-brand-muted text-xs mt-0.5">{sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-3">Compliance Requirements</label>
                    <div className="flex flex-wrap gap-2">
                      {['GDPR', 'ISO 39001', 'DVS', 'FORS', 'Tachograph', 'Working Time Directive', 'ADR', 'Driver CPC', 'O-Licence', 'COSHH'].map(v => (
                        <Toggle key={v} label={v} selected={form.complianceNeeds.includes(v)} onToggle={() => toggleArr('complianceNeeds', v)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-2">Route Requirements / Special Conditions</label>
                    <textarea
                      value={form.routeRequirements}
                      onChange={e => set('routeRequirements', e.target.value)}
                      placeholder="e.g. multi-drop routes, time windows, restricted areas, return logistics..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-text placeholder-brand-muted/50 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 4: FEATURES ────────────────────────── */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-brand-text">Platform features</h2>
                    <p className="text-brand-muted mt-1">Tell us exactly what you need — we'll scope it precisely.</p>
                  </div>

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-3 flex items-center gap-2">
                      <Radio className="w-4 h-4 text-brand-cyan" /> GPS & Tracking
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        ['realtime',  'Real-time GPS tracking'],
                        ['geofencing','Geofencing & zone alerts'],
                        ['history',   'Route history & replay'],
                        ['eta',       'Live ETA updates'],
                      ].map(([val, label]) => (
                        <Radio2 key={val} label={label} value={val} selected={form.trackingNeeds === val} onChange={v => set('trackingNeeds', v)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-3 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-brand-cyan" /> Camera System
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        ['none',     'Not required'],
                        ['dashcam',  'Dashcam only'],
                        ['multi',    'Multi-camera (cab + exterior)'],
                        ['ai',       'AI-powered event detection'],
                      ].map(([val, label]) => (
                        <Radio2 key={val} label={label} value={val} selected={form.cameraNeeds === val} onChange={v => set('cameraNeeds', v)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-brand-cyan" /> Safety Features
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Driver scoring', 'Fatigue alerts', 'Speed monitoring', 'Harsh braking', 'Collision detection', 'Driver ID', 'Lone worker', 'Panic alarm'].map(v => (
                        <Toggle key={v} label={v} selected={form.safetyFeatures.includes(v)} onToggle={() => toggleArr('safetyFeatures', v)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-3 flex items-center gap-2">
                      <Shuffle className="w-4 h-4 text-brand-cyan" /> Dispatch & Routing
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        ['manual',   'Manual dispatch only'],
                        ['assisted', 'AI-assisted route planning'],
                        ['auto',     'Fully automated dispatch'],
                        ['dynamic',  'Dynamic re-routing in real-time'],
                      ].map(([val, label]) => (
                        <Radio2 key={val} label={label} value={val} selected={form.dispatchNeeds === val} onChange={v => set('dispatchNeeds', v)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-brand-cyan" /> Integrations
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Sage', 'Xero', 'QuickBooks', 'SAP', 'Salesforce', 'HubSpot', 'WooCommerce', 'Shopify', 'Oracle', 'Microsoft 365', 'Slack', 'Custom API'].map(v => (
                        <Toggle key={v} label={v} selected={form.integrations.includes(v)} onToggle={() => toggleArr('integrations', v)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-brand-text text-sm font-semibold block mb-3">White-Label Requirements</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        [false, '🎨 Big V\'s standard branding'],
                        [true,  '🏷️ Full white-label (my brand)'],
                      ].map(([val, label]) => (
                        <button key={String(val)} type="button" onClick={() => set('whiteLabel', val)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            form.whiteLabel === val ? 'bg-brand-cyan/10 border-brand-cyan' : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}>
                          <span className={`text-sm font-semibold ${form.whiteLabel === val ? 'text-brand-text' : 'text-brand-muted'}`}>{label as string}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 5: RESULT ──────────────────────────── */}
              {step === 5 && result && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-cyan/20 border border-brand-cyan flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-brand-cyan" />
                    </div>
                    <h2 className="text-2xl font-black text-brand-text">Your Fleet Assessment</h2>
                    <p className="text-brand-muted mt-1">Here's what our AI has scoped for {form.company}</p>
                  </div>

                  {/* Fit score */}
                  <div className="glass-card p-6 text-center">
                    <p className="text-brand-muted text-sm mb-2">Fleet Fit Score</p>
                    <div className="text-6xl font-black text-brand-cyan mb-2">{result.fitScore}<span className="text-2xl text-brand-muted">/100</span></div>
                    <p className="text-brand-muted text-sm capitalize">
                      {result.engagement === 'hot' ? '🔴 High-priority match' : result.engagement === 'warm' ? '🟡 Strong fit' : '🟢 Good potential'}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="glass-card p-6">
                    <p className="text-brand-muted text-xs font-semibold uppercase tracking-widest mb-3">AI-Estimated Investment Range</p>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-3xl font-black text-brand-text">£{result.valuation.valueLow.toLocaleString()}</span>
                      <span className="text-brand-muted mb-1">–</span>
                      <span className="text-3xl font-black text-brand-amber">£{result.valuation.valueHigh.toLocaleString()}</span>
                    </div>
                    <p className="text-brand-muted text-xs">{result.valuation.deploymentScope}</p>
                    <p className="text-brand-muted text-sm mt-3 leading-relaxed">{result.valuation.scopeDescription}</p>
                  </div>

                  {/* ROI */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      ['Fuel Savings',   `£${result.valuation.roiFuelSavings?.toLocaleString() ?? 0}`],
                      ['Time Savings',   `£${result.valuation.roiTimeSavings?.toLocaleString() ?? 0}`],
                      ['Cost Reduction', `£${result.valuation.roiCostReduction?.toLocaleString() ?? 0}`],
                    ].map(([label, val]) => (
                      <div key={label} className="glass-card p-4 text-center">
                        <p className="text-brand-muted text-xs mb-1">{label}</p>
                        <p className="text-brand-cyan font-bold">{val}/yr</p>
                      </div>
                    ))}
                  </div>

                  <div className="glass-card p-5 border border-brand-cyan/20">
                    <p className="text-brand-text text-sm font-semibold mb-1">What happens next?</p>
                    <p className="text-brand-muted text-sm">We've received your assessment and will be in touch within 24 hours to discuss your tailored fleet solution. A full proposal will be prepared based on your requirements.</p>
                  </div>

                  <a href="/" className="btn-secondary w-full justify-center">
                    Return to Homepage
                  </a>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Navigation */}
          {step < 5 && (
            <div className="flex items-center justify-between mt-8">
              {step > 1 ? (
                <button onClick={() => setStep(s => s - 1)} className="btn-secondary flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  onClick={() => canNext() && setStep(s => s + 1)}
                  disabled={!canNext()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-60"
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Analysing…</> : <>Get My Quote <Star className="w-4 h-4" /></>}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

    </main>
  )
}
