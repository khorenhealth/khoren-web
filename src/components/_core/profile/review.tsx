"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";

const totalSteps = 8;
const currentStep = 8;

type ReviewTarget =
  | "personal-info"
  | "location"
  | "health-info"
  | "medical-info"
  | "contact-info"
  | "notification"
  | "privacy";

const sections: {
  id: ReviewTarget;
  title: string;
  lines: string[];
  invalid?: boolean;
}[] = [
  {
    id: "personal-info",
    title: "Personal information",
    lines: [
      "Adaeze Okonkwo · Female · 14/08/1990",
      "adaeze.okonkwo@email.com · Verified",
      "Patient phone: +234 801 234 5678 · Photo not added",
    ],
  },
  {
    id: "location",
    title: "Home visit address",
    lines: [
      "5 Admiralty Way, Lekki Phase 1, Lagos",
      "Lagos · Eti-Osa · Nigeria",
      "Landmark and access directions not added",
    ],
  },
  {
    id: "health-info",
    title: "Medical information · Self-reported",
    lines: [
      "Post-Appendectomy Recovery · Blood group not added",
      "Known allergy: Penicillin · Other conditions not added",
    ],
  },
  {
    id: "medical-info",
    title: "Medications & supporting records · Optional",
    lines: [
      "Patient-reported: Amoxicillin 500 mg · Twice daily",
      "Care team review needed. Supporting records: Hospital Discharge Summary, Pre-op Blood Work Results, Surgical Procedure Notes",
    ],
  },
  {
    id: "contact-info",
    title: "Emergency contact",
    invalid: true,
    lines: [
      "Mr. Chidi Okonkwo · Spouse · Contact permission confirmed",
      "Contact phone: Required — not yet entered. Add their own number, not your patient number.",
    ],
  },
  {
    id: "notification",
    title: "Notification preferences",
    lines: [
      "Visits, medications, reports and clinical alerts: On",
      "Channels: Email, SMS and in-app · Promotions & tips: Off",
    ],
  },
  {
    id: "privacy",
    title: "Privacy & consent",
    lines: [
      "Care-related use: consented. Consent was recorded.",
      "Optional anonymised data sharing: Off",
    ],
  },
];

export function Review({
  onBack,
  onEdit,
}: {
  onBack: () => void;
  onEdit: (target: ReviewTarget) => void;
}) {
  const [confirmed, setConfirmed] = useState(true);
  const router = useRouter();
  const phoneMissing = sections.some((section) => section.invalid);
  const canComplete = confirmed && !phoneMissing;

  return (
    <section className="my-auto w-full max-w-xl rounded-[1.75rem] bg-white px-6 py-7 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:px-8">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-healiu-blue sm:text-sm">
          Step {currentStep} of {totalSteps} · Review profile
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
              index < currentStep - 1
                ? "bg-healiu-blue"
                : index === currentStep - 1
                  ? "bg-[#E5484D]"
                  : "bg-[#E4E7EC]",
            )}
          />
        ))}
      </div>

      <h1 className="mt-5 text-2xl font-bold tracking-tight text-healiu-dark-dark sm:text-[1.75rem]">
        Review your profile
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-healiu-dark">
        Check each section before completing setup. Edit a section, then use Save &
        return to review.
      </p>

      <div className="mt-6 space-y-3">
        {phoneMissing ? (
          <div className="flex gap-3 rounded-xl bg-[#FDECEC] px-4 py-3">
            <TriangleAlert
              className="mt-0.5 size-4 shrink-0 text-[#D92D20]"
              strokeWidth={2.25}
            />
            <div>
              <p className="text-sm font-semibold text-healiu-dark-dark">
                One required detail is missing
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-healiu-dark">
                Add your emergency contact&apos;s own phone number. Your other information
                is saved. Complete setup becomes available once all required details and
                confirmations are complete.
              </p>
            </div>
          </div>
        ) : null}

        {sections.map((section) => (
          <div
            key={section.id}
            className={cn(
              "rounded-xl border px-4 py-3.5",
              section.invalid ? "border-[#F3A5A5] bg-[#FFF8F8]" : "border-[#E6E8EC] bg-white",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-healiu-dark-dark">{section.title}</p>
              <button
                type="button"
                onClick={() => onEdit(section.id)}
                className={cn(
                  "shrink-0 text-sm font-medium hover:underline",
                  section.invalid ? "text-[#D92D20]" : "text-healiu-blue",
                )}
              >
                {section.invalid ? "Add phone" : "Edit"}
              </button>
            </div>
            <div className="mt-1.5 space-y-1">
              {section.lines.map((line, index) => (
                <p
                  key={line}
                  className={cn(
                    "text-sm leading-relaxed",
                    section.invalid && index === section.lines.length - 1
                      ? "text-[#D92D20]"
                      : "text-healiu-dark",
                  )}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}

        <label className="flex items-start gap-2.5 pt-1 text-sm leading-relaxed text-healiu-dark-dark">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-border accent-healiu-blue"
          />
          <span>
            I confirm that the information I have provided is accurate to the best of my
            knowledge. *
          </span>
        </label>
        <p className="text-xs leading-relaxed text-healiu-dark">
          Completing setup creates your profile only. A care team must review you with
          appointment information. No payment is required.
        </p>

        {phoneMissing ? (
          <Button
            type="button"
            onClick={() => onEdit("contact-info")}
            className={cn(ctaPrimaryClassName, "h-12 w-full rounded-xl")}
            style={ctaPrimaryStyle}
          >
            Add emergency contact phone
          </Button>
        ) : null}

        <Button
          type="button"
          disabled={!canComplete}
          onClick={() => router.push("/profile/success")}
          className={cn(
            "h-12 w-full rounded-xl text-sm font-medium",
            canComplete
              ? ctaPrimaryClassName
              : "cursor-not-allowed border-transparent bg-[#E8EEF5] text-[#B7C3D1] disabled:opacity-100",
          )}
          style={canComplete ? ctaPrimaryStyle : undefined}
        >
          Complete setup
        </Button>

        <div className="flex items-center justify-between gap-3 text-sm">
          <button
            type="button"
            onClick={onBack}
            className="font-medium text-healiu-blue hover:underline"
          >
            Back to privacy & consent
          </button>
          <Link href="/" className="font-medium text-healiu-blue hover:underline">
            Save & exit
          </Link>
        </div>
      </div>
    </section>
  );
}
