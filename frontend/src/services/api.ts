import axios from 'axios';
import { RiskAsset, RiskSummary, Metrics } from '../types/RiskAsset';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const assetApi = {
  // Get all assets
  getAllAssets: () => api.get<RiskAsset[]>('/assets'),
  
  // Get asset by ID
  getAssetById: (id: number) => api.get<RiskAsset>(`/assets/${id}`),
  
  // Create new asset
  createAsset: (asset: Omit<RiskAsset, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<RiskAsset>('/assets', asset),
  
  // Update asset
  updateAsset: (id: number, asset: Omit<RiskAsset, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.put<RiskAsset>(`/assets/${id}`, asset),
  
  // Delete asset
  deleteAsset: (id: number) => api.delete(`/assets/${id}`),
  
  // Get assets by risk level
  getAssetsByRiskLevel: (riskLevel: string) => 
    api.get<RiskAsset[]>(`/assets/risk-level/${riskLevel}`),
  
  // Get assets by type
  getAssetsByType: (type: string) => 
    api.get<RiskAsset[]>(`/assets/type/${type}`),
  
  // Get assets by owner
  getAssetsByOwner: (owner: string) => 
    api.get<RiskAsset[]>(`/assets/owner/${owner}`),
  
  // Get assets by location
  getAssetsByLocation: (location: string) => 
    api.get<RiskAsset[]>(`/assets/location/${location}`),
  
  // Get risk summary
  getRiskSummary: () => api.get<RiskSummary>('/assets/risk-summary'),
};

export const metricsApi = {
  // Get system metrics
  getMetrics: () => api.get<Metrics>('/metrics'),
  
  // Get health status
  getHealth: () => api.get('/metrics/health'),
};

export default api;