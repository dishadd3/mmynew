// Converted JSX (from TSX)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GenieGuide } from "@/components/GenieGuide";
import {
  Home,
  Heart,
  Brain,
  Mic,
  ShieldCheck,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [showGenieGuide, setShowGenieGuide] = useState(true);

  const features = [
    {
      icon: Mic,
      title: "AI Voice Assistant",
      description:
        "Natural voice interactions make the matching process more intuitive and personal",
    },
    {
      icon: Brain,
      title: "Smart Conflict Detection",
      description:
        "Advanced AI identifies potential compatibility issues before they become problems",
    },
    {
      icon: BarChart3,
      title: "Live Compatibility Score",
      description:
        "Real-time compatibility analysis based on personality, lifestyle, and preferences",
    },
  ];

  const onboardingSteps = [
    {
      step: 1,
      title: "Take Quiz",
      description: "Answer personality and lifestyle questions",
      icon: MessageSquare,
    },
    {
      step: 2,
      title: "Voice Input",
      description: "Share your preferences naturally",
      icon: Mic,
    },
    {
      step: 3,
      title: "View Matches",
      description: "See your top compatible roommates",
      icon: Heart,
    },
    {
      step: 4,
      title: "Confirm",
      description: "Choose your perfect match",
      icon: CheckCircle,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      avatar: "/api/placeholder/60/60",
      text: "RoomGenie found me the perfect roommate! We're so compatible, it feels like we've been friends for years.",
      rating: 5,
    },
    {
      name: "Alex Rodriguez",
      avatar: "/api/placeholder/60/60",
      text: "The AI matching is incredible. My roommate and I share the same cleanliness standards and social preferences.",
      rating: 5,
    },
    {
      name: "Jordan Kim",
      avatar: "/api/placeholder/60/60",
      text: "Finally, no more random roommate horror stories. RoomGenie actually understands compatibility.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Genie Guide Modal */}
      {showGenieGuide && (
        <GenieGuide onClose={() => setShowGenieGuide(false)} />
      )}
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-primary" />
              <span className="text-2xl font-heading font-bold text-primary">
                RoomGenie
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="font-body text-foreground hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="font-body text-foreground hover:text-primary transition-colors"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="font-body text-foreground hover:text-primary transition-colors"
              >
                Reviews
              </a>
              <ThemeToggle />
              <Button
                onClick={() => navigate("/admin")}
                variant="outline"
                className="btn-glass font-body"
              >
                Admin Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 font-body">
                  ✨ AI-Powered Roommate Matching
                </Badge>

                <h1 className="text-5xl lg:text-6xl font-heading font-bold leading-tight">
                  Find your perfect{" "}
                  <span className="text-primary relative">
                    roommate
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-primary rounded-full"></div>
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground font-body leading-relaxed">
                  Emotionally compatible. Logically matched. No more random
                  roommate disasters.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => navigate("/onboarding")}
                    size="lg"
                    className="btn-hero font-body text-lg px-8 py-6"
                  >
                    Find My Match
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="btn-glass font-body text-lg px-8 py-6"
                    onClick={() => {
                      document
                        .getElementById("how-it-works")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    How It Works
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-primary">
                    94%
                  </div>
                  <div className="text-sm text-muted-foreground font-body">
                    Match Success
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-primary">
                    1.2k+
                  </div>
                  <div className="text-sm text-muted-foreground font-body">
                    Happy Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-primary">
                    4.9
                  </div>
                  <div className="text-sm text-muted-foreground font-body">
                    Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - 3D House Illustration */}
            <div className="relative animate-float">
              <div className="glass-card p-8 rounded-3xl">
                <div className="relative">
                  {/* Simplified 3D House Representation */}
                  <div className="w-full max-w-md mx-auto">
                    {/* House Base */}
                    <div className="relative bg-gradient-primary p-8 rounded-2xl">
                      {/* Roof */}
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[100px] border-r-[100px] border-b-[60px] border-l-transparent border-r-transparent border-b-primary"></div>

                      {/* Windows */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-secondary/20 rounded-lg p-4 text-center">
                          <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                          <div className="text-xs font-body">Room A</div>
                        </div>
                        <div className="bg-secondary/20 rounded-lg p-4 text-center">
                          <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                          <div className="text-xs font-body">Room B</div>
                        </div>
                      </div>

                      {/* Door */}
                      <div className="bg-accent/30 rounded-lg p-4 text-center">
                        <Home className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <div className="text-sm font-body font-semibold">
                          Your Perfect Home
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 bg-yellow-100 rounded-full p-2 animate-glow">
                      <Sparkles className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-green-100 rounded-full p-2 animate-pulse">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-8">
            The Problem with Random Roommate Allocation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-heading font-semibold mb-2">
                  Personality Clashes
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  Introverts matched with party animals, neat freaks with messy
                  people
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-heading font-semibold mb-2">
                  Lifestyle Mismatches
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  Different sleep schedules, social preferences, and daily
                  routines
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-heading font-semibold mb-2">
                  Communication Issues
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  No framework for resolving conflicts or discussing shared
                  responsibilities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Key Features
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Advanced AI technology meets human psychology for perfect matches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass-card hover-lift hover-glow animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              How RoomGenie Works
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Simple steps to find your perfect roommate match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {onboardingSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="glass-card hover-lift text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-heading font-bold text-xl">
                      {step.step}
                    </div>
                    <step.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-heading font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {index < onboardingSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Real stories from happy roommates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="glass-card hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-heading">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-heading font-semibold">
                        {testimonial.name}
                      </p>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground font-body italic">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Ready to Find Your Perfect Roommate?
          </h2>
          <p className="text-xl text-muted-foreground font-body mb-8">
            Join thousands of happy users who found their ideal living situation
          </p>

          <Button
            onClick={() => navigate("/onboarding")}
            size="lg"
            className="btn-hero font-body text-lg px-12 py-6"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border glass">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Home className="w-6 h-6 text-primary" />
                <span className="text-xl font-heading font-bold text-primary">
                  RoomGenie
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-body">
                AI-powered roommate matching for the modern world.
              </p>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm font-body">
                <li>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-muted-foreground hover:text-primary"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Reviews
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm font-body">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm font-body">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground font-body">
              © 2024 RoomGenie. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
