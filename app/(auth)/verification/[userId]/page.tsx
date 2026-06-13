"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  Shield,
  LockKeyhole,
  MailCheck,
  Timer,
  ArrowLeft,
  RotateCcw,
  CheckCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import useAuthStore from "@/data/authStore";
import { IoLogOut } from "react-icons/io5";

// Features for the left panel (verification/security theme)
const features = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Secure Verification",
    description: "Two‑factor authentication keeps your account safe.",
  },
  {
    icon: <LockKeyhole className="h-5 w-5" />,
    title: "End-to-End Encrypted",
    description: "Your data is protected at every step.",
  },
  {
    icon: <MailCheck className="h-5 w-5" />,
    title: "Instant Delivery",
    description: "OTP arrives in seconds — check your inbox.",
  },
  {
    icon: <Timer className="h-5 w-5" />,
    title: "Time‑sensitive Codes",
    description: "Each code expires after 10 minutes for extra security.",
  },
];

// Animation variants (same as before)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const slideInLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
  },
};

const slideInRight = {
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

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [userId, setUserId] = useState("");

  const router = useRouter();

  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const params = useParams<{ userId: string }>();

  useEffect(() => {
    if (!params.userId) return;
    (async () => {
      setUserId(params.userId);
    })();
    let interval: NodeJS.Timeout;
    if (resendTimer > 0 && !canResend) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0 && !canResend) {
      (async () => {
        setCanResend(true);
      })();
    }

    return () => clearInterval(interval);
  }, [params.userId, resendTimer, canResend]);

  // Resend timer logic

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Take only first character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("");
      const newOtp = [...otp];
      for (let i = 0; i < digits.length && i < 6; i++) {
        newOtp[i] = digits[i];
      }
      setOtp(newOtp);
      // Focus last filled or first empty
      const lastFilledIndex = newOtp.findIndex((digit) => digit === "");
      const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const user = await verifyOtp({
        userId,
        otp: otp.join(""),
      });

      if (user) {
        router.push("/login");
      } else {
        setError("Verification failed. Please try again.");
      }
      console.log("Verified user:", user);
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(30);
    // Call API to resend OTP
    console.log("Resending OTP...");
    // Clear any previous error
    setError("");
    // Reset OTP fields
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* LEFT SIDE - Security focused infographics */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInLeft}
          className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 text-white p-12 xl:p-16 overflow-hidden"
        >
          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700" />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Logo */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                Ekam
              </h2>
              <p className="text-indigo-200/70 text-sm mt-1">
                motion-first reading
              </p>
            </motion.div>

            {/* Main message */}
            <motion.div variants={itemVariants} className="mb-12">
              <h1 className="text-5xl xl:text-6xl font-bold leading-tight">
                Two‑Step
                <span className="block text-indigo-300 mt-2">Verification</span>
              </h1>
              <p className="text-indigo-200/80 text-lg mt-6 max-w-md">
                We've sent a one‑time password to your email. Enter it below to
                secure your account.
              </p>
            </motion.div>

            {/* Feature list */}
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
                  <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm group-hover:bg-indigo-500/30 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-indigo-200/70 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.div variants={itemVariants} className="mt-auto pt-16">
              <div className="border-t border-white/10 pt-6">
                <p className="text-indigo-200/50 text-sm italic">
                  "Your security is our priority. Every session, every article."
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - OTP Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          className="flex items-center justify-center p-6 md:p-10 xl:p-16"
        >
          <Card className="w-full max-w-md border-0 shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <motion.div variants={itemVariants}>
                <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
                  Verify your identity
                </CardTitle>
                <CardDescription className="text-slate-500 mt-2">
                  Enter the 6-digit code sent to your email address
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* OTP Input Fields */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center gap-2 sm:gap-3"
              >
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={idx === 0 ? handlePaste : undefined}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold bg-white border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-200 shadow-sm"
                  />
                ))}
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 bg-red-50 p-3 rounded-lg text-center"
                >
                  {error}
                </motion.p>
              )}

              {/* Resend timer */}
              <motion.div variants={itemVariants} className="text-center">
                {!canResend ? (
                  <p className="text-sm text-slate-500">
                    Resend code in{" "}
                    <span className="font-mono font-semibold">
                      {resendTimer}
                    </span>{" "}
                    seconds
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center gap-1 mx-auto transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Resend verification code
                  </button>
                )}
              </motion.div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <motion.div variants={itemVariants} className="w-full">
                <Button
                  onClick={handleVerify}
                  disabled={isLoading || otp.join("").length !== 6}
                  className="w-full h-11 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Verify & continue <CheckCircle className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="text-center text-sm"
              >
                <button
                  onClick={() => router.push(`/login`)}
                  className="text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1 transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to sign in
                </button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Mobile banner */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-950 to-purple-950 text-white p-4 text-center text-sm z-10">
        <span className="font-medium">Ekam</span> — Secure your account with 2FA
      </div>
    </div>
  );
}
