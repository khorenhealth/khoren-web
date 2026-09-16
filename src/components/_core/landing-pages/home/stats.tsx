import {
  MonthlyVisitsStatIcon,
  PartnersStatsIcon,
  PatientStatIcon,
  StateStatsIcon,
} from "../svg";

const stats = [
  {
    icon: PatientStatIcon,
    value: "150+",
    label: "Patients",
  },
  {
    icon: MonthlyVisitsStatIcon,
    value: "15+",
    label: "Monthly visitor",
  },
  {
    icon: StateStatsIcon,
    value: "3",
    label: "States",
  },
  {
    icon: PartnersStatsIcon,
    value: "10",
    label: "Partners",
  },
];

export function Stats() {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl bg-white px-6 py-12 shadow-[0_8px_40px_rgba(11,105,201,0.08)] sm:px-10 sm:py-14">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4">
            <div className="size-12 shrink-0 [&>svg]:size-full">
              <stat.icon />
            </div>
            <div>
              <p className="text-2xl font-bold text-healiu-dark-dark">
                {stat.value}
              </p>
              <p className="text-sm text-healiu-dark">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
