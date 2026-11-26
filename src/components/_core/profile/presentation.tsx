"use client";

import Link from "next/link";

import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProfilePresentation = "setup" | "dashboard";

const setupSectionClassName =
  "my-auto w-full max-w-xl rounded-[1.75rem] bg-white px-6 py-7 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:px-8";

export function profileSectionClassName(presentation: ProfilePresentation = "setup") {
  return presentation === "dashboard" ? "w-full" : setupSectionClassName;
}

export function ProfileFormActions({
  presentation = "setup",
  onBack,
  submitLabel = "Continue",
  submitDisabled = false,
  extra,
}: {
  presentation?: ProfilePresentation;
  onBack?: () => void;
  submitLabel?: string;
  submitDisabled?: boolean;
  extra?: React.ReactNode;
}) {
  if (presentation === "dashboard") {
    return (
      <div className="flex justify-end border-t border-[#E7EEF6] pt-5">
        <Button
          type="submit"
          disabled={submitDisabled}
          className={cn(
            "h-11 rounded-xl px-5 text-sm font-medium",
            submitDisabled
              ? "cursor-not-allowed border-transparent bg-[#E8EEF5] text-[#B7C3D1] disabled:opacity-100"
              : ctaPrimaryClassName,
          )}
          style={submitDisabled ? undefined : ctaPrimaryStyle}
        >
          Save changes
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-12 w-28 shrink-0 rounded-xl border-healiu-blue bg-white text-sm font-medium text-healiu-blue hover:bg-healiu-blue-light hover:text-healiu-blue"
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={submitDisabled}
          className={cn(
            "h-12 flex-1 rounded-xl text-sm font-medium",
            submitDisabled
              ? "cursor-not-allowed border-transparent bg-[#E8EEF5] text-[#B7C3D1] disabled:opacity-100"
              : ctaPrimaryClassName,
          )}
          style={submitDisabled ? undefined : ctaPrimaryStyle}
        >
          {submitLabel}
        </Button>
      </div>
      {extra ?? (
        <p className="text-sm">
          <Link href="/" className="font-medium text-healiu-blue hover:underline">
            Save & exit
          </Link>
        </p>
      )}
    </>
  );
}
