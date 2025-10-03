import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface StarCandidate {
  id: string;
  name: string;
  mission: string;
  confidence: number;
}

interface StarSelectorProps {
  stars: StarCandidate[];
  selectedStar: string;
  onSelectStar: (starId: string) => void;
}

const StarSelector = ({ stars, selectedStar, onSelectStar }: StarSelectorProps) => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Select Target Star</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stars.map((star) => (
            <Button
              key={star.id}
              variant={selectedStar === star.id ? "default" : "outline"}
              onClick={() => onSelectStar(star.id)}
              className={`h-auto p-4 flex flex-col items-start gap-2 ${
                selectedStar === star.id 
                  ? 'bg-primary hover:bg-primary/90 border-primary glow-border' 
                  : 'border-primary/20 hover:bg-primary/5'
              }`}
            >
              <div className="font-semibold text-base">{star.name}</div>
              <div className="text-xs opacity-80">
                {star.mission} • {Math.round(star.confidence * 100)}% confidence
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default StarSelector;
