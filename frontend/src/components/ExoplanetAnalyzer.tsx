import { useState } from 'react';
import LightCurveChart from './LightCurveChart';
import ConfidenceMeter from './ConfidenceMeter';
import UserFeedback from './UserFeedback';
import { generateLightCurve, generateFoldedCurve } from '@/utils/mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2 } from 'lucide-react';
import { Card } from './ui/card';

const ExoplanetAnalyzer = () => {
  const [kepid, setKepid] = useState('');
  const [koiPeriod, setKoiPeriod] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<{ prediction: string; probability: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!kepid || !koiPeriod) {
      setError('Please enter both a Kepler ID and an orbital period.');
      return;
    }
    setError(null);
    setIsAnalyzing(true);
    setPrediction(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict_dl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kepid: parseInt(kepid, 10),
          koi_period: parseFloat(koiPeriod)
        }),
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

  const handleFeedback = (isPlanet: boolean) => {
    console.log(`User feedback for ${kepid}: ${isPlanet ? 'Planet' : 'False Positive'}`);
    // In a real app, this would send data to backend
  };

  const isPlanet = prediction ? prediction.prediction !== 'False Positive' : true;
  const confidence = prediction ? prediction.probability : 0;

  const lightCurveData = generateLightCurve(isPlanet);
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
          Enter a Kepler ID and its orbital period to analyze its light curve with our neural network model.
        </p>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <div className="grid sm:grid-cols-2 gap-4 items-end">
          <div>
            <Label htmlFor="kepid" className="text-foreground">Kepler ID (kepid)</Label>
            <Input 
              id="kepid"
              type="text"
              placeholder="e.g., 11904151"
              value={kepid}
              onChange={(e) => setKepid(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="koi_period" className="text-foreground">Orbital Period (days)</Label>
            <Input
              id="koi_period"
              type="text"
              placeholder="e.g., 0.259862"
              value={koiPeriod}
              onChange={(e) => setKoiPeriod(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </Card>

      {!prediction && !isAnalyzing && (
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleAnalyze}
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-border"
            disabled={!kepid || !koiPeriod}
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
              confidence={confidence}
              isPlanet={isPlanet}
            />
            
            <UserFeedback 
              starId={kepid}
              onFeedback={handleFeedback}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ExoplanetAnalyzer;
