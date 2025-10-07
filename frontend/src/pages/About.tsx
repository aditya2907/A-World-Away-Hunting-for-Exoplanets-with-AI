import { Container, Typography, Box, Card, CardContent, Avatar, Link } from "@mui/material";
import Navbar from "../components/Navbar";
import { useTheme } from "@mui/material/styles";

const About = () => {
  const theme = useTheme();
  
  const teamMembers = [
    {
      name: "Aditya Suryawanshi",
      github: "https://github.com/aditya2907",
      avatar: "https://github.com/aditya2907.png"
    },
    {
      name: "Aditi Deshmukh", 
      github: "https://github.com/Daditi",
      avatar: "https://github.com/Daditi.png"
    },
    {
      name: "Soham Maji",
      github: "https://github.com/sohammyg", 
      avatar: "https://github.com/sohammyg.png"
    },
    {
      name: "Payal Vaswani",
      github: "https://github.com/vaspayal",
      avatar: "https://github.com/vaspayal.png"
    },
    {
      name: "Jyotirmoy Banarjee",
      github: "https://github.com/jyotirmoybanerjiportfolio771",
      avatar: "https://github.com/jyotirmoybanerjiportfolio771.png"
    }
  ];

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            About This Project
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            "A World Away: Hunting for Exoplanets with AI" is a project dedicated to leveraging machine learning to discover and classify exoplanets from astronomical data. Our goal is to make the process of identifying potential new worlds more accessible and efficient.
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '800px', mx: 'auto', space: 3 }}>
          <Typography variant="h4" component="h2" fontWeight="semibold" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            The universe is vast, and the search for exoplanets—planets orbiting stars other than our Sun—is one of the most exciting frontiers in modern astronomy. Thousands of exoplanets have been discovered, but analyzing the massive datasets from telescopes like Kepler and TESS is a monumental task. This project aims to apply artificial intelligence to automate and enhance the detection of these distant worlds.
          </Typography>

          <Typography variant="h4" component="h2" fontWeight="semibold" gutterBottom sx={{ mt: 4 }}>
            Project Goals
          </Typography>
          <Box component="ul" sx={{ pl: 2, '& li': { mb: 1 } }}>
            <Typography component="li" variant="body1">
              To build and train robust machine learning models capable of distinguishing real exoplanet transits from false positives.
            </Typography>
            <Typography component="li" variant="body1">
              To provide an interactive web application where users can explore predictions and understand the features that drive them.
            </Typography>
            <Typography component="li" variant="body1">
              To create a tool that can be used by both amateur astronomers and researchers to analyze stellar data.
            </Typography>
            <Typography component="li" variant="body1">
              To raise awareness and excitement about the ongoing search for life and habitable worlds beyond our solar system.
            </Typography>
          </Box>

          <Typography variant="h4" component="h2" fontWeight="semibold" gutterBottom sx={{ mt: 4 }}>
            The Team
          </Typography>
          <Typography variant="body1" paragraph>
            This project was developed by a passionate team of developers and data scientists with a shared love for space exploration and artificial intelligence.
          </Typography>

          <Box 
            display="grid" 
            gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} 
            gap={3} 
            sx={{ mt: 4 }}
          >
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                sx={{ 
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 25px ${theme.palette.primary.main}20`,
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Link 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    underline="none"
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <Avatar 
                      src={member.avatar} 
                      alt={member.name}
                      sx={{ 
                        width: 96, 
                        height: 96, 
                        mb: 2,
                        border: `2px solid ${theme.palette.primary.main}30`,
                        transition: 'border-color 0.3s ease',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                        }
                      }}
                    />
                    <Typography variant="h6" fontWeight="semibold">
                      {member.name}
                    </Typography>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default About;
