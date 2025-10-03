import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '@/components/ui/card';

interface LightCurveData {
  time: number;
  flux: number;
  detrended?: number;
}

interface LightCurveChartProps {
  data: LightCurveData[];
  title: string;
  showDetrended?: boolean;
}

const LightCurveChart = ({ data, title, showDetrended = false }: LightCurveChartProps) => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
      <h3 className="text-xl font-semibold mb-4 text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            label={{ value: 'Time (days)', position: 'insideBottom', offset: -5, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            label={{ value: 'Flux', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="flux" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={false}
            name="Raw Flux"
          />
          {showDetrended && (
            <Line 
              type="monotone" 
              dataKey="detrended" 
              stroke="hsl(var(--secondary))" 
              strokeWidth={2}
              dot={false}
              name="Detrended"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LightCurveChart;
