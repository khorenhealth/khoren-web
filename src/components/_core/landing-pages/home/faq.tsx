"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { homeFaqs } from "@/components/_core/landing-pages/shared/faq-data";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openId, setOpenId] = useState<number | null>(homeFaqs[0].id);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="app-width">
        <div
          className="rounded-[2rem] bg-[#F2F4FF] px-5 py-12 sm:px-8 sm:py-14 md:px-12 lg:px-16"
          data-aos="fade-up"
        >
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-healiu-blue">Frequently</span>{" "}
            <span className="text-healiu-dark-dark">asked questions</span>
          </h2>

          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
            {homeFaqs.map((faq) => {
              const open = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-border bg-white px-5 py-4 sm:px-6 sm:py-5"
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : faq.id)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <span className="text-base font-semibold text-healiu-dark-dark sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                        open
                          ? "bg-healiu-blue text-white"
                          : "bg-transparent text-healiu-blue-light-active",
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
                      <p className="mt-3 pr-10 text-sm leading-relaxed text-healiu-dark sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/faq">
              <Button className={ctaPrimaryClassName} style={ctaPrimaryStyle}>
                View More FAQs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
