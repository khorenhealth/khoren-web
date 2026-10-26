"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";
import { FloatingField } from "./floating-form-field";
import { GoogleSignButton } from "./Google-sign-button";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full rounded-[1.75rem] bg-white px-6 py-8 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:px-8 sm:py-10">
      <h1 className="text-3xl font-bold tracking-tight text-healiu-dark-dark">
        Sign In
      </h1>
      <p className="mt-2 text-sm text-healiu-dark">
        Sign In to enjoy the feature of Khoren
      </p>

      <GoogleSignButton className="mt-7" />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#E6E8EC]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-healiu-dark-lighter">or</span>
        </div>
      </div>

      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <FloatingField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter email"
          autoComplete="email"
        />
        <FloatingField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          autoComplete="current-password"
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

        <div className="pt-1">
          <button
            type="button"
            className="text-sm font-medium text-healiu-blue hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          className={cn(ctaPrimaryClassName, "h-12 w-full rounded-xl")}
          style={ctaPrimaryStyle}
        >
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-healiu-dark">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/auth/sign-up"
          className="font-semibold text-healiu-dark-dark hover:text-healiu-blue"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
