import { ChevronDown, ChevronUp, Download } from "lucide-react";

import { cn } from "@/lib/utils";

export type VisitStatus = "improving" | "stable" | "declining";

export type VisitReport = {
  id: string;
  title: string;
  provider: string;
  date: string;
  status: VisitStatus;
  vitals: { value: string; label: string }[];
  observations: string;
  medications: string[];
};

const statuses: Record<VisitStatus, { label: string; bar: string; badge: string; dot: string }> = {
  improving: {
    label: "Improving as expected",
    bar: "bg-[#7BC142]",
    badge: "bg-[#F3FBE8] text-[#67B82A]",
    dot: "bg-[#7BC142]",
  },
  stable: {
    label: "Stable - No change",
    bar: "bg-[#F0A05A]",
    badge: "bg-[#FFF1E8] text-[#E08A3C]",
    dot: "bg-[#F0A05A]",
  },
  declining: {
    label: "Not improving at all",
    bar: "bg-[#E15B64]",
    badge: "bg-[#FDECEE] text-[#E15B64]",
    dot: "bg-[#E15B64]",
  },
};

function downloadReport(report: VisitReport) {
  const lines = [
    report.title,
    `${report.provider} · ${report.date}`,
    statuses[report.status].label,
    "",
    ...report.vitals.map((vital) => `${vital.label}: ${vital.value}`),
    "",
    "Clinical Observations",
    report.observations,
    "",
    "Medications Given",
    ...report.medications,
  ];
  const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.title.toLowerCase().replace(/\s+/g, "-")}-report.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

export function VisitReportCard({
  report,
  open,
  onToggle,
}: {
  report: VisitReport;
  open: boolean;
  onToggle: () => void;
}) {
  const status = statuses[report.status];
  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <article>
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center gap-3 text-left">
        <span className={cn("h-8 w-1 shrink-0 rounded-full", status.bar)} aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-healiu-dark-dark">{report.title}</span>
          <span className="mt-0.5 block text-xs text-[#8B97A6]">
            {report.provider} · {report.date}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", status.badge)}>
            <span className={cn("size-1.5 rounded-full", status.dot)} />
            {status.label}
          </span>
          <Chevron className="size-4 text-[#8B97A6]" strokeWidth={2} />
        </span>
      </button>

      {open ? (
        <div className="mt-4 pl-4">
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {report.vitals.map((vital) => (
              <li key={vital.label} className="rounded-xl bg-[#F4F7FA] px-3 py-3 text-center">
                <p className="text-sm font-semibold text-healiu-dark-dark">{vital.value}</p>
                <p className="mt-0.5 text-[11px] text-[#8B97A6]">{vital.label}</p>
              </li>
            ))}
          </ul>

          <h3 className="mt-4 text-sm font-semibold text-healiu-dark-dark">Clinical Observations</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#5C6B7A]">{report.observations}</p>

          {report.medications.length > 0 ? (
            <>
              <h3 className="mt-4 text-sm font-semibold text-healiu-dark-dark">Medications Given</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {report.medications.map((medication) => (
                  <li
                    key={medication}
                    className="rounded-full bg-healiu-blue-light px-3 py-1 text-xs font-medium text-healiu-blue"
                  >
                    {medication}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <button
            type="button"
            onClick={() => downloadReport(report)}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-full border border-[#E4EAF1] px-4 text-sm font-medium text-healiu-dark-dark transition-colors hover:bg-[#F7F9FC]"
          >
            <Download className="size-4" strokeWidth={2} />
            Download Report
          </button>
        </div>
      ) : null}
    </article>
  );
}
