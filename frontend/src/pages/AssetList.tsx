import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { assetApi } from '../services/api';
import { RiskAsset, RiskLevel } from '../types/RiskAsset';

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<RiskAsset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<RiskAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<RiskAsset | null>(null);
  const [filterType, setFilterType] = useState('');
  const [filterRiskLevel, setFilterRiskLevel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    let filtered = assets;
    
    if (filterType) {
      filtered = filtered.filter(asset => asset.type === filterType);
    }
    
    if (filterRiskLevel) {
      filtered = filtered.filter(asset => asset.riskLevel === filterRiskLevel);
    }
    
    setFilteredAssets(filtered);
  }, [assets, filterType, filterRiskLevel]);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await assetApi.getAllAssets();
      setAssets(response.data);
      setFilteredAssets(response.data);
    } catch (err) {
      setError('Failed to fetch assets');
      console.error('Fetch assets error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (asset: RiskAsset) => {
    setAssetToDelete(asset);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (assetToDelete?.id) {
      try {
        await assetApi.deleteAsset(assetToDelete.id);
        await fetchAssets();
        setDeleteDialogOpen(false);
        setAssetToDelete(null);
      } catch (err) {
        setError('Failed to delete asset');
        console.error('Delete asset error:', err);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
  };

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

  const uniqueTypes = Array.from(new Set(assets.map(asset => asset.type)));

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

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Asset Inventory</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/assets/new')}
        >
          Add Asset
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          select
          label="Filter by Type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Types</MenuItem>
          {uniqueTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Filter by Risk Level"
          value={filterRiskLevel}
          onChange={(e) => setFilterRiskLevel(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Risk Levels</MenuItem>
          {Object.values(RiskLevel).map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Risk Score</TableCell>
              <TableCell>Risk Level</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssets.map((asset) => (
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
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/assets/edit/${asset.id}`)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(asset)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the asset "{assetToDelete?.name}"?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssetList;