"use client";
import useAuthStore from "@/data/authStore";

import { AxiosError } from "axios";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SideInfoGraphics from "@/components/Side_Infographics";
import { whyEkam } from "@/data/data";

import { motion, AnimatePresence, Variants } from "framer-motion";
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
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  PartyPopper,
  Coffee,
} from "lucide-react";
import { IoLogOut } from "react-icons/io5";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Feature data (same as login but with onboarding twist)
const features = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Onboarding Flow",
    description: "Personalized setup to match your reading preferences.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Curated Collections",
    description: "Get article recommendations from day one.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Instant Sync",
    description: "Save progress across all your devices.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Smart Bookmarks",
    description: "Never lose your place in long-form reads.",
  },
];

// Animation variants (reused)
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

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [successStep, setSuccessStep] = useState<"form" | "success">("form");

  const register = useAuthStore((state) => state.register);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Updated handleSubmit in SignupPage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await register({ name, email, password });
      console.log(result);
      router.push(`/verification/${result.data.userId}`);

      if (result.success) {
        router.push(`/verification/${result.data.userId}`);
        setSuccessStep("success");
      } else {
        setError(result.data.error || "An unexpected error occurred");
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Welcome back to login link
  const handleGoToLogin = () => {
    router.push("/login"); // Replace with actual navigation
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <SideInfoGraphics data={whyEkam} />
        {/* RIGHT SIDE - Signup Form (Onboarding focused) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          className="flex items-center justify-center p-6 md:p-10 xl:p-16"
        >
          <AnimatePresence mode="wait">
            {successStep === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
              >
                <Card className="border-0 shadow-2xl shadow-teal-500/5 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="space-y-1 text-center">
                    <motion.div variants={itemVariants}>
                      <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-teal-900 bg-clip-text text-transparent">
                        Create an account
                      </CardTitle>
                      <CardDescription className="text-slate-500 mt-2">
                        Start your personalized reading journey
                      </CardDescription>
                    </motion.div>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-5">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-slate-700 flex items-center gap-1"
                        >
                          <User className="h-3.5 w-3.5" /> Full name
                        </label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Alex Johnson"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setError("");
                          }}
                          className="h-11 border-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200"
                          autoComplete="name"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-slate-700 flex items-center gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" /> Email address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="hello@ekam.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                          className="h-11 border-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200"
                          autoComplete="email"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label
                          htmlFor="password"
                          className="text-sm font-medium text-slate-700 flex items-center gap-1"
                        >
                          <Lock className="h-3.5 w-3.5" /> Password
                        </label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setError("");
                            }}
                            className="h-11 border-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10"
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-400">
                          Must be at least 6 characters
                        </p>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium text-slate-700"
                        >
                          Confirm password
                        </label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              setError("");
                            }}
                            className="h-11 border-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10"
                            autoComplete="off"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </motion.div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-600 bg-red-50 p-3 rounded-lg"
                        >
                          {error}
                        </motion.div>
                      )}
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                      <motion.div variants={itemVariants} className="w-full">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full h-11 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg shadow-teal-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              <span>Creating account...</span>
                            </div>
                          ) : (
                            <span className="flex items-center gap-2">
                              Get started <ArrowRight className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="text-center text-sm text-slate-500"
                      >
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={handleGoToLogin}
                          className="font-medium text-teal-600 hover:text-teal-800 transition-colors"
                        >
                          Sign in
                        </button>
                      </motion.div>
                    </CardFooter>
                  </form>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md text-center"
              >
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-12 pb-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.1,
                      }}
                      className="mx-auto w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="h-10 w-10 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold mb-2">
                      Welcome to Ekam!
                    </CardTitle>
                    <CardDescription className="text-slate-600 mb-6">
                      Your account is ready. Let's set up your reading
                      preferences.
                    </CardDescription>
                    <Button
                      onClick={() => alert("Proceed to onboarding wizard")}
                      className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                    >
                      Continue to platform
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile banner */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-950 to-teal-900 text-white p-4 text-center text-sm z-10">
        <span className="font-medium">Ekam</span> — Begin your reading journey
      </div>
    </div>
  );
}
