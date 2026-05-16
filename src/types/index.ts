// ══════════════════════════════════════════════════════════════
// BIG V'S BEST ROUTES — GLOBAL TYPE DEFINITIONS
// ══════════════════════════════════════════════════════════════

// ── ENUMS ──────────────────────────────────────────────────────

export type UserRole = 'OWNER' | 'ADMIN' | 'INVESTOR'

export type LeadStage = 'new' | 'contacted' | 'demo' | 'qualified' | 'converted'

export type Industry =
  | 'logistics'
  | 'fleet'
  | 'delivery'
  | 'transport'
  | 'emergency'
  | 'other'

export type FleetSize = 'micro' | 'small' | 'medium' | 'enterprise' | 'national'

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical'

export type EventSource = 'seo' | 'demo' | 'pwa' | 'admin' | 'direct'

export type EventType =
  | 'install_event'
  | 'session_start'
  | 'session_end'
  | 'route_view'
  | 'fleet_interaction'
  | 'lead_created'
  | 'quiz_completed'
  | 'quote_generated'
  | 'sms_sent'
  | 'page_view'
  | 'cta_click'
  | 'exit_intent'

export type SmsStatus = 'pending' | 'sent' | 'delivered' | 'failed'

export type DeploymentProfile =
  | 'light_fleet'
  | 'standard_fleet'
  | 'enterprise_fleet'
  | 'national_operations'

export type VehicleStatus = 'idle' | 'active' | 'in-transit' | 'offline'

export type RouteStatus = 'pending' | 'active' | 'completed' | 'cancelled'

// ── MODELS ─────────────────────────────────────────────────────

export interface User {
  id: string
  username: string
  email?: string
  role: UserRole
  isActive: boolean
  lastLoginAt?: Date
  createdAt: Date
}

