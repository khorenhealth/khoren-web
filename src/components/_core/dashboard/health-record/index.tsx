"use client";

import { useState } from "react";
import { Download } from "lucide-react";

import { cn } from "@/lib/utils";

import { Documents } from "./documents";
import { LabResults } from "./lab-results";
import { latestVitals } from "./records-data";
import { VisitReports } from "./visit-reports";
import { VitalTrends } from "./vital-trends";

const tabs = [
  { id: "trends", label: "Vitals Trends" },
  { id: "visits", label: "Visit Reports" },
  { id: "labs", label: "Lab Results" },
  { id: "documents", label: "Documents" },
] as const;

function exportRecords() {
  const lines = [
    "Health Records · Adaeze Okonkwo",
    "Medical History & Vitals",
    "All records since Mar 2, 2025",
    "",
    ...latestVitals.map((vital) => `${vital.label}: ${vital.value}${vital.unit ? ` ${vital.unit}` : ""}`),
  ];
  const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "adaeze-okonkwo-health-records.txt";
  link.click();
  URL.revokeObjectURL(url);
}

export function HealthRecordView() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("trends");

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pt-4 pb-6 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#8B97A6]">Health Records · Adaeze Okonkwo</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-healiu-dark-dark">Medical History & Vitals</h2>
          <p className="mt-1 text-sm text-[#8B97A6]">Past Appointments/Records · All records since Mar 2, 2025</p>
        </div>
        <button
          type="button"
          onClick={exportRecords}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-[#E7EEF6] bg-white px-4 text-sm font-medium text-healiu-dark-dark shadow-[0_1px_2px_rgba(16,40,68,0.04)] transition-colors hover:bg-[#F7F9FC]"
        >
          <Download className="size-4 text-healiu-blue" strokeWidth={2} />
          Export all records
        </button>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {latestVitals.map((vital) => (
          <li key={vital.id} className="rounded-2xl bg-[#102844] px-4 py-3 text-white">
            <p className="text-lg font-semibold tracking-tight">{vital.value}</p>
            {vital.unit ? <p className="text-xs text-white/80">{vital.unit}</p> : null}
            <p className={cn("text-[11px] text-[#9BB0C9]", vital.unit ? "mt-1" : "mt-2")}>{vital.label}</p>
          </li>
        ))}
      </ul>

      <div className="inline-flex w-fit rounded-full bg-[#EEF2F6] p-1" role="tablist" aria-label="Health records">
        {tabs.map((item) => {
          const selected = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(item.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                selected ? "bg-white font-semibold text-healiu-dark-dark shadow-sm" : "font-medium text-[#8B97A6]",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {tab === "trends" ? <VitalTrends /> : null}

      {tab === "visits" ? <VisitReports /> : null}

      {tab === "labs" ? <LabResults /> : null}

      {tab === "documents" ? <Documents /> : null}
    </div>
  );
}
