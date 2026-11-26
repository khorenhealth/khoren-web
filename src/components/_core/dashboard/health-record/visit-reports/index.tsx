"use client";

import { useState } from "react";

import { VisitReportCard, type VisitReport } from "./visit-report";

const vitals = [
  { value: "117/76", label: "Blood Pressure" },
  { value: "36.6°C", label: "Temp" },
  { value: "74 bpm", label: "Pulse" },
  { value: "99%", label: "SpO2" },
];

const reports: VisitReport[] = [
  {
    id: "wound-improving",
    title: "Wound Dressing",
    provider: "Nurse Chiamaka Obi",
    date: "Mar 14, 2026",
    status: "improving",
    vitals,
    observations:
      "Wound healing well. No signs of infection. Minimal exudate. Surrounding tissue healthy. Dressing changed with sterile technique.",
    medications: ["Amoxicillin 500mg administered", "Topical Clindamycin applied to wound"],
  },
  {
    id: "iv-stable",
    title: "IV Therapy and vitals",
    provider: "Nurse Chiamaka Obi",
    date: "Mar 14, 2026",
    status: "stable",
    vitals,
    observations: "IV line patent. Fluids tolerated without a change in vitals from the previous visit.",
    medications: ["Normal saline infusion completed"],
  },
  {
    id: "physio-improving",
    title: "Physiotherapy session",
    provider: "Nurse Chiamaka Obi",
    date: "Mar 14, 2026",
    status: "improving",
    vitals,
    observations: "Mobility exercises were tolerated. Range of motion continues to improve as expected.",
    medications: [],
  },
  {
    id: "wound-declining",
    title: "Wound Dressing",
    provider: "Nurse Chiamaka Obi",
    date: "Mar 14, 2026",
    status: "declining",
    vitals,
    observations: "Wound edges are unchanged and surrounding redness has increased. Dressing was changed and follow-up was planned.",
    medications: ["Topical Clindamycin applied to wound"],
  },
  {
    id: "wound-follow-up",
    title: "Wound Dressing",
    provider: "Nurse Chiamaka Obi",
    date: "Mar 14, 2026",
    status: "improving",
    vitals,
    observations: "Dressing changed. The site is clean and dry, and healing continues as expected.",
    medications: [],
  },
];

export function VisitReports() {
  const [openIds, setOpenIds] = useState<string[]>([reports[0].id]);

  function toggle(id: string) {
    setOpenIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <ul className="flex flex-col gap-7 rounded-2xl bg-white px-4 py-5 sm:px-6">
      {reports.map((report) => (
        <li key={report.id}>
          <VisitReportCard report={report} open={openIds.includes(report.id)} onToggle={() => toggle(report.id)} />
        </li>
      ))}
    </ul>
  );
}
