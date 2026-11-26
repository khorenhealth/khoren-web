import { LabResultCard, type LabResult } from "./lab-result";

const results: LabResult[] = [
  {
    id: "fbc-a",
    name: "Full Blood Count (FBC)",
    date: "Mar 4, 2025",
    detail: "Hb: 13.2 g/dL | WBC: 7.4 × 10³/μL | Plt: 245 × 10³/μL",
    status: "normal",
  },
  {
    id: "crp",
    name: "C-Reactive Protein (CRP)",
    date: "Mar 4, 2025",
    detail: "CRP: 12 mg/L (Normal: <5 mg/L) — post-surgical inflammation expected",
    status: "elevated",
  },
  {
    id: "glucose",
    name: "Blood Glucose (Fasting)",
    date: "Mar 4, 2025",
    detail: "5.4 mmol/L (Normal: 3.9–5.6 mmol/L)",
    status: "normal",
  },
  {
    id: "swab",
    name: "Wound Swab Culture",
    date: "Mar 4, 2025",
    detail: "No pathogenic organisms isolated. Sterile wound environment maintained.",
    status: "none",
  },
  {
    id: "fbc-b",
    name: "Full Blood Count (FBC)",
    date: "Mar 4, 2025",
    detail: "Hb: 13.2 g/dL | WBC: 7.4 × 10³/μL | Plt: 245 × 10³/μL",
    status: "normal",
  },
];

export function LabResults() {
  return (
    <ul className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      {results.map((result) => (
        <li key={result.id}>
          <LabResultCard result={result} />
        </li>
      ))}
    </ul>
  );
}
