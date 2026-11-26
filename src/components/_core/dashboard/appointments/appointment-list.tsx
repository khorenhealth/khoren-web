"use client";

import { Calendar, Check, Clock, MapPin, Star, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { formatVisitDate, type Appointment } from "./appointments-data";

export function AppointmentList({
  visits,
  tab,
  upcomingCount,
  pastCount,
  onTabChange,
  onReschedule,
  onCancel,
  onRate,
}: {
  visits: Appointment[];
  tab: "upcoming" | "past";
  upcomingCount: number;
  pastCount: number;
  onTabChange: (tab: "upcoming" | "past") => void;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
  onRate: (id: string) => void;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="inline-flex w-fit rounded-full bg-[#E8EEF4] p-1" role="tablist" aria-label="Appointment range">
        {(
          [
            { id: "upcoming", label: `Upcoming (${upcomingCount})` },
            { id: "past", label: `Past (${pastCount})` },
          ] as const
        ).map((item) => {
          const selected = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                selected ? "bg-white text-healiu-dark-dark shadow-sm" : "text-healiu-dark",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <ul className="flex flex-col gap-3">
        {visits.map((visit) =>
          visit.when === "past" ? (
            <PastVisit key={visit.id} visit={visit} onRate={onRate} />
          ) : (
          <li
            key={visit.id}
            className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-healiu-blue-light text-healiu-blue">
                  <Calendar className="size-4" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-healiu-dark-dark">{visit.title}</h2>
                  <p className="mt-0.5 text-xs text-healiu-dark">{visit.provider}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => onReschedule(visit.id)}
                    className="rounded-full border border-[#E4EAF1] bg-white px-3 py-1.5 text-xs font-medium text-healiu-dark transition-colors hover:bg-[#F7FAFD]"
                  >
                    Reschedule
                  </button>
                  <button
                    type="button"
                    onClick={() => onCancel(visit.id)}
                    className="rounded-full border border-[#F6D0D0] bg-white px-3 py-1.5 text-xs font-medium text-[#E15B64] transition-colors hover:bg-[#FFF6F6]"
                  >
                    Cancel
                  </button>
                </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-12 text-xs text-healiu-dark">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5 text-[#8B97A6]" strokeWidth={2} />
                {formatVisitDate(visit.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 text-[#8B97A6]" strokeWidth={2} />
                {visit.time} ({visit.duration})
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 text-[#8B97A6]" strokeWidth={2} />
                {visit.location}
              </span>
            </div>

            <p className="mt-3 pl-12">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-healiu-green-light px-2.5 py-1 text-[11px] font-semibold text-healiu-green-dark">
                <span className="size-1.5 rounded-full bg-[#7BC142]" />
                Confirmed
              </span>
            </p>
          </li>
          ),
        )}
      </ul>
    </div>
  );
}

function PastVisit({ visit, onRate }: { visit: Appointment; onRate: (id: string) => void }) {
  const missed = visit.outcome === "missed";

  return (
    <li className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E7EEF6] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full",
            missed ? "bg-[#FDECEE] text-[#E23B4A]" : "bg-[#E8F7D8] text-[#67B82A]",
          )}
        >
          {missed ? <X className="size-4" strokeWidth={2.5} /> : <Check className="size-4" strokeWidth={2.5} />}
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-healiu-dark-dark">{visit.title}</h2>
          <p className="mt-0.5 text-xs text-healiu-dark">{visit.provider}</p>
          <p className="mt-1 text-xs text-[#8B97A6]">
            {formatVisitDate(visit.date)} · {visit.time} · {visit.duration}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            missed ? "bg-[#FDECEE] text-[#E15B64]" : "bg-healiu-green-light text-healiu-green-dark",
          )}
        >
          <span className={cn("size-1.5 rounded-full", missed ? "bg-[#E15B64]" : "bg-[#7BC142]")} />
          {missed ? "Missed" : "Completed"}
        </span>
        {missed ? null : visit.rating ? (
          <span className="inline-flex items-center gap-0.5" aria-label={`${visit.rating} star rating`}>
            {Array.from({ length: visit.rating }, (_, index) => (
              <Star key={index} className="size-3.5 fill-[#F5A524] text-[#F5A524]" strokeWidth={0} />
            ))}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onRate(visit.id)}
            className="rounded-full bg-healiu-blue px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-healiu-blue-hover"
          >
            Rate Visit
          </button>
        )}
      </div>
    </li>
  );
}
