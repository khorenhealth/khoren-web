import Link from "next/link";

const visits = [
  {
    title: "Wound Dressing",
    provider: "Nurse Amina",
    when: "Today",
    time: "10:00 AM",
  },
  {
    title: "Physiotherapy Session",
    provider: "Dr. James Okonkwo",
    when: "Tomorrow",
    time: "2:00 PM",
  },
  {
    title: "IV Therapy",
    provider: "Nurse Blessing",
    when: "Mar 20",
    time: "11:00 AM",
  },
];

export function UpcomingVisits() {
  return (
    <section className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-healiu-dark-dark">Upcoming Visits</h2>
        <Link
          href="/dashboard/appointments"
          className="text-sm font-medium text-healiu-blue hover:text-healiu-blue-hover"
        >
          View all
        </Link>
      </div>

      <ul className="mt-2">
        {visits.map((visit) => (
          <li
            key={visit.title}
            className="flex items-center justify-between gap-3 border-b border-[#EEF2F6] py-3.5 last:border-b-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-healiu-dark-dark">{visit.title}</p>
              <p className="mt-0.5 truncate text-xs text-healiu-dark">{visit.provider}</p>
            </div>
            <div className="shrink-0 text-right">
              <span className="inline-flex rounded-full bg-healiu-green-light px-2.5 py-0.5 text-[11px] font-semibold text-healiu-green-dark">
                {visit.when}
              </span>
              <p className="mt-1 text-xs text-healiu-dark">{visit.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
