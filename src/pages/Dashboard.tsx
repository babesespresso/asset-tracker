import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  LinearProgress,
  Avatar,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { dashboardAPI } from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

const DashboardCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: 'white',
  '& .MuiCardContent-root': {
    padding: theme.spacing(3),
  },
}));

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await dashboardAPI.getStats();
        setStats(response.data.data);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'disposed': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome, {user?.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your assets today.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/assets')}>
            Add Asset
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)'
        },
        gap: 3,
        mb: 4
      }}>
        <StatCard>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {stats?.totalAssets}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Total Assets
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                <InventoryIcon />
              </Avatar>
            </Stack>
          </CardContent>
        </StatCard>
        <StatCard>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  ${stats?.totalValue.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Asset Value
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                <TrendingUpIcon />
              </Avatar>
            </Stack>
          </CardContent>
        </StatCard>
        <StatCard>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {stats?.activeAssets}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Active Assets
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                <InventoryIcon />
              </Avatar>
            </Stack>
          </CardContent>
        </StatCard>
        <StatCard>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {stats?.totalUsers}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Active Users
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                <PeopleIcon />
              </Avatar>
            </Stack>
          </CardContent>
        </StatCard>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          lg: '2fr 1fr'
        },
        gap: 3
      }}>
        <DashboardCard>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6">Recent Assets</Typography>
                <Button size="small" onClick={() => navigate('/assets')}>View All</Button>
              </Stack>
              <Stack spacing={2}>
                {stats?.recentAssets.map((asset: any) => (
                  <Card key={asset.id} variant="outlined">
                    <CardContent sx={{ py: 2 }}>
                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: '1fr',
                          sm: '2fr 1fr 1fr 2fr'
                        },
                        gap: 2,
                        alignItems: 'center'
                      }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {asset.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {asset.category}
                          </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium">
                          ${asset.currentValue.toLocaleString()}
                        </Typography>
                        <Chip 
                          label={asset.status} 
                          size="small" 
                          color={getStatusColor(asset.status) as any}
                        />
                        <Typography variant="body2" color="text.secondary">
                          📍 {asset.location}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </DashboardCard>

        <Stack spacing={3}>
            <DashboardCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button variant="outlined" fullWidth startIcon={<AddIcon />} onClick={() => navigate('/assets')}>
                    Add New Asset
                  </Button>
                  <Button variant="outlined" fullWidth onClick={() => navigate('/reports')}>
                    Generate Report
                  </Button>
                  <Button variant="outlined" fullWidth>
                    Scan Barcode
                  </Button>
                  <Button variant="outlined" fullWidth>
                    Export Data
                  </Button>
                </Stack>
              </CardContent>
            </DashboardCard>

            <DashboardCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Health
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="body2">Tracking Accuracy</Typography>
                      <Typography variant="body2">99.8%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={99.8} />
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="body2">Data Sync</Typography>
                      <Typography variant="body2">100%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={100} />
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="body2">System Uptime</Typography>
                      <Typography variant="body2">99.9%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={99.9} />
                  </Box>
                </Stack>
              </CardContent>
            </DashboardCard>
          </Stack>
      </Box>
    </Container>
  );
};

export default Dashboard;
