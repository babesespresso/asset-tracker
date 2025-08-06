import React from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  LinearProgress,
  IconButton,
  Button,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InventoryIcon from '@mui/icons-material/Inventory';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';

const MainContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f8fafc',
  minHeight: '100vh',
}));

const MetricCard = styled(Card)(({ theme }) => ({
  height: '100%',
  border: '1px solid #e2e8f0',
  '& .metric-value': {
    fontSize: '2rem',
    fontWeight: 600,
    color: '#1e293b',
  },
  '& .metric-change': {
    fontSize: '0.75rem',
    fontWeight: 500,
  },
}));

const DataTable = styled(TableContainer)(({ theme }) => ({
  '& .MuiTableHead-root': {
    backgroundColor: '#f8fafc',
  },
  '& .MuiTableCell-head': {
    fontWeight: 600,
    color: '#334155',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: '#f8fafc',
  },
}));

const EnterpriseDashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Total Assets',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: <InventoryIcon sx={{ color: '#0ea5e9' }} />,
    },
    {
      title: 'Asset Value',
      value: '$2.4M',
      change: '+8%',
      changeType: 'positive',
      icon: <TrendingUpIcon sx={{ color: '#10b981' }} />,
    },
    {
      title: 'Compliance Score',
      value: '98.5%',
      change: '+2%',
      changeType: 'positive',
      icon: <SecurityIcon sx={{ color: '#10b981' }} />,
    },
    {
      title: 'Issues',
      value: '7',
      change: '-3',
      changeType: 'negative',
      icon: <WarningIcon sx={{ color: '#f59e0b' }} />,
    },
  ];

  const recentAssets = [
    {
      id: 'AST-001',
      name: 'Dell OptiPlex 7090',
      category: 'Workstation',
      user: 'John Smith',
      location: 'Office A - Desk 12',
      status: 'Active',
      lastSeen: '2 min ago',
      value: '$1,299'
    },
    {
      id: 'AST-002',
      name: 'HP LaserJet Pro',
      category: 'Printer',
      user: 'Shared',
      location: 'Office B - Print Station',
      status: 'Maintenance',
      lastSeen: '1 hour ago',
      value: '$899'
    },
    {
      id: 'AST-003',
      name: 'MacBook Pro 16"',
      category: 'Laptop',
      user: 'Sarah Johnson',
      location: 'Remote',
      status: 'Active',
      lastSeen: '5 min ago',
      value: '$2,499'
    },
    {
      id: 'AST-004',
      name: 'Cisco Switch 2960',
      category: 'Network',
      user: 'IT Infrastructure',
      location: 'Server Room',
      status: 'Active',
      lastSeen: 'Real-time',
      value: '$1,200'
    },
    {
      id: 'AST-005',
      name: 'Samsung Monitor 27"',
      category: 'Display',
      user: 'Mike Davis',
      location: 'Office A - Desk 15',
      status: 'Inactive',
      lastSeen: '2 days ago',
      value: '$299'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return { bgcolor: '#dcfce7', color: '#166534' };
      case 'Maintenance': return { bgcolor: '#fef3c7', color: '#92400e' };
      case 'Inactive': return { bgcolor: '#fee2e2', color: '#991b1b' };
      default: return { bgcolor: '#f1f5f9', color: '#475569' };
    }
  };

  const getChangeColor = (type: string) => {
    return type === 'positive' ? '#10b981' : '#ef4444';
  };

  return (
    <MainContent>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
            Asset Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time overview of your organization's assets and infrastructure
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<RefreshIcon />} size="small">
            Refresh
          </Button>
          <Button variant="contained" size="small">
            Generate Report
          </Button>
        </Stack>
      </Stack>

      {/* Metrics Grid */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        gap: 3,
        mb: 4
      }}>
        {metrics.map((metric, index) => (
          <MetricCard key={index}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {metric.title}
                    </Typography>
                    <Typography className="metric-value">
                      {metric.value}
                    </Typography>
                    <Typography 
                      className="metric-change"
                      sx={{ color: getChangeColor(metric.changeType), mt: 1 }}
                    >
                      {metric.change} from last month
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1, bgcolor: '#f8fafc', borderRadius: 1 }}>
                    {metric.icon}
                  </Box>
                </Stack>
              </CardContent>
            </MetricCard>
        ))}
      </Box>

      {/* Asset Overview Table */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>
                Recent Asset Activity
              </Typography>
              <Button size="small" sx={{ color: '#0ea5e9' }}>
                View All Assets
              </Button>
            </Stack>
          </Box>
          
          <DataTable>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Asset ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Assigned User</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Seen</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium" color="#334155">
                        {asset.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {asset.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {asset.category}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {asset.user}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {asset.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={asset.status}
                        size="small"
                        sx={{
                          ...getStatusColor(asset.status),
                          fontWeight: 500,
                          fontSize: '0.75rem',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {asset.lastSeen}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {asset.value}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DataTable>
        </CardContent>
      </Card>

      {/* System Health */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, 1fr)'
        },
        gap: 3
      }}>
        <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                System Health
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Asset Tracking Accuracy</Typography>
                    <Typography variant="body2" fontWeight="medium">98.5%</Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={98.5} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': { bgcolor: '#10b981' }
                    }} 
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Data Synchronization</Typography>
                    <Typography variant="body2" fontWeight="medium">100%</Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={100} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': { bgcolor: '#10b981' }
                    }} 
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Network Connectivity</Typography>
                    <Typography variant="body2" fontWeight="medium">99.9%</Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={99.9} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': { bgcolor: '#10b981' }
                    }} 
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

        <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Stack spacing={2}>
                <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Add New Asset
                </Button>
                <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Scan Asset Barcode
                </Button>
                <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Generate Compliance Report
                </Button>
                <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Export Asset Database
                </Button>
              </Stack>
            </CardContent>
          </Card>
      </Box>
    </MainContent>
  );
};

export default EnterpriseDashboard;
