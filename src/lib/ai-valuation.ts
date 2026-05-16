// ══════════════════════════════════════════════════════════════
// BIG V'S BEST ROUTES — AI VALUE ENGINE
// Dynamic Logistics Scoped Valuation (NO pricing tiers)
// ══════════════════════════════════════════════════════════════

import type {
  ValuationInput,
  ValuationOutput,
  FleetSize,
  UrgencyLevel,
  Industry,
  DeploymentProfile,
} from '@/types'

// ── SCORING WEIGHTS ─────────────────────────────────────────────

const FLEET_SIZE_MULTIPLIER: Record<FleetSize, number> = {
  micro:      1.0,
  small:      1.8,
  medium:     3.5,
  enterprise: 8.0,
  national:   20.0,
}

const URGENCY_MULTIPLIER: Record<UrgencyLevel, number> = {
  low:      0.8,
  medium:   1.0,
  high:     1.3,
  critical: 1.6,
}

const INDUSTRY_COMPLEXITY: Record<Industry, number> = {
  logistics:  1.2,
  fleet:      1.0,
  delivery:   0.9,
  transport:  1.1,
  emergency:  1.5,
  other:      0.8,
}

// ── DEPLOYMENT CLASSIFICATION ───────────────────────────────────

function classifyDeployment(input: ValuationInput): DeploymentProfile {
  const { fleetSize, driverCount, routeVolume } = input

  if (fleetSize === 'national' || driverCount > 200 || routeVolume > 500) {
    return 'national_operations'
  }
  if (fleetSize === 'enterprise' || driverCount > 50 || routeVolume > 100) {
    return 'enterprise_fleet'
  }
  if (fleetSize === 'medium' || driverCount > 15 || routeVolume > 30) {
    return 'standard_fleet'
  }
  return 'light_fleet'
}

const DEPLOYMENT_LABELS: Record<DeploymentProfile, string> = {
  light_fleet:        'Light Fleet Deployment',
  standard_fleet:     'Standard Fleet Operations',
  enterprise_fleet:   'Enterprise Fleet Platform',
  national_operations:'National Logistics Network',
}

// ── BASE VALUE RANGES (£) ───────────────────────────────────────

const BASE_RANGES: Record<DeploymentProfile, { low: number; high: number }> = {
  light_fleet:        { low: 800,   high: 2_500  },
  standard_fleet:     { low: 3_500, high: 12_000 },
  enterprise_fleet:   { low: 15_000,high: 60_000 },
  national_operations:{ low: 75_000,high: 250_000},
}

// ── ROI CALCULATIONS ────────────────────────────────────────────

function calculateRoi(input: ValuationInput, complexity: DeploymentProfile) {
  const fleetMult = FLEET_SIZE_MULTIPLIER[input.fleetSize]

  // Fuel savings: AI routing typically saves 12–18% of fuel
  const annualFuelCostEstimate = input.driverCount * 4_500 * fleetMult
  const fuelSavings = Math.round(annualFuelCostEstimate * 0.15)

  // Time savings: dispatch/routing efficiency
  const hourlyDriverCost = 18 // £/hr average
  const hoursPerDriver   = 240 // hours saved/year
  const timeSavings      = Math.round(input.driverCount * hoursPerDriver * hourlyDriverCost * 0.4)

  // Cost reduction: operational overhead, paper reduction, missed deliveries
  const annualOpsCost   = BASE_RANGES[complexity].low * 2.5
  const costReduction   = Math.round(annualOpsCost * 0.22)

  return { fuelSavings, timeSavings, costReduction }
}

// ── CONFIDENCE SCORE ────────────────────────────────────────────

function calculateConfidence(input: ValuationInput): number {
  let score = 50

  if (input.fitScore > 70)   score += 20
  if (input.fitScore > 85)   score += 10
  if (input.urgency === 'high' || input.urgency === 'critical') score += 10
  if (input.routeVolume > 20) score += 5
  if (input.driverCount > 10) score += 5

  return Math.min(score, 98)
}

// ── SCOPE DESCRIPTION GENERATOR ─────────────────────────────────

function generateScopeDescription(
  input: ValuationInput,
  complexity: DeploymentProfile,
  roi: { fuelSavings: number; timeSavings: number; costReduction: number }
): string {
  const label    = DEPLOYMENT_LABELS[complexity]
  const industry = input.industry.charAt(0).toUpperCase() + input.industry.slice(1)

  return `A tailored ${label} for a ${industry} operation with ${input.driverCount} driver${input.driverCount !== 1 ? 's' : ''} across approximately ${input.routeVolume} routes per day. This scope covers AI-powered route optimisation, real-time fleet intelligence, driver coordination, and operational analytics. Projected annual benefit includes £${roi.fuelSavings.toLocaleString()} in fuel savings, £${roi.timeSavings.toLocaleString()} in driver time efficiency, and £${roi.costReduction.toLocaleString()} in operational cost reduction — a combined £${(roi.fuelSavings + roi.timeSavings + roi.costReduction).toLocaleString()} ROI. This valuation reflects operational complexity, scale of deployment, and expected integration depth.`
}

