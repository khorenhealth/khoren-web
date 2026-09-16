"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "healthcare", label: "Health Care", count: "16" },
  { id: "elderly", label: "Elderly Care", count: "05" },
  { id: "childcare", label: "Childcare", count: "12" },
  { id: "dental", label: "Dental Care", count: "07" },
  { id: "household", label: "Household", count: "13" },
  { id: "wellness", label: "Wellness", count: "21" },
  { id: "pet", label: "Pet Care", count: "08" },
];

const services = [
  {
    id: 1,
    title: "Home Nursing",
    description:
      "Home Nursing services provide various medical help and support.",
    image: "/images/pngs/key-feature.png",
    category: "healthcare",
  },
  {
    id: 2,
    title: "Physiotherapy",
    description: "Physical therapy sessions at home for rehabilitation.",
    image: "/images/pngs/how-does-khoren-works.png",
    category: "healthcare",
  },
  {
    id: 3,
    title: "Medical Check-ups",
    description: "Routine medical examinations by healthcare professionals.",
    image: "/images/pngs/doctor-2.png",
    category: "healthcare",
  },
  {
    id: 4,
    title: "Medication Management",
    description: "Guided medication schedules and pharmacist support at home.",
    image: "/images/pngs/doctor-1.png",
    category: "elderly",
  },
  {
    id: 5,
    title: "Telemedicine",
    description: "Video consultations with licensed doctors, anytime.",
    image: "/images/pngs/hero-image.png",
    category: "healthcare",
  },
  {
    id: 6,
    title: "Caregiving",
    description: "Trusted caregivers for daily support and companionship.",
    image: "/images/pngs/doctor-3.png",
    category: "elderly",
  },
  {
    id: 7,
    title: "Wellness Coaching",
    description: "Programs that support nutrition, fitness, and recovery.",
    image: "/images/pngs/key-feature.png",
    category: "wellness",
  },
];

function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  return (
    <article className="relative h-105 w-[min(100%,300px)] shrink-0 overflow-hidden rounded-[1.75rem] sm:h-115 sm:w-[320px]">
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover"
        sizes="320px"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/25 to-black/70" />

      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
        <h3 className="text-xl font-bold text-white sm:text-2xl">
          {service.title}
        </h3>

        <div>
          <p className="max-w-60 text-sm leading-relaxed text-white/90">
            {service.description}
          </p>
          <Button className="mt-4 h-10 gap-2 rounded-full border-0 bg-white px-5 text-sm font-medium text-healiu-dark-dark hover:bg-white/95">
            Get this service
            <span className="flex size-5 items-center justify-center rounded-full bg-healiu-blue text-white">
              <ArrowRight className="size-3" strokeWidth={2.5} />
            </span>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedServiceBoard() {
  const [activeCategory, setActiveCategory] = useState("healthcare");
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const categoryRailRef = useRef<HTMLDivElement>(null);

  const filtered = services.filter(
    (service) => service.category === activeCategory,
  );
  const list = filtered.length > 0 ? filtered : services;
  const n = list.length;
  const center = n === 0 ? 0 : ((activeIndex % n) + n) % n;

  useEffect(() => {
    if (paused || n <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % n);
    }, 4500);

    return () => window.clearInterval(id);
  }, [paused, n]);

  const scrollCategories = () => {
    categoryRailRef.current?.scrollBy({ left: 220, behavior: "smooth" });
  };

  return (
    <section id="services" className="overflow-hidden bg-[#F2F5FD] py-16 md:py-24">
      <div className="app-width">
        <h2
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
          data-aos="fade-up"
        >
          <span className="text-healiu-blue">Featured</span>{" "}
          <span className="text-healiu-dark-dark">service board</span>
        </h2>

        <div className="relative mt-10" data-aos="fade-up" data-aos-delay="50">
          <div
            ref={categoryRailRef}
            className="flex gap-3 overflow-x-auto pb-2 pr-14 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              const active = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.id);
                    setActiveIndex(0);
                  }}
                  className={cn(
                    "min-w-35 shrink-0 rounded-2xl px-5 py-4 text-left transition-all",
                    active
                      ? "bg-white shadow-[0_8px_24px_rgba(11,105,201,0.12)]"
                      : "bg-white/60 hover:bg-white/90",
                  )}
                >
                  <p className="text-sm font-semibold text-healiu-dark-dark">
                    {category.label}
                  </p>
                  <p className="mt-1 text-xs text-healiu-dark">
                    {category.count} Services
                  </p>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Scroll categories"
            onClick={scrollCategories}
            className="absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(11,105,201,0.15)]"
          >
            <ChevronRight className="size-5 text-healiu-blue" />
          </button>
        </div>
      </div>

      <div
        className="mt-10"
        data-aos="fade-up"
        data-aos-delay="100"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="app-width">
          <div className="flex gap-4 overflow-hidden sm:gap-5 lg:gap-6">
            {Array.from({ length: Math.min(4, n) }, (_, offset) => {
              const index = (center + offset) % n;
              const service = list[index];
              const isPeek = offset === 3;

              return (
                <div
                  key={`${service.id}-${offset}`}
                  className={cn(
                    "transition-opacity duration-300",
                    isPeek && "hidden opacity-70 xl:block",
                    offset === 2 && "hidden md:block",
                    offset === 1 && "hidden sm:block",
                  )}
                >
                  <ServiceCard service={service} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {list.map((service, index) => {
            const active = index === center;
            return (
              <button
                key={service.id}
                type="button"
                aria-label={`Show ${service.title}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  active
                    ? "w-6 bg-healiu-blue"
                    : "w-2 bg-[#D0D0D0] hover:bg-healiu-blue-light-active",
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
