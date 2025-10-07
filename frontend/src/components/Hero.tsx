import { Button, Typography, Container, Box, Chip } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Hero = () => {
  const theme = useTheme();
  
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: `
          radial-gradient(2px 2px at 20px 30px, white, transparent),
          radial-gradient(2px 2px at 60px 70px, white, transparent),
          radial-gradient(1px 1px at 50px 50px, white, transparent),
          radial-gradient(1px 1px at 130px 80px, white, transparent),
          radial-gradient(2px 2px at 90px 10px, white, transparent)
        `,
        backgroundSize: '200px 200px',
        backgroundRepeat: 'repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: `${theme.palette.primary.main}10`,
          borderRadius: '50%',
          filter: 'blur(100px)',
          animation: 'pulse 3s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.5 },
            '50%': { opacity: 0.8 },
          },
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center', py: 4 }}>
        <Chip
          icon={<Search />}
          label="AI-Powered Exoplanet Detection"
          variant="outlined"
          sx={{
            mb: 4,
            backgroundColor: 'rgba(20, 20, 25, 0.5)',
            backdropFilter: 'blur(10px)',
            borderColor: `${theme.palette.primary.main}30`,
            '& .MuiChip-icon': {
              color: theme.palette.primary.main,
            },
          }}
        />
        
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '3rem', md: '4.5rem' },
            fontWeight: 'bold',
            letterSpacing: '-0.025em',
            mb: 3,
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'block',
              textShadow: `0 0 20px ${theme.palette.primary.main}50`,
            }}
          >
            Discover New Worlds
          </Box>
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #3AAED8, #B47CED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            With Machine Learning
          </Box>
        </Typography>
        
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}
        >
          Analyze light curves from NASA's Kepler and TESS missions. Our neural network identifies 
          potential exoplanets with unprecedented accuracy.
        </Typography>
        
        <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap" mb={6}>
          <Button 
            size="large" 
            onClick={scrollToAnalyzer}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #3AAED8, #B47CED)',
              boxShadow: `0 4px 16px ${theme.palette.primary.main}30`,
              '&:hover': {
                background: 'linear-gradient(135deg, #2A7FA3, #8E5CB8)',
                boxShadow: `0 6px 20px ${theme.palette.primary.main}40`,
              },
            }}
          >
            Start Detection
          </Button>
          <Button 
            size="large" 
            variant="outlined"
            component={Link}
            to="/about"
            sx={{
              borderColor: `${theme.palette.primary.main}30`,
              '&:hover': {
                backgroundColor: `${theme.palette.primary.main}10`,
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            Learn More
          </Button>
        </Box>

        {/* Stats */}
        <Box 
          display="grid" 
          gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} 
          gap={4} 
          sx={{ pt: 6, maxWidth: '600px', mx: 'auto' }}
        >
          <Box textAlign="center">
            <Typography variant="h3" fontWeight="bold" color="primary.main">
              96%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detection Accuracy
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight="bold" color="secondary.main">
              5,000+
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Light Curves Analyzed
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight="bold" color="success.main">
              127
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Planets Confirmed
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
