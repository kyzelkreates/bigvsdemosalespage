import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style:    'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-GB').format(n)
}

export function formatPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`
}

export function scoreToGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A'
  if (score >= 75) return 'B'
  if (score >= 60) return 'C'
  if (score >= 40) return 'D'
  return 'F'
}

export function fleetSizeLabel(size: string): string {
  const map: Record<string, string> = {
    micro:      '1–5 vehicles',
    small:      '6–20 vehicles',
    medium:     '21–100 vehicles',
    enterprise: '101–500 vehicles',
    national:   '500+ vehicles',
  }
  return map[size] ?? size
}

export function deploymentLabel(profile: string): string {
  const map: Record<string, string> = {
    light_fleet:        'Light Fleet',
    standard_fleet:     'Standard Fleet',
    enterprise_fleet:   'Enterprise Fleet',
    national_operations:'National Operations',
  }
  return map[profile] ?? profile
}

export function truncate(str: string, len = 80): string {
  return str.length > len ? str.slice(0, len) + '…' : str
}

export function timeAgo(date: Date | string): string {
  const d   = new Date(date)
  const now = new Date()
  const s   = Math.floor((now.getTime() - d.getTime()) / 1000)
  if (s < 60)  return `${s}s ago`
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}
