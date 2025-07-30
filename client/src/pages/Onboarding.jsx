import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  User,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    city: "",
    budget: 500,
    roommateCount: 1,
  });

  const totalSteps = 3;
  const progress = Math.floor((step / totalSteps) * 100);

  const handleNext = () => {
  if (step < totalSteps) {
    setStep(step + 1);
  } else {
    localStorage.setItem("userAge", JSON.stringify(formData?.age)); 
    navigate("/survey");
  }
};


  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                Tell us about yourself
              </h2>
              <p className="text-muted-foreground font-body">
                Basic information to get started
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="flex items-center gap-2 font-body"
                >
                  <User className="w-4 h-4 text-primary" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="glass-card border-0 font-body"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="age"
                  className="flex items-center gap-2 font-body"
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                  className="glass-card border-0 font-body"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-body">
                  Gender
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {["Male", "Female", "Other"].map((gender) => (
                    <Button
                      key={gender}
                      variant={
                        formData.gender === gender ? "default" : "outline"
                      }
                      onClick={() => updateFormData("gender", gender)}
                      className="btn-glass font-body"
                    >
                      {gender}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                Location & Living
              </h2>
              <p className="text-muted-foreground font-body">
                Where and how you want to live
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="flex items-center gap-2 font-body"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  City/Location
                </Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  className="glass-card border-0 font-body"
                />
              </div>
              <div className="space-y-4">
                <Label className="flex items-center gap-2 font-body">
                  <Users className="w-4 h-4 text-primary" />
                  Number of Roommates
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((count) => (
                    <Button
                      key={count}
                      variant={
                        formData.roommateCount === count ? "default" : "outline"
                      }
                      onClick={() => updateFormData("roommateCount", count)}
                      className="btn-glass font-body"
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                Budget Preferences
              </h2>
              <p className="text-muted-foreground font-body">
                What can you afford?
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="flex items-center gap-2 font-body">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Monthly Budget: ${formData.budget}
                </Label>
                <Slider
                  value={[formData.budget]}
                  onValueChange={(value) => updateFormData("budget", value[0])}
                  max={2000}
                  min={200}
                  step={50}
                  className="w-full"
                  thumbClassName="h-5 w-5 rounded-full border-none shadow-md bg-[hsl(var(--primary))]"
                  trackClassName="h-2 bg-[hsl(var(--foreground))] dark:bg-[hsl(var(--background))]"
                  rangeClassName="bg-[hsl(var(--primary-glow))]"
                />

                <div className="flex justify-between text-sm text-muted-foreground font-body">
                  <span>$200</span>
                  <span>$2000+</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="glass-card animate-slide-up">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-heading text-primary">
              RoomGenie
            </CardTitle>

            {/* Fixed progress bar */}
            <div
              className="w-full h-2 rounded-full overflow-hidden mt-4 border"
              style={{
                backgroundColor: "hsl(var(--muted))",
                borderColor: "hsl(var(--border))",
              }}
            >
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  backgroundColor: "hsl(var(--primary))",
                }}
              />
            </div>

            <p className="text-sm text-muted-foreground font-body mt-2">
              Step {step} of {totalSteps}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {renderStep()}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="btn-glass font-body"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {step === 1 ? "Home" : "Back"}
              </Button>
              <Button
                onClick={handleNext}
                className="btn-hero font-body"
                disabled={step === 1 && (!formData.name || !formData.age)}
              >
                {step === totalSteps ? "Take Quiz" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
