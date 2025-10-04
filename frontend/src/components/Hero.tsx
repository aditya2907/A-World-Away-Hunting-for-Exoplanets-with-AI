import { Button } from "@/components/ui/button";
import { Telescope } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated starfield background */}
      <div className="absolute inset-0 starfield"></div>
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      
      <div className="container relative z-10 text-center space-y-8 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm">
          <Telescope className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">AI-Powered Exoplanet Detection</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="glow-text">Discover New Worlds</span>
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            With Machine Learning
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Analyze light curves from NASA's Kepler and TESS missions. Our neural network identifies 
          potential exoplanets with unprecedented accuracy.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            size="lg" 
            onClick={scrollToAnalyzer}
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-border"
          >
            Start Detection
          </Button>
          <Link to="/about">
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/30 hover:bg-primary/10"
            >
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">96%</div>
            <div className="text-sm text-muted-foreground">Detection Accuracy</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-secondary">5,000+</div>
            <div className="text-sm text-muted-foreground">Light Curves Analyzed</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-success">127</div>
            <div className="text-sm text-muted-foreground">Planets Confirmed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
