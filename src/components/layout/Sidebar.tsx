import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
  Stack,
  Chip,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';

const SIDEBAR_WIDTH = 260;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: SIDEBAR_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    borderRight: 'none',
  },
}));

const Logo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #334155',
}));

const StyledListItemButton = styled(ListItemButton)<{ active?: boolean }>(({ theme, active }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: 6,
  color: active ? '#ffffff' : '#cbd5e1',
  backgroundColor: active ? '#334155' : 'transparent',
  '&:hover': {
    backgroundColor: active ? '#334155' : '#334155',
    color: '#ffffff',
  },
  '& .MuiListItemIcon-root': {
    color: 'inherit',
    minWidth: 36,
  },
}));

const UserSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid #334155',
  marginTop: 'auto',
}));

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Assets', icon: <InventoryIcon />, path: '/assets' },
    { label: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
    { label: 'Security', icon: <SecurityIcon />, path: '/security' },
    { label: 'Users', icon: <PeopleIcon />, path: '/users' },
    { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Logo>
          <BusinessIcon sx={{ fontSize: 32, color: '#0ea5e9', mr: 1.5 }} />
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#ffffff">
              Asset Tracker
            </Typography>
            <Typography variant="caption" color="#94a3b8">
              Enterprise Edition
            </Typography>
          </Box>
        </Logo>

        <List sx={{ flex: 1, py: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <StyledListItemButton
                active={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
                />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ px: 2, pb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <NotificationsIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
            <Typography variant="caption" color="#94a3b8">
              System Status
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Chip 
              label="All Systems Operational" 
              size="small" 
              sx={{ 
                bgcolor: '#10b981', 
                color: 'white', 
                fontSize: '0.75rem',
                height: 24
              }} 
            />
          </Stack>
        </Box>

        <UserSection>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: '#0ea5e9' }}>
              {user?.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight="medium" color="#ffffff">
                {user?.name}
              </Typography>
              <Typography variant="caption" color="#94a3b8">
                {user?.role}
              </Typography>
            </Box>
            <IconButton onClick={handleLogout} sx={{ color: '#94a3b8' }}>
              <LogoutIcon />
            </IconButton>
          </Stack>
        </UserSection>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;
