"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";
import { FloatingField } from "./floating-form-field";
import { GoogleSignButton } from "./Google-sign-button";

const passwordRules = [
  {
    label: "At least 1 uppercase",
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: "At least 1 number",
    test: (password: string) => /\d/.test(password),
  },
  {
    label: "At least 1 special character",
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
  {
    label: "At least 8 character",
    test: (password: string) => password.length >= 8,
  },
];

function PasswordChecks({ password }: { password: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-healiu-dark">Must contain at least:</p>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {passwordRules.map((rule) => {
          const met = rule.test(password);

          return (
            <li
              key={rule.label}
              className={cn(
                "flex items-center gap-1.5 text-xs",
                met ? "text-healiu-green-dark" : "text-healiu-dark-lighter",
              )}
            >
              <span
                className={cn(
                  "flex size-3.5 shrink-0 items-center justify-center rounded-full",
                  met
                    ? "bg-healiu-green text-white"
                    : "border border-healiu-dark-lighter",
                )}
              >
                {met ? <Check className="size-2.5" strokeWidth={3} /> : null}
              </span>
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const passwordIsValid = passwordRules.every((rule) => rule.test(password));
  const passwordsMismatch =
    confirmPassword.length > 0 && confirmPassword !== password;

  return (
    <div className="w-full rounded-t-[1.75rem] bg-white p-6 shadow-[0_12px_40px_rgba(11,105,201,0.1)] sm:p-8">
      <h1 className="text-3xl font-bold tracking-tight text-healiu-dark-dark">
        Sign up
      </h1>
      <p className="mt-2 text-sm text-healiu-dark">
        Sign up to enjoy the features of Khoren
      </p>

      <GoogleSignButton className="mt-6" />

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
          const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
          const params = new URLSearchParams();
          if (email) params.set("email", email);
          router.push(`/auth/verify-email?${params.toString()}`);
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
        <div className="space-y-3">
          <FloatingField
            id="password"
            label="Create Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
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
          <PasswordChecks password={password} />
        </div>

        <div>
          <FloatingField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="••••••••••••"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            invalid={passwordsMismatch}
          />
          {passwordsMismatch ? (
            <p className="mt-1.5 text-xs text-red-500">
              Password doesn&apos;t match
            </p>
          ) : null}
        </div>

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
          disabled={!agreed || !passwordIsValid || passwordsMismatch || confirmPassword.length === 0}
        >
          Sign up
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-healiu-dark">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="font-semibold text-healiu-dark-dark hover:text-healiu-blue"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
