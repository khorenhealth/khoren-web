"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mic, PhoneOff, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaOutlineClassName,
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "../shared/cta-button-styles";
import { MonthlyVisitsStatIcon, PatientStatIcon } from "../svg";

const stats = [
  {
    icon: PatientStatIcon,
    value: "15k+",
    label: "Patients",
  },
  {
    icon: MonthlyVisitsStatIcon,
    value: "150k+",
    label: "Monthly Visitor",
  },
];

function VideoCallBar() {
  return (
    <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-healiu-dark-dark/70 px-4 py-2.5 backdrop-blur-sm">
      <span className="flex size-10 items-center justify-center rounded-full bg-white text-healiu-blue">
        <Video className="size-4" />
      </span>
      <span className="flex size-10 items-center justify-center rounded-full bg-[#E5484D] text-white">
        <PhoneOff className="size-4" />
      </span>
      <span className="flex size-10 items-center justify-center rounded-full bg-white text-healiu-blue">
        <Mic className="size-4" />
      </span>
    </div>
  );
}

function BackgroundEllipses() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <Image
        src="/images/svgs/ball-ellipse.svg"
        alt=""
        width={160}
        height={160}
        className="absolute -left-10 top-16 opacity-50"
      />
      <Image
        src="/images/svgs/ball-ellipse.svg"
        alt=""
        width={140}
        height={140}
        className="absolute -right-8 bottom-24 opacity-40"
      />
    </div>
  );
}

export function AboutHero() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 40,
    });
  }, []);

  return (
    <section
      className="relative overflow-x-hidden pb-16 pt-28 sm:pb-20 sm:pt-32"
      style={{
        background:
          "radial-gradient(84.07% 84.07% at 67.84% 15.93%, #FFFFFF 0%, #E4EFFF 100%)",
      }}
    >
      <BackgroundEllipses />

      <div className="app-width relative z-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
        <div
          className="flex flex-col justify-between rounded-[1.75rem] bg-healiu-blue-light/70 p-6 sm:p-8 lg:p-10"
          data-aos="fade-right"
        >
          <div>
            <h1 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-healiu-dark-dark sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              We Take Control Of Your Health.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-healiu-dark sm:text-lg">
              Telemedicine, online pharmacist consulting, home nursing and
              physiotherapy, and a live hospital locator, all in one
              subscription.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button className={ctaPrimaryClassName} style={ctaPrimaryStyle}>
                Get Started
              </Button>
              <Button variant="outline" className={ctaOutlineClassName}>
                Book Online Consultation
              </Button>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(11,105,201,0.08)] sm:p-5">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="size-12 shrink-0 [&>svg]:size-full">
                    <stat.icon />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-healiu-dark-dark sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="text-xs text-healiu-dark sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] bg-healiu-blue-light/70 sm:min-h-[520px]"
          data-aos="fade-left"
        >
          <Image
            src="/images/pngs/lady.png"
            alt="Smiling healthcare professional ready for a telemedicine consultation"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <VideoCallBar />
        </div>
      </div>
    </section>
  );
}
