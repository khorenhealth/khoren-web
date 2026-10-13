"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const faqs = [
  {
    id: 1,
    question: "What is Khoren?",
    answer:
      "Khoren is a healthtech platform built to bring healthcare closer to Nigerian families. We connect people to telemedicine consultations, home-based nursing and physiotherapy, pharmacist consulting, and a live hospital locator, all through one simple subscription.",
  },
  {
    id: 2,
    question: "What problem does Khoren solve?",
    answer:
      "Too many families in Nigeria deal with fragmented healthcare, running between hospitals during emergencies, struggling to find trained home care for elderly or recovering loved ones, and losing hours in waiting rooms for consultations that could happen remotely. Khoren brings these scattered pieces of care into one connected platform.",
  },
  {
    id: 3,
    question: "Who is Khoren for?",
    answer:
      "Families caring for elderly parents, people recovering from surgery or managing chronic conditions, new mothers, busy professionals who need quick medical guidance, and anyone who wants faster, more reliable access to healthcare without unnecessary hospital visits.",
  },
  {
    id: 4,
    question: "What is telemedicine on Khoren?",
    answer:
      "Video or voice consultations with licensed doctors, so you can describe your symptoms, get guidance, and receive a diagnosis or test recommendation without sitting in a hospital waiting room.",
  },
  {
    id: 5,
    question: "What does home care include?",
    answer:
      "Scheduled visits from licensed nurses, physiotherapists, and caregivers, delivered directly to your home for services like wound care, physical therapy, elderly support, and general nursing care.",
  },
  {
    id: 6,
    question: "What is pharmacist consulting?",
    answer:
      "Direct access to licensed pharmacists for guidance on medication, dosage questions, and general pharmaceutical advice, without needing to visit a pharmacy in person for simple questions.",
  },
  {
    id: 7,
    question: "What is the hospital locator?",
    answer:
      "A live feature showing you the nearest hospitals and exactly what services each one offers, so during an emergency you know exactly where to go instead of moving from one hospital to another.",
  },
  {
    id: 8,
    question: "How do I get started?",
    answer:
      "Choose a subscription plan based on your family's needs, then book a home visit, start a telemedicine consultation, or use the hospital locator whenever you need it.",
  },
  {
    id: 9,
    question: "Do I need to subscribe to use every feature?",
    answer:
      "Subscription plans are built in tiers, so you can start with the services most relevant to you and upgrade as your needs grow.",
  },
  {
    id: 10,
    question: "How fast can I get a home visit or consultation?",
    answer:
      "Once available in your area, requests are matched with the nearest available licensed professional, with the goal of same-day or next-day scheduling for most home care visits, and immediate access for telemedicine consultations.",
  },
  {
    id: 11,
    question: "Are the doctors, nurses, and caregivers verified?",
    answer:
      "Yes. Every professional on Khoren is licensed and vetted before joining our network.",
  },
  {
    id: 12,
    question: "How is my health information protected?",
    answer:
      "Khoren is built with data protection as a core part of the platform, not an afterthought, in line with Nigeria's data protection regulations. Your medical information is handled with the same seriousness as your care.",
  },
  {
    id: 13,
    question: "What happens if something goes wrong during a home visit?",
    answer:
      "All professionals on our platform operate under clear service standards, and every visit is logged and tracked so families always know what happened and when.",
  },
  {
    id: 14,
    question: "Can I use Khoren without a subscription?",
    answer:
      "Certain services may be available on a pay-per-use basis for non-subscribers, with full details to be shared at launch.",
  },
  {
    id: 15,
    question:
      "Can I join Khoren as a nurse, doctor, physiotherapist, or pharmacist?",
    answer:
      "Yes. We are building a network of licensed, qualified professionals. Reach out through our page or website to express interest in joining.",
  },
  {
    id: 16,
    question: "Can hospitals or pharmacies partner with Khoren?",
    answer:
      "We welcome conversations with hospitals, pharmacies, and healthcare organizations interested in partnering with us. Please reach out directly to discuss.",
  },
  {
    id: 17,
    question: "How can I get in touch?",
    answer:
      "Message us directly on our Khoren LinkedIn page, or reach out through the contact details on our website once live.",
  },
];

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
