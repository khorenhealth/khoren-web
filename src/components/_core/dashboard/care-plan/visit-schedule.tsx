import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

const visits = [
  {
    id: "mon-wound-iv",
    day: "Mon",
    month: "Mar",
    title: "Wound Dressing & IV Therapy",
    detail: "Nurse Chiamaka Obi · 10:00 AM",
  },
  {
    id: "wed-physio",
    day: "Wed",
    month: "Mar",
    title: "Physiotherapy Session",
    detail: "Dr. Amina Hassan · 2:00 PM",
  },
  {
    id: "fri-wound",
    day: "Fri",
    month: "Mar",
    title: "Wound Dressing",
    detail: "Nurse Chiamaka Obi · 10:00 AM",
  },
  {
    id: "mon-wound-vitals",
    day: "Mon",
    month: "Mar",
    title: "Wound Dressing & Vitals",
    detail: "Nurse Chiamaka Obi · 10:00 AM",
  },
  {
    id: "wed-physio-followup",
    day: "Wed",
    month: "Mar",
    title: "Physiotherapy Session",
    detail: "Dr. Amina Hassan · 2:00 PM",
  },
];

export function VisitSchedule() {
  return (
    <section className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-semibold text-healiu-dark-dark">
          <Calendar className="size-4 text-healiu-blue" strokeWidth={2} />
          Planned Visit Schedule
        </h2>
        <Link
          href="/dashboard/health-record"
          className="inline-flex items-center gap-0.5 rounded-full bg-healiu-blue-light px-3 py-1 text-xs font-medium text-healiu-blue hover:bg-healiu-blue-light-hover"
        >
          All reports
          <ChevronRight className="size-3.5" strokeWidth={2} />
        </Link>
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {visits.map((visit) => (
          <li
            key={visit.id}
            className="flex items-center gap-3 rounded-xl bg-[#F6F8F9] px-3 py-3 sm:gap-4 sm:px-4"
          >
            <div>

              <span className="w-8 shrink-0 leading-tight">
                <span className="block text-xs font-semibold text-healiu-dark-dark">{visit.day}</span>
                <span className="block text-[11px] text-healiu-dark">{visit.month}</span>
              </span>
            </div>
            <div className="min-w-0 flex-1 border-l border-[#909DAD] pl-2">
              <p className="truncate text-sm font-semibold text-healiu-dark-dark">{visit.title}</p>
              <p className="mt-0.5 truncate text-xs text-healiu-dark">{visit.detail}</p>
            </div>
            <span className="shrink-0 rounded-full bg-healiu-blue-light px-3 py-1 text-[11px] font-semibold text-healiu-blue">
              Scheduled
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
