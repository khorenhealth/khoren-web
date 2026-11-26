import { ChevronDown } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const values = [44, 30, 56, 84, 62, 46, 28];

const width = 700;
const height = 168;

const points = values.map((value, index) => ({
  x: ((index + 0.5) / values.length) * width,
  y: 14 + ((100 - value) / 100) * (height - 28),
}));

function curve(series: { x: number; y: number }[]) {
  const commands = [`M ${series[0].x} ${series[0].y}`];

  for (let index = 0; index < series.length - 1; index += 1) {
    const previous = series[index === 0 ? index : index - 1];
    const current = series[index];
    const next = series[index + 1];
    const after = series[index + 2] ?? next;
    const tension = 0.18;
    const control1x = current.x + (next.x - previous.x) * tension;
    const control1y = current.y + (next.y - previous.y) * tension;
    const control2x = next.x - (after.x - current.x) * tension;
    const control2y = next.y - (after.y - current.y) * tension;
    commands.push(`C ${control1x} ${control1y} ${control2x} ${control2y} ${next.x} ${next.y}`);
  }

  return commands.join(" ");
}

const line = curve(points);
const area = `${line} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

export function WeeklyVitals() {
  return (
    <section className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-healiu-dark-dark">Weekly Vitals</h2>
        <p className="inline-flex items-center gap-1.5 rounded-full border border-[#E7EEF6] bg-[#F7F9FC] px-3 py-1.5 text-xs font-medium text-healiu-dark-dark">
          Week of Mar 16
          <ChevronDown className="size-3.5 text-healiu-dark" />
        </p>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Weekly vitals trend from Monday to Sunday"
        className="mt-4 h-auto w-full"
      >
        <defs>
          <linearGradient id="weekly-vitals-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B69C9" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0B69C9" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((lineIndex) => {
          const y = 14 + (lineIndex * (height - 28)) / 3;
          return (
            <line
              key={lineIndex}
              x1="0"
              x2={width}
              y1={y}
              y2={y}
              stroke="#E6EDF5"
              strokeWidth="1"
            />
          );
        })}
        <path d={area} fill="url(#weekly-vitals-fill)" />
        <path
          d={line}
          fill="none"
          stroke="#0B69C9"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <div className="mt-1 grid grid-cols-7 text-center text-[11px] font-medium text-healiu-dark">
        {days.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-healiu-dark">
        <span className="h-0.5 w-4 rounded-full bg-healiu-blue" />
        Weekly Vitals
      </p>
    </section>
  );
}
