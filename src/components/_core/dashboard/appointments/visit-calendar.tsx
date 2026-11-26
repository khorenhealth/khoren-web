"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { addDays, formatMonthYear, parseDate, sameDay, type Appointment } from "./appointments-data";

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function VisitCalendar({
  weekStart,
  visits,
  onWeekChange,
}: {
  weekStart: Date;
  visits: Appointment[];
  onWeekChange: (next: Date) => void;
}) {
  const days = weekdayLabels.map((_, index) => addDays(weekStart, index));
  const labelDate = addDays(weekStart, 3);

  return (
    <aside className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-healiu-dark-dark">{formatMonthYear(labelDate)}</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous week"
            onClick={() => onWeekChange(addDays(weekStart, -7))}
            className="flex size-7 items-center justify-center rounded-full text-[#8B97A6] transition-colors hover:bg-[#F4F7FB] hover:text-healiu-dark-dark"
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next week"
            onClick={() => onWeekChange(addDays(weekStart, 7))}
            className="flex size-7 items-center justify-center rounded-full text-[#8B97A6] transition-colors hover:bg-[#F4F7FB] hover:text-healiu-dark-dark"
          >
            <ChevronRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {weekdayLabels.map((label) => (
          <p key={label} className="text-[11px] font-medium text-[#8B97A6]">
            {label}
          </p>
        ))}
        {days.map((day) => {
          const marked = visits.some((visit) => sameDay(parseDate(visit.date), day));
          return (
            <div key={day.toISOString()} className="flex flex-col items-center gap-1 py-1">
              <span className="text-sm font-semibold text-healiu-dark-dark">{day.getDate()}</span>
              <span className={marked ? "size-1.5 rounded-full bg-[#7BC142]" : "size-1.5"} />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-4 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-healiu-blue text-sm font-semibold text-white transition-colors hover:bg-healiu-blue-hover"
      >
        <Plus className="size-4" strokeWidth={2.25} />
        Book New Visit
      </button>
    </aside>
  );
}
