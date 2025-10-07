import { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Snackbar, 
  Alert,
  Fade
} from '@mui/material';
import { ThumbUp, Cancel } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface UserFeedbackProps {
  onFeedback: (isPlanet: boolean) => void;
}

const UserFeedback = ({ onFeedback }: UserFeedbackProps) => {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const theme = useTheme();

  const handleFeedback = (isPlanet: boolean) => {
    setSelected(isPlanet);
    onFeedback(isPlanet);
    setShowSnackbar(true);
  };

  return (
    <>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h5" component="h3" fontWeight="semibold" gutterBottom>
              Human Validation
            </Typography>
            <Typography color="text.secondary">
              Do you think this is a planet?
            </Typography>
          </Box>

          <Box display="flex" gap={2} justifyContent="center">
            <Button
              size="large"
              variant={selected === true ? "contained" : "outlined"}
              onClick={() => handleFeedback(true)}
              startIcon={<ThumbUp />}
              sx={{
                flex: 1,
                maxWidth: 200,
                ...(selected === true && {
                  backgroundColor: theme.palette.success.main,
                  '&:hover': {
                    backgroundColor: theme.palette.success.dark,
                  },
                }),
                ...(selected !== true && {
                  borderColor: theme.palette.success.main,
                  color: theme.palette.success.main,
                  '&:hover': {
                    backgroundColor: `${theme.palette.success.main}10`,
                    borderColor: theme.palette.success.main,
                  },
                }),
              }}
            >
              Yes, Planet
            </Button>
            
            <Button
              size="large"
              variant={selected === false ? "contained" : "outlined"}
              onClick={() => handleFeedback(false)}
              startIcon={<Cancel />}
              sx={{
                flex: 1,
                maxWidth: 200,
                ...(selected === false && {
                  backgroundColor: theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: theme.palette.error.dark,
                  },
                }),
                ...(selected !== false && {
                  borderColor: theme.palette.error.main,
                  color: theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: `${theme.palette.error.main}10`,
                    borderColor: theme.palette.error.main,
                  },
                }),
              }}
            >
              No, False Positive
            </Button>
          </Box>

          {selected !== null && (
            <Fade in timeout={500}>
              <Typography 
                textAlign="center" 
                variant="body2" 
                color="text.secondary" 
                sx={{ mt: 2 }}
              >
                Your feedback has been recorded.
              </Typography>
            </Fade>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success" 
          variant="filled"
        >
          Thank you! Your input helps train our AI model.
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserFeedback;
