import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { assetApi, metricsApi } from '../services/api';
import { RiskSummary, Metrics } from '../types/RiskAsset';

const COLORS = {
  LOW: '#4caf50',
  MEDIUM: '#ff9800',
  HIGH: '#f44336',
  CRITICAL: '#9c27b0',
};

const Dashboard: React.FC = () => {
  const [riskSummary, setRiskSummary] = useState<RiskSummary | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryResponse, metricsResponse] = await Promise.all([
          assetApi.getRiskSummary(),
          metricsApi.getMetrics(),
        ]);
        setRiskSummary(summaryResponse.data);
        setMetrics(metricsResponse.data);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const riskDistributionData = riskSummary ? [
    { name: 'Low Risk', value: riskSummary.lowRiskCount, color: COLORS.LOW },
    { name: 'Medium Risk', value: riskSummary.mediumRiskCount, color: COLORS.MEDIUM },
    { name: 'High Risk', value: riskSummary.highRiskCount, color: COLORS.HIGH },
    { name: 'Critical Risk', value: riskSummary.criticalRiskCount, color: COLORS.CRITICAL },
  ] : [];

  const performanceData = metrics ? [
    { name: 'CPU Usage', value: metrics.cpu_usage_percent },
    { name: 'Memory Usage', value: metrics.memory_usage_percent },
    { name: 'Error Rate', value: metrics.error_rate_percent },
  ] : [];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Risk Asset Dashboard
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
        {/* Summary Cards */}
        <Box sx={{ flex: '1 1 250px', minWidth: '250px' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Assets
              </Typography>
              <Typography variant="h4">
                {riskSummary?.totalAssets || 0}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: "1 1 250px", minWidth: "250px" }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Value
              </Typography>
              <Typography variant="h4">
                ${riskSummary?.totalValue?.toLocaleString() || 0}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: "1 1 250px", minWidth: "250px" }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Risk Score
              </Typography>
              <Typography variant="h4">
                {riskSummary?.averageRiskScore?.toFixed(1) || 0}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: "1 1 250px", minWidth: "250px" }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                API Requests/sec
              </Typography>
              <Typography variant="h4">
                {metrics?.api_requests_per_second || 0}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Risk Distribution Chart */}
        <Box sx={{ flex: "1 1 400px", minWidth: "400px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Risk Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Performance Metrics */}
        <Box sx={{ flex: "1 1 400px", minWidth: "400px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* System Metrics */}
        <Box sx={{ width: "100%" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Metrics
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: "1 1 250px", minWidth: "250px" }}>
                  <Typography variant="body2" color="textSecondary">
                    Response Time (avg)
                  </Typography>
                  <Typography variant="h6">
                    {metrics?.response_time_avg_ms || 0}ms
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 250px", minWidth: "250px" }}>
                  <Typography variant="body2" color="textSecondary">
                    Active Connections
                  </Typography>
                  <Typography variant="h6">
                    {metrics?.active_connections || 0}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 250px", minWidth: "250px" }}>
                  <Typography variant="body2" color="textSecondary">
                    DB Connections
                  </Typography>
                  <Typography variant="h6">
                    {metrics?.database_connections || 0}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 250px", minWidth: "250px" }}>
                  <Typography variant="body2" color="textSecondary">
                    Total API Requests
                  </Typography>
                  <Typography variant="h6">
                    {metrics?.api_requests_total?.toLocaleString() || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;