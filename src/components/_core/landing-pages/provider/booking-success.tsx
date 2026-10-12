"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

const PROVIDER_FORM_URL =
  process.env.NEXT_PUBLIC_PROVIDER_FORM_URL ??
  "https://docs.google.com/forms/d/1BGmDs1_yPNawJTfAL6YfZuaRo4Kgjkehv8vGXUnikrM/viewform";

const REDIRECT_DELAY_MS = 2000;

export function BookingSuccess({
  redirectToForm = false,
}: {
  redirectToForm?: boolean;
}) {
  useEffect(() => {
    if (!redirectToForm) return;

    const timeoutId = window.setTimeout(() => {
      window.location.assign(PROVIDER_FORM_URL);
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [redirectToForm]);

  return (
    <section
      className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32"
      style={{
        background:
          "radial-gradient(84.07% 84.07% at 67.84% 15.93%, #FFFFFF 0%, #E4EFFF 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-24 top-16 size-[26rem] rounded-full bg-[#D8F5E8]/55 blur-3xl" />
        <div className="absolute -right-20 bottom-10 size-[24rem] rounded-full bg-[#D6E8FF]/70 blur-3xl" />
      </div>

      <div className="app-width relative z-10">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-healiu-green text-white shadow-[0_10px_30px_rgba(144,203,34,0.35)] sm:size-20">
            <Check className="size-8 sm:size-10" strokeWidth={2.5} />
          </span>

          <h1 className="mt-8 text-3xl font-bold tracking-tight text-healiu-dark-dark sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Booking confirmed
          </h1>
          <p className="mt-4 text-base leading-relaxed text-healiu-dark sm:text-lg">
            Your care request has been received. We&apos;ll follow up shortly
            with next steps and provider details. A confirmation has also been
            sent to your email.
          </p>

          {redirectToForm ? (
            <p className="mt-6 text-sm text-healiu-dark">
              Redirecting you to complete a short form…
            </p>
          ) : (
            <Link
              href="/"
              className="mt-6 text-sm font-medium text-healiu-dark transition-colors hover:text-healiu-blue"
            >
              Back to home
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
