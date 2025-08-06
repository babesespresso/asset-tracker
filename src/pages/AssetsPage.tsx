import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
  Pagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getAssets, createAsset, updateAsset, deleteAsset } from '../store/slices/assetsSlice';

const AssetCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.75rem',
}));

const AssetsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { assets, loading, error, pagination } = useSelector((state: RootState) => state.assets);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    dispatch(getAssets({ page: 1, limit: 12, search: searchTerm, category: filterCategory === 'all' ? '' : filterCategory }));
  }, [dispatch, searchTerm, filterCategory]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getAssets({ page: value, limit: 12, search: searchTerm, category: filterCategory === 'all' ? '' : filterCategory }));
  };

  const categories = ['all', 'IT Equipment', 'Office Equipment', 'Furniture', 'Vehicles', 'Software Licenses', 'Hardware', 'Other'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'disposed': return 'error';
      case 'inactive': return 'default';
      default: return 'default';
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, asset: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedAsset(asset);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAsset(null);
  };

  const handleOpenDialog = (asset?: any) => {
    if (asset) {
      setIsEditMode(true);
      setFormData(asset);
    } else {
      setIsEditMode(false);
      setFormData({});
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    if (isEditMode) {
      dispatch(updateAsset({ id: formData.id, assetData: formData }));
    } else {
      dispatch(createAsset(formData));
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    if (selectedAsset) {
      dispatch(deleteAsset(selectedAsset.id));
      handleMenuClose();
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Asset Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and manage all your valuable assets in one place
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<QrCodeScannerIcon />}>
            Scan Asset
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
            Add Asset
          </Button>
        </Stack>
      </Stack>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
            <TextField
              fullWidth
              placeholder="Search assets by name, serial, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: { md: 400 } }}
            />
            
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                label="Category"
                startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
              {pagination?.total || 0} assets found
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        gap: 3
      }}>
        {assets.map((asset) => (
          <AssetCard key={asset.id}>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Avatar
                      src={asset.images?.[0]}
                      sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}
                    >
                      {asset.name.charAt(0)}
                    </Avatar>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, asset)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Stack>

                  <Box>
                    <Typography variant="h6" noWrap>
                      {asset.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {asset.category}
                    </Typography>
                  </Box>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <StatusChip
                      label={asset.status}
                      color={getStatusColor(asset.status) as any}
                      size="small"
                    />
                    <Typography variant="h6" color="primary.main">
                      ${asset.currentValue?.toLocaleString()}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {asset.location}
                    </Typography>
                  </Stack>

                  <Typography variant="caption" color="text.secondary">
                    Updated: {new Date(asset.updatedAt).toLocaleDateString()}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    S/N: {asset.serialNumber}
                  </Typography>
                </Stack>
              </CardContent>
            </AssetCard>
        ))}
      </Box>

      <Stack alignItems="center" sx={{ mt: 4 }}>
        <Pagination 
          count={pagination?.pages || 1} 
          page={pagination?.page || 1} 
          onChange={handlePageChange} 
        />
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { handleOpenDialog(selectedAsset); handleMenuClose(); }}>
          <EditIcon sx={{ mr: 1 }} />
          Edit Asset
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <QrCodeScannerIcon sx={{ mr: 1 }} />
          View QR Code
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Asset
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{isEditMode ? 'Edit Asset' : 'Add New Asset'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField name="name" fullWidth label="Asset Name" required value={formData.name || ''} onChange={handleFormChange} />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select name="category" label="Category" value={formData.category || ''} onChange={handleFormChange as any}>
                {categories.slice(1).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField name="serialNumber" fullWidth label="Serial Number" value={formData.serialNumber || ''} onChange={handleFormChange} />
            <TextField name="purchasePrice" fullWidth label="Purchase Value" type="number" value={formData.purchasePrice || ''} onChange={handleFormChange} />
            <TextField name="location" fullWidth label="Location" value={formData.location || ''} onChange={handleFormChange} />
            <TextField name="description" fullWidth label="Description" multiline rows={3} value={formData.description || ''} onChange={handleFormChange} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleFormSubmit}>
            {isEditMode ? 'Save Changes' : 'Add Asset'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AssetsPage;
