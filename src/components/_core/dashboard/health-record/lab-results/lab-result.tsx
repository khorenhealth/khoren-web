import { cn } from "@/lib/utils";

export type LabStatus = "normal" | "elevated" | "none";

export type LabResult = {
  id: string;
  name: string;
  date: string;
  detail: string;
  status: LabStatus;
};

const statuses: Record<LabStatus, { label: string; dot: string; badge: string }> = {
  normal: {
    label: "Normal",
    dot: "bg-[#7BC142]",
    badge: "bg-[#F3FBE8] text-[#67B82A]",
  },
  elevated: {
    label: "Slightly Elevated",
    dot: "bg-[#F0A05A]",
    badge: "bg-[#FFF1E8] text-[#E08A3C]",
  },
  none: {
    label: "No Growth",
    dot: "bg-[#E15B64]",
    badge: "bg-[#FDECEE] text-[#E15B64]",
  },
};

export function LabResultCard({ result }: { result: LabResult }) {
  const status = statuses[result.status];

  return (
    <article className="flex items-center justify-between gap-4 rounded-2xl bg-[#F6F8F9] px-4 py-4 sm:px-5">
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <span className={cn("size-2 shrink-0 rounded-full", status.dot)} aria-hidden />
          <h3 className="text-sm font-semibold text-healiu-dark-dark">{result.name}</h3>
        </div>
        <div className="mt-1 pl-[18px]">
          <p className="text-xs leading-5 text-[#98A2B3]">{result.date}</p>
          <p className="text-xs leading-5 text-[#98A2B3]">{result.detail}</p>
        </div>
      </div>
      <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-medium", status.badge)}>{status.label}</span>
    </article>
  );
}
