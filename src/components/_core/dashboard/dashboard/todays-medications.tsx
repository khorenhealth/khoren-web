"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const medications = [
  { id: "amoxicillin", name: "Amoxicillin 500mg", schedule: "Twice daily", time: "8:00 AM", taken: true },
  { id: "diclofenac", name: "Diclofenac 50mg", schedule: "Twice daily", time: "8:00 AM", taken: true },
  { id: "omeprazole", name: "Omeprazole 20mg", schedule: "Once daily", time: "8:00 AM", taken: true },
  { id: "vitamin-c", name: "Vitamin C 1000mg", schedule: "Once daily", time: "8:00 PM", taken: false },
];

export function TodaysMedications() {
  const [taken, setTaken] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(medications.map((medication) => [medication.id, medication.taken])),
  );

  return (
    <section className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-healiu-dark-dark">Today&apos;s Medications</h2>
        <Link
          href="/dashboard/health-record"
          className="text-sm font-medium text-healiu-blue hover:text-healiu-blue-hover"
        >
          View all
        </Link>
      </div>

      <ul className="mt-2">
        {medications.map((medication) => {
          const isTaken = taken[medication.id];

          return (
            <li
              key={medication.id}
              className="border-b border-[#EEF2F6] last:border-b-0"
            >
              <button
                type="button"
                aria-pressed={isTaken}
                onClick={() =>
                  setTaken((current) => ({
                    ...current,
                    [medication.id]: !current[medication.id],
                  }))
                }
                className="flex w-full items-center gap-3 py-3 text-left"
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border",
                    isTaken
                      ? "border-healiu-green bg-healiu-green text-white"
                      : "border-[#D5DDE6] bg-white text-transparent",
                  )}
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-healiu-dark-dark">
                    {medication.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-healiu-dark">{medication.schedule}</span>
                </span>
                <span className="shrink-0 text-xs font-medium text-healiu-dark">{medication.time}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
