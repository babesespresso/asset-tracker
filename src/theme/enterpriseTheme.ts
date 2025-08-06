import { createTheme } from '@mui/material/styles';

const enterpriseTheme = createTheme({
  palette: {
    primary: {
      main: '#334155', // Slate gray - professional and enterprise
      light: '#475569',
      dark: '#1e293b',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#0ea5e9', // Sky blue for accents
      light: '#06b6d4',
      dark: '#0284c7',
      contrastText: '#ffffff'
    },
    success: {
      main: '#10b981', // Emerald green for active/healthy status
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#f59e0b', // Amber for warnings
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff'
    },
    error: {
      main: '#ef4444', // Red for errors/critical
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f8fafc', // Very light blue-gray
      paper: '#ffffff'
    },
    text: {
      primary: '#1e293b', // Dark slate for excellent readability
      secondary: '#64748b' // Medium slate for secondary text
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    divider: '#e2e8f0'
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#1e293b'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#1e293b'
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1e293b'
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1e293b'
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#1e293b'
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#1e293b'
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#475569'
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      color: '#64748b'
    }
  },
  shape: {
    borderRadius: 6
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 6,
          fontSize: '0.875rem'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e2e8f0',
          fontSize: '0.875rem'
        },
        head: {
          backgroundColor: '#f8fafc',
          fontWeight: 600,
          color: '#334155'
        }
      }
    }
  }
});

export default enterpriseTheme;
