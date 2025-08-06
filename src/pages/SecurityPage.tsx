import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  LinearProgress,
  Alert,
  Switch,
  FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ShieldIcon from '@mui/icons-material/Shield';
import RefreshIcon from '@mui/icons-material/Refresh';

const MainContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f8fafc',
  minHeight: '100vh',
}));

const SecurityCard = styled(Card)(({ theme }) => ({
  height: '100%',
  border: '1px solid #e2e8f0',
}));

const SecurityPage: React.FC = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    encryptionEnabled: true,
    auditLogging: true,
    autoLockout: false,
    passwordComplexity: true,
    sessionTimeout: true
  });

  const securityMetrics = [
    {
      title: 'Security Score',
      value: '94%',
      status: 'excellent',
      icon: <ShieldIcon sx={{ color: '#10b981' }} />,
      description: 'Overall security posture'
    },
    {
      title: 'Vulnerabilities',
      value: '3',
      status: 'warning',
      icon: <WarningIcon sx={{ color: '#f59e0b' }} />,
      description: 'Medium priority issues'
    },
    {
      title: 'Compliance',
      value: '98.5%',
      status: 'excellent',
      icon: <CheckCircleIcon sx={{ color: '#10b981' }} />,
      description: 'Policy adherence rate'
    },
    {
      title: 'Failed Logins',
      value: '12',
      status: 'warning',
      icon: <ErrorIcon sx={{ color: '#ef4444' }} />,
      description: 'Last 24 hours'
    }
  ];

  const securityEvents = [
    {
      id: 'SEC-001',
      event: 'Failed login attempt',
      user: 'unknown@external.com',
      severity: 'Medium',
      timestamp: '2024-01-15 14:32:15',
      status: 'Blocked',
      location: '192.168.1.100'
    },
    {
      id: 'SEC-002',
      event: 'Asset access outside hours',
      user: 'john.smith@company.com',
      severity: 'Low',
      timestamp: '2024-01-15 22:15:30',
      status: 'Allowed',
      location: 'Office A'
    },
    {
      id: 'SEC-003',
      event: 'Unauthorized asset scan',
      user: 'system',
      severity: 'High',
      timestamp: '2024-01-15 11:45:22',
      status: 'Investigating',
      location: 'Warehouse'
    },
    {
      id: 'SEC-004',
      event: 'Password policy violation',
      user: 'sarah.johnson@company.com',
      severity: 'Low',
      timestamp: '2024-01-15 09:20:10',
      status: 'Resolved',
      location: 'Remote'
    }
  ];

  const complianceChecks = [
    { name: 'Data Encryption', status: 'Compliant', score: 100 },
    { name: 'Access Controls', status: 'Compliant', score: 98 },
    { name: 'Audit Logging', status: 'Compliant', score: 95 },
    { name: 'Password Policies', status: 'Warning', score: 85 },
    { name: 'Network Security', status: 'Compliant', score: 92 },
    { name: 'Data Backup', status: 'Compliant', score: 100 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return { bgcolor: '#fee2e2', color: '#991b1b' };
      case 'Medium': return { bgcolor: '#fef3c7', color: '#92400e' };
      case 'Low': return { bgcolor: '#dcfce7', color: '#166534' };
      default: return { bgcolor: '#f1f5f9', color: '#475569' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return { bgcolor: '#dcfce7', color: '#166534' };
      case 'Warning': return { bgcolor: '#fef3c7', color: '#92400e' };
      case 'Critical': return { bgcolor: '#fee2e2', color: '#991b1b' };
      default: return { bgcolor: '#f1f5f9', color: '#475569' };
    }
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setSecuritySettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <MainContent>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
            Security Center
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and manage your asset security posture
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<RefreshIcon />} size="small">
            Refresh
          </Button>
          <Button variant="contained" startIcon={<SecurityIcon />} size="small">
            Security Audit
          </Button>
        </Stack>
      </Stack>

      {/* Security Alerts */}
      <Alert severity="warning" sx={{ mb: 4 }}>
        <Typography variant="body2">
          <strong>Security Alert:</strong> 3 medium-priority vulnerabilities detected. 
          <Button size="small" sx={{ ml: 1 }}>Review Now</Button>
        </Typography>
      </Alert>

      {/* Security Metrics */}
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
        {securityMetrics.map((metric, index) => (
          <SecurityCard key={index}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {metric.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="#1e293b">
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {metric.description}
                  </Typography>
                </Box>
                <Box sx={{ p: 1, bgcolor: '#f8fafc', borderRadius: 1 }}>
                  {metric.icon}
                </Box>
              </Stack>
            </CardContent>
          </SecurityCard>
        ))}
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          lg: 'repeat(3, 1fr)'
        },
        gap: 3
      }}>
        {/* Security Settings */}
        <SecurityCard>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
              Security Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Configure security policies and controls
            </Typography>

            <Stack spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  />
                }
                label="Two-Factor Authentication"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.encryptionEnabled}
                    onChange={(e) => handleSettingChange('encryptionEnabled', e.target.checked)}
                  />
                }
                label="Data Encryption"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.auditLogging}
                    onChange={(e) => handleSettingChange('auditLogging', e.target.checked)}
                  />
                }
                label="Audit Logging"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.autoLockout}
                    onChange={(e) => handleSettingChange('autoLockout', e.target.checked)}
                  />
                }
                label="Auto Lockout"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.passwordComplexity}
                    onChange={(e) => handleSettingChange('passwordComplexity', e.target.checked)}
                  />
                }
                label="Password Complexity"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', e.target.checked)}
                  />
                }
                label="Session Timeout"
              />
            </Stack>
          </CardContent>
        </SecurityCard>

        {/* Compliance Status */}
        <SecurityCard>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
              Compliance Status
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Policy adherence and compliance metrics
            </Typography>

            <Stack spacing={2}>
              {complianceChecks.map((check, index) => (
                <Box key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {check.name}
                    </Typography>
                    <Chip
                      label={check.status}
                      size="small"
                      sx={{
                        ...getStatusColor(check.status),
                        fontWeight: 500,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={check.score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': { bgcolor: check.score >= 90 ? '#10b981' : '#f59e0b' }
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </SecurityCard>

        {/* Security Events */}
        <SecurityCard>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
              Recent Security Events
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Latest security incidents and alerts
            </Typography>

            <Stack spacing={2}>
              {securityEvents.map((event) => (
                <Box key={event.id} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {event.event}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {event.user}
                      </Typography>
                    </Box>
                    <Chip
                      label={event.severity}
                      size="small"
                      sx={{
                        ...getSeverityColor(event.severity),
                        fontWeight: 500,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                    {event.timestamp} • {event.location}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </SecurityCard>
      </Box>
    </MainContent>
  );
};

export default SecurityPage;
