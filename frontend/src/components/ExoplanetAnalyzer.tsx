import { useState } from 'react';
import ConfidenceMeter from './ConfidenceMeter';
import UserFeedback from './UserFeedback';
import { 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Box, 
  Card, 
  CardContent, 
  Tabs, 
  Tab,  
  Slider, 
  FormLabel, 
  CircularProgress, 
  Alert, 
  Tooltip, 
  IconButton,
  Grid
} from '@mui/material';
import { Info } from '@mui/icons-material';

// Custom TabPanel component
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
import { Leaderboard } from './Leaderboard';

type Mode = 'simple' | 'advanced';

// Define the features for the advanced form
const features = [
  'koi_period', 'koi_time0bk', 'koi_impact', 'koi_duration',
  'koi_depth', 'koi_prad', 'koi_teq', 'koi_insol',
  'koi_model_snr', 'koi_steff', 'koi_slogg', 'koi_srad', 'ra', 'dec'
];

const featureDetails: Record<string, string> = {
    'koi_period': 'Orbital period of the candidate in days.',
    'koi_time0bk': 'Time of first transit center in BKJD (Barycentric Kepler Julian Date).',
    'koi_impact': 'Impact parameter of the transit.',
    'koi_duration': 'Duration of the transit in hours.',
    'koi_depth': 'Depth of the transit in parts per million (ppm).',
    'koi_prad': 'Planet radius in Earth radii.',
    'koi_teq': 'Equilibrium temperature of the planet in Kelvin.',
    'koi_insol': 'Insolation flux in Earth flux units.',
    'koi_model_snr': 'Signal-to-noise ratio of the transit model fit.',
    'koi_steff': 'Stellar effective temperature in Kelvin.',
    'koi_slogg': 'Stellar surface gravity in cgs units.',
    'koi_srad': 'Stellar radius in Solar radii.',
    'ra': 'Right Ascension of the star in degrees.',
    'dec': 'Declination of the star in degrees.'
};

const featureDefaults: Record<string, number> = {
  koi_period: 18.2,
  koi_time0bk: 140.0,
  koi_impact: 0.5,
  koi_duration: 4.5,
  koi_depth: 1500,
  koi_prad: 2.5,
  koi_teq: 900,
  koi_insol: 1.0,
  koi_model_snr: 25.0,
  koi_steff: 5800,
  koi_slogg: 4.4,
  koi_srad: 1.0,
  ra: 290.0,
  dec: 44.0,
};

