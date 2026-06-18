"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import SideInfoGraphics from "@/components/Side_Infographics";

import useAuthStore from "@/data/authStore";

import { whyEkam } from "@/data/data";
import { TextRenderer } from "@/components/article-page";

// Feature data for the left infographic
const features = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Motion-First Design",
    description: "Every interaction flows naturally, making reading a joy.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Immersive Articles",
    description: "Distraction-free environment with elegant typography.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Lightning Fast",
    description: "Optimized for speed and seamless navigation.",
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const slideInLeft: Variants = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
  },
};

const slideInRight: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.8,
      delay: 0.2,
    },
  },
};

export function TextRendererWithTimer({ data }: { data: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // 1. Guard: If there are no items or only 1 item, no need to loop
    if (!data || data.length <= 1) {
      // Reset index to 0 just in case the data array suddenly shrank
      setIdx(0);
      return;
    }

    // 2. Set up the timer
    const timer = setTimeout(() => {
      setIdx((prevIdx) => (prevIdx + 1) % data.length);
    }, 5500);

    // 3. Clean up the timer when index updates or data changes
    return () => clearTimeout(timer);
  }, [idx, data?.length]); // Only re-run when the index ticks or array length changes

  // Guard against undefined or out-of-bounds references
  const textToRender = data && data[idx] ? data[idx] : "";

  return (
    <div className="h-70 w-[40vw]">
      <TextRenderer text={textToRender} />
    </div>
  );
}

export function SideInfo({ text }: { text: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInLeft}
      className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-300 via-slate-400 to-purple-950 text-white p-12 xl:p-16 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Logo / Brand */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"></h2>
          <p className="text-purple-200/70 text-sm mt-1">
            motion-first reading
          </p>
        </motion.div>

        {/* Main message */}
        <motion.div variants={itemVariants} className="mb-12">
          <div>
            <TextRendererWithTimer data={whyEkam} />
          </div>
          <p className="text-purple-200/80 text-lg mt-6 max-w-md">
            Ekam is in very early stages of development. We are working hard to
            bring you the best reading experience.
          </p>
        </motion.div>

        {/* Features list */}
        <motion.div variants={containerVariants} className="space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                x: 8,
                transition: { type: "spring", stiffness: 400 },
              }}
              className="flex items-start gap-4 group"
            >
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm group-hover:bg-purple-500/30 transition-colors duration-300">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="text-purple-200/70 text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer quote */}
        <motion.div variants={itemVariants} className="mt-auto pt-16">
          <div className="border-t border-white/10 pt-6">
            <p className="text-purple-200/50 text-sm italic">
              "Reading reimagined — where every word flows with purpose."
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [credentialsError, setCredentialsError] = useState("");

  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialsError("");

    // Basic validation
    if (!email.trim()) {
      setCredentialsError("Email is required");
      return;
    }
    if (!password) {
      setCredentialsError("Password is required");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setCredentialsError("Please enter a valid email address");
      return;
    }

    const result = await login({ email, password });

    // Fixed logic here
    if (result && result.success) {
      // Redirect to home on success
      router.push("/");
    } else {
      // Show error message
      console.log("Login result", result.status);
      if (result.status === 401) {
        setCredentialsError("Invalid email or password");
      } else if (result.status === 403) {
        setCredentialsError(
          "Email not verified , redirecting to verification page",
        );
        router.push(`/verification/${result.user?.id}`);
      } else {
        setCredentialsError("An error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* LEFT SIDE - Infographics / Banner */}
        <SideInfoGraphics data={whyEkam}></SideInfoGraphics>
        {/* RIGHT SIDE - Login Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          className="flex items-center justify-center p-6 md:p-10 xl:p-16"
        >
          <Card className="w-full h-full max-w-md border-0 shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <motion.div variants={itemVariants}>
                <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-slate-500 mt-2">
                  Sign in to continue your reading journey
                </CardDescription>
              </motion.div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setCredentialsError("");
                    }}
                    className="h-11 border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                    autoComplete="email"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => router.push("/forgot-password")}
                      className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setCredentialsError("");
                      }}
                      className="h-11 border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 pr-10"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </motion.div>

                {credentialsError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 bg-red-50 p-3 rounded-lg"
                  >
                    {credentialsError}
                  </motion.div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <motion.div variants={itemVariants} className="w-full">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-blue-500  text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        Sign in <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="text-center text-sm text-slate-500"
                >
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/register")}
                    className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Create free account
                  </button>
                </motion.div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>

      {/* Mobile banner - only visible on small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-950 to-purple-950 text-white p-4 text-center text-sm z-10">
        <span className="font-medium">Ekam</span> — Motion-first reading
        platform
      </div>
    </div>
  );
}
