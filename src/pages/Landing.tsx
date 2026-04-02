import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Shield, BrainCircuit, BarChart3, ArrowRight, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20">
      {/* Background blobs for insightfulness */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-primary p-2 shadow-lg shadow-primary/20">
            <Activity className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Project Companion
          </span>
        </div>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 py-12 lg:py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8 max-w-2xl animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Predicting the <span className="text-primary italic">Future</span> of Public Health.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Advanced AI-powered epidemic forecasting using JHU & OWID global data. 
              Gain actionable insights to protect your community.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/50 transition-colors group">
              <CardContent className="p-4 flex flex-col gap-3">
                <BrainCircuit className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">AI Models</h3>
                <p className="text-xs text-muted-foreground">Logistic growth analysis for precise forecasting.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/40 backdrop-blur-md border-border/50 hover:border-blue-500/50 transition-colors group">
              <CardContent className="p-4 flex flex-col gap-3">
                <BarChart3 className="h-8 w-8 text-blue-500 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">Hotspot Detection</h3>
                <p className="text-xs text-muted-foreground">Real-time identification of emerging risk zones.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center animate-scale-in">
          <Card className="w-full max-w-md border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl relative">
            <div className="absolute -top-4 -right-4 h-12 w-12 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
                <p className="text-sm text-muted-foreground">Enter your credentials to access the predictor</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="email" 
                      placeholder="name@example.com" 
                      className="pl-10 bg-background/50 border-border/50 focus:ring-primary/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      className="pl-10 bg-background/50 border-border/50 focus:ring-primary/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button className="w-full h-11 text-base font-semibold group" type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : (
                    <>
                      Login <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or demo mode</span>
                </div>
              </div>

              <Button variant="outline" className="w-full border-border/50 hover:bg-primary/5 transition-colors" onClick={() => navigate("/dashboard")}>
                View Public Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-12 border-t border-border/50 mt-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-60">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Secure Data Integration: JHU & OWID</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Project Companion App. Advanced Epidemiological Modeling.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
