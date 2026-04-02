# AI Epidemic Predictor 🦠🤖

An advanced epidemiological forecasting platform that leverages AI and historical time-series data from Johns Hopkins University (JHU) and Our World in Data (OWID) to predict the spread of infectious diseases.

## 🚀 Live Demo
[View the Live App](https://sonamsaini-01.github.io/AI-Epidemic-Predictor/)

## ✨ Key Features
- **AI Outbreak Forecasting**: Utilizes a Modified Logistic Growth model to predict case counts, recoveries, and deaths.
- **Hotspot Detection**: Interactive World Map visualization identifies emerging risk zones based on regional thresholds.
- **Epidemiological Factors**: Incorporates population density, mobility indices, healthcare capacity, and vaccination rates.
- **Age-Specific Health Guide**: Personalized protocols for Children, Teens, Adults, and Seniors during outbreaks.
- **Batch Analysis**: Compare predictions across different time horizons.
- **Modern UI**: High-impact glassmorphism design with automated insights.

## 🛠️ Tech Stack
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Visuals**: Recharts (Data Visualization) & Lucide-React (Icons)
- **Deployment**: GitHub Actions & GitHub Pages

## 📊 Data & Methodology
The predictor integrates data from:
1. **JHU COVID-19 Time Series**: Global case, death, and recovery counts.
2. **Our World in Data (OWID)**: Regional vaccination and mobility metrics.

The underlying model simulates disease transmission through a stochastic logistic growth algorithm, factoring in regional socio-demographic and healthcare infrastructure data.

## 🚀 Getting Started
1. Clone the repository: `git clone https://github.com/sonamsaini-01/AI-Epidemic-Predictor.git`
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Build for production: `npm run build`

## ⚖️ License
MIT License - feel free to use and adapt this project for public health preparedness!
