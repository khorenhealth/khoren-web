import { Activity } from "lucide-react";

import { TrendChart } from "./trend-chart";

const metrics = [
  { id: "bp", value: "117/76 mmHg", label: "Blood Pressure" },
  { id: "temp", value: "36.6°C", label: "Temperature" },
  { id: "pulse", value: "74 bpm", label: "Pulse Rate" },
  { id: "spo2", value: "99%", label: "SpO2" },
];

const days = ["Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10"];
const bloodPressure = [58, 74, 88, 76, 44, 70, 80, 58];
const pulse = [54, 66, 84, 92, 74, 66, 62, 56];

export function VitalTrends() {
  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <li
            key={metric.id}
            className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-healiu-dark-dark">{metric.value}</p>
                <p className="mt-1 text-xs text-[#8B97A6]">{metric.label}</p>
              </div>
              <span className="flex size-8 items-center justify-center rounded-full bg-[#F4FAE9] text-healiu-green">
                <Activity className="size-4" strokeWidth={2} />
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="grid gap-4 lg:grid-cols-2">
        <TrendChart
          title="Blood Pressure Trend (Last 14 Days)"
          values={bloodPressure}
          labels={days}
          outlier="Outlier/High"
        />
        <TrendChart title="Pulse & SpO2 Trend" values={pulse} labels={days} />
      </div>
    </>
  );
}
