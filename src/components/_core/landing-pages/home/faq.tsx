"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const faqs = [
  {
    id: 1,
    question: "What is Khoren and how does it work?",
    answer:
      "Khoren is a caregiving and receiving platform that connects individuals needing medical and non-medical assistance with qualified service providers. Whether you require medical help, elderly care, childcare, rehabilitation services, or household support, Khoren offers a wide range of services.",
  },
  {
    id: 2,
    question: "How do I find and book a service provider on Khoren?",
    answer:
      "Browse verified providers by specialty, location, or availability, then select a plan or one-off visit. You can book a home visit or start a telemedicine consult in minutes, and track every step from request to care delivered.",
  },
  {
    id: 3,
    question: "How are the service providers vetted on Khoren?",
    answer:
      "Every provider is rigorously vetted. Credentials are verified, backgrounds are checked, and visits are clinically supervised. Every interaction is documented so you always know who is caring for you and how.",
  },
  {
    id: 4,
    question: "Can I modify or cancel my booking?",
    answer:
      "Yes. You can modify or cancel upcoming bookings from your account before the scheduled visit window. Timing rules may vary by service type, and you will always see the applicable policy before confirming a change.",
  },
];

export function Faq() {
  const [openId, setOpenId] = useState<number | null>(faqs[0].id);

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
            {faqs.map((faq) => {
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
        </div>
      </div>
    </section>
  );
}
