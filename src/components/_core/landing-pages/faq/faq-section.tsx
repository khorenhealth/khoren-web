"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { faqs } from "@/components/_core/landing-pages/shared/faq-data";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(faqs[0].id);

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-16 top-0 size-[28rem] rounded-full bg-[#D8F5E8]/60 blur-3xl" />
        <div className="absolute right-1/4 top-10 size-[22rem] rounded-full bg-[#D6E8FF]/70 blur-3xl" />
      </div>

      <div className="app-width relative z-10">
        <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
          <span className="text-healiu-blue">Frequently</span>{" "}
          <span className="text-healiu-dark-dark">asked questions</span>
        </h1>

        <div className="mx-auto mt-10 max-w-4xl rounded-[1.75rem] bg-white p-4 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:mt-12 sm:rounded-[2rem] sm:p-6 md:p-8">
          <div className="flex flex-col gap-3 sm:gap-4">
            {faqs.map((faq) => {
              const open = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-[#F2F4FF] px-4 py-4 sm:px-5 sm:py-5"
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : faq.id)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <span
                      className={cn(
                        "text-base sm:text-lg",
                        open
                          ? "font-semibold text-healiu-blue"
                          : "font-medium text-healiu-dark-dark",
                      )}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                        open
                          ? "bg-healiu-blue text-white"
                          : "bg-white/80 text-healiu-dark",
                      )}
                    >
                      {open ? (
                        <ChevronRight className="size-4" strokeWidth={2.5} />
                      ) : (
                        <ChevronDown className="size-5" strokeWidth={2} />
                      )}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-3 max-w-3xl pr-10 text-sm leading-relaxed text-healiu-dark sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
