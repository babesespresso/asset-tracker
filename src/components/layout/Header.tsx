import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& .logo-icon': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isAuthenticated = location.pathname !== '/' && 
                          location.pathname !== '/login' && 
                          location.pathname !== '/signup';

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate('/');
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Assets', path: '/assets' },
    { label: 'Reports', path: '/reports' },
    { label: 'Settings', path: '/settings' },
  ];

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        {/* Logo */}
        <Logo onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}>
          <BusinessIcon className="logo-icon" sx={{ fontSize: 32 }} />
          <Typography variant="h6" fontWeight="bold">
            Asset Tracker
          </Typography>
        </Logo>

        {/* Navigation Links (for authenticated users) */}
        {isAuthenticated && (
          <Stack direction="row" spacing={2} sx={{ ml: 4 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                color={location.pathname === item.path ? 'primary' : 'inherit'}
                onClick={() => navigate(item.path)}
                sx={{ 
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  textTransform: 'none'
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {/* Right side actions */}
        {isAuthenticated ? (
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Notifications */}
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                B
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <SettingsIcon sx={{ mr: 1 }} />
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button variant="contained" onClick={() => navigate('/signup')}>
              Get Started
            </Button>
          </Stack>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
