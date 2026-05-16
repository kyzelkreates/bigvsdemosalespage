// ══════════════════════════════════════════════════════════════
// BIG V'S BEST ROUTES — GLOBAL ID SYSTEM
// FORMAT: BVR-YYYY-TYPE-XXXX(-UUID)
// ══════════════════════════════════════════════════════════════

import { customAlphabet } from 'nanoid'

const numeric = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)
const uuid    = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 8)

type BvrType =
  | 'LEAD'
  | 'SES'
  | 'INS'
  | 'FLT'
  | 'VEH'
  | 'RTE'
  | 'EVT'
  | 'QTE'
  | 'SMS'

export function generateBvrId(type: BvrType): string {
  const year = new Date().getFullYear()
  const seq  = numeric()

  if (type === 'EVT') {
    return `BVR-${year}-${type}-${seq}-${uuid()}`
  }

  return `BVR-${year}-${type}-${seq}`
}

export const BVR = {
  lead:    () => generateBvrId('LEAD'),
  session: () => generateBvrId('SES'),
  install: () => generateBvrId('INS'),
  fleet:   () => generateBvrId('FLT'),
  vehicle: () => generateBvrId('VEH'),
  route:   () => generateBvrId('RTE'),
  event:   () => generateBvrId('EVT'),
  quote:   () => generateBvrId('QTE'),
  sms:     () => generateBvrId('SMS'),
}
