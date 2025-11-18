import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Monthly",
    price: "$3",
    period: "/month",
    description: "Perfect for trying out all features",
    features: [
      "Unlimited video editing",
      "Unlimited thumbnail creation",
      "Unlimited graphic designs",
      "AI-powered suggestions",
      "Cloud storage",
      "All templates included",
      "Priority support",
      "No watermarks",
    ],
  },
  {
    name: "Yearly",
    price: "$30",
    period: "/year",
    description: "Best value - Save $6 per year",
    popular: true,
    features: [
      "Unlimited video editing",
      "Unlimited thumbnail creation",
      "Unlimited graphic designs",
      "AI-powered suggestions",
      "Cloud storage",
      "All templates included",
      "Priority support",
      "No watermarks",
      "Early access to new features",
    ],
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-6 relative">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Full access to all features. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 ${
                plan.popular ? 'border-primary shadow-glow' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary rounded-full text-sm font-semibold text-background">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-8">
                <Button 
                  onClick={() => window.location.href = '/auth'}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:shadow-glow' 
                      : 'bg-gradient-primary hover:shadow-glow'
                  } transition-all duration-300`}
                  size="lg"
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center mt-12 text-muted-foreground">
          All features are fully unlocked until you subscribe. Try everything risk-free!
        </p>
      </div>
    </section>
  );
};
