import { NavLink, useLocation } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Tab, 
  Tabs,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { GitHub, Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const navigationItems = [
    { label: 'Analyzer', path: '/' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'About', path: '/about' },
    { label: 'Resources', path: '/resources' },
  ];

  const getCurrentTabValue = () => {
    const currentItem = navigationItems.find(item => item.path === location.pathname);
    return currentItem ? navigationItems.indexOf(currentItem) : 0;
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={NavLink} 
          to="/" 
          sx={{ 
            fontWeight: 'bold', 
            textDecoration: 'none', 
            color: 'inherit',
            mr: 4,
            background: 'linear-gradient(135deg, #3AAED8, #B47CED)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ExoSpace
        </Typography>
        
        {!isMobile ? (
          <>
            <Tabs 
              value={getCurrentTabValue()} 
              sx={{ 
                flexGrow: 1,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 2,
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                },
                '& .MuiTabs-indicator': {
                  background: 'linear-gradient(135deg, #3AAED8, #B47CED)',
                },
              }}
            >
              {navigationItems.map((item, index) => (
                <Tab
                  key={item.path}
                  label={item.label}
                  component={NavLink}
                  to={item.path}
                  value={index}
                />
              ))}
            </Tabs>
            
            <Button
              variant="contained"
              startIcon={<GitHub />}
              href="https://github.com/aditya2907/A-World-Away-Hunting-for-Exoplanets-with-AI"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ ml: 2 }}
            >
              GitHub
            </Button>
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              keepMounted
            >
              {navigationItems.map((item) => (
                <MenuItem
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                  selected={location.pathname === item.path}
                >
                  {item.label}
                </MenuItem>
              ))}
              <MenuItem
                component="a"
                href="https://github.com/aditya2907/A-World-Away-Hunting-for-Exoplanets-with-AI"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMobileMenuClose}
              >
                <GitHub sx={{ mr: 1 }} />
                GitHub
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
