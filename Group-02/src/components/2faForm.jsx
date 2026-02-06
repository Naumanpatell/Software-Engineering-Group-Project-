"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, Loader2, CheckCircle2, MailCheck, Shield, Smartphone } from "lucide-react";

const OTP_LENGTH = 6;

// =============================================================================
// SUPABASE INTEGRATION - Uncomment and configure when Supabase is connected
// =============================================================================
// import { createClient } from "@/lib/supabase/client";
//
// async function verifyOtpWithSupabase(email, token) {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.verifyOtp({
//     email,
//     token,
//     type: "email",
//   });
//   return { data, error };
// }
//
// async function resendOtpWithSupabase(email) {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.signInWithOtp({
//     email,
//     options: {
//       shouldCreateUser: false, // Set to true if you want to create user if not exists
//     },
//   });
//   return { data, error };
// }
// =============================================================================

export function TwoFactorAuth({ 
  email = "user@example.com", 
  onSuccess,
  onBack 
}) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);
  
  // Mask email for display
  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1***$3");

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0 && !canResend) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all filled
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === OTP_LENGTH) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      setError(null);

      // Focus the next empty input or the last one
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[OTP_LENGTH - 1]?.focus();
        // Auto-submit if all filled
        if (newOtp.every((digit) => digit !== "")) {
          handleVerify(newOtp.join(""));
        }
      }
    }
  };

  const handleVerify = async (code) => {
    setIsLoading(true);
    setError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Demo: "123456" is the correct code
    if (code === "123456") {
      setIsVerified(true);
    } else {
      setError("Invalid verification code. Please try again.");
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }

    setIsLoading(false);
  };

  const handleResend = async () => {
    if (!canResend || isResending) return;
    
    setIsResending(true);
    setError(null);
    
    // Simulate sending new email - replace with Supabase call
    // const { error } = await resendOtpWithSupabase(email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsResending(false);
    setCanResend(false);
    setResendTimer(30);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Verification Successful</h2>
            <p className="text-muted-foreground mb-6">
              Your identity has been verified. You can now access your account.
            </p>
            <Button className="w-full" size="lg">
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          type="button"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to login</span>
        </button>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              We sent a 6-digit verification code to your email
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Email indicator */}
            <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-primary/5 border border-primary/10 rounded-lg">
              <MailCheck className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">
                Code sent to <span className="font-medium">{maskedEmail}</span>
              </span>
            </div>

            {/* OTP Input */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  disabled={isLoading}
                  aria-label={`Digit ${index + 1} of verification code`}
                  className={`
                    w-11 h-14 sm:w-12 sm:h-16 
                    text-center text-xl sm:text-2xl font-semibold
                    border-2 rounded-xl
                    bg-card text-foreground
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${error ? "border-destructive" : digit ? "border-primary" : "border-input"}
                    ${digit ? "bg-primary/5" : ""}
                  `}
                />
              ))}
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive text-center">{error}</p>
              </div>
            )}

            {/* Verify button */}
            <Button
              className="w-full mb-4"
              size="lg"
              onClick={() => handleVerify(otp.join(""))}
              disabled={isLoading || otp.some((digit) => digit === "")}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </Button>

            {/* Resend section */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {"Didn't receive the email?"}
              </p>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend email"}
                </button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Resend in <span className="font-semibold text-foreground">{resendTimer}s</span>
                </p>
              )}
            </div>
            
            {/* Spam folder hint */}
            <p className="text-xs text-muted-foreground text-center mt-3">
              Check your spam folder if you don't see the email
            </p>

            {/* Help link */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Having trouble?{" "}
                <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">
                  Contact support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security note */}
        <p className="mt-6 text-xs text-center text-muted-foreground">
          This code expires in 10 minutes. Never share your verification code with anyone.
        </p>
      </div>
    </div>
  );
}