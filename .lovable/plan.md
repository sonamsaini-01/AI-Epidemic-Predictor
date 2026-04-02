

# Epidemic Spread Predictor - Implementation Plan

## Overview
Build a professional epidemic prediction dashboard with day-based prediction input, live API integration, risk visualization, line charts, and dark/light mode.

## Architecture

### New Files
1. **`src/pages/Index.tsx`** - Main dashboard page with all sections
2. **`src/components/PredictionCard.tsx`** - Large card showing predicted cases, risk badge, trend arrow
3. **`src/components/PredictionChart.tsx`** - Recharts line chart (simulated historical + predicted point)
4. **`src/components/RiskIndicator.tsx`** - Color-coded risk level component (green/yellow/red)
5. **`src/components/AIInsight.tsx`** - AI-generated insight message card based on risk level
6. **`src/components/ThemeToggle.tsx`** - Dark/light mode toggle button
7. **`src/hooks/usePrediction.ts`** - Custom hook for API calls + state management
8. **`src/lib/prediction-utils.ts`** - Risk classification logic, formatting helpers

### Modified Files
1. **`src/index.css`** - Add dark mode CSS variables, custom gradient/glow keyframes
2. **`tailwind.config.ts`** - Add custom animations (fade-in, slide-up, pulse-glow)
3. **`src/App.tsx`** - Wrap with theme provider

## Key Implementation Details

### API Integration (`usePrediction` hook)
- Calls `GET https://penecontemporaneous-blithesomely-joya.ngrok-free.dev/predict?day=${day}`
- Validates input: positive integer, max 1000 days
- Stores prediction history in state for chart data
- Handles loading, error, and success states
- Adds `ngrok-skip-browser-warning` header to bypass ngrok interstitial

### Dashboard Layout
- Header with app title + theme toggle
- Input section: number input + "Predict" button
- Results grid (3 columns on desktop, stacked on mobile):
  - Predicted Cases card (large number + trend)
  - Risk Level card (color-coded badge + label)
  - AI Insight card (contextual message)
- Full-width line chart below showing prediction history

### Chart (Recharts)
- X-axis: Day number
- Y-axis: Predicted cases
- Line chart with area fill gradient
- Each prediction call adds a data point
- Animated on data change

### Risk Logic
- `< 10,000` → Low (green badge, calm insight)
- `10,000 - 100,000` → Medium (yellow badge, cautionary insight)
- `> 100,000` → High (red badge, urgent insight)

### Dark/Light Mode
- Toggle adds/removes `dark` class on `<html>`
- Persist preference in localStorage
- Update CSS variables for dark theme in `index.css`

### Animations
- Cards fade-in/slide-up on mount
- Number count-up animation for predicted cases
- Loading spinner with pulse effect
- Smooth chart transitions

### Error Handling
- Network errors show toast notification
- Invalid input shows inline validation message
- API timeout after 10 seconds

## Execution Order
1. Set up theme toggle + dark mode CSS
2. Build prediction utilities and hook
3. Create dashboard layout with input section
4. Build result cards (PredictionCard, RiskIndicator, AIInsight)
5. Add PredictionChart with Recharts
6. Wire everything together with animations

