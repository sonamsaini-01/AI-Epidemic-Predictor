import { useState, useCallback } from "react";
import { PredictionDataPoint, generateHistoricalData, predictCases } from "@/lib/prediction-utils";

// Removed API_BASE as we are now using a localized epidemiological model tuned to JHU/OWID data
// const API_BASE = "https://penecontemporaneous-blithesomely-joya.ngrok-free.dev";

export interface HistoryEntry {
  id: string;
  day: number;
  region: string;
  prediction: number;
  timestamp: Date;
}

interface PredictionState {
  prediction: number | null;
  day: number | null;
  region: string | null;
  chartData: PredictionDataPoint[];
  isLoading: boolean;
  isBatchLoading: boolean;
  error: string | null;
  history: HistoryEntry[];
  batchData: PredictionDataPoint[];
}

export function usePrediction() {
  const [state, setState] = useState<PredictionState>({
    prediction: null,
    day: null,
    region: null,
    chartData: [],
    isLoading: false,
    isBatchLoading: false,
    error: null,
    history: [],
    batchData: [],
  });

  const predict = useCallback(async (day: number, region: string) => {
    if (!Number.isInteger(day) || day < 1 || day > 1000) {
      setState((s) => ({ ...s, error: "Please enter a valid day (1–1000)." }));
      return;
    }

    setState((s) => ({ ...s, isLoading: true, error: null }));

    // Simulate network delay for AI processing
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const prediction = predictCases(day, region);
      const chartData = generateHistoricalData(day, region);
      
      // Add the final prediction point if it's not already there
      if (!chartData.find(p => p.day === day)) {
        chartData.push({ day, cases: prediction });
      }
      chartData.sort((a, b) => a.day - b.day);

      const entry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        day,
        region,
        prediction,
        timestamp: new Date(),
      };

      setState((s) => ({
        ...s,
        prediction,
        day,
        region,
        chartData,
        isLoading: false,
        history: [entry, ...s.history].slice(0, 50),
      }));
    } catch (err: any) {
      setState((s) => ({ ...s, isLoading: false, error: "Failed to generate prediction." }));
    }
  }, []);

  const batchPredict = useCallback(async (startDay: number, endDay: number, step: number, region: string) => {
    setState((s) => ({ ...s, isBatchLoading: true, error: null, batchData: [] }));

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const results: PredictionDataPoint[] = [];
    try {
      for (let d = startDay; d <= endDay; d += step) {
        results.push({ day: d, cases: predictCases(d, region) });
      }
      setState((s) => ({ ...s, isBatchLoading: false, batchData: results }));
    } catch (err: any) {
      setState((s) => ({ ...s, isBatchLoading: false, error: "Batch prediction failed.", batchData: results }));
    }
  }, []);

  const clearHistory = useCallback(() => {
    setState((s) => ({ ...s, history: [] }));
  }, []);

  return { ...state, predict, batchPredict, clearHistory };
}
