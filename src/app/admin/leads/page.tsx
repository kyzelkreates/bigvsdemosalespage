'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Filter, ChevronDown } from 'lucide-react'
import { cn, timeAgo, fleetSizeLabel } from '@/lib/utils'
import type { Lead, LeadStage } from '@/types'

const STAGES: LeadStage[] = ['new','contacted','demo','qualified','converted']
const STAGE_COLORS: Record<LeadStage, string> = {
  new:'cyan', contacted:'blue', demo:'amber', qualified:'green', converted:'green'
}

export default function LeadCRMPage() {
  const [leads,  setLeads]  = useState<Lead[]>([])
  const [loading,setLoading]= useState(true)
  const [search, setSearch] = useState('')
  const [stage,  setStage]  = useState('')

  useEffect(() => {
    const params = new URLSearchParams()
    if (stage) params.set('stage', stage)
    fetch(`/api/leads?${params}&limit=100`)
      .then(r => r.json())
      .then(d => { setLeads(d.data?.leads ?? []); setLoading(false) })
  }, [stage])

  const updateStage = async (leadId: string, newStage: LeadStage) => {
    await fetch(`/api/admin/leads/${leadId}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ stage: newStage }) })
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l))
  }

  const filtered = leads.filter(l =>
    !search || l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.company.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-brand-text">Fleet Lead CRM</h1>
          <p className="text-brand-muted text-sm">{leads.length} total leads</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads…" className="input-field pl-9" />
        </div>
        <select value={stage} onChange={e => setStage(e.target.value)} className="input-field w-40">
          <option value="">All stages</option>
          {STAGES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border/40 text-left">
                {['Contact','Company','Fleet','Score','Stage','Source','Joined'].map(h => (
                  <th key={h} className="px-5 py-3 text-brand-subtle text-xs font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/30">
              {loading ? (
                Array.from({length:5}).map((_,i) => (
                  <tr key={i}><td colSpan={7} className="px-5 py-4"><div className="h-4 bg-brand-surface/50 rounded animate-pulse" /></td></tr>
                ))
              ) : filtered.map((lead, i) => (
                <motion.tr key={lead.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: i * 0.03 }} className="hover:bg-brand-surface/20 transition-colors">
                  <td className="px-5 py-3">
                    <p className="text-brand-text text-sm font-semibold">{lead.name}</p>
                    <p className="text-brand-subtle text-xs">{lead.email}</p>
                  </td>
                  <td className="px-5 py-3 text-brand-muted text-sm">{lead.company}</td>
                  <td className="px-5 py-3 text-brand-muted text-sm">{fleetSizeLabel(lead.fleetSize)}</td>
                  <td className="px-5 py-3">
                    <span className={cn('text-sm font-bold', lead.fitScore >= 80 ? 'text-brand-green' : lead.fitScore >= 60 ? 'text-brand-amber' : 'text-brand-muted')}>
                      {lead.fitScore}/100
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={lead.stage}
                      onChange={e => updateStage(lead.id, e.target.value as LeadStage)}
                      className={cn('text-xs font-semibold rounded-lg px-2 py-1 border cursor-pointer focus:outline-none',
                        `bg-brand-${STAGE_COLORS[lead.stage]}/10 text-brand-${STAGE_COLORS[lead.stage]} border-brand-${STAGE_COLORS[lead.stage]}/20`
                      )}
                    >
                      {STAGES.map(s => <option key={s} value={s} className="capitalize bg-brand-charcoal">{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-brand-muted text-xs capitalize">{lead.source}</td>
                  <td className="px-5 py-3 text-brand-subtle text-xs">{lead.createdAt ? timeAgo(lead.createdAt) : '—'}</td>
                </motion.tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-brand-muted text-sm">No leads found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