// ── MAIN VALUATION ENGINE ───────────────────────────────────────

export function computeValuation(input: ValuationInput): ValuationOutput {
  const complexity = classifyDeployment(input)
  const base       = BASE_RANGES[complexity]

  // Apply multipliers
  const fleetMult   = FLEET_SIZE_MULTIPLIER[input.fleetSize]
  const urgencyMult = URGENCY_MULTIPLIER[input.urgency]
  const industryMult= INDUSTRY_COMPLEXITY[input.industry]
  const scoreMult   = 0.7 + ((input.fitScore ?? 50) / 100) * 0.6

  const combinedMult = urgencyMult * industryMult * scoreMult

  const valueLow  = Math.round(base.low  * combinedMult / 100) * 100
  const valueHigh = Math.round(base.high * combinedMult / 100) * 100

  const roi              = calculateRoi(input, complexity)
  const confidenceScore  = calculateConfidence(input)

  return {
    valueLow,
    valueHigh,
    currency:          'GBP',
    roiFuelSavings:    roi.fuelSavings,
    roiTimeSavings:    roi.timeSavings,
    roiCostReduction:  roi.costReduction,
    complexityLevel:   complexity,
    confidenceScore,
    deploymentScope:   DEPLOYMENT_LABELS[complexity],
    scopeDescription:  generateScopeDescription(input, complexity, roi),
  }
}

// ── FLEET FIT SCORE ENGINE ──────────────────────────────────────

export function computeFleetFitScore(answers: {
  fleetSize:      FleetSize
  driverCount:    number
  deliveryVolume: number
  urgency:        UrgencyLevel
  industry:       Industry
}): number {
  let score = 0

  // Fleet size (0–30)
  const fleetScores: Record<FleetSize, number> = {
    micro:      5,
    small:      15,
    medium:     25,
    enterprise: 30,
    national:   30,
  }
  score += fleetScores[answers.fleetSize]

  // Driver count (0–25)
  if (answers.driverCount >= 50)   score += 25
  else if (answers.driverCount >= 20) score += 20
  else if (answers.driverCount >= 10) score += 15
  else if (answers.driverCount >= 5)  score += 10
  else score += 5

  // Delivery volume (0–25)
  if (answers.deliveryVolume >= 100)  score += 25
  else if (answers.deliveryVolume >= 50)  score += 20
  else if (answers.deliveryVolume >= 20)  score += 15
  else if (answers.deliveryVolume >= 10)  score += 10
  else score += 5

  // Urgency (0–10)
  const urgencyScores: Record<UrgencyLevel, number> = {
    low: 2, medium: 5, high: 8, critical: 10
  }
  score += urgencyScores[answers.urgency]

  // Industry (0–10)
  const industryScores: Record<Industry, number> = {
    logistics: 10, fleet: 9, transport: 8, delivery: 7, emergency: 10, other: 5
  }
  score += industryScores[answers.industry]

  return Math.min(score, 100)
}

// ── ENGAGEMENT CLASSIFICATION ───────────────────────────────────

export function classifyEngagement(score: number, urgency: UrgencyLevel): string {
  if (score >= 80 || urgency === 'critical') return 'hot'
  if (score >= 60 || urgency === 'high')     return 'warm'
  if (score >= 40)                           return 'cold'
  return 'nurture'
}

// ── FLEET USAGE INTELLIGENCE ────────────────────────────────────

export function computeFleetUsageScores(data: {
  dashboardCount:  number
  vehicleCount:    number
  routeVolume:     number
  driverActivity:  number  // 0–100
  eventVolume:     number
}) {
  const usageIntensity = Math.min(
    Math.round(
      (data.dashboardCount * 10 + data.vehicleCount * 5 + data.routeVolume * 2) / 3
    ),
    100
  )

  const operationalComplexity = Math.min(
    Math.round((data.vehicleCount * 3 + data.driverActivity + data.routeVolume) / 3),
    100
  )

  const logisticsLoadFactor = Math.min(
    Math.round((data.routeVolume * 4 + data.eventVolume * 0.5) / 2),
    100
  )

  const routeDensityScore = Math.min(
    Math.round((data.routeVolume * 6) / Math.max(data.vehicleCount, 1)),
    100
  )

  return { usageIntensity, operationalComplexity, logisticsLoadFactor, routeDensityScore }
}
