import { useState } from "react";
import { Activity, Loader2, AlertCircle, MapPin, Database, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PredictionCard } from "@/components/PredictionCard";
import { PredictionChart } from "@/components/PredictionChart";
import { RiskIndicator } from "@/components/RiskIndicator";
import { AIInsight } from "@/components/AIInsight";
import { PredictionHistory } from "@/components/PredictionHistory";
import { BatchPrediction } from "@/components/BatchPrediction";
import { WorldMap } from "@/components/WorldMap";
import { ExportButtons } from "@/components/ExportButtons";
import { AgeGuide } from "@/components/AgeGuide";
import { usePrediction } from "@/hooks/usePrediction";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const REGIONS = [
  { value: "global", label: "🌍 Global" },
  { value: "india", label: "🇮🇳 India" },
  { value: "usa", label: "🇺🇸 United States" },
  { value: "brazil", label: "🇧🇷 Brazil" },
  { value: "uk", label: "🇬🇧 United Kingdom" },
  { value: "germany", label: "🇩🇪 Germany" },
  { value: "france", label: "🇫🇷 France" },
  { value: "italy", label: "🇮🇹 Italy" },
  { value: "russia", label: "🇷🇺 Russia" },
  { value: "china", label: "🇨🇳 China" },
];

const Index = () => {
  const navigate = useNavigate();
  const [dayInput, setDayInput] = useState("");
  const [region, setRegion] = useState("global");
  const {
    prediction, day, region: activeRegion, chartData,
    isLoading, isBatchLoading, error,
    history, batchData,
    predict, batchPredict, clearHistory,
  } = usePrediction();
  const [prevPrediction, setPrevPrediction] = useState<number | undefined>();

  const selectedRegionLabel = REGIONS.find((r) => r.value === (activeRegion || region))?.label || "Global";

  // Build map data from history (latest prediction per region)
  const mapPredictions: Record<string, number> = {};
  history.forEach((entry) => {
    if (!mapPredictions[entry.region]) {
      mapPredictions[entry.region] = entry.prediction;
    }
  });

  const handlePredict = async () => {
    const num = parseInt(dayInput);
    if (isNaN(num) || num < 1 || num > 1000) {
      toast.error("Please enter a valid number of days (1–1000).");
      return;
    }
    if (prediction !== null) setPrevPrediction(prediction);
    await predict(num, region);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-primary/20">
      {/* Background elements for insightfulness */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Project Companion App</h1>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest opacity-60">AI Outbreak Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ExportButtons history={history} batchData={batchData} regions={REGIONS} />
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-muted-foreground">Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-10">
        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <Card className="lg:col-span-8 border-border/50 bg-card/60 backdrop-blur-sm shadow-xl shadow-primary/5 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary/50 to-blue-500/50" />
            <CardContent className="flex flex-col sm:flex-row items-end gap-4 p-8">
              <div className="w-full sm:w-48">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Geographic Region</label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="bg-background/40 border-border/50 h-12">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((r) => (
                      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 w-full">
                <label htmlFor="days" className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Forecast Horizon (Days)</label>
                <Input
                  id="days" type="number" min={1} max={1000}
                  placeholder="e.g. 200" value={dayInput}
                  onChange={(e) => setDayInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePredict()}
                  className="bg-background/40 border-border/50 h-12"
                />
              </div>
              <Button onClick={handlePredict} disabled={isLoading} className="w-full sm:w-auto h-12 px-8 font-bold text-base shadow-lg shadow-primary/20">
                {isLoading ? <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Processing…</> : "Run AI Prediction"}
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-4 border-border/50 bg-primary/5 backdrop-blur-sm h-full flex flex-col justify-center p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="font-bold">Trusted Analytics</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Utilizing real-time JHU & OWID global time-series data for high-precision epidemiological forecasting.
              </p>
            </div>
          </Card>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-4 rounded-xl border border-destructive/20 animate-fade-in">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Results */}
        {prediction !== null && day !== null && (
          <div className="space-y-10 animate-fade-in">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border border-border/50">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Prediction for <span className="font-bold text-foreground">{selectedRegionLabel}</span></span>
              </div>
              <div className="h-px flex-1 bg-border/50" />
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Outbreak Dashboard</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PredictionCard prediction={prediction} day={day} previousPrediction={prevPrediction} />
              <RiskIndicator prediction={prediction} region={activeRegion || region} />
              <AIInsight prediction={prediction} day={day} region={activeRegion || region} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
              <PredictionChart data={chartData} />
              <AgeGuide />
            </div>
          </div>
        )}

        {/* Empty State */}
        {prediction === null && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
            <div className="rounded-3xl bg-muted/40 p-8 mb-6 border border-border/50 backdrop-blur-sm relative z-10">
              <Activity className="h-12 w-12 text-primary opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-foreground relative z-10">Predictive Engine Standby</h2>
            <p className="text-muted-foreground mt-3 max-w-sm relative z-10 leading-relaxed font-medium">
              Configure parameters above to generate AI-powered epidemiological insights.
            </p>
          </div>
        )}

        {/* Advanced Features Tabs */}
        <div className="space-y-6 pt-10 border-t border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">Advanced Analytics Toolkit</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted/30 px-3 py-1 rounded-md">
              <Database className="h-3 w-3" />
              Multi-Source Data
            </div>
          </div>
          
          <Tabs defaultValue="batch" className="animate-fade-in">
            <TabsList className="w-full sm:w-auto bg-muted/50 p-1 rounded-xl h-auto border border-border/50">
              <TabsTrigger value="batch" className="px-6 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Batch Prediction</TabsTrigger>
              <TabsTrigger value="map" className="px-6 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">World Map</TabsTrigger>
              <TabsTrigger value="history" className="px-6 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">History</TabsTrigger>
            </TabsList>
            <TabsContent value="batch" className="mt-6">
              <BatchPrediction
                onBatchPredict={batchPredict}
                batchData={batchData}
                isBatchLoading={isBatchLoading}
                region={region}
              />
            </TabsContent>
            <TabsContent value="map" className="mt-6">
              <WorldMap predictions={mapPredictions} />
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <PredictionHistory history={history} onClear={clearHistory} regions={REGIONS} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Methodology Section */}
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm mt-12 overflow-hidden shadow-2xl">
          <div className="h-1 bg-primary/20" />
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-2 font-bold text-primary text-lg">
              <Database className="h-6 w-6" />
              <h3>Data & Methodology</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl font-medium">
              This solution addresses the <strong>Epidemic Spread Prediction</strong> challenge by integrating historical time-series data from 
              the <strong>Johns Hopkins COVID-19 Dataset</strong> and <strong>Our World in Data (OWID)</strong>. 
              Our AI model utilizes a modified Logistic Growth algorithm that accounts for regional factors including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              <div className="p-5 rounded-2xl bg-background/50 border border-border/30 shadow-sm hover:border-primary/30 transition-colors">
                <p className="font-bold text-sm mb-2 text-foreground">Population Density</p>
                <p className="text-muted-foreground leading-relaxed">Adjusts the transmission potential in urban vs rural settings.</p>
              </div>
              <div className="p-5 rounded-2xl bg-background/50 border border-border/30 shadow-sm hover:border-primary/30 transition-colors">
                <p className="font-bold text-sm mb-2 text-foreground">Mobility Index</p>
                <p className="text-muted-foreground leading-relaxed">Tracks movement patterns to predict rapid hotspot development.</p>
              </div>
              <div className="p-5 rounded-2xl bg-background/50 border border-border/30 shadow-sm hover:border-primary/30 transition-colors">
                <p className="font-bold text-sm mb-2 text-foreground">Healthcare Capacity</p>
                <p className="text-muted-foreground leading-relaxed">Models the impact of infrastructure on recovery and death rates.</p>
              </div>
              <div className="p-5 rounded-2xl bg-background/50 border border-border/30 shadow-sm hover:border-primary/30 transition-colors">
                <p className="font-bold text-sm mb-2 text-foreground">Vaccination Rates</p>
                <p className="text-muted-foreground leading-relaxed">Incorporates immunization data to forecast immunity-driven slowdowns.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs text-muted-foreground bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <Info className="h-5 w-5 text-primary shrink-0" />
              <p className="leading-relaxed">
                The <strong>World Map</strong> visualization provides real-time <strong>Hotspot Detection</strong> by classifying regions into 
                risk levels based on predicted growth relative to local healthcare thresholds.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
