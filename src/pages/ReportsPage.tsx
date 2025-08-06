import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DownloadIcon from '@mui/icons-material/Download';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InventoryIcon from '@mui/icons-material/Inventory';
import SecurityIcon from '@mui/icons-material/Security';

const MainContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f8fafc',
  minHeight: '100vh',
}));

const ReportCard = styled(Card)(({ theme }) => ({
  height: '100%',
  border: '1px solid #e2e8f0',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: '#0ea5e9',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(14, 165, 233, 0.15)',
  },
}));

const ReportsPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [dateRange, setDateRange] = useState('last30days');

  const reportTemplates = [
    {
      id: 1,
      name: 'Asset Inventory Report',
      description: 'Complete overview of all assets with current status and location',
      category: 'Inventory',
      icon: <InventoryIcon sx={{ color: '#0ea5e9' }} />,
      lastGenerated: '2 hours ago',
      frequency: 'Daily'
    },
    {
      id: 2,
      name: 'Compliance Audit Report',
      description: 'Security compliance status and policy adherence analysis',
      category: 'Security',
      icon: <SecurityIcon sx={{ color: '#10b981' }} />,
      lastGenerated: '1 day ago',
      frequency: 'Weekly'
    },
    {
      id: 3,
      name: 'Asset Utilization Report',
      description: 'Usage patterns and optimization recommendations',
      category: 'Analytics',
      icon: <TrendingUpIcon sx={{ color: '#f59e0b' }} />,
      lastGenerated: '3 hours ago',
      frequency: 'Monthly'
    },
    {
      id: 4,
      name: 'Maintenance Schedule Report',
      description: 'Upcoming maintenance tasks and service history',
      category: 'Maintenance',
      icon: <ScheduleIcon sx={{ color: '#ef4444' }} />,
      lastGenerated: '5 hours ago',
      frequency: 'Weekly'
    }
  ];

  const recentReports = [
    {
      id: 'RPT-001',
      name: 'Q4 Asset Inventory',
      type: 'Inventory',
      generatedBy: 'System',
      createdAt: '2024-01-15 09:30',
      status: 'Completed',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 'RPT-002',
      name: 'Security Compliance Audit',
      type: 'Security',
      generatedBy: 'Belinda Sturges',
      createdAt: '2024-01-14 14:22',
      status: 'Completed',
      size: '1.8 MB',
      format: 'Excel'
    },
    {
      id: 'RPT-003',
      name: 'Asset Utilization Analysis',
      type: 'Analytics',
      generatedBy: 'System',
      createdAt: '2024-01-13 11:15',
      status: 'Processing',
      size: '-',
      format: 'PDF'
    },
    {
      id: 'RPT-004',
      name: 'Maintenance Schedule',
      type: 'Maintenance',
      generatedBy: 'John Smith',
      createdAt: '2024-01-12 16:45',
      status: 'Completed',
      size: '956 KB',
      format: 'PDF'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return { bgcolor: '#dcfce7', color: '#166534' };
      case 'Processing': return { bgcolor: '#fef3c7', color: '#92400e' };
      case 'Failed': return { bgcolor: '#fee2e2', color: '#991b1b' };
      default: return { bgcolor: '#f1f5f9', color: '#475569' };
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, report: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedReport(report);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReport(null);
  };

  return (
    <MainContent>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
            Reports & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Generate comprehensive reports and analyze your asset data
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              label="Date Range"
            >
              <MenuItem value="last7days">Last 7 days</MenuItem>
              <MenuItem value="last30days">Last 30 days</MenuItem>
              <MenuItem value="last90days">Last 90 days</MenuItem>
              <MenuItem value="lastyear">Last year</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" startIcon={<AssessmentIcon />}>
            Custom Report
          </Button>
        </Stack>
      </Stack>

      {/* Report Templates */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
            Report Templates
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Pre-configured reports for common asset management scenarios
          </Typography>
          
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 3
          }}>
            {reportTemplates.map((template) => (
              <ReportCard key={template.id}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box sx={{ p: 1, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        {template.icon}
                      </Box>
                      <Chip 
                        label={template.category} 
                        size="small" 
                        sx={{ bgcolor: '#e2e8f0', color: '#475569', fontSize: '0.75rem' }}
                      />
                    </Stack>
                    
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600 }}>
                        {template.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {template.description}
                      </Typography>
                    </Box>

                    <Divider />

                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">
                          Last Generated:
                        </Typography>
                        <Typography variant="caption" fontWeight="medium">
                          {template.lastGenerated}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">
                          Frequency:
                        </Typography>
                        <Typography variant="caption" fontWeight="medium">
                          {template.frequency}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Button variant="outlined" size="small" fullWidth>
                      Generate Report
                    </Button>
                  </Stack>
                </CardContent>
              </ReportCard>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>
                Recent Reports
              </Typography>
              <Button size="small" sx={{ color: '#0ea5e9' }}>
                View All Reports
              </Button>
            </Stack>
          </Box>
          
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Report ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Generated By</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Format</TableCell>
                  <TableCell width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium" color="#334155">
                        {report.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {report.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {report.type}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {report.generatedBy}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {report.createdAt}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={report.status}
                        size="small"
                        sx={{
                          ...getStatusColor(report.status),
                          fontWeight: 500,
                          fontSize: '0.75rem',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {report.size}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {report.format}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small"
                        onClick={(e) => handleMenuClick(e, report)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <DownloadIcon sx={{ mr: 1, fontSize: 16 }} />
          Download
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <CalendarTodayIcon sx={{ mr: 1, fontSize: 16 }} />
          Schedule
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </MainContent>
  );
};

export default ReportsPage;
