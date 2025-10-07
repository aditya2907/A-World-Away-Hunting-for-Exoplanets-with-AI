import Hero from "../components/Hero";
import ExoplanetAnalyzer from "../components/ExoplanetAnalyzer";
import Navbar from "../components/Navbar";
import { Box } from '@mui/material';

const Index = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <ExoplanetAnalyzer />
    </Box>
  );
};

export default Index;
