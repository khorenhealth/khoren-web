import { Activity, Bell, CalendarDays, HeartPulse, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const stats: {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  highlight?: boolean;
  alert?: boolean;
}[] = [
  {
    label: "Next Visit",
    value: "Today 10AM",
    hint: "Wound Dressing",
    icon: CalendarDays,
    highlight: true,
  },
  {
    label: "Total Visits",
    value: "18",
    hint: "This care cycle",
    icon: Activity,
  },
  {
    label: "Care Score",
    value: "94%",
    hint: "Plan adherence",
    icon: HeartPulse,
  },
  {
    label: "Active Alerts",
    value: "1",
    hint: "BP monitoring",
    icon: Bell,
    alert: true,
  },
];

export function SummaryStats() {
  return (
    <section aria-label="Care summary" className="grid grid-cols-2 gap-3 @3xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className={cn(
              "rounded-2xl border p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)]",
              stat.highlight
                ? "border-[#D5E6F6] bg-[#E7F2FC]"
                : "border-[#E7EEF6] bg-white",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-healiu-dark">{stat.label}</p>
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full",
                  stat.highlight && "bg-white text-healiu-blue",
                  !stat.highlight && !stat.alert && "bg-[#F3F7FB] text-healiu-blue",
                  stat.alert && "bg-[#FFF4E8] text-[#E08A1E]",
                )}
              >
                <Icon className="size-4" strokeWidth={2} />
              </span>
            </div>
            <p className="mt-2 text-xl font-semibold tracking-tight text-healiu-dark-dark">
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs text-healiu-dark">{stat.hint}</p>
          </article>
        );
      })}
    </section>
  );
}
