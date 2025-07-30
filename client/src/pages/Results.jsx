import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Heart, MapPin, DollarSign, Users, Star, ArrowRight, Filter } from "lucide-react";

const mockMatches = [
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
  },
  {
    id: "3",
    name: "Sam Rivera",
    age: 23,
    gender: "Non-binary",
    city: "San Francisco",
    budget: 1000,
    compatibilityScore: 85,
    avatar: "/api/placeholder/150/150",
    traits: ["Creative", "Flexible", "Friendly"],
    lifestyle: "Artist",
    emotionalMatch: 88,
    budgetMatch: 85,
    lifestyleMatch: 82
  },
  {
    id: "4",
    name: "Casey Chen",
    age: 25,
    gender: "Female",
    city: "San Francisco",
    budget: 1300,
    compatibilityScore: 82,
    avatar: "/api/placeholder/150/150",
    traits: ["Professional", "Clean", "Independent"],
    lifestyle: "Healthcare Worker",
    emotionalMatch: 80,
    budgetMatch: 78,
    lifestyleMatch: 88
  },
  {
    id: "5",
    name: "Riley Park",
    age: 27,
    gender: "Male",
    city: "San Francisco",
    budget: 950,
    compatibilityScore: 78,
    avatar: "/api/placeholder/150/150",
    traits: ["Outdoorsy", "Laid-back", "Honest"],
    lifestyle: "Freelancer",
    emotionalMatch: 82,
    budgetMatch: 75,
    lifestyleMatch: 77
  }
];

const Results = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [shortlistedIds, setShortlistedIds] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMatches(mockMatches);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1000);
  }, []);

  const handleShortlist = (matchId) => {
    setShortlistedIds(prev =>
      prev.includes(matchId)
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  const handleViewProfile = (matchId) => {
    console.log("View profile:", matchId);
  };

  const handleProceedToShortlist = () => {
    if (shortlistedIds.length > 0) {
      localStorage.setItem('shortlistedMatches', JSON.stringify(shortlistedIds));
      navigate("/shortlist");
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">
            Your Perfect Matches! 🎉
          </h1>
          <p className="text-lg text-muted-foreground font-body mb-6">
            We found {matches.length} compatible roommates based on your preferences
          </p>

          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              <div className="absolute inset-0 animate-bounce-in">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" className="btn-glass font-body">
            <Filter className="w-4 h-4 mr-2" />
            Filter Results
          </Button>

          {shortlistedIds.length > 0 && (
            <Button
              onClick={handleProceedToShortlist}
              className="btn-hero font-body"
            >
              Review Shortlist ({shortlistedIds.length})
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, index) => (
            <Card
              key={match.id}
              className="glass-card hover-lift hover-glow animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <Avatar className="w-20 h-20 mx-auto mb-3 ring-2 ring-primary/20">
                    <AvatarImage src={match.avatar} alt={match.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-heading">
                      {match.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute -top-2 -right-2">
                    <div className={`text-2xl font-bold ${getScoreColor(match.compatibilityScore)} bg-white rounded-full px-2 py-1 shadow-md`}>
                      {match.compatibilityScore}%
                    </div>
                  </div>
                </div>

                <CardTitle className="font-heading text-xl">{match.name}</CardTitle>
                <p className="text-muted-foreground font-body">
                  {match.age} • {match.gender} • {match.lifestyle}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground font-body">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {match.city}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground font-body">
                    <DollarSign className="w-4 h-4 mr-2 text-primary" />
                    ${match.budget}/month
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-body">
                      <span>Emotional Match</span>
                      <span>{match.emotionalMatch}%</span>
                    </div>
                    <Progress value={match.emotionalMatch} className="h-2" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-body">
                      <span>Budget Match</span>
                      <span>{match.budgetMatch}%</span>
                    </div>
                    <Progress value={match.budgetMatch} className="h-2" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-body">
                      <span>Lifestyle Match</span>
                      <span>{match.lifestyleMatch}%</span>
                    </div>
                    <Progress value={match.lifestyleMatch} className="h-2" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {match.traits.map((trait) => (
                    <Badge key={trait} variant="secondary" className="font-body text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShortlist(match.id)}
                    className={`flex-1 font-body ${
                      shortlistedIds.includes(match.id)
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'btn-glass'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${
                        shortlistedIds.includes(match.id) ? 'fill-current' : ''
                      }`}
                    />
                    {shortlistedIds.includes(match.id) ? 'Shortlisted' : 'Shortlist'}
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => handleViewProfile(match.id)}
                    className="flex-1 btn-hero font-body"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground font-body mb-4">
            Not satisfied with these matches?
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/survey")}
            className="btn-glass font-body"
          >
            Retake Compatibility Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
