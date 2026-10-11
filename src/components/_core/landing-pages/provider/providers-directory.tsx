"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Activity,
  FlaskConical,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Stethoscope,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  BOOKING_URL,
  ctaOutlineClassName,
} from "../shared/cta-button-styles";
import { cn } from "@/lib/utils";

const filters: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All Care Providers", icon: UserRound },
  { id: "doctors", label: "Doctors", icon: Stethoscope },
  { id: "nurses", label: "Registered Nurses", icon: UserRound },
  { id: "physiotherapists", label: "Physiotherapists", icon: Activity },
  { id: "lab", label: "Medical Lab Scientists", icon: FlaskConical },
];

const providers = [
  {
    id: 1,
    name: "RN. Adeola Jacob",
    role: "Nurse",
    category: "nurses",
    image: "/images/pngs/providers/adeola-jacob.png",
  },
  {
    id: 2,
    name: "DR. Victor Oshimagyeuye",
    role: "Doctor",
    category: "doctors",
    image: "/images/pngs/providers/victor-oshimagyeuye.png",
  },
  {
    id: 3,
    name: "DR. Mama Ifunanya Clementina",
    role: "Doctor",
    category: "doctors",
    image: "/images/pngs/providers/mama-ifunanya-clemetin.png",
  },
  {
    id: 4,
    name: "RM. Faith Harris",
    role: "Midwife",
    category: "nurses",
    image: "/images/pngs/providers/faith-harris.png",
  },
  {
    id: 5,
    name: "PT. Michael Okoh",
    role: "Physiotherapist",
    category: "physiotherapists",
    image: "/images/pngs/providers/micheal-okoh.png",
  },
  {
    id: 6,
    name: "RN. Olamide Adegboyega",
    role: "Nurse",
    category: "nurses",
    image: "/images/pngs/providers/olamide-adegboyega.png",
  },
  {
    id: 7,
    name: "MLS. Chigoziri Anthony Amugo",
    role: "Medical Lab Sci",
    category: "lab",
    image: "/images/pngs/providers/chigoziri-anthony-amugo.png",
  },
  {
    id: 8,
    name: "RN. Jennifer Tanko",
    role: "Nurse",
    category: "nurses",
    image: "/images/pngs/providers/jenifer-tanko.png",
  },
  {
    id: 9,
    name: "RN. Akubo Daniel",
    role: "Nurse",
    category: "nurses",
    image: "/images/pngs/providers/akubo-daniel.png",
  },
  {
    id: 10,
    name: "RN. Timileyin Obagun",
    role: "Nurse",
    category: "nurses",
    image: "/images/pngs/providers/timiliehin-obagun.png",
  },
  {
    id: 11,
    name: "RN. Sambe Elizabeth",
    role: "Nurse",
    category: "nurses",
    image: "/images/pngs/providers/sambe-elizabeth.png",
  },
  {
    id: 12,
    name: "PT. Aishat Abdulraheem",
    role: "Physiotherapist",
    category: "physiotherapists",
    image: "/images/pngs/providers/aishat-abdulraheem.png",
  },
  {
    id: 13,
    name: "RN. Ayantunde Favour olamide",
    role: "Nurse",
    category: "nurses",
    image: "/images/pngs/providers/ayantunde-favour-olamide.png",
  },
];

function ProviderCard({
  provider,
}: {
  provider: (typeof providers)[number];
}) {
  return (
    <article className="group flex w-full flex-col">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-healiu-neutral-light-active transition-colors duration-300 group-hover:bg-healiu-blue-darker">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={provider.image}
            alt={provider.name}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-healiu-green px-2.5 py-1 text-xs font-medium text-white">
            <ShieldCheck className="size-3.5" />
            Verified
          </span>
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-healiu-blue-light px-2.5 py-1 text-xs font-medium text-healiu-blue">
            <span className="size-1.5 rounded-full bg-healiu-blue" />
            Available
          </span>
        </div>

        <div className="relative z-10 -mt-16 mx-3 mb-3 rounded-2xl bg-white px-4 pb-4 pt-5 text-center shadow-[0_8px_24px_rgba(11,105,201,0.08)] sm:mx-4">
          <h3 className="text-base font-semibold text-healiu-dark-dark sm:text-lg">
            {provider.name}
          </h3>
          <p className="mt-1 text-sm text-healiu-dark">{provider.role}</p>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block"
          >
            <Button
              variant="outline"
              className={cn(
                ctaOutlineClassName,
                "w-full border-border text-healiu-dark-dark",
              )}
            >
              Book Now
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
}

export function ProvidersDirectory() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 40,
    });
  }, []);

  const list = providers.filter((provider) => {
    const matchesFilter =
      activeFilter === "all" || provider.category === activeFilter;
    const matchesQuery =
      query.trim() === "" ||
      provider.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      provider.role.toLowerCase().includes(query.trim().toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <section
      className="relative overflow-x-hidden pb-16 pt-28 sm:pb-20 sm:pt-32"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage:
          "linear-gradient(rgba(144, 203, 34, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(144, 203, 34, 0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="app-width relative z-10">
        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          data-aos="fade-up"
        >
          <h1 className="max-w-xl text-3xl font-bold tracking-tight text-healiu-dark-dark sm:text-4xl lg:text-[2.5rem]">
            Find Verified Clinical Providers
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-healiu-dark sm:text-right">
            Every provider is rigorously vetted. Every visit is clinically
            supervised. Every interaction is documented.
          </p>
        </div>

        <div
          className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const active = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
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

          <label className="relative flex w-full max-w-xs shrink-0 items-center">
            <span className="sr-only">Search providers</span>
            <Search className="pointer-events-none absolute left-4 size-4 text-healiu-dark" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search..."
              className="h-11 w-full rounded-full border border-border bg-white py-2 pr-11 pl-11 text-sm text-healiu-dark-dark outline-none placeholder:text-healiu-dark-lighter focus:border-healiu-blue"
            />
            <button
              type="button"
              aria-label="Open filters"
              className="absolute right-3 flex size-7 items-center justify-center rounded-full text-healiu-dark hover:bg-healiu-neutral-light-active"
            >
              <SlidersHorizontal className="size-4" />
            </button>
          </label>
        </div>

        <div
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {list.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-12 text-center text-sm text-healiu-dark">
            No providers match your search.
          </p>
        )}
      </div>
    </section>
  );
}
