// Converted to JSX (no TypeScript)
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere, Box, OrbitControls } from '@react-three/drei';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Sparkles } from 'lucide-react';
import * as THREE from 'three';

function GenieCharacter() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial color="hsl(75, 25%, 55%)" />
      </Sphere>
      <Box args={[1.2, 0.3, 1.2]} position={[0, 1, 0]}>
        <meshPhongMaterial color="hsl(30, 20%, 60%)" />
      </Box>
      <Sphere args={[0.2, 16, 16]} position={[0.5, 1.3, 0]}>
        <meshPhongMaterial color="hsl(38, 35%, 85%)" />
      </Sphere>
      <Sphere args={[0.1, 16, 16]} position={[-0.2, 0.2, 0.7]}>
        <meshPhongMaterial color="white" />
      </Sphere>
      <Sphere args={[0.1, 16, 16]} position={[0.2, 0.2, 0.7]}>
        <meshPhongMaterial color="white" />
      </Sphere>
      <Sphere args={[0.05, 16, 16]} position={[-0.2, 0.2, 0.75]}>
        <meshPhongMaterial color="black" />
      </Sphere>
      <Sphere args={[0.05, 16, 16]} position={[0.2, 0.2, 0.75]}>
        <meshPhongMaterial color="black" />
      </Sphere>
      <Sphere args={[0.05, 8, 8]} position={[1.2, 0.5, 0]}>
        <meshPhongMaterial color="yellow" emissive="yellow" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.03, 8, 8]} position={[-1.1, 0.8, 0.5]}>
        <meshPhongMaterial color="cyan" emissive="cyan" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.04, 8, 8]} position={[0.8, -0.5, 0.8]}>
        <meshPhongMaterial color="magenta" emissive="magenta" emissiveIntensity={0.5} />
      </Sphere>
    </group>
  );
}

export const GenieGuide = ({ onClose }) => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      title: "Welcome to RoomGenie! ✨",
      description: "I'm your magical roommate finder! Let me show you how to find your perfect match in just 3 simple steps."
    },
    {
      title: "Step 1: Share Your Vibe 🎯",
      description: "Take our fun personality quiz or use voice input to tell me about your lifestyle, habits, and preferences."
    },
    {
      title: "Step 2: AI Magic Happens 🧠",
      description: "My advanced algorithms analyze compatibility across emotional, lifestyle, and budget factors to find your ideal matches."
    },
    {
      title: "Step 3: Meet Your Matches 🏠",
      description: "Review your top 5 matches with detailed compatibility scores and choose your perfect roommate!"
    }
  ];

  const nextTip = () => {
    if (currentTip < tips.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      onClose();
    }
  };

  const skipGuide = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl glass-card animate-scale-in">
        <CardContent className="p-8">
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={skipGuide}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="h-80 relative">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="hsl(75, 25%, 55%)" />
                <GenieCharacter />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
              </Canvas>

              <div className="absolute inset-0 pointer-events-none">
                <Sparkles className="absolute top-4 right-8 text-primary animate-pulse" size={20} />
                <Sparkles className="absolute bottom-8 left-4 text-accent animate-pulse delay-300" size={16} />
                <Sparkles className="absolute top-12 left-12 text-secondary animate-pulse delay-700" size={18} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {tips[currentTip].title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {tips[currentTip].description}
                </p>
              </div>

              <div className="flex justify-center space-x-2 py-4">
                {tips.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTip
                        ? 'bg-primary scale-125'
                        : index < currentTip
                        ? 'bg-primary/60'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={skipGuide} className="btn-glass">
                  Skip Guide
                </Button>
                <Button onClick={nextTip} className="btn-hero px-8">
                  {currentTip === tips.length - 1 ? "Let's Start!" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
