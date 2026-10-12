"use client";

import { useEffect, useRef, useState, type TransitionEvent } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/_core/landing-pages/shared/cta-button-styles";
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
    image: "/images/pngs/features/home-nursing.png",
    category: "healthcare",
  },
  {
    id: 2,
    title: "Physiotherapy",
    description: "Physical therapy sessions at home for rehabilitation.",
    image: "/images/pngs/features/physiotherapy.png",
    category: "healthcare",
  },
  {
    id: 3,
    title: "Medical Check-ups",
    description: "Routine medical examinations by healthcare professionals.",
    image: "/images/pngs/features/medical-checkups.png",
    category: "healthcare",
  },
  {
    id: 4,
    title: "Medication Management",
    description: "Assistance with medication schedules and adherence.",
    image: "/images/pngs/features/medication-management.png",
    category: "healthcare",
  },
  {
    id: 5,
    title: "Telemedicine",
    description: "Video consultations with licensed doctors, anytime.",
    image: "/images/pngs/features/medical-checkups.png",
    category: "healthcare",
  },
  {
    id: 6,
    title: "Caregiving",
    description: "Trusted caregivers for daily support and companionship.",
    image: "/images/pngs/features/home-nursing.png",
    category: "elderly",
  },
  {
    id: 7,
    title: "Wellness Coaching",
    description: "Programs that support nutrition, fitness, and recovery.",
    image: "/images/pngs/features/physiotherapy.png",
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
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block"
          >
            <Button className="h-10 gap-2 rounded-full border-0 bg-white px-5 text-sm font-medium text-healiu-dark-dark hover:bg-white/95">
              Get this service
              <span className="flex size-5 items-center justify-center rounded-full bg-healiu-blue text-white">
                <ArrowRight className="size-3" strokeWidth={2.5} />
              </span>
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
}

export function FeaturedServiceBoard() {
  const [activeCategory, setActiveCategory] = useState("healthcare");
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const filtered = services.filter(
    (service) => service.category === activeCategory,
  );
  const list = filtered.length > 0 ? filtered : services;
  const n = list.length;
  // Enough clones so the next cards always fill the viewport while looping
  const looped = n > 1 ? [...list, ...list, ...list] : list;
  const activeDot = n > 0 ? ((index % n) + n) % n : 0;

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const item = itemRef.current;
      if (!track || !item) return;

      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      setStep(item.offsetWidth + gap);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [list.length, activeCategory]);

  useEffect(() => {
    setAnimate(false);
    setIndex(0);
    const id = window.requestAnimationFrame(() => setAnimate(true));
    return () => window.cancelAnimationFrame(id);
  }, [activeCategory]);

  useEffect(() => {
    if (paused || n <= 1) return;

    const id = window.setInterval(() => {
      setAnimate(true);
      setIndex((current) => current + 1);
    }, 4500);

    return () => window.clearInterval(id);
  }, [paused, n, activeCategory]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (n <= 1 || index < n) return;

    setAnimate(false);
    setIndex((current) => current % n);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setAnimate(true));
    });
  };

  const goTo = (target: number) => {
    setAnimate(true);
    setIndex(target);
  };

  const nextSlide = () => {
    if (n <= 1) return;
    setAnimate(true);
    setIndex((current) => current + 1);
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
          <div className="flex gap-3 overflow-x-auto pb-2 pr-14 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const active = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.id);
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
            aria-label="Next service"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(11,105,201,0.15)]"
          >
            <ArrowRight className="size-5 text-healiu-blue" />
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
        <div className="app-width overflow-hidden">
          <div
            ref={trackRef}
            className={cn(
              "flex gap-4 sm:gap-5 lg:gap-6",
              animate && "transition-transform duration-500 ease-out",
            )}
            style={{
              transform:
                step > 0 ? `translate3d(-${index * step}px, 0, 0)` : undefined,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {looped.map((service, loopIndex) => (
              <div
                key={`${service.id}-${loopIndex}`}
                ref={loopIndex === 0 ? itemRef : undefined}
                className="shrink-0"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {list.map((service, dotIndex) => {
            const active = dotIndex === activeDot;
            return (
              <button
                key={service.id}
                type="button"
                aria-label={`Show ${service.title}`}
                onClick={() => goTo(dotIndex)}
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