const ExoplanetAnalyzer = () => {
  const [mode, setMode] = useState<Mode>('simple');
  const [tabValue, setTabValue] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<{ prediction: string; probability: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [advancedInputs, setAdvancedInputs] = useState<Record<string, string>>(
    Object.fromEntries(features.map(f => [f, '']))
  );
  const [simpleInputs, setSimpleInputs] = useState({
    koi_model_snr: featureDefaults.koi_model_snr,
    koi_prad: featureDefaults.koi_prad,
    koi_period: featureDefaults.koi_period,
    koi_duration: featureDefaults.koi_duration,
  });

  const handleAnalyze = async () => {
    setError(null);
    setIsAnalyzing(true);
    setPrediction(null);

    const endpoint = 'https://a-world-away-hunting-for-exoplanets-with.onrender.com/predict_ml';
    let features_to_send: Record<string, number | undefined> = {};

    if (mode === 'simple') {
      features_to_send = {
        ...featureDefaults,
        ...simpleInputs
      };
    } else { // advanced
      features_to_send = Object.fromEntries(
        features.map(f => [f, advancedInputs[f] ? parseFloat(advancedInputs[f]) : undefined])
      );
    }
    
    const missing_features = Object.entries(features_to_send).filter(([, v]) => v === undefined || isNaN(v));
    if (missing_features.length > 0) {
      setError(`Please fill in all feature fields. Missing: ${missing_features.map(f => f[0]).join(', ')}`);
      setIsAnalyzing(false);
      return;
    }

    const body = { features: features_to_send };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred during analysis.');
      }
      const result = await response.json();
      setPrediction(result);
    } catch (error: any) {
      console.error("Error calling prediction API:", error);
      setError(error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setIsAnalyzing(false);
    setPrediction(null);
    setError(null);
    setAdvancedInputs(Object.fromEntries(features.map(f => [f, ''])));
    setSimpleInputs({
      koi_model_snr: featureDefaults.koi_model_snr,
      koi_prad: featureDefaults.koi_prad,
      koi_period: featureDefaults.koi_period,
      koi_duration: featureDefaults.koi_duration,
    });
  };

  const handleFeedback = (isPlanet: boolean) => {
    console.log(`User feedback: ${isPlanet ? 'Planet' : 'False Positive'}`);
  };

  const isPlanet = prediction ? prediction.prediction !== 'False Positive' : false;
  const confidence = prediction ? prediction.probability : 0;

  const handleAdvancedInputChange = (feature: string, value: string) => {
    setAdvancedInputs(prev => ({ ...prev, [feature]: value }));
  };

  const handleSimpleSliderChange = (feature: keyof typeof simpleInputs, value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setSimpleInputs(prev => ({ ...prev, [feature]: newValue }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setMode(newValue === 0 ? 'simple' : 'advanced');
  };

  const canAnalyze = () => {
    if (mode === 'advanced') {
      return features.every(f => advancedInputs[f] && !isNaN(parseFloat(advancedInputs[f])));
    }
    return true; // Simple mode always enabled
  };

  return (
    <Container maxWidth="lg" id="analyzer" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography 
          variant="h2" 
          component="h2" 
          fontWeight="bold" 
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #3AAED8, #B47CED)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Exoplanet Detection System
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
          Choose your analysis method. Use simplified inputs or provide all features for a detailed prediction.
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Simple Input" />
          <Tab label="Advanced Input" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={4}>
              <Box>
                <FormLabel>Signal Strength (koi_model_snr): {simpleInputs.koi_model_snr.toFixed(2)}</FormLabel>
                <Slider 
                  value={simpleInputs.koi_model_snr} 
                  max={1000} 
                  step={10} 
                  onChange={(_, value) => handleSimpleSliderChange('koi_model_snr', value)}
                  valueLabelDisplay="auto"
                  sx={{ mt: 2 }}
                />
              </Box>
              <Box>
                <FormLabel>Planetary Radius (koi_prad): {simpleInputs.koi_prad.toFixed(2)}</FormLabel>
                <Slider 
                  value={simpleInputs.koi_prad} 
                  max={100} 
                  step={0.5} 
                  onChange={(_, value) => handleSimpleSliderChange('koi_prad', value)}
                  valueLabelDisplay="auto"
                  sx={{ mt: 2 }}
                />
              </Box>
              <Box>
                <FormLabel>Orbital Period (koi_period): {simpleInputs.koi_period.toFixed(2)}</FormLabel>
                <Slider 
                  value={simpleInputs.koi_period} 
                  max={1000} 
                  step={1} 
                  onChange={(_, value) => handleSimpleSliderChange('koi_period', value)}
                  valueLabelDisplay="auto"
                  sx={{ mt: 2 }}
                />
              </Box>
              <Box>
                <FormLabel>Transit Duration (koi_duration): {simpleInputs.koi_duration.toFixed(2)}</FormLabel>
                <Slider 
                  value={simpleInputs.koi_duration} 
                  max={24} 
                  step={0.1} 
                  onChange={(_, value) => handleSimpleSliderChange('koi_duration', value)}
                  valueLabelDisplay="auto"
                  sx={{ mt: 2 }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box 
              display="grid" 
              gridTemplateColumns={{ 
                xs: 'repeat(1, 1fr)', 
                sm: 'repeat(2, 1fr)', 
                md: 'repeat(3, 1fr)', 
                lg: 'repeat(4, 1fr)' 
              }} 
              gap={3}
            >
              {features.map(feature => (
                <Box key={feature}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <FormLabel htmlFor={feature} sx={{ fontSize: '0.875rem' }}>
                      {feature}
                    </FormLabel>
                    <Tooltip title={featureDetails[feature]} arrow>
                      <IconButton size="small" sx={{ ml: 0.5, p: 0.5 }}>
                        <Info fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField
                    id={feature}
                    type="text"
                    placeholder={featureDefaults[feature]?.toString() || ''}
                    value={advancedInputs[feature]}
                    onChange={(e) => handleAdvancedInputChange(feature, e.target.value)}
                    size="small"
                    fullWidth
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {!prediction && !isAnalyzing && (
        <Box textAlign="center" mt={4}>
          <Button 
            size="large" 
            onClick={handleAnalyze}
            variant="contained"
            disabled={!canAnalyze()}
            sx={{ 
              py: 1.5,
              px: 4,
              background: 'linear-gradient(135deg, #3AAED8, #B47CED)',
              '&:hover': {
                background: 'linear-gradient(135deg, #2A7FA3, #8E5CB8)',
              },
            }}
          >
            Get Prediction
          </Button>
        </Box>
      )}

      {isAnalyzing && (
        <Box display="flex" flexDirection="column" alignItems="center" py={6} gap={2}>
          <CircularProgress size={48} />
          <Typography color="text.secondary">Processing analysis...</Typography>
        </Box>
      )}

      {prediction && (
        <Box mt={4}>
          <Typography variant="h5" fontWeight="semibold" mb={2}>
            Analysis Complete
          </Typography>
          <ConfidenceMeter probability={prediction.probability} />
          <Typography textAlign="center" mt={2}>
            Prediction: <Box component="span" fontWeight="bold">{prediction.prediction}</Box>
          </Typography>
        </Box>
      )}

      {prediction && (
        <Box mt={4}>
          <UserFeedback onFeedback={(isPlanet) => console.log(`Feedback: ${isPlanet}`)} />
        </Box>
      )}

      {/* <Leaderboard /> */}

      {prediction && !isAnalyzing && (
        <Box textAlign="center" mt={4}>
          <Button 
            size="large" 
            onClick={handleReset}
            variant="outlined"
          >
            Reset
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ExoplanetAnalyzer;
