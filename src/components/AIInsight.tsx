import { classifyRisk, getAIInsight } from "@/lib/prediction-utils";
import { BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AIInsightProps {
  prediction: number;
  day: number;
  region: string;
}

export function AIInsight({ prediction, day, region }: AIInsightProps) {
  const risk = classifyRisk(prediction, region);
  const insight = getAIInsight(risk, prediction, day, region);

  return (
    <Card className="animate-fade-in border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BrainCircuit className="h-5 w-5 text-primary" />
          AI Insight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{insight}</p>
      </CardContent>
    </Card>
  );
}
