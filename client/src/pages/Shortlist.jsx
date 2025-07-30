import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Bot, ArrowLeft, Users, Star, Sparkles } from "lucide-react";

const mockShortlistedMatches = [
  {
    id: "1",
    name: "Alex Johnson",
    age: 24,
    gender: "Female",
    city: "San Francisco",
    budget: 1200,
    compatibilityScore: 92,
    avatar: "/api/placeholder/150/150",
    traits: ["Clean", "Social", "Organized"],
    lifestyle: "Active Professional",
    emotionalMatch: 95,
    budgetMatch: 88,
    lifestyleMatch: 93
  },
  {
    id: "2",
    name: "Jordan Smith",
    age: 26,
    gender: "Male",
    city: "San Francisco",
    budget: 1100,
    compatibilityScore: 87,
    avatar: "/api/placeholder/150/150",
    traits: ["Quiet", "Respectful", "Tech-savvy"],
    lifestyle: "Remote Worker",
    emotionalMatch: 85,
    budgetMatch: 92,
    lifestyleMatch: 84
  }
];

const Shortlist = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const shortlistedIds = JSON.parse(localStorage.getItem('shortlistedMatches') || '[]');
    const filteredMatches = mockShortlistedMatches.filter(match => 
      shortlistedIds.includes(match.id)
    );
    setMatches(filteredMatches);
  }, []);

  const handleSelectMatch = (matchId) => {
    setSelectedMatch(matchId);
  };

  const handleConfirmChoice = async () => {
    if (!selectedMatch) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    localStorage.setItem('finalChoice', selectedMatch);
    setIsSubmitting(false);
    alert("Your preference has been submitted! The admin will review and finalize room assignments.");
    navigate("/");
  };

  const handleLetAdminDecide = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    localStorage.setItem('adminDecision', 'true');
    setIsSubmitting(false);
    alert("Your preferences have been submitted! The admin will make the final decision based on all compatibility factors.");
    navigate("/");
  };

  if (matches.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass-card text-center max-w-md">
          <CardContent className="pt-6">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-heading font-semibold mb-2">No Matches Shortlisted</h2>
            <p className="text-muted-foreground font-body mb-4">
              You haven't shortlisted any matches yet. Go back to results to add some!
            </p>
            <Button onClick={() => navigate("/results")} className="btn-hero font-body">
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">
            Your Shortlist ⭐
          </h1>
          <p className="text-lg text-muted-foreground font-body mb-6">
            Compare your top matches and make your final choice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {matches.map((match) => (
            <Card 
              key={match.id}
              className={`glass-card hover-lift cursor-pointer transition-all duration-300 ${
                selectedMatch === match.id 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : ''
              }`}
              onClick={() => handleSelectMatch(match.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24 mx-auto mb-3 ring-2 ring-primary/20">
                    <AvatarImage src={match.avatar} alt={match.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-heading text-lg">
                      {match.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {selectedMatch === match.id && (
                    <div className="absolute -top-2 -right-2">
                      <CheckCircle className="w-8 h-8 text-green-500 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                <CardTitle className="font-heading text-xl">{match.name}</CardTitle>
                <p className="text-muted-foreground font-body">
                  {match.age} • {match.gender} • {match.lifestyle}
                </p>
                <div className="text-2xl font-bold text-primary">
                  {match.compatibilityScore}% Match
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-body">
                      <span>Emotional Compatibility</span>
                      <span className="font-semibold">{match.emotionalMatch}%</span>
                    </div>
                    <Progress value={match.emotionalMatch} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-body">
                      <span>Budget Alignment</span>
                      <span className="font-semibold">{match.budgetMatch}%</span>
                    </div>
                    <Progress value={match.budgetMatch} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-body">
                      <span>Lifestyle Compatibility</span>
                      <span className="font-semibold">{match.lifestyleMatch}%</span>
                    </div>
                    <Progress value={match.lifestyleMatch} className="h-2" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold font-body mb-2">Key Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.traits.map((trait) => (
                      <Badge key={trait} variant="secondary" className="font-body text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="text-sm font-body text-muted-foreground">
                    Budget: <span className="font-semibold text-foreground">${match.budget}/month</span>
                  </div>
                  <div className="text-sm font-body text-muted-foreground">
                    Location: <span className="font-semibold text-foreground">{match.city}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-muted-foreground font-body mb-6">
              Choose your preferred roommate or let our AI make the optimal decision
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleConfirmChoice}
              disabled={!selectedMatch || isSubmitting}
              className="btn-hero font-body min-w-48"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm My Choice
                </>
              )}
            </Button>
            <Button
              onClick={handleLetAdminDecide}
              disabled={isSubmitting}
              variant="outline"
              className="btn-glass font-body min-w-48"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4 mr-2" />
                  Let RoomGenie Decide
                </>
              )}
            </Button>
          </div>
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/results")}
              className="font-body text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Results
            </Button>
          </div>
        </div>

        <Card className="glass-card mt-8">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold mb-2">Let RoomGenie Decide</h3>
                <p className="text-sm text-muted-foreground font-body">
                  Our AI considers not just compatibility scores, but also factors like shared interests, 
                  communication styles, and long-term harmony potential to make the optimal match for 
                  everyone involved.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shortlist;