const goals = [
  { label: "Wound closure", percent: 62 },
  { label: "Pain management", percent: 78 },
  { label: "Mobility restoration", percent: 45 },
  { label: "Infection prevention", percent: 90 },
  { label: "Nutrition support", percent: 55 },
];

export function TreatmentGoals() {
  return (
    <section className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <h2 className="text-base font-semibold text-healiu-dark-dark">Treatment Goals</h2>
      <ul className="mt-4 space-y-4">
        {goals.map((goal) => (
          <li key={goal.label}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-healiu-dark-dark">{goal.label}</p>
              <p className="text-xs font-semibold text-healiu-dark">{goal.percent}%</p>
            </div>
            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EEF3F8]"
              role="progressbar"
              aria-valuenow={goal.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={goal.label}
            >
              <div className="h-full rounded-full bg-healiu-green" style={{ width: `${goal.percent}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