export interface Lead {
  id: string
  bvrId: string
  name: string
  email: string
  phone: string
  company: string
  industry: Industry
  fleetSize: FleetSize
  stage: LeadStage
  fitScore: number
  urgency: UrgencyLevel
  source: EventSource
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface QuizResult {
  id: string
  leadId: string
  industryType: Industry
  fleetSizeAnswer: FleetSize
  driverCount: number
  deliveryVolume: number
  mainChallenge: string
  urgencyLevel: UrgencyLevel
  fleetFitScore: number
  solutionCategory: string
  deploymentProfile: DeploymentProfile
  engagementClass: string
  createdAt: Date
}

export interface Quote {
  id: string
  bvrId: string
  leadId: string
  valueLow: number
  valueHigh: number
  currency: string
  roiFuelSavings?: number
  roiTimeSavings?: number
  roiCostReduction?: number
  complexityLevel: DeploymentProfile
  confidenceScore: number
  deploymentScope: string
  scopeDescription: string
  createdAt: Date
}

export interface Fleet {
  id: string
  bvrId: string
  name: string
  leadId?: string
  size: FleetSize
  vehicleCount: number
  driverCount: number
  industry: Industry
  usageIntensity: number
  operationalComplexity: number
  logisticsLoadFactor: number
  routeDensityScore: number
  vehicles?: Vehicle[]
  routes?: Route[]
}

export interface Vehicle {
  id: string
  bvrId: string
  fleetId: string
  driverId?: string
  name: string
  type: string
  status: VehicleStatus
  lat?: number
  lng?: number
  speed?: number
  heading?: number
}

export interface Route {
  id: string
  bvrId: string
  fleetId: string
  vehicleId?: string
  name: string
  origin: string
  destination: string
  distance?: number
  estimatedDuration?: number
  actualDuration?: number
  status: RouteStatus
  waypoints?: Waypoint[]
  trafficData?: TrafficData
  fuelUsed?: number
  co2Saved?: number
}

export interface Waypoint {
  lat: number
  lng: number
  name: string
  eta?: string
  status?: 'pending' | 'completed' | 'skipped'
}

export interface TrafficData {
  level: 'low' | 'moderate' | 'high' | 'severe'
  delayMinutes: number
  incidents: number
}

export interface Session {
  id: string
  bvrId: string
  leadId?: string
  installId?: string
  source: EventSource
  userAgent?: string
  device?: string
  country?: string
  createdAt: Date
  endedAt?: Date
}

export interface Install {
  id: string
  bvrId: string
  leadId?: string
  fleetId?: string
  deviceType: string
  platform?: string
  firstLaunchAt: Date
  lastSeenAt: Date
  retained1Day: boolean
  retained7Day: boolean
  retained30Day: boolean
  reinstallCount: number
}

export interface Event {
  id: string
  bvrId: string
  type: EventType
  source: EventSource
  sessionId?: string
  leadId?: string
  fleetId?: string
  orgId?: string
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface SmsLog {
  id: string
  bvrId: string
  leadId?: string
  recipient: string
  message: string
  status: SmsStatus
  provider: string
  externalId?: string
  errorMessage?: string
  deliveredAt?: Date
  createdAt: Date
}

export interface SystemMetric {
  id: string
  metricKey: string
  metricValue: number
  unit?: string
  tags?: Record<string, string>
  createdAt: Date
}

// ── LEAD FORM ──────────────────────────────────────────────────

export interface LeadFormData {
  name: string
  email: string
  phone: string
  company: string
  industry: Industry
  fleetSize: FleetSize
}

// ── QUIZ ───────────────────────────────────────────────────────

export interface QuizAnswers {
  industryType: Industry
  fleetSizeAnswer: FleetSize
  driverCount: number
  deliveryVolume: number
  mainChallenge: string
  urgencyLevel: UrgencyLevel
}

// ── AI VALUATION ───────────────────────────────────────────────

export interface ValuationInput {
  fleetSize: FleetSize
  driverCount: number
  routeVolume: number
  fitScore: number
  urgency: UrgencyLevel
  industry: Industry
  usageIntensity?: number
  operationalComplexity?: number
}

export interface ValuationOutput {
  valueLow: number
  valueHigh: number
  currency: string
  roiFuelSavings: number
  roiTimeSavings: number
  roiCostReduction: number
  complexityLevel: DeploymentProfile
  confidenceScore: number
  deploymentScope: string
  scopeDescription: string
}

// ── ADMIN DASHBOARD ────────────────────────────────────────────

export interface DashboardMetrics {
  totalLeads: number
  leadsThisWeek: number
  conversionRate: number
  pipelineValue: { low: number; high: number }
  avgFitScore: number
  smsDeliveryRate: number
  activeSessions: number
  pwaInstalls: number
  leadsByStage: Record<LeadStage, number>
  leadsByIndustry: Record<Industry, number>
  leadsByFleetSize: Record<FleetSize, number>
  recentLeads: Lead[]
}

// ── SIMULATION ─────────────────────────────────────────────────

export interface SimulatedVehicle extends Vehicle {
  driverName: string
  currentDelivery?: string
  progress: number  // 0–100
  eta: string
  batteryLevel?: number
  fuelLevel?: number
}

export interface SimulatedRoute extends Route {
  currentVehicle?: SimulatedVehicle
  completedStops: number
  totalStops: number
  onTimeStatus: 'on-time' | 'delayed' | 'early'
}

export interface FleetSimState {
  vehicles: SimulatedVehicle[]
  routes: SimulatedRoute[]
  activeDispatches: number
  completedToday: number
  pendingDeliveries: number
  systemHealth: number  // 0–100
  lastUpdated: Date
}

// ── API RESPONSES ──────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// ── AUTH ───────────────────────────────────────────────────────

export interface AuthSession {
  userId: string
  username: string
  role: UserRole
  expiresAt: Date
}

export interface LoginCredentials {
  username: string
  password: string
}
