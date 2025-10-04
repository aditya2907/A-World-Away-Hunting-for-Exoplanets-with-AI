import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThumbsUp, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserFeedbackProps {
  starId: string;
  onFeedback: (isPlanet: boolean) => void;
}

const UserFeedback = ({ starId, onFeedback }: UserFeedbackProps) => {
  const [selected, setSelected] = useState<boolean | null>(null);
  const { toast } = useToast();

  const handleFeedback = (isPlanet: boolean) => {
    setSelected(isPlanet);
    onFeedback(isPlanet);
    toast({
      title: "Feedback Recorded",
      description: `Thank you! Your input helps train our AI model.`,
    });
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Human Validation</h3>
          <p className="text-muted-foreground">Do you think this is a planet?</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            variant={selected === true ? "default" : "outline"}
            onClick={() => handleFeedback(true)}
            className={`flex-1 max-w-[200px] ${
              selected === true 
                ? 'bg-success hover:bg-success/90 border-success text-success-foreground' 
                : 'border-success/30 hover:bg-success/10'
            }`}
          >
            <ThumbsUp className="w-5 h-5 mr-2" />
            Yes, Planet
          </Button>
          
          <Button
            size="lg"
            variant={selected === false ? "default" : "outline"}
            onClick={() => handleFeedback(false)}
            className={`flex-1 max-w-[200px] ${
              selected === false 
                ? 'bg-destructive hover:bg-destructive/90 border-destructive' 
                : 'border-destructive/30 hover:bg-destructive/10'
            }`}
          >
            <XCircle className="w-5 h-5 mr-2" />
            No, False Positive
          </Button>
        </div>

        {selected !== null && (
          <div className="text-center text-sm text-muted-foreground animate-in fade-in">
            Your feedback has been recorded for star {starId}
          </div>
        )}
      </div>
    </Card>
  );
};

export default UserFeedback;
