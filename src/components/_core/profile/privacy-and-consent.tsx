"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";

const totalSteps = 8;
const currentStep = 7;

function PreferenceSwitch({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`${label}, ${checked ? "on" : "off"}`}
      onClick={() => onChange(!checked)}
      className="flex shrink-0 flex-col items-center gap-1"
    >
      <span
        className={cn(
          "relative h-7 w-12 rounded-md border transition-colors",
          checked ? "border-healiu-blue bg-healiu-blue" : "border-[#D5DCE6] bg-[#EEF1F6]",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-6 rounded-sm bg-white shadow-sm transition-transform",
            checked && "translate-x-5",
          )}
        />
      </span>
      <span className="text-[11px] text-healiu-dark">{checked ? "On" : "Off"}</span>
    </button>
  );
}

export function PrivacyAndConsent({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [careConsent, setCareConsent] = useState(true);
  const [shareAnonymised, setShareAnonymised] = useState(false);

  return (
    <section className="my-auto w-full max-w-xl rounded-[1.75rem] bg-white px-6 py-7 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:px-8">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-healiu-blue sm:text-sm">
          Step {currentStep} of {totalSteps} · Privacy & consent
        </p>
        <p className="shrink-0 text-xs text-healiu-dark">
          {currentStep - 1} of {totalSteps} steps done
        </p>
      </div>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full",
              index < currentStep ? "bg-healiu-blue" : "bg-[#E4E7EC]",
            )}
          />
        ))}
      </div>

      <h1 className="mt-5 text-2xl font-bold tracking-tight text-healiu-dark-dark sm:text-[1.75rem]">
        Your information, your choice
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-healiu-dark">
        Understand how your details are used before you finish your profile.
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (!careConsent) return;
          onContinue();
        }}
      >
        <div className="flex gap-3 rounded-xl bg-healiu-blue-light px-4 py-3">
          <Info className="mt-0.5 size-4 shrink-0 text-healiu-blue" strokeWidth={2.25} />
          <div>
            <p className="text-sm font-semibold text-healiu-dark-dark">
              Used to support your care
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-healiu-dark">
              Khoren uses your profile to coordinate care. Health information is shared
              only with your assigned care team, including a clinical supervisor when needed
              for your care, and is never sold to third parties. No provider is assigned by
              completing setup.
            </p>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-[#E6E8EC] px-4 py-4">
          <p className="text-sm font-semibold text-healiu-dark-dark">
            Care-related use · Required
          </p>
          <label className="flex items-start gap-2.5 text-sm leading-relaxed text-healiu-dark-dark">
            <input
              type="checkbox"
              checked={careConsent}
              onChange={(event) => setCareConsent(event.target.checked)}
              required
              className="mt-0.5 size-4 shrink-0 rounded border-border accent-healiu-blue"
            />
            <span>
              I consent to Khoren using my personal and health information to coordinate my
              care and sharing it with my assigned care team as described in the Privacy
              Policy. *
            </span>
          </label>
          <p className="text-xs leading-relaxed text-healiu-dark">
            This consent is needed to complete your patient profile. If you&apos;re not ready,
            use Save & exit. You can manage consent in Settings or contact support.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link
              href="#"
              className="inline-flex items-center gap-0.5 text-sm font-medium text-healiu-blue hover:underline"
            >
              Read Privacy Policy
              <ChevronRight className="size-3.5" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-0.5 text-sm font-medium text-healiu-blue hover:underline"
            >
              Read Terms & Conditions
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E6E8EC] px-4 py-3.5">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-healiu-dark-dark">
              Anonymised data sharing · Optional
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-healiu-dark">
              Allow anonymised data to help improve platform quality. This is separate from
              your care and can be changed in Settings.
            </p>
          </div>
          <PreferenceSwitch
            checked={shareAnonymised}
            label="Anonymised data sharing"
            onChange={setShareAnonymised}
          />
        </div>

        <p className="text-sm leading-relaxed text-healiu-dark">
          Leaving optional sharing off does not affect your care or your ability to complete
          setup.
        </p>

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
            disabled={!careConsent}
            className={cn(
              "h-12 flex-1 rounded-xl text-sm font-medium",
              careConsent
                ? ctaPrimaryClassName
                : "cursor-not-allowed border-transparent bg-[#E8EEF5] text-[#B7C3D1] disabled:opacity-100",
            )}
            style={careConsent ? ctaPrimaryStyle : undefined}
          >
            Continue to review
          </Button>
        </div>

        <p className="text-sm">
          <Link href="/" className="font-medium text-healiu-blue hover:underline">
            Save & exit
          </Link>
        </p>
      </form>
    </section>
  );
}
