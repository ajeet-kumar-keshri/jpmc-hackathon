import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,

  Card,
  CardContent,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
} from 'recharts';
import { assetApi } from '../services/api';
import { RiskAsset, RiskLevel } from '../types/RiskAsset';

const RiskAnalysis: React.FC = () => {
  const [assets, setAssets] = useState<RiskAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await assetApi.getAllAssets();
      setAssets(response.data);
    } catch (err) {
      setError('Failed to fetch assets for analysis');
      console.error('Fetch assets error:', err);
    } finally {
      setLoading(false);
    }
  };

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

  // Data processing for charts
  const riskByTypeData = assets.reduce((acc, asset) => {
    const existing = acc.find(item => item.type === asset.type);
    if (existing) {
      existing.count += 1;
      existing.totalValue += asset.value;
      existing.avgRiskScore = (existing.avgRiskScore + asset.riskScore) / 2;
    } else {
      acc.push({
        type: asset.type,
        count: 1,
        totalValue: asset.value,
        avgRiskScore: asset.riskScore,
      });
    }
    return acc;
  }, [] as any[]);

  const riskByLocationData = assets.reduce((acc, asset) => {
    const existing = acc.find(item => item.location === asset.location);
    if (existing) {
      existing.count += 1;
      existing.totalValue += asset.value;
      existing.avgRiskScore = (existing.avgRiskScore + asset.riskScore) / 2;
    } else {
      acc.push({
        location: asset.location,
        count: 1,
        totalValue: asset.value,
        avgRiskScore: asset.riskScore,
      });
    }
    return acc;
  }, [] as any[]);

  const valueVsRiskData = assets.map(asset => ({
    name: asset.name,
    value: asset.value,
    riskScore: asset.riskScore,
    riskLevel: asset.riskLevel,
  }));

  const highRiskAssets = assets
    .filter(asset => asset.riskLevel === RiskLevel.HIGH || asset.riskLevel === RiskLevel.CRITICAL)
    .sort((a, b) => b.riskScore - a.riskScore);

  const getRiskLevelColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.LOW:
        return 'success';
      case RiskLevel.MEDIUM:
        return 'warning';
      case RiskLevel.HIGH:
        return 'error';
      case RiskLevel.CRITICAL:
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Risk Analysis
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {/* Risk by Asset Type */}
        <Box sx={{ flex: "1 1 400px", minWidth: "400px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Risk Score by Asset Type
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskByTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgRiskScore" fill="#8884d8" name="Avg Risk Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Risk by Location */}
        <Box sx={{ flex: "1 1 400px", minWidth: "400px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Risk Score by Location
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskByLocationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgRiskScore" fill="#82ca9d" name="Avg Risk Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Value vs Risk Scatter Plot */}
        <Box sx={{ width: "100%" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Asset Value vs Risk Score
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={valueVsRiskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="value" 
                    name="Value" 
                    type="number" 
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <YAxis dataKey="riskScore" name="Risk Score" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'value' ? `$${value.toLocaleString()}` : value,
                      name === 'value' ? 'Value' : 'Risk Score'
                    ]}
                    labelFormatter={(label) => `Asset: ${label}`}
                  />
                  <Scatter dataKey="riskScore" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* High Risk Assets Table */}
        <Box sx={{ width: "100%" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                High Risk Assets (Risk Score ≥ 60)
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Asset Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Value</TableCell>
                      <TableCell>Risk Score</TableCell>
                      <TableCell>Risk Level</TableCell>
                      <TableCell>Owner</TableCell>
                      <TableCell>Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {highRiskAssets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>{asset.type}</TableCell>
                        <TableCell>${asset.value.toLocaleString()}</TableCell>
                        <TableCell>{asset.riskScore}</TableCell>
                        <TableCell>
                          <Chip
                            label={asset.riskLevel}
                            color={getRiskLevelColor(asset.riskLevel) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{asset.owner}</TableCell>
                        <TableCell>{asset.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Summary Statistics */}
        <Box sx={{ width: "100%" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Risk Analysis Summary
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                  <Typography variant="body2" color="textSecondary">
                    Total High Risk Assets
                  </Typography>
                  <Typography variant="h6">
                    {assets.filter(a => a.riskLevel === RiskLevel.HIGH).length}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                  <Typography variant="body2" color="textSecondary">
                    Total Critical Risk Assets
                  </Typography>
                  <Typography variant="h6">
                    {assets.filter(a => a.riskLevel === RiskLevel.CRITICAL).length}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                  <Typography variant="body2" color="textSecondary">
                    Highest Risk Score
                  </Typography>
                  <Typography variant="h6">
                    {Math.max(...assets.map(a => a.riskScore)).toFixed(1)}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                  <Typography variant="body2" color="textSecondary">
                    Most Valuable High Risk Asset
                  </Typography>
                  <Typography variant="h6">
                    ${Math.max(...highRiskAssets.map(a => a.value)).toLocaleString()}
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

export default RiskAnalysis;