import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface ConfidenceMeterProps {
  probability: number;
}

const ConfidenceMeter = ({ probability }: ConfidenceMeterProps) => {
  const theme = useTheme();
  const isPlanet = probability > 0.5;
  const confidence = isPlanet ? probability : 1 - probability;
  const percentage = Math.round(confidence * 100);
  const rotation = (percentage / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <Card sx={{ 
      position: 'relative', 
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isPlanet 
          ? `radial-gradient(circle, ${theme.palette.success.main}10, transparent 70%)`
          : `radial-gradient(circle, ${theme.palette.error.main}10, transparent 70%)`,
        filter: 'blur(20px)',
        zIndex: 0,
      }
    }}>
      <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom>
            Detection Confidence
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Neural Network Analysis
          </Typography>
        </Box>

        {/* Gauge meter */}
        <Box display="flex" justifyContent="center" mb={3}>
          <Box sx={{ width: 256, height: 128, position: 'relative' }}>
            <svg viewBox="0 0 200 100" style={{ width: '100%', height: '100%' }}>
              {/* Background arc */}
              <path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke={theme.palette.divider}
                strokeWidth="12"
                strokeLinecap="round"
              />
              
              {/* Colored arc */}
              <path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke={isPlanet ? theme.palette.success.main : theme.palette.error.main}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 251} 251`}
                style={{ 
                  transition: 'all 1s ease-out',
                  filter: `drop-shadow(0 0 8px ${isPlanet ? theme.palette.success.main : theme.palette.error.main})`
                }}
              />
              
              {/* Needle */}
              <g 
                transform={`rotate(${rotation} 100 80)`} 
                style={{ 
                  transition: 'transform 1s ease-out',
                  transformOrigin: '100px 80px'
                }}
              >
                <line
                  x1="100"
                  y1="80"
                  x2="100"
                  y2="20"
                  stroke={theme.palette.text.primary}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="80" r="6" fill={theme.palette.text.primary} />
              </g>
            </svg>
          </Box>
        </Box>

        {/* Result display */}
        <Box textAlign="center">
          <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={2}>
            {isPlanet ? (
              <CheckCircle sx={{ fontSize: 32, color: 'success.main' }} />
            ) : (
              <Cancel sx={{ fontSize: 32, color: 'error.main' }} />
            )}
            <Typography 
              variant="h2" 
              component="span" 
              fontWeight="bold"
              sx={{
                textShadow: `0 0 20px ${isPlanet ? theme.palette.success.main : theme.palette.error.main}40`,
              }}
            >
              {percentage}%
            </Typography>
          </Box>
          
          <Chip
            label={isPlanet ? 'Planet Detected' : 'False Positive'}
            color={isPlanet ? 'success' : 'error'}
            variant="outlined"
            sx={{
              px: 3,
              py: 1,
              fontSize: '1.125rem',
              fontWeight: 600,
              backgroundColor: isPlanet 
                ? `${theme.palette.success.main}20` 
                : `${theme.palette.error.main}20`,
              borderColor: isPlanet 
                ? `${theme.palette.success.main}50` 
                : `${theme.palette.error.main}50`,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConfidenceMeter;
