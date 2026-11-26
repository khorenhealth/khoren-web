import { DocumentRow, type HealthDocument } from "./document-row";

const documents: HealthDocument[] = [
  { id: "discharge", name: "Hospital Discharge Summary", date: "Mar 1, 2025", kind: "PDF", size: "340 KB" },
  { id: "blood-work", name: "Pre-op Blood Work Results", date: "Mar 1, 2025", kind: "PDF", size: "340 KB" },
  { id: "procedure", name: "Surgical Procedure Notes", date: "Mar 1, 2025", kind: "PDF", size: "340 KB" },
  { id: "care-plan", name: "Care Plan – HCC-2025-0341", date: "Mar 1, 2025", kind: "PDF", size: "340 KB" },
  { id: "visit-report", name: "Visit Report – Mar 14", date: "Mar 1, 2025", kind: "PDF", size: "340 KB" },
];

export function Documents() {
  return (
    <ul className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      {documents.map((document) => (
        <li key={document.id}>
          <DocumentRow document={document} />
        </li>
      ))}
    </ul>
  );
}
