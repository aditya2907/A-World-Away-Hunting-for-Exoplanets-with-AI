import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Card,
  CardContent,
  Fade
} from "@mui/material";
import { 
  Home, 
  Explore, 
  RocketLaunch,
  StarBorder 
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const NotFound: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #16213E 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Stars Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, ${theme.palette.primary.main}40, transparent),
              radial-gradient(2px 2px at 40px 70px, ${theme.palette.secondary.main}30, transparent),
              radial-gradient(1px 1px at 90px 40px, #fff, transparent),
              radial-gradient(1px 1px at 130px 80px, #fff, transparent),
              radial-gradient(2px 2px at 160px 30px, ${theme.palette.primary.main}20, transparent)
            `,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 100px',
            animation: 'twinkling 3s ease-in-out infinite alternate'
          }
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in timeout={1000}>
          <Card
            elevation={24}
            sx={{
              background: 'rgba(26, 26, 46, 0.9)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.primary.main}30`,
              borderRadius: 4
            }}
          >
            <CardContent sx={{ p: 6, textAlign: 'center' }}>
              <Box mb={4}>
                <RocketLaunch 
                  sx={{ 
                    fontSize: 120, 
                    color: 'primary.main',
                    animation: 'float 3s ease-in-out infinite',
                    transform: 'rotate(-45deg)'
                  }} 
                />
              </Box>

              <Typography 
                variant="h1" 
                component="h1"
                sx={{
                  fontSize: { xs: '4rem', md: '8rem' },
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #3AAED8, #B47CED)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  textShadow: '0 0 30px rgba(58, 174, 216, 0.3)'
                }}
              >
                404
              </Typography>

              <Typography 
                variant="h4" 
                component="h2"
                color="primary.main"
                fontWeight="semibold"
                gutterBottom
              >
                Lost in Space
              </Typography>

              <Typography 
                variant="h6" 
                color="text.secondary" 
                paragraph
                sx={{ mb: 4, maxWidth: '500px', mx: 'auto' }}
              >
                It seems you've drifted into uncharted territory. The page you're looking for 
                is somewhere beyond our current star map.
              </Typography>

              <Box 
                display="flex" 
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={2} 
                justifyContent="center"
                mb={4}
              >
                <Button
                  component={RouterLink}
                  to="/"
                  variant="contained"
                  size="large"
                  startIcon={<Home />}
                  sx={{
                    background: 'linear-gradient(135deg, #3AAED8, #B47CED)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #329BC7, #A366D9)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(58, 174, 216, 0.4)'
                    },
                    transition: 'all 0.3s ease',
                    textTransform: 'none',
                    px: 4,
                    py: 1.5
                  }}
                >
                  Return to Earth
                </Button>

                <Button
                  component={RouterLink}
                  to="/how-it-works"
                  variant="outlined"
                  size="large"
                  startIcon={<Explore />}
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.light',
                      backgroundColor: 'rgba(58, 174, 216, 0.1)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease',
                    textTransform: 'none',
                    px: 4,
                    py: 1.5
                  }}
                >
                  Explore Mission
                </Button>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
                color="text.secondary"
                sx={{ opacity: 0.7 }}
              >
                <StarBorder fontSize="small" />
                <Typography variant="body2">
                  Keep exploring the cosmos
                </Typography>
                <StarBorder fontSize="small" />
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>

      {/* CSS Keyframes for animations */}
      <style>
        {`
          @keyframes twinkling {
            from { opacity: 0.3; }
            to { opacity: 1; }
          }
          
          @keyframes float {
            0%, 100% { transform: rotate(-45deg) translateY(0px); }
            50% { transform: rotate(-45deg) translateY(-10px); }
          }
        `}
      </style>
    </Box>
  );
};

export default NotFound;
