import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Stack,
  Divider,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';

const MainContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f8fafc',
  minHeight: '100vh',
}));

const SettingsCard = styled(Card)(({ theme }) => ({
  border: '1px solid #e2e8f0',
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const SettingsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
      assetAlerts: true,
      securityAlerts: true,
      reports: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      autoLockout: true
    },
    company: {
      name: 'Asset Tracker Services',
      email: 'admin@assettracker.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Ave, Suite 100, City, State 12345',
      timezone: 'America/New_York',
      currency: 'USD'
    },
    preferences: {
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      theme: 'light'
    }
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof settings],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  return (
    <MainContent>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure your account and system preferences
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
          Save Changes
        </Button>
      </Stack>

      <SettingsCard>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" />
          <Tab label="Security" icon={<SecurityIcon />} iconPosition="start" />
          <Tab label="Company" icon={<BusinessIcon />} iconPosition="start" />
          <Tab label="Preferences" icon={<LanguageIcon />} iconPosition="start" />
        </Tabs>

        <CardContent>
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6" gutterBottom>Notification Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Configure how you receive notifications and alerts
            </Typography>
            
            <Stack spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.email}
                    onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.push}
                    onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                  />
                }
                label="Push Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.sms}
                    onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                  />
                }
                label="SMS Notifications"
              />
              <Divider />
              <Typography variant="subtitle1" fontWeight="medium">Alert Types</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.assetAlerts}
                    onChange={(e) => handleSettingChange('notifications', 'assetAlerts', e.target.checked)}
                  />
                }
                label="Asset Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.securityAlerts}
                    onChange={(e) => handleSettingChange('notifications', 'securityAlerts', e.target.checked)}
                  />
                }
                label="Security Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.reports}
                    onChange={(e) => handleSettingChange('notifications', 'reports', e.target.checked)}
                  />
                }
                label="Report Notifications"
              />
            </Stack>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>Security Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Manage security policies and access controls
            </Typography>
            
            <Stack spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                  />
                }
                label="Two-Factor Authentication"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.autoLockout}
                    onChange={(e) => handleSettingChange('security', 'autoLockout', e.target.checked)}
                  />
                }
                label="Auto Lockout After Inactivity"
              />
              <TextField
                label="Session Timeout (minutes)"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                fullWidth
              />
              <TextField
                label="Password Expiry (days)"
                type="number"
                value={settings.security.passwordExpiry}
                onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
                fullWidth
              />
            </Stack>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>Company Information</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Update your company details and contact information
            </Typography>
            
            <Stack spacing={3}>
              <TextField
                label="Company Name"
                value={settings.company.name}
                onChange={(e) => handleSettingChange('company', 'name', e.target.value)}
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                value={settings.company.email}
                onChange={(e) => handleSettingChange('company', 'email', e.target.value)}
                fullWidth
              />
              <TextField
                label="Phone"
                value={settings.company.phone}
                onChange={(e) => handleSettingChange('company', 'phone', e.target.value)}
                fullWidth
              />
              <TextField
                label="Address"
                value={settings.company.address}
                onChange={(e) => handleSettingChange('company', 'address', e.target.value)}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Timezone"
                value={settings.company.timezone}
                onChange={(e) => handleSettingChange('company', 'timezone', e.target.value)}
                fullWidth
              />
              <TextField
                label="Currency"
                value={settings.company.currency}
                onChange={(e) => handleSettingChange('company', 'currency', e.target.value)}
                fullWidth
              />
            </Stack>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" gutterBottom>User Preferences</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Customize your personal preferences and display settings
            </Typography>
            
            <Stack spacing={3}>
              <TextField
                label="Language"
                value={settings.preferences.language}
                onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                fullWidth
              />
              <TextField
                label="Date Format"
                value={settings.preferences.dateFormat}
                onChange={(e) => handleSettingChange('preferences', 'dateFormat', e.target.value)}
                fullWidth
              />
              <TextField
                label="Time Format"
                value={settings.preferences.timeFormat}
                onChange={(e) => handleSettingChange('preferences', 'timeFormat', e.target.value)}
                fullWidth
              />
              <TextField
                label="Theme"
                value={settings.preferences.theme}
                onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                fullWidth
              />
            </Stack>
          </TabPanel>
        </CardContent>
      </SettingsCard>
    </MainContent>
  );
};

export default SettingsPage;
