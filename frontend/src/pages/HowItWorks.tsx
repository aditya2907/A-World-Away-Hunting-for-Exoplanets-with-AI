import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from "@mui/material";
import { 
  ExpandMore, 
  Science, 
  TrendingUp, 
  Psychology, 
  DataObject,
  School,
  Explore
} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { useTheme } from "@mui/material/styles";

const HowItWorks = () => {
  const theme = useTheme();

  const steps = [
    {
      label: 'Data Collection',
      description: 'Space telescopes like Kepler and TESS observe thousands of stars, measuring tiny changes in brightness over time.',
    },
    {
      label: 'Signal Detection',
      description: 'When a planet passes in front of its star (transit), it blocks a small amount of light, creating a detectable dip in brightness.',
    },
    {
      label: 'Feature Extraction',
      description: 'From each light curve, we extract 14 key parameters that describe the transit event and stellar properties.',
    },
    {
      label: 'AI Analysis',
      description: 'Our machine learning model analyzes these features to determine if the signal represents a real planet or false positive.',
    },
  ];

  const educationalSections = [
    {
      icon: <School />,
      title: "For Students & Educators",
      content: "This application serves as an interactive learning tool to understand how modern astronomy uses AI to discover new worlds. Perfect for STEM education at all levels."
    },
    {
      icon: <Science />,
      title: "The Transit Method",
      content: "Learn how astronomers detect planets by observing the slight dimming of starlight when a planet passes in front of its host star."
    },
    {
      icon: <Psychology />,
      title: "Machine Learning in Science",
      content: "Discover how artificial intelligence is revolutionizing scientific discovery by automating the analysis of vast astronomical datasets."
    },
    {
      icon: <Explore />,
      title: "Real Space Missions",
      content: "Our model is trained on actual data from NASA's Kepler and TESS missions, which have discovered thousands of exoplanets."
    }
  ];

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #3AAED8, #B47CED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How It Works
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Discover how our AI-powered system detects exoplanets and learn about the fascinating science behind planet hunting.
          </Typography>
        </Box>

        {/* Educational Overview Cards */}
        <Box 
          display="grid" 
          gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }} 
          gap={3} 
          mb={6}
        >
          {educationalSections.map((section, index) => (
            <Card key={index} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box sx={{ color: 'primary.main', mr: 2 }}>
                    {section.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="semibold">
                    {section.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {section.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Detection Process Steps */}
        <Card sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="semibold" mb={3} textAlign="center">
              The Exoplanet Detection Process
            </Typography>
            <Stepper orientation="vertical">
              {steps.map((step, index) => (
                <Step key={index} active={true}>
                  <StepLabel>
                    <Typography variant="h6" fontWeight="semibold">
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body1" color="text.secondary">
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        {/* Technical Details Accordion */}
        <Box mb={6}>
          <Typography variant="h4" fontWeight="semibold" mb={3} textAlign="center">
            Technical Details
          </Typography>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center">
                <Psychology sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Machine Learning Model</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Our system uses a <Chip label="Gradient Boosting Classifier" color="primary" size="small" /> - 
                a powerful ensemble learning method that combines multiple decision trees to make accurate predictions.
              </Typography>
              <Typography paragraph>
                The model was trained on a comprehensive dataset from NASA's Kepler Space Telescope mission, 
                including thousands of confirmed exoplanets and false positive detections.
              </Typography>
              <Typography>
                <strong>Model Performance:</strong> ~96% accuracy on validation data with optimized precision-recall balance.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center">
                <DataObject sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Input Parameters</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                The model analyzes 14 key features that characterize potential exoplanet transits:
              </Typography>
              
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }} gap={2}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="semibold" mb={1}>
                      Transit Properties
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Period (koi_period)" 
                          secondary="How long the planet takes to orbit its star"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Duration (koi_duration)" 
                          secondary="How long the transit event lasts"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Depth (koi_depth)" 
                          secondary="How much light is blocked during transit"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Impact Parameter (koi_impact)" 
                          secondary="Path of planet across the star's disk"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="semibold" mb={1}>
                      Planetary Properties
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Radius (koi_prad)" 
                          secondary="Size of the planet in Earth radii"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Temperature (koi_teq)" 
                          secondary="Equilibrium temperature of the planet"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Insolation (koi_insol)" 
                          secondary="Amount of stellar energy received"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Signal Strength (koi_model_snr)" 
                          secondary="Quality of the detection signal"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center">
                <TrendingUp sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Educational Applications</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                This application is designed as an educational tool for students and educators:
              </Typography>
              
              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="semibold" mb={1}>
                  Learning Objectives:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><School color="primary" /></ListItemIcon>
                    <ListItemText primary="Understand the transit method of exoplanet detection" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Psychology color="primary" /></ListItemIcon>
                    <ListItemText primary="Experience AI applications in scientific discovery" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Science color="primary" /></ListItemIcon>
                    <ListItemText primary="Learn data analysis and interpretation skills" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Explore color="primary" /></ListItemIcon>
                    <ListItemText primary="Explore current space missions and discoveries" />
                  </ListItem>
                </List>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight="semibold" mb={1}>
                Suggested Activities:
              </Typography>
              <Typography component="div">
                <ul>
                  <li>Compare predictions with different parameter combinations</li>
                  <li>Investigate what makes the AI confident in its predictions</li>
                  <li>Research real exoplanet discoveries and compare with model results</li>
                  <li>Discuss the role of human validation in scientific discovery</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Call to Action */}
        <Card 
          sx={{ 
            background: 'linear-gradient(135deg, rgba(58, 174, 216, 0.1), rgba(180, 124, 237, 0.1))',
            border: `1px solid ${theme.palette.primary.main}30`
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h5" fontWeight="semibold" mb={2}>
              Ready to Hunt for Exoplanets?
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Try the interactive analyzer and see if you can discover the next Earth-like world!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use the Simple Mode to get started, or Advanced Mode for detailed parameter exploration.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default HowItWorks;