import { useState } from 'react';
import ConfidenceMeter from './ConfidenceMeter';
import UserFeedback from './UserFeedback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2 } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

type Mode = 'simple' | 'advanced';

// Define the features for the advanced form
const features = [
  'koi_period', 'koi_time0bk', 'koi_impact', 'koi_duration',
  'koi_depth', 'koi_prad', 'koi_teq', 'koi_insol',
  'koi_model_snr', 'koi_steff', 'koi_slogg', 'koi_srad', 'ra', 'dec'
];

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

    const endpoint = 'http://127.0.0.1:5000/predict_ml';
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

  const handleSimpleSliderChange = (feature: keyof typeof simpleInputs, value: number[]) => {
    setSimpleInputs(prev => ({ ...prev, [feature]: value[0] }));
  };

  const canAnalyze = () => {
    if (mode === 'advanced') {
      return features.every(f => advancedInputs[f] && !isNaN(parseFloat(advancedInputs[f])));
    }
    return true; // Simple mode always enabled
  };

  return (
    <div id="analyzer" className="container py-16 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Exoplanet Detection System
          </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose your analysis method. Use simplified inputs or provide all features for a detailed prediction.
        </p>
      </div>

      <Tabs defaultValue="simple" onValueChange={(value) => setMode(value as Mode)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simple">Simple Input</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Input</TabsTrigger>
        </TabsList>
        <TabsContent value="simple">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label>Signal Strength (koi_model_snr): {simpleInputs.koi_model_snr.toFixed(2)}</Label>
                <Slider defaultValue={[simpleInputs.koi_model_snr]} max={1000} step={10} onValueChange={(v) => handleSimpleSliderChange('koi_model_snr', v)} />
              </div>
              <div>
                <Label>Planetary Radius (koi_prad): {simpleInputs.koi_prad.toFixed(2)}</Label>
                <Slider defaultValue={[simpleInputs.koi_prad]} max={100} step={0.5} onValueChange={(v) => handleSimpleSliderChange('koi_prad', v)} />
              </div>
              <div>
                <Label>Orbital Period (koi_period): {simpleInputs.koi_period.toFixed(2)}</Label>
                <Slider defaultValue={[simpleInputs.koi_period]} max={1000} step={1} onValueChange={(v) => handleSimpleSliderChange('koi_period', v)} />
              </div>
              <div>
                <Label>Transit Duration (koi_duration): {simpleInputs.koi_duration.toFixed(2)}</Label>
                <Slider defaultValue={[simpleInputs.koi_duration]} max={24} step={0.1} onValueChange={(v) => handleSimpleSliderChange('koi_duration', v)} />
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="advanced">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {features.map(feature => (
                <div key={feature}>
                  <Label htmlFor={feature} className="text-foreground text-sm">{feature}</Label>
                  <Input
                    id={feature}
                    type="text"
                    placeholder={featureDefaults[feature]?.toString() || ''}
                    value={advancedInputs[feature]}
                    onChange={(e) => handleAdvancedInputChange(feature, e.target.value)}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

      {!prediction && !isAnalyzing && (
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            onClick={handleAnalyze}
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-border"
            disabled={!canAnalyze()}
          >
            Get Prediction
          </Button>
        </div>
      )}

      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Processing analysis...</p>
        </div>
      )}

      {prediction && (
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <ConfidenceMeter 
            confidence={confidence}
            isPlanet={isPlanet}
          />
          
          <UserFeedback 
            starId={'Custom Input'}
            onFeedback={handleFeedback}
          />
        </div>
      )}

      {prediction && !isAnalyzing && (
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            onClick={handleReset}
            variant="outline"
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExoplanetAnalyzer;
