import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Image, Palette, Sparkles, Zap, Cloud } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "AI Video Editing",
    description: "Transform your raw footage into professional videos with AI-powered editing. Add music, transitions, and effects with simple prompts.",
    gradient: "from-primary to-cyan-glow",
  },
  {
    icon: Image,
    title: "Thumbnail Creation",
    description: "Design eye-catching thumbnails with customizable templates. AI suggests optimal layouts based on your content type.",
    gradient: "from-secondary to-teal-glow",
  },
  {
    icon: Palette,
    title: "Graphic Design Suite",
    description: "Create logos, social media posts, brochures, and more with powerful design tools and AI assistance.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Suggestions",
    description: "Get intelligent recommendations for colors, layouts, and designs based on your project goals and brand.",
    gradient: "from-cyan-glow to-primary",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Real-time rendering and instant exports. See your changes immediately and download in seconds.",
    gradient: "from-teal-glow to-secondary",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Access your projects from anywhere. All your work is automatically saved and synced across devices.",
    gradient: "from-secondary to-primary",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Everything You Need to Create
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful AI tools that make professional content creation accessible to everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-background" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]"></div>
    </section>
  );
};
