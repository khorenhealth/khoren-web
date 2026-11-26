import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const milestones = [
  {
    title: "Initial assessment completed",
    date: "Mar 2, 2026",
    state: "done" as const,
  },
  {
    title: "Week 3 clinical review",
    date: "Due Mar 16, 2026",
    state: "current" as const,
  },
  {
    title: "Mid-plan evaluation",
    date: "Due Mar 30, 2026",
    state: "upcoming" as const,
  },
  {
    title: "Discharge readiness assessment",
    date: "Due Apr 9, 2026",
    state: "upcoming" as const,
  },
  {
    title: "Care plan completion",
    date: "Due Apr 16, 2026",
    state: "upcoming" as const,
  },
];

export function PlanMilestones() {
  return (
    <section className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <h2 className="text-base font-semibold text-healiu-dark-dark">Plan Milestones</h2>
      <ol className="mt-5">
        {milestones.map((milestone, index) => {
          const last = index === milestones.length - 1;
          return (
            <li key={milestone.title} className="relative flex gap-3 pb-5 last:pb-0">
              {last ? null : (
                <span className="absolute top-5 left-[9px] h-[calc(100%-0.25rem)] w-px bg-[#E6EDF5]" aria-hidden />
              )}
              <span
                className={cn(
                  "relative z-10 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  milestone.state === "done" && "bg-healiu-green text-white",
                  milestone.state === "current" && "bg-healiu-blue text-white ring-4 ring-healiu-blue-light",
                  milestone.state === "upcoming" && "border border-[#D5DDE6] bg-white",
                )}
              >
                {milestone.state === "done" ? <Check className="size-3" strokeWidth={3} /> : null}
                {milestone.state === "upcoming" ? <span className="size-1.5 rounded-full bg-[#C5D0DC]" /> : null}
              </span>
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    milestone.state === "upcoming" ? "text-healiu-dark" : "text-healiu-dark-dark",
                  )}
                >
                  {milestone.title}
                </p>
                <p className="mt-0.5 text-xs text-healiu-dark">{milestone.date}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
