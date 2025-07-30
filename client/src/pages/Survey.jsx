import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, Mic } from "lucide-react";

const ageBasedQuestions = (age) => {
  if (age >= 16 && age < 18) {
    return [
      {
        text: "How strongly do you stick to a fixed sleep schedule?",
        emoji: "⏰",
        leftLabel: "Sleep Anytime",
        rightLabel: "Fixed Timings",
      },
      {
        text: "How clean and organized do you like your room to be?",
        emoji: "🧹",
        leftLabel: "Messy is fine",
        rightLabel: "Spotless",
      },
      {
        text: "Where do you stand between self-study and group discussions as a way to learn?",
        emoji: "📚",
        leftLabel: "Only self-study",
        rightLabel: "Only group discussion",
      },
      {
        text: "How much do you prefer having an emotionally supportive roommate (someone to talk to)",
        emoji: "🫂",
        leftLabel: "Not important",
        rightLabel: "Very important",
      },
      {
        text: "How important is it for you to have a roommate from your same stream (e.g., Science/Commerce)?",
        emoji: "🔬",
        leftLabel: "Doesn't matter",
        rightLabel: "Must be same",
      },
    ];
  } else if (age >= 18 && age <= 25) {
    return [
      {
        text: "On a scale of 0–10, how particular are you about keeping your room clean and organized?",
        emoji: "🧽",
        leftLabel: "Not at all",
        rightLabel: "Extremely",
      },
      {
        text: "On a scale of 0–10, how much noise (reels/music/chatting/netflix) can you tolerate in your room?",
        emoji: "🔊",
        leftLabel: "Need silence",
        rightLabel: "Any noise is fine",
      },
      {
        text: "How comfortable are you with a roommate inviting friends to the room?",
        emoji: "👥",
        leftLabel: "Not comfortable",
        rightLabel: "Totally fine",
      },
      {
        text: "How willing are you to share personal items like utensils, chargers, etc.?",
        emoji: "🔌",
        leftLabel: "Not at all",
        rightLabel: "Very comfortable",
      },
      {
        text: "How much do you prefer discussing your feelings or daily experiences with your roommate?",
        emoji: "💬",
        leftLabel: "Keep to self",
        rightLabel: "Share openly",
      },
    ];
  } else {
    return [
      {
        text: "How much do you enjoy socializing with your roommate after work?",
        emoji: "🥂",
        leftLabel: "No interaction",
        rightLabel: "Love socializing",
      },
      {
        text: "How comfortable are you with a roommate having a very different schedule (e.g., night shifts or early work hours)?",
        emoji: "🕒",
        leftLabel: "Not at all",
        rightLabel: "Completely fine",
      },
      {
        text: "How comfortable are you with occasional parties or alcohol use in your living space?",
        emoji: "🍻",
        leftLabel: "Not okay",
        rightLabel: "Totally okay",
      },
      {
        text: "How important is a clean and organized home to you?",
        emoji: "🏡",
        leftLabel: "Not important",
        rightLabel: "Extremely important",
      },
      {
        text: "How important is it for your roommate to respect your work-life balance (e.g., no loud noise during late-night calls)?",
        emoji: "💼",
        leftLabel: "Doesn’t matter",
        rightLabel: "Extremely important",
      },
    ];
  }
};

const Survey = () => {
  const navigate = useNavigate();
  const age = Number(localStorage.getItem("userAge")) || 20;
  const questions = ageBasedQuestions(age);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(5));
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [ws, setWs] = useState(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    startOmnidimSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-US";

      recog.onstart = () => {
        setIsRecording(true);
        setVoiceTranscript("");
      };

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setVoiceTranscript(transcript);
        const score = parseTranscriptToScore(transcript);
        if (score !== null) {
          const newAnswers = [...answers];
          newAnswers[currentQuestion] = score;
          setAnswers(newAnswers);
        }
      };

      recog.onend = () => setIsRecording(false);
      recog.onerror = () => setIsRecording(false);

      setRecognition(recog);
    }
  }, []);

  const parseTranscriptToScore = (transcript) => {
    const numbers = transcript.match(/\d+(\.\d+)?/g);
    if (numbers) {
      const num = parseFloat(numbers[0]);
      return Math.min(Math.max(num, 0), 10);
    }

    const wordToNumber = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      half: 0.5,
    };

    for (const [word, num] of Object.entries(wordToNumber)) {
      if (transcript.includes(word)) return num;
    }

    return null;
  };

  const handleSliderChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value[0];
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      localStorage.setItem("surveyAnswers", JSON.stringify(answers));
      navigate("/results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate("/onboarding");
    }
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    isRecording ? recognition.stop() : recognition.start();
  };

  // 🎙️ Start Omnidim automatically
  const startOmnidimSession = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/omnidim/start-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const { ws_url } = await res.json();

      const socket = new WebSocket(ws_url);
      setWs(socket);

      socket.onopen = () => {
        console.log("Omnidim WebSocket opened");
      };

      socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        console.log("Omnidim response:", data);
      };

      socket.onerror = (err) => {
        console.error("Omnidim WebSocket Error:", err);
      };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      let audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);

        reader.onloadend = () => {
          const base64Audio = btoa(
            new Uint8Array(reader.result).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );

          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ audio_data: base64Audio }));
            socket.send(JSON.stringify({ audio_data: null }));
          }
        };
      };

      mediaRecorder.start();

      setTimeout(() => mediaRecorder.stop(), 4000); // Auto-stop after 4s
    } catch (error) {
      console.error("Failed to start Omnidim session", error);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="glass-card animate-fade-in-up">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-heading text-primary mb-4">RoomGenie</CardTitle>
            <div className="w-full h-2 rounded-full overflow-hidden mt-4 border"
              style={{ backgroundColor: "hsl(var(--muted))", borderColor: "hsl(var(--border))" }}>
              <div className="h-full transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: "hsl(var(--primary))" }} />
            </div>
            <p className="text-sm text-muted-foreground font-body">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4 animate-float">{question.emoji}</div>
              <h2 className="text-xl font-heading font-medium px-4">{question.text}</h2>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <span className="text-2xl font-heading font-semibold text-primary">
                  {answers[currentQuestion].toFixed(1)}
                </span>
                <span className="text-lg text-muted-foreground font-body"> /10</span>
              </div>

              <Slider
                value={[answers[currentQuestion]]}
                onValueChange={handleSliderChange}
                max={10}
                min={0}
                step={0.1}
              />

              <div className="flex justify-between text-sm text-muted-foreground font-body">
                <span>{question.leftLabel}</span>
                <span>{question.rightLabel}</span>
              </div>

              {/* 🎙️ Voice Input */}
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">Or answer using your voice</p>
                <Button
                  variant="outline"
                  onClick={handleVoiceInput}
                  className={`btn-glass font-body ${isRecording ? "animate-glow" : ""}`}
                >
                  <Mic className={`w-4 h-4 mr-2 ${isRecording ? "text-red-500" : ""}`} />
                  {isRecording ? "Recording..." : "Use Voice"}
                </Button>

                {voiceTranscript && (
                  <p className="text-sm mt-2 text-muted-foreground">
                    <strong>Heard:</strong> "{voiceTranscript}"
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevious} className="btn-glass font-body">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentQuestion === 0 ? "Back" : "Previous"}
              </Button>
              <Button onClick={handleNext} className="btn-hero font-body">
                {currentQuestion === questions.length - 1 ? "View Results" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Survey;
