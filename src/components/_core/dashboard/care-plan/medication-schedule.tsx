"use client";

import { useState } from "react";
import { Check, ChevronDown, Clock, Pill } from "lucide-react";

import { cn } from "@/lib/utils";

type Dose = { id: string; time: string; taken: boolean };

const schedule: {
  id: string;
  name: string;
  purpose: string;
  frequency: string;
  doses: Dose[];
}[] = [
  {
    id: "amoxicillin",
    name: "Amoxicillin 500mg",
    purpose: "Infection Prevention",
    frequency: "Twice daily",
    doses: [
      { id: "amoxicillin-am", time: "8:00 AM", taken: true },
      { id: "amoxicillin-pm", time: "8:00 PM", taken: false },
    ],
  },
  {
    id: "omeprazole",
    name: "Omeprazole 20mg",
    purpose: "Stomach protection",
    frequency: "Once daily",
    doses: [{ id: "omeprazole-am", time: "8:00 AM", taken: true }],
  },
  {
    id: "diclofenac",
    name: "Diclofenac 50mg",
    purpose: "Pain and inflammation",
    frequency: "Thrice daily",
    doses: [
      { id: "diclofenac-am", time: "8:00 AM", taken: true },
      { id: "diclofenac-mid", time: "2:00 PM", taken: false },
      { id: "diclofenac-pm", time: "8:00 PM", taken: false },
    ],
  },
  {
    id: "vitamin-c",
    name: "Vitamin C 1000mg",
    purpose: "Wound healing support",
    frequency: "Once daily",
    doses: [{ id: "vitamin-c-pm", time: "8:00 PM", taken: false }],
  },
];

export function MedicationSchedule() {
  const [openId, setOpenId] = useState(schedule[0].id);
  const [doses, setDoses] = useState<Record<string, Dose[]>>(() =>
    Object.fromEntries(schedule.map((medication) => [medication.id, medication.doses])),
  );

  function markTaken(medicationId: string, doseId: string) {
    setDoses((current) => ({
      ...current,
      [medicationId]: current[medicationId].map((dose) =>
        dose.id === doseId ? { ...dose, taken: true } : dose,
      ),
    }));
  }

  return (
    <section className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-semibold text-healiu-dark-dark">
          <span className="flex size-8 items-center justify-center rounded-full bg-healiu-blue-light text-healiu-blue">
            <Pill className="size-4" strokeWidth={2} />
          </span>
          Medication Schedule
        </h2>
        <p className="rounded-full bg-healiu-blue-light px-3 py-1 text-xs font-medium text-healiu-blue">
          Today, Mar 16
        </p>
      </div>

      <ul className="mt-4 space-y-3">
        {schedule.map((medication) => {
          const medicationDoses = doses[medication.id];
          const takenCount = medicationDoses.filter((dose) => dose.taken).length;
          const open = openId === medication.id;

          return (
            <li
              key={medication.id}
              className={cn(
                "rounded-2xl bg-[#F6F8F9] px-3 py-3 sm:px-4",
                open ? "border border-[#9ECAF0]" : "border border-transparent",
              )}
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? "" : medication.id)}
                className="flex w-full items-center gap-3 text-left"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-healiu-blue-light text-healiu-blue">
                  <Pill className="size-4" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-healiu-dark-dark">
                    {medication.name}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-healiu-dark">
                    {medication.purpose}
                    <span className="px-1.5 text-[#C5D0DC]">·</span>
                    {medication.frequency}
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#EAF6D8] px-2.5 py-1 text-xs font-semibold text-healiu-green-dark">
                  <span className="size-1.5 rounded-full bg-healiu-green" />
                  {takenCount}/{medicationDoses.length} Taken
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-[#9AA8B8] transition-transform",
                    open && "rotate-180",
                  )}
                />
              </button>

              {open ? (
                <div className="mt-3 flex flex-wrap gap-2 pl-[3.25rem]">
                  {medicationDoses.map((dose) =>
                    dose.taken ? (
                      <span
                        key={dose.id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F6D4] py-1 pr-3 pl-1 text-xs font-semibold text-[#5C8A16]"
                      >
                        <span className="flex size-6 items-center justify-center rounded-full bg-[#7BC142] text-white">
                          <Clock className="size-3.5" strokeWidth={2} />
                        </span>
                        {dose.time}
                        <span className="flex size-4 items-center justify-center rounded-full bg-[#7BC142] text-white">
                          <Check className="size-2.5" strokeWidth={3} />
                        </span>
                        Taken
                      </span>
                    ) : (
                      <button
                        key={dose.id}
                        type="button"
                        onClick={() => markTaken(medication.id, dose.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#E4EAF1] bg-white py-1 pr-3 pl-1 text-xs font-medium text-healiu-dark transition-colors hover:bg-[#F7F9FC]"
                      >
                        <span className="flex size-6 items-center justify-center rounded-full bg-[#F3F6F9] text-[#8B9AAB]">
                          <Clock className="size-3.5" strokeWidth={2} />
                        </span>
                        {dose.time}
                        <span className="font-semibold text-healiu-dark-dark">Mark Taken</span>
                      </button>
                    ),
                  )}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
