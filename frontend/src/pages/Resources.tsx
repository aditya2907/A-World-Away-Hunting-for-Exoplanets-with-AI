import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Link, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider
} from "@mui/material";
import { 
  ExpandMore,
  Dataset,
  Article,
  Code,
  Public,
  School,
  VideoLibrary,
  Launch,
  GitHub
} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { useTheme } from "@mui/material/styles";

const Resources = () => {
  const theme = useTheme();

  const datasets = [
    {
      title: "NASA Exoplanet Archive - Kepler Objects of Interest (KOI)",
      url: "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative",
      description: "The primary source of data for training our machine learning model, containing thousands of confirmed exoplanets and false positive candidates from the Kepler mission.",
      type: "Primary Dataset"
    },
    {
      title: "TESS Objects of Interest (TOI)",
      url: "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=toi",
      description: "Current exoplanet candidates from NASA's Transiting Exoplanet Survey Satellite mission.",
      type: "Supplementary"
    },
    {
      title: "Confirmed Exoplanets Archive",
      url: "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PS",
      description: "Comprehensive database of all confirmed exoplanets with detailed characteristics.",
      type: "Reference"
    }
  ];

  const researchPapers = [
    {
      title: "Identifying Exoplanets with Deep Learning: A Five-planet Resonant Chain",
      authors: "Shallue & Vanderburg (2017)",
      url: "https://arxiv.org/abs/1709.04343",
      description: "Groundbreaking paper demonstrating deep learning's power for finding exoplanets in Kepler data.",
      impact: "High Impact"
    },
    {
      title: "Exoplanet Detection Using Machine Learning on Kepler Data",
      authors: "Various Authors (2024)",
      url: "https://www.mdpi.com/2079-9292/13/20/3950",
      description: "Comprehensive study on applying various ML techniques to exoplanet classification.",
      impact: "Recent Research"
    },
    {
      title: "Planet Hunters: Assessing the Kepler Inventory of Short-period Planets",
      authors: "Santerne et al. (2016)",
      url: "https://arxiv.org/abs/1609.09309",
      description: "Statistical analysis of Kepler's planet detection capabilities and false positive rates.",
      impact: "Statistical Foundation"
    }
  ];

  const tools = [
    {
      name: "Lightkurve",
      url: "https://www.lightkurve.org/",
      description: "Python package for Kepler and TESS data analysis and visualization.",
      category: "Data Analysis"
    },
    {
      name: "Scikit-learn",
      url: "https://scikit-learn.org/",
      description: "Machine learning library used for our Gradient Boosting model.",
      category: "Machine Learning"
    },
    {
      name: "Astropy",
      url: "https://www.astropy.org/",
      description: "Core package for astronomy computations and coordinate systems.",
      category: "Astronomy"
    },
    {
      name: "PyKE",
      url: "https://pyke.readthedocs.io/",
      description: "Kepler/K2/TESS data analysis tools for photometry and asteroseismology.",
      category: "Specialized"
    }
  ];

  const educationalResources = [
    {
      title: "NASA Exoplanet Exploration",
      url: "https://exoplanets.nasa.gov/",
      description: "Official NASA resource for exoplanet discoveries and mission updates.",
      type: "Official Source"
    },
    {
      title: "Eyes on Exoplanets",
      url: "https://eyes.nasa.gov/apps/exo/",
      description: "Interactive 3D visualization of known exoplanets and their systems.",
      type: "Interactive Tool"
    },
    {
      title: "Kepler Mission Archive",
      url: "https://www.nasa.gov/mission_pages/kepler/main/index.html",
      description: "Complete archive of the Kepler Space Telescope mission and discoveries.",
      type: "Mission Archive"
    },
    {
      title: "TESS Mission Home",
      url: "https://tess.mit.edu/",
      description: "Current mission status and discoveries from the TESS telescope.",
      type: "Current Mission"
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
            Educational Resources
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Comprehensive collection of datasets, research papers, tools, and educational materials 
            for learning about exoplanet detection and machine learning in astronomy.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mb={6}>
          <Button
            variant="outlined"
            startIcon={<Dataset />}
            href="#datasets"
            sx={{ textTransform: 'none' }}
          >
            Datasets
          </Button>
          <Button
            variant="outlined"
            startIcon={<Article />}
            href="#research"
            sx={{ textTransform: 'none' }}
          >
            Research Papers
          </Button>
          <Button
            variant="outlined"
            startIcon={<Code />}
            href="#tools"
            sx={{ textTransform: 'none' }}
          >
            Tools & Libraries
          </Button>
          <Button
            variant="outlined"
            startIcon={<School />}
            href="#educational"
            sx={{ textTransform: 'none' }}
          >
            Educational Materials
          </Button>
        </Box>

        {/* Datasets Section */}
        <Box id="datasets" mb={6}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center">
                <Dataset sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h4" fontWeight="semibold">
                  Datasets & Data Sources
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph color="text.secondary">
                The foundation of our AI model is built on high-quality astronomical data from space missions.
              </Typography>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(1, 1fr)' }} gap={3}>
                {datasets.map((dataset, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Typography variant="h6" fontWeight="semibold">
                          {dataset.title}
                        </Typography>
                        <Chip 
                          label={dataset.type} 
                          size="small" 
                          color={dataset.type === 'Primary Dataset' ? 'primary' : 'default'}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {dataset.description}
                      </Typography>
                      <Link 
                        href={dataset.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        Access Dataset <Launch fontSize="small" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Research Papers Section */}
        <Box id="research" mb={6}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center">
                <Article sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h4" fontWeight="semibold">
                  Research Papers & Publications
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph color="text.secondary">
                Key scientific publications that influenced our approach and methodology.
              </Typography>
              {researchPapers.map((paper, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography variant="h6" fontWeight="semibold">
                        {paper.title}
                      </Typography>
                      <Chip 
                        label={paper.impact} 
                        size="small" 
                        color={paper.impact === 'High Impact' ? 'success' : 'primary'}
                      />
                    </Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {paper.authors}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {paper.description}
                    </Typography>
                    <Link 
                      href={paper.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                    >
                      Read Paper <Launch fontSize="small" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Tools Section */}
        <Box id="tools" mb={6}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center">
                <Code sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h4" fontWeight="semibold">
                  Tools & Libraries
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph color="text.secondary">
                Software tools and libraries used in developing this application.
              </Typography>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }} gap={2}>
                {tools.map((tool, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6" fontWeight="semibold">
                          {tool.name}
                        </Typography>
                        <Chip label={tool.category} size="small" />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {tool.description}
                      </Typography>
                      <Link 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        Visit Website <Launch fontSize="small" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Educational Resources Section */}
        <Box id="educational" mb={6}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center">
                <School sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h4" fontWeight="semibold">
                  Educational Materials
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph color="text.secondary">
                Additional resources for students, educators, and space enthusiasts.
              </Typography>
              
              <Box mb={4}>
                <Typography variant="h6" fontWeight="semibold" mb={2}>
                  Interactive Learning Resources
                </Typography>
                {educationalResources.map((resource, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Public color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          sx={{ textDecoration: 'none', fontWeight: 'semibold' }}
                        >
                          {resource.title}
                        </Link>
                      }
                      secondary={
                        <Box>
                          <Chip label={resource.type} size="small" sx={{ mr: 1, mb: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {resource.description}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="h6" fontWeight="semibold" mb={2}>
                  For Educators
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="semibold" mb={2}>
                      Classroom Integration Guide
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Lesson Plans" 
                          secondary="Download structured lesson plans for different grade levels"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Assessment Tools" 
                          secondary="Rubrics and evaluation criteria for student projects"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Extension Activities" 
                          secondary="Advanced projects for gifted students and STEM programs"
                        />
                      </ListItem>
                    </List>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      See our comprehensive Educational Guide (EDUCATIONAL_GUIDE.md) for detailed implementation instructions.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Project Repository */}
        <Card 
          sx={{ 
            background: 'linear-gradient(135deg, rgba(58, 174, 216, 0.1), rgba(180, 124, 237, 0.1))',
            border: `1px solid ${theme.palette.primary.main}30`
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <GitHub sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" fontWeight="semibold" mb={2}>
              Open Source Project
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              This project is open source! Explore the code, contribute improvements, 
              or use it as a foundation for your own exoplanet detection research.
            </Typography>
            <Button
              variant="contained"
              startIcon={<GitHub />}
              href="https://github.com/aditya2907/A-World-Away-Hunting-for-Exoplanets-with-AI"
              target="_blank"
              rel="noopener noreferrer"
              size="large"
            >
              View on GitHub
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Resources;
