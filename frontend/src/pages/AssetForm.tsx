import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { assetApi } from '../services/api';
import { RiskAsset, RiskLevel } from '../types/RiskAsset';

const AssetForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Partial<RiskAsset>>({
    name: '',
    type: '',
    description: '',
    value: 0,
    riskScore: 0,
    riskLevel: RiskLevel.LOW,
    owner: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const assetTypes = [
    'IT Equipment',
    'Software',
    'Data Asset',
    'Physical Asset',
    'Infrastructure',
    'Network Equipment',
    'Security System',
  ];

  useEffect(() => {
    if (isEdit && id) {
      fetchAsset(parseInt(id));
    }
  }, [isEdit, id]);

  const fetchAsset = async (assetId: number) => {
    try {
      setLoading(true);
      const response = await assetApi.getAssetById(assetId);
      setFormData(response.data);
    } catch (err) {
      setError('Failed to fetch asset details');
      console.error('Fetch asset error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof RiskAsset) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'value' || field === 'riskScore' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      
      const assetData = {
        name: formData.name!,
        type: formData.type!,
        description: formData.description || '',
        value: formData.value!,
        riskScore: formData.riskScore!,
        riskLevel: getRiskLevelFromScore(formData.riskScore!),
        owner: formData.owner!,
        location: formData.location!,
      };

      if (isEdit && id) {
        await assetApi.updateAsset(parseInt(id), assetData);
        setSuccess('Asset updated successfully');
      } else {
        await assetApi.createAsset(assetData);
        setSuccess('Asset created successfully');
      }

      setTimeout(() => {
        navigate('/assets');
      }, 1500);
    } catch (err) {
      setError(isEdit ? 'Failed to update asset' : 'Failed to create asset');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevelFromScore = (score: number): RiskLevel => {
    if (score <= 25) return RiskLevel.LOW;
    if (score <= 60) return RiskLevel.MEDIUM;
    if (score <= 85) return RiskLevel.HIGH;
    return RiskLevel.CRITICAL;
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.type &&
      formData.value &&
      formData.value > 0 &&
      formData.riskScore !== undefined &&
      formData.riskScore >= 0 &&
      formData.riskScore <= 100 &&
      formData.owner &&
      formData.location
    );
  };

  if (loading && isEdit) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Edit Asset' : 'Add New Asset'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Asset Name"
                value={formData.name || ''}
                onChange={handleInputChange('name')}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Asset Type"
                value={formData.type || ''}
                onChange={handleInputChange('type')}
                required
              >
                {assetTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={formData.description || ''}
                onChange={handleInputChange('description')}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Asset Value ($)"
                value={formData.value || ''}
                onChange={handleInputChange('value')}
                required
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Risk Score (0-100)"
                value={formData.riskScore || ''}
                onChange={handleInputChange('riskScore')}
                required
                inputProps={{ min: 0, max: 100, step: 0.1 }}
                helperText={`Risk Level: ${getRiskLevelFromScore(formData.riskScore || 0)}`}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Owner"
                value={formData.owner || ''}
                onChange={handleInputChange('owner')}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location || ''}
                onChange={handleInputChange('location')}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isFormValid() || loading}
                >
                  {loading ? <CircularProgress size={24} /> : (isEdit ? 'Update Asset' : 'Create Asset')}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/assets')}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AssetForm;