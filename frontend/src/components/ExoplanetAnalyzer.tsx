import { useState } from 'react';
import LightCurveChart from './LightCurveChart';
import ConfidenceMeter from './ConfidenceMeter';
import UserFeedback from './UserFeedback';
import StarSelector from './StarSelector';
import { generateLightCurve, generateFoldedCurve, mockStarCandidates, predictPlanet } from '@/utils/mockData';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

const ExoplanetAnalyzer = () => {
  const [selectedStar, setSelectedStar] = useState(mockStarCandidates[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<{ confidence: number; isPlanet: boolean } | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setPrediction(null);
    
    // Simulate ML processing time
    setTimeout(() => {
      const result = predictPlanet(selectedStar);
      setPrediction(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleStarSelect = (starId: string) => {
    setSelectedStar(starId);
    setPrediction(null);
  };

  const handleFeedback = (isPlanet: boolean) => {
    console.log(`User feedback for ${selectedStar}: ${isPlanet ? 'Planet' : 'False Positive'}`);
    // In a real app, this would send data to backend
  };

  const lightCurveData = generateLightCurve(prediction?.isPlanet ?? true);
  const foldedCurveData = generateFoldedCurve();

  return (
    <div id="analyzer" className="container py-16 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Exoplanet Detection System
          </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select a target star and analyze its light curve using our neural network model
        </p>
      </div>

      <StarSelector 
        stars={mockStarCandidates}
        selectedStar={selectedStar}
        onSelectStar={handleStarSelect}
      />

      {!prediction && !isAnalyzing && (
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleAnalyze}
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-border"
          >
            Analyze Light Curve
          </Button>
        </div>
      )}

      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Processing neural network analysis...</p>
        </div>
      )}

      {prediction && (
        <>
          <div className="grid lg:grid-cols-2 gap-8">
            <LightCurveChart 
              data={lightCurveData}
              title="Raw vs Detrended Light Curve"
              showDetrended={true}
            />
            
            <LightCurveChart 
              data={foldedCurveData}
              title="Phase-Folded Transit"
              showDetrended={false}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ConfidenceMeter 
              confidence={prediction.confidence}
              isPlanet={prediction.isPlanet}
            />
            
            <UserFeedback 
              starId={selectedStar}
              onFeedback={handleFeedback}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ExoplanetAnalyzer;
