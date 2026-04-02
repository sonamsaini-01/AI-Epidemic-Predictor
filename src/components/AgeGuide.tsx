import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Baby, GraduationCap, Briefcase, HeartPulse, ShieldCheck, Info } from "lucide-react";

const AGE_GROUPS = [
  {
    id: "children",
    label: "Children (0-12)",
    icon: Baby,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    advice: [
      "Ensure up-to-date routine vaccinations.",
      "Practice proper handwashing techniques through play.",
      "Monitor for unusual symptoms like persistent fever or cough.",
      "Maintain a consistent daily routine to reduce anxiety.",
    ],
  },
  {
    id: "teens",
    label: "Teens (13-19)",
    icon: GraduationCap,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    advice: [
      "Encourage responsible social distancing in school settings.",
      "Promote digital literacy for identifying health misinformation.",
      "Focus on mental health and social-emotional well-being.",
      "Stay active with home-based or socially distanced exercises.",
    ],
  },
  {
    id: "adults",
    label: "Adults (20-60)",
    icon: Briefcase,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    advice: [
      "Follow workplace safety protocols and remote work guidelines.",
      "Maintain a balanced diet and regular health check-ups.",
      "Manage stress through mindfulness or physical activity.",
      "Stay informed via official JHU/WHO health bulletins.",
    ],
  },
  {
    id: "seniors",
    label: "Seniors (60+)",
    icon: HeartPulse,
    color: "text-red-500",
    bg: "bg-red-500/10",
    advice: [
      "Prioritize booster shots and seasonal flu vaccinations.",
      "Utilize telehealth services for routine consultations.",
      "Ensure a 30-day supply of all essential medications.",
      "Maintain social connections through digital platforms.",
    ],
  },
];

export function AgeGuide() {
  const [activeGroup, setActiveGroup] = useState("adults");

  return (
    <Card className="animate-fade-in border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-4 bg-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Age-Specific Health Guide
          </CardTitle>
          <div className="flex items-center gap-1 px-2 py-1 bg-background/50 rounded-full border border-border/50">
            <Info className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Outbreak Protocol</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeGroup} onValueChange={setActiveGroup} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-border/50 bg-transparent h-14 p-0">
            {AGE_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <TabsTrigger
                  key={group.id}
                  value={group.id}
                  className="flex-1 h-full rounded-none data-[state=active]:bg-primary/5 data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Icon className={`h-4 w-4 ${activeGroup === group.id ? group.color : "text-muted-foreground"}`} />
                    <span className="text-[10px] font-medium hidden sm:block">{group.label.split(" ")[0]}</span>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {AGE_GROUPS.map((group) => (
            <TabsContent key={group.id} value={group.id} className="p-6 m-0 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl ${group.bg}`}>
                  <group.icon className={`h-6 w-6 ${group.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{group.label}</h3>
                  <p className="text-sm text-muted-foreground">Personalized health strategy for this demographic.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.advice.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex gap-3 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-colors group"
                  >
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <span className="text-[10px] font-bold">{index + 1}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
