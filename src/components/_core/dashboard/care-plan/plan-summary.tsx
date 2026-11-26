"use client";

import { useState } from "react";
import { Download } from "lucide-react";

import { RequestAdjustmentDialog } from "./request-adjustment";

const facts = [
  { label: "Start Date", value: "Mar 3, 2025" },
  { label: "End Date", value: "Apr 14, 2025" },
  { label: "Total Visits", value: "36 sessions" },
  { label: "Supervisor", value: "Dr. E. Nwosu" },
];

export function PlanSummary() {
  const [requested, setRequested] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-2xl bg-[#E7F3FC] p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs text-healiu-dark">Active Care Plan · Plan #HCC-2025-0341</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-healiu-dark-dark sm:text-2xl">
            Post-Surgery Recovery Plan
          </h2>
          <p className="mt-1 text-sm text-healiu-dark">
            Condition: Appendectomy · Week 3 of 6 · Created by Dr. Emeka Nwosu
          </p>
          {requested ? (
            <p className="mt-2 text-sm font-medium text-healiu-green-dark" role="status">
              Adjustment request sent to your care team.
            </p>
          ) : null}
          <ul className="mt-4 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4">
            {facts.map((fact) => (
              <li key={fact.label} className="rounded-md bg-[#102844] px-3 py-2.5 text-white">
                <p className="text-[11px] text-white/65">{fact.label}</p>
                <p className="mt-1 text-sm font-semibold tracking-tight">{fact.value}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:items-stretch">
          <button
            type="button"
            onClick={() => setOpen(true)}
            disabled={requested}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#D3E7F8] px-5 text-sm font-semibold text-healiu-blue transition-colors hover:bg-[#C5DEF4] disabled:opacity-70"
          >
            {requested ? "Request sent" : "Request Adjustment"}
          </button>
          <RequestAdjustmentDialog open={open} onOpenChange={setOpen} onSubmitted={() => setRequested(true)} />
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex border border-healiu-blue h-10 items-center justify-center gap-1.5 rounded-full bg-white px-5 text-sm font-semibold text-healiu-dark-dark shadow-sm transition-colors hover:bg-[#F7FAFD]"
          >
            <Download className="size-4" strokeWidth={2} />
            Download PDF
          </button>
        </div>
      </div>
    </section>
  );
}
