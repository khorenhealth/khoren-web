import Link from "next/link";
import { Check, Info } from "lucide-react";

import {
  ctaOutlineClassName,
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";

export default function ProfileSuccessPage() {
  return (
    <section className="my-auto w-full max-w-xl rounded-[1.75rem] bg-white px-6 py-7 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-healiu-dark-dark sm:text-[1.75rem]">
        Your profile is ready, Adaeze
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-healiu-dark">
        You&apos;ve completed your Khoren profile. You can now explore your dashboard or
        book your first visit.
      </p>

      <div className="mt-6 flex justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-healiu-blue text-white">
          <Check className="size-8" strokeWidth={2.5} />
        </span>
      </div>

      <div className="mt-6 flex gap-3 rounded-xl bg-healiu-blue-light px-4 py-3">
        <Info className="mt-0.5 size-4 shrink-0 text-healiu-blue" strokeWidth={2.25} />
        <div>
          <p className="text-sm font-semibold text-healiu-dark-dark">Profile setup complete</p>
          <p className="mt-0.5 text-sm leading-relaxed text-healiu-dark">
            Your information and preferences have been saved. You can update them anytime
            in Settings.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-semibold text-healiu-dark-dark">What happens next?</h2>
        <p className="mt-1 text-sm leading-relaxed text-healiu-dark">
          Explore your dashboard and manage your details. When you&apos;re ready, book a
          visit to begin arranging your care.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-healiu-dark">
          No visit has been booked. No provider has been assigned. A care team must review
          your profile before a visit can be arranged. Uploaded records remain
          patient-provided until a health professional reviews them.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <Link
          href="/dashboard/patient"
          className={cn(
            ctaPrimaryClassName,
            "inline-flex h-12 w-full items-center justify-center rounded-xl",
          )}
          style={ctaPrimaryStyle}
        >
          Go to dashboard
        </Link>
        <Link
          href="/provider"
          className={cn(
            ctaOutlineClassName,
            "inline-flex h-12 w-full items-center justify-center rounded-xl border-healiu-blue bg-white text-healiu-blue hover:bg-healiu-blue-light",
          )}
        >
          Book a visit
        </Link>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-healiu-dark">
        No payment was required for profile setup. HMO integration is coming soon. Bring
        any insurance cards when you book a visit.
      </p>
    </section>
  );
}
