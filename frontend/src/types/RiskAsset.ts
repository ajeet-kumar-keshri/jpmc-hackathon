export interface RiskAsset {
  id?: number;
  name: string;
  type: string;
  description?: string;
  value: number;
  riskScore: number;
  riskLevel: RiskLevel;
  owner: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface RiskSummary {
  totalAssets: number;
  totalValue: number;
  averageRiskScore: number;
  lowRiskCount: number;
  mediumRiskCount: number;
  highRiskCount: number;
  criticalRiskCount: number;
}

export interface Metrics {
  timestamp: string;
  api_requests_total: number;
  api_requests_per_second: number;
  response_time_avg_ms: number;
  response_time_95th_percentile_ms: number;
  error_rate_percent: number;
  cpu_usage_percent: number;
  memory_usage_percent: number;
  active_connections: number;
  database_connections: number;
}