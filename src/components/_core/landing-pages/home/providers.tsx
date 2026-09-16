"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Activity,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Syringe,
  User,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaOutlineClassName,
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "../shared/cta-button-styles";
import { cn } from "@/lib/utils";

const filters: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All Care Providers", icon: UserRound },
  { id: "physiotherapist", label: "Physiotherapist", icon: Activity },
  { id: "post-surgery", label: "Post-Surgery Care", icon: HeartPulse },
  { id: "doctors", label: "Doctors", icon: Stethoscope },
  { id: "nurses", label: "Nurses", icon: User },
  { id: "checkups", label: "Medical Check-ups", icon: ShieldCheck },
  { id: "iv", label: "IV Therapy", icon: Syringe },
];

const providers = [
  {
    id: 1,
    name: "Dr. James Okonkwo",
    role: "Primary care doctor",
    image: "/images/pngs/doctor-1.png",
    category: "doctors",
  },
  {
    id: 2,
    name: "Dr. Amara Nwosu",
    role: "Primary care doctor",
    image: "/images/pngs/doctor-2.png",
    category: "doctors",
  },
  {
    id: 3,
    name: "Dr. Chidi Eze",
    role: "Primary care doctor",
    image: "/images/pngs/doctor-3.png",
    category: "doctors",
  },
];

function ProviderCard({
  provider,
  featured,
}: {
  provider: (typeof providers)[number];
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex w-full flex-col transition-transform duration-300",
        featured && "z-10 sm:scale-[1.03]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.5rem]",
          featured ? "bg-healiu-blue-darker" : "bg-healiu-neutral-light-active",
        )}
      >
        <div className="relative aspect-square w-full">
          <Image
            src={provider.image}
            alt={provider.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 33vw"
          />

          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-healiu-green px-2.5 py-1 text-xs font-medium text-white sm:left-4 sm:top-4">
            <ShieldCheck className="size-3.5" />
            Verified
          </span>
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-healiu-blue-light px-2.5 py-1 text-xs font-medium text-healiu-blue sm:right-4 sm:top-4">
            <span className="size-1.5 rounded-full bg-healiu-blue" />
            Available
          </span>
        </div>

        <div className="relative z-10 -mt-16 mx-3 mb-3 rounded-2xl bg-white px-4 pb-4 pt-5 text-center shadow-[0_8px_24px_rgba(11,105,201,0.08)] sm:mx-4 sm:px-5">
          <h3 className="text-base font-semibold text-healiu-dark-dark sm:text-lg">
            {provider.name}
          </h3>
          <p className="mt-1 text-sm text-healiu-dark">{provider.role}</p>
          <Button
            className={cn(
              "mt-4 w-full",
              featured ? ctaPrimaryClassName : ctaOutlineClassName,
            )}
            style={featured ? ctaPrimaryStyle : undefined}
          >
            Book Now
          </Button>
        </div>
      </div>
    </article>
  );
}

export function Providers() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(1);
  const [paused, setPaused] = useState(false);

  const matched =
    activeFilter === "all"
      ? providers
      : providers.filter((p) => p.category === activeFilter);
  const list = matched.length > 0 ? matched : providers;

  const n = list.length;
  const center = n === 0 ? 0 : ((activeIndex % n) + n) % n;
  const visible =
    n === 0
      ? []
      : n === 1
        ? [list[0]]
        : n === 2
          ? [list[center], list[(center + 1) % n]]
          : [list[(center - 1 + n) % n], list[center], list[(center + 1) % n]];

  useEffect(() => {
    if (paused || n <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % n);
    }, 4000);

    return () => window.clearInterval(id);
  }, [paused, n]);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="app-width">
        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          data-aos="fade-up"
        >
          <h2 className="max-w-md text-3xl font-bold tracking-tight text-healiu-dark-dark sm:text-4xl">
            Meet Our Verified Providers
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-healiu-dark sm:text-right">
            Every provider is rigorously vetted. Every visit is clinically
            supervised. Every interaction is documented.
          </p>
        </div>

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-2"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          {filters.map((filter) => {
            const Icon = filter.icon;
            const active = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => {
                  setActiveFilter(filter.id);
                  setActiveIndex(0);
                }}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-healiu-blue text-white"
                    : "bg-healiu-neutral-light-active text-healiu-dark-dark hover:bg-healiu-blue-light",
                )}
              >
                <Icon className="size-4" />
                {filter.label}
              </button>
            );
          })}
        </div>

        <div
          className="mt-10 grid w-full grid-cols-1 items-end gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6"
          data-aos="fade-up"
          data-aos-delay="100"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {visible.map((provider, index) => {
            const featured =
              visible.length === 1 ||
              (visible.length === 3 && index === 1) ||
              (visible.length === 2 && index === 0);

            return (
              <div
                key={`${provider.id}-${index}`}
                className={cn(
                  "w-full",
                  visible.length === 3 && index !== 1 && "hidden sm:block",
                )}
              >
                <ProviderCard provider={provider} featured={featured} />
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {list.map((provider, index) => {
            const active = index === center;
            return (
              <button
                key={provider.id}
                type="button"
                aria-label={`Show provider ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  active
                    ? "w-6 bg-healiu-blue"
                    : "w-2 bg-healiu-neutral-light-active hover:bg-healiu-blue-light-active",
                )}
              />
            );
          })}
        </div>

        <div className="mt-8 flex justify-center" data-aos="fade-up">
          <Button
            variant="outline"
            className={cn(
              ctaOutlineClassName,
              "border-border px-10 text-healiu-dark-dark",
            )}
          >
            See Full List
          </Button>
        </div>
      </div>
    </section>
  );
}
