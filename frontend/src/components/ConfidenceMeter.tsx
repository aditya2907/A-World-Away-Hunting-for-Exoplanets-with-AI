import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface ConfidenceMeterProps {
  confidence: number;
  isPlanet: boolean;
}

const ConfidenceMeter = ({ confidence, isPlanet }: ConfidenceMeterProps) => {
  const percentage = Math.round(confidence * 100);
  const rotation = (percentage / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 relative overflow-hidden">
      {/* Glow effect */}
      <div className={`absolute inset-0 ${isPlanet ? 'bg-success/5' : 'bg-destructive/5'} blur-xl`}></div>
      
      <div className="relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Detection Confidence</h3>
          <p className="text-muted-foreground">Neural Network Analysis</p>
        </div>

        {/* Gauge meter */}
        <div className="relative w-64 h-32 mx-auto">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
              strokeLinecap="round"
            />
            
            {/* Colored arc */}
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke={isPlanet ? "hsl(var(--success))" : "hsl(var(--destructive))"}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 251} 251`}
              className="transition-all duration-1000 ease-out"
              style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
            />
            
            {/* Needle */}
            <g transform={`rotate(${rotation} 100 80)`} className="transition-transform duration-1000 ease-out">
              <line
                x1="100"
                y1="80"
                x2="100"
                y2="20"
                stroke="hsl(var(--foreground))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="80" r="6" fill="hsl(var(--foreground))" />
            </g>
          </svg>
        </div>

        {/* Result display */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            {isPlanet ? (
              <CheckCircle className="w-8 h-8 text-success" />
            ) : (
              <XCircle className="w-8 h-8 text-destructive" />
            )}
            <span className="text-5xl font-bold glow-text">
              {percentage}%
            </span>
          </div>
          
          <div className={`inline-block px-6 py-3 rounded-full ${
            isPlanet 
              ? 'bg-success/20 border border-success/50 text-success' 
              : 'bg-destructive/20 border border-destructive/50 text-destructive'
          }`}>
            <span className="font-semibold text-lg">
              {isPlanet ? 'Planet Detected' : 'False Positive'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConfidenceMeter;
