import { createTheme } from '@mui/material/styles';

// Create a space-themed Material-UI theme
const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3AAED8', // Cyan/blue from the original theme
      light: '#6BC3E5',
      dark: '#2A7FA3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#B47CED', // Purple from the original theme
      light: '#C995F1',
      dark: '#8E5CB8',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0A0A0F', // Dark space background
      paper: '#141419', // Card background
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#A1A1AA',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    success: {
      main: '#22C55E',
      light: '#4ADE80',
      dark: '#16A34A',
    },
    divider: '#27272A',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(20, 20, 25, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(58, 174, 216, 0.2)',
          boxShadow: '0 8px 32px rgba(58, 174, 216, 0.1)',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(58, 174, 216, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 20px',
        },
        contained: {
          background: 'linear-gradient(135deg, #3AAED8, #B47CED)',
          boxShadow: '0 4px 16px rgba(58, 174, 216, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2A7FA3, #8E5CB8)',
            boxShadow: '0 6px 20px rgba(58, 174, 216, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(20, 20, 25, 0.5)',
            '& fieldset': {
              borderColor: 'rgba(58, 174, 216, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(58, 174, 216, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3AAED8',
            },
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#3AAED8',
        },
        track: {
          background: 'linear-gradient(90deg, #3AAED8, #B47CED)',
        },
        thumb: {
          backgroundColor: '#3AAED8',
          boxShadow: '0 0 10px rgba(58, 174, 216, 0.5)',
          '&:hover': {
            boxShadow: '0 0 15px rgba(58, 174, 216, 0.7)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(58, 174, 216, 0.2)',
          color: '#3AAED8',
          border: '1px solid rgba(58, 174, 216, 0.5)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(58, 174, 216, 0.2)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(20, 20, 25, 0.8)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

export default muiTheme;
