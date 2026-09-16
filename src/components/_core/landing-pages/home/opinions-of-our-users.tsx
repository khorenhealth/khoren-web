"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    title: "Medical Assistance",
    quote:
      "I was incredibly impressed with the home nursing services from Khoren. The nurses were not only highly skilled but also compassionate and attentive to my needs. They provided exceptional care, making me feel comfortable and well-supported throughout my recovery.",
    name: "Tanvir Ahmed",
    location: "Lagos, Nigeria",
    rating: 4.8,
    avatar: "/images/pngs/doctor-1.png",
  },
  {
    id: 2,
    title: "Home Physiotherapy",
    quote:
      "Booking physiotherapy through Khoren was seamless. The therapist arrived on time, explained every session clearly, and helped me regain mobility faster than I expected. Professional care without leaving home made all the difference.",
    name: "Adaobi Mensah",
    location: "Abuja, Nigeria",
    rating: 4.9,
    avatar: "/images/pngs/doctor-2.png",
  },
  {
    id: 3,
    title: "Telemedicine Consult",
    quote:
      "I needed a doctor late in the evening and Khoren connected me within minutes. The consultation was thorough, the prescription was clear, and follow-up support was excellent. It truly feels like healthcare that comes to you.",
    name: "Chidi Okoro",
    location: "Port Harcourt, Nigeria",
    rating: 4.7,
    avatar: "/images/pngs/doctor-3.png",
  },
];

function QuoteMark() {
  return (
    <span
      className="absolute -top-3 right-6 z-10 flex size-11 items-center justify-center rounded-xl bg-white shadow-[0_8px_20px_rgba(11,105,201,0.12)]"
      aria-hidden="true"
    >
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 14V7.2C0 3.2 2.2 0.9 5.5 0L6.3 1.6C4.4 2.2 3.4 3.4 3.4 5.2H6.2V14H0ZM11.2 14V7.2C11.2 3.2 13.4 0.9 16.7 0L17.5 1.6C15.6 2.2 14.6 3.4 14.6 5.2H17.4V14H11.2Z"
          fill="#0B69C9"
        />
      </svg>
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4",
            index < Math.round(rating)
              ? "fill-[#F5B942] text-[#F5B942]"
              : "fill-[#D0D0D0] text-[#D0D0D0]",
          )}
        />
      ))}
    </div>
  );
}

export function OpinionsOfOurUsers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const active = testimonials[activeIndex];

  useEffect(() => {
    if (paused || n <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % n);
    }, 5000);

    return () => window.clearInterval(id);
  }, [paused, n]);

  const goPrev = () => setActiveIndex((current) => (current - 1 + n) % n);
  const goNext = () => setActiveIndex((current) => (current + 1) % n);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="app-width">
        <h2
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
          data-aos="fade-up"
        >
          <span className="text-healiu-blue">Opinions</span>{" "}
          <span className="text-healiu-dark-dark">of our users</span>
        </h2>

        <div
          className="mx-auto mt-12 max-w-3xl"
          data-aos="fade-up"
          data-aos-delay="80"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={goPrev}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-healiu-blue bg-white text-healiu-blue transition-colors hover:bg-healiu-blue-light sm:size-11"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="relative flex-1 rounded-2xl border border-border bg-white p-6 shadow-[0_8px_30px_rgba(11,105,201,0.06)] sm:p-8">
              <QuoteMark />
              <h3 className="text-lg font-bold text-healiu-dark-dark sm:text-xl">
                {active.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-healiu-dark sm:text-base">
                {active.quote}
              </p>
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={goNext}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-healiu-blue bg-white text-healiu-blue transition-colors hover:bg-healiu-blue-light sm:size-11"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-[0_4px_16px_rgba(11,105,201,0.04)]">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-healiu-neutral-light-active">
                <Image
                  src={active.avatar}
                  alt={active.name}
                  fill
                  className="object-cover object-top"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-healiu-dark-dark">
                  {active.name}
                </p>
                <p className="text-xs text-healiu-dark">{active.location}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-4 py-3 shadow-[0_4px_16px_rgba(11,105,201,0.04)]">
              <p className="text-xl font-bold text-healiu-dark-dark">
                {active.rating.toFixed(1)}
                <span className="text-sm font-medium text-healiu-dark">/5</span>
              </p>
              <div className="mt-1">
                <Stars rating={active.rating} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show testimonial from ${item.name}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    isActive
                      ? "w-6 bg-healiu-blue"
                      : "w-2 bg-[#D0D0D0] hover:bg-healiu-blue-light-active",
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
