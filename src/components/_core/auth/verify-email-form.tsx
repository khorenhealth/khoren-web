"use client";

import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 5 * 60 + 32;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function VerifyEmailForm({ email }: { email: string }) {
  const [digits, setDigits] = useState<string[]>(() => Array(CODE_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  function focusInput(index: number) {
    inputs.current[index]?.focus();
  }

  function updateDigit(index: number, rawValue: string) {
    const digit = rawValue.replace(/\D/g, "").slice(-1);
    setDigits((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });
    if (digit && index < CODE_LENGTH - 1) focusInput(index + 1);
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
    if (event.key === "ArrowLeft" && index > 0) focusInput(index - 1);
    if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      focusInput(index + 1);
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;

    event.preventDefault();
    setDigits(Array.from({ length: CODE_LENGTH }, (_, index) => pasted[index] ?? ""));
    focusInput(Math.min(pasted.length, CODE_LENGTH) - 1);
  }

  const code = digits.join("");

  return (
    <div className="w-full max-w-[440px] rounded-[1.75rem] bg-white px-6 py-8 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:px-8 sm:py-10">
      <h1 className="text-3xl font-bold tracking-tight text-healiu-dark-dark">
        Email Verification
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-healiu-dark">
        Check your email, we sent a code to {email}
      </p>
      <p className="mt-1 text-sm text-healiu-dark">
        If this is not your mail,{" "}
        <Link href="/auth/sign-up" className="font-medium text-healiu-blue hover:underline">
          Change email
        </Link>
      </p>

      <form
        className="mt-7"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="flex justify-between gap-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(node) => {
                inputs.current[index] = node;
              }}
              value={digit}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              aria-label={`Digit ${index + 1}`}
              maxLength={1}
              onChange={(event) => updateDigit(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={handlePaste}
              className="h-12 w-12 rounded-xl border border-[#E6E8EC] bg-white text-center text-base font-medium text-healiu-dark-dark outline-none transition-colors focus:border-healiu-blue sm:h-14 sm:w-14"
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={code.length < CODE_LENGTH}
          className={cn(ctaPrimaryClassName, "mt-6 h-12 w-full rounded-xl")}
          style={ctaPrimaryStyle}
        >
          Verify
        </Button>
      </form>

      <p className="mt-4 text-sm text-healiu-dark">
        Didn&apos;t get a code?{" "}
        {secondsLeft > 0 ? (
          <span className="font-medium text-healiu-blue">{formatTime(secondsLeft)}</span>
        ) : (
          <button
            type="button"
            onClick={() => setSecondsLeft(RESEND_SECONDS)}
            className="font-medium text-healiu-blue hover:underline"
          >
            Resend code
          </button>
        )}
      </p>
    </div>
  );
}
