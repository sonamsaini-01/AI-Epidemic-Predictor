import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionDataPoint } from "@/lib/prediction-utils";
import { TrendingUp } from "lucide-react";

interface PredictionChartProps {
  data: PredictionDataPoint[];
}

export function PredictionChart({ data }: PredictionChartProps) {
  if (data.length === 0) return null;

  return (
    <Card className="animate-fade-in border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          Case Growth Projection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="caseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="deathGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="recoveredGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                label={{ value: "Forecast Day", position: "insideBottom", offset: -2, fill: "hsl(var(--muted-foreground))", fontSize: 10 }} 
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelFormatter={(v) => `Day ${v}`}
              />
              <Area 
                type="monotone" 
                dataKey="cases" 
                name="Total Cases"
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                fill="url(#caseGradient)" 
                dot={{ r: 3, fill: "hsl(var(--primary))" }} 
                activeDot={{ r: 5 }} 
                animationDuration={1000} 
              />
              <Area 
                type="monotone" 
                dataKey="recovered" 
                name="Recoveries"
                stroke="#10b981" 
                strokeWidth={2} 
                fill="url(#recoveredGradient)" 
                dot={false}
                animationDuration={1200} 
              />
              <Area 
                type="monotone" 
                dataKey="deaths" 
                name="Deaths"
                stroke="#ef4444" 
                strokeWidth={2} 
                fill="url(#deathGradient)" 
                dot={false}
                animationDuration={1400} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
