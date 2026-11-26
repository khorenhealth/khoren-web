const progress = [
  { value: "21", label: "Days active" },
  { value: "09", label: "Sessions left" },
  { value: "48", label: "Adherence" },
];

export function CarePlanProgress() {
  return (
    <section className="rounded-2xl bg-[#0E2138] p-5 text-white shadow-[0_8px_24px_rgba(14,33,56,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-semibold">Care Plan Progress</h2>
        <p className="text-2xl font-semibold tracking-tight text-healiu-green">48%</p>
      </div>

      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-white/15"
        role="progressbar"
        aria-valuenow={48}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Care plan progress"
      >
        <div className="h-full w-[48%] rounded-full bg-healiu-green" />
      </div>
      <p className="mt-2 text-xs text-white/60">12 of 25 sessions complete</p>

      <dl className="mt-5 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-4">
        {progress.map((item) => (
          <div key={item.label} className="px-2 text-center first:pl-0 last:pr-0">
            <dt className="text-[11px] text-white/55">{item.label}</dt>
            <dd className="mt-1 text-lg font-semibold tracking-tight">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
