"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";

function GoogleIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function FloatingField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  trailing,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="absolute -top-2.5 left-3 z-10 bg-white px-1.5 text-xs font-medium text-healiu-dark"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          "h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-healiu-dark-dark outline-none transition-colors placeholder:text-healiu-dark-lighter",
          "focus:border-healiu-blue",
          trailing && "pr-11",
        )}
      />
      {trailing}
    </div>
  );
}

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-full rounded-tl-3xl rounded-tr-3xl bg-white p-6 shadow-[0_12px_40px_rgba(11,105,201,0.1)] sm:p-8">
      <h1 className="text-3xl font-bold tracking-tight text-healiu-dark-dark">
        Sign up
      </h1>
      <p className="mt-2 text-sm text-healiu-dark">
        Sign up to enjoy the features of Khoren
      </p>

      <Button
        type="button"
        variant="outline"
        className="mt-6 h-11 w-full gap-2 rounded-xl border-border bg-white text-healiu-dark-dark hover:bg-healiu-neutral-light"
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-healiu-dark">or</span>
        </div>
      </div>

      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <FloatingField
          id="name"
          label="Your Name"
          placeholder="John Markton"
          autoComplete="name"
        />
        <FloatingField
          id="email"
          label="Email"
          type="email"
          placeholder="Youremail@mail.com"
          autoComplete="email"
        />
        <FloatingField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••••••"
          autoComplete="new-password"
          trailing={
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-healiu-dark hover:text-healiu-dark-dark"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          }
        />

        <label className="flex items-center gap-2.5 text-sm text-healiu-dark">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="size-4 rounded border-border accent-healiu-blue"
          />
          I Agree the terms and conditions
        </label>

        <Button
          type="submit"
          className={cn(ctaPrimaryClassName, "h-11 w-full rounded-xl")}
          style={ctaPrimaryStyle}
          disabled={!agreed}
        >
          Sign up
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-healiu-dark">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-healiu-dark-dark hover:text-healiu-blue"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
