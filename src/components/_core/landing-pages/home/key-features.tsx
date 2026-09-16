import Image from "next/image";
import { CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "../shared/cta-button-styles";

const waitlistAvatars = [
  { initials: "AM", tone: "bg-[#7C5CBF]" },
  { initials: "JK", tone: "bg-[#0D73D2]" },
  { initials: "SR", tone: "bg-[#E07A5F]" },
];

export function KeyFeatures() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="app-width grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        <div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          data-aos="fade-right"
        >
          <Image
            src="/images/pngs/key-feature.png"
            alt="Doctor on a telemedicine call with a patient"
            width={648}
            height={709}
            className="h-auto w-full rounded-[1.75rem] object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="max-w-xl" data-aos="fade-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-healiu-blue-light-active bg-healiu-blue-light px-3 py-1.5 text-sm font-medium text-healiu-blue">
            <CircleCheck className="size-4 fill-healiu-blue text-white" />
            Key Features
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-healiu-dark-dark sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
            Connect with a Doctor Online - Fast, Secure, and Hassle-Free
          </h2>

          <p className="mt-4 text-base leading-relaxed text-healiu-dark sm:text-lg">
            Join programs that support nutrition, fitness, recovery, and
            long-term well-being. From digital screenings to AI-powered
            assessments.
          </p>

          <form className="mt-8 flex items-center gap-2 rounded-full border border-border bg-white p-1.5 shadow-sm">
            <label htmlFor="appointment-date" className="sr-only">
              Appointment date
            </label>
            <input
              id="appointment-date"
              type="text"
              inputMode="numeric"
              placeholder="dd/mm/yyyy"
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-healiu-dark-dark outline-none placeholder:text-healiu-dark-lighter"
            />
            <Button
              type="submit"
              className={ctaPrimaryClassName}
              style={ctaPrimaryStyle}
            >
              Book Appointment
            </Button>
          </form>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-3">
              {waitlistAvatars.map((avatar) => (
                <span
                  key={avatar.initials}
                  className={`flex size-10 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white ${avatar.tone}`}
                  aria-hidden="true"
                >
                  {avatar.initials}
                </span>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-healiu-dark-dark">
                And 100+ others
              </p>
              <p className="text-sm text-healiu-dark">
                Join over 120+ cool folks & counting on the waitlist!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
