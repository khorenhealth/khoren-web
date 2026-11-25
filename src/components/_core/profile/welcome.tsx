import Link from "next/link";
import { Check, FileText, HeartPulse, MapPin, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";

const steps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Email verified",
    description:
      "adaeze.dweka@gmail.com · You can sign in after you finish profile setup",
    icon: Check,
  },
  {
    title: "Your details & home visit address",
    description: "Tell us who you are and where visits should happen.",
    icon: MapPin,
  },
  {
    title: "Your health & emergency contact",
    description:
      "Share what matters for your care. Records and medications are optional.",
    icon: HeartPulse,
  },
  {
    title: "Your preferences & final review",
    description:
      "Choose how we contact you, review consent and check your information.",
    icon: FileText,
  },
];

export function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <section className="my-auto w-full max-w-xl rounded-[1.75rem] bg-white px-6 py-7 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-healiu-dark-dark sm:text-[1.75rem]">
        Welcome to Khoren, Adaeze
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-healiu-dark">
        Your email is verified. Let&apos;s get your patient profile ready, one
        step at a time.
      </p>

      <ol className="mt-5 space-y-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <li key={step.title} className="flex gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-healiu-blue-light text-healiu-blue">
                <Icon className="size-4" strokeWidth={2.25} />
              </span>
              <span className="min-w-0 pt-0.5">
                <span className="block text-sm font-semibold text-healiu-dark-dark">
                  {step.title}
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-healiu-dark">
                  {step.description}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <p className="mt-5 text-sm text-healiu-dark">
        About 5–8 minutes. 3 steps. Save and continue anytime.
      </p>

      <Button
        type="button"
        onClick={onStart}
        className={cn(ctaPrimaryClassName, "mt-5 h-12 w-full rounded-xl")}
        style={ctaPrimaryStyle}
      >
        Start profile setup
      </Button>

      <p className="mt-3 text-center text-xs leading-relaxed text-healiu-dark">
        No payment is needed to complete your profile. Setup does not book a
        visit or activate a provider.
      </p>

      <p className="mt-4 text-center text-sm">
        <Link href="/" className="font-medium text-healiu-blue hover:underline">
          Setup later · Save & exit
        </Link>
      </p>
    </section>
  );
}
