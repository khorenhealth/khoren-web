const width = 640;
const height = 220;
const plotLeft = 36;
const plotRight = 12;
const plotTop = 16;
const plotBottom = 176;
const min = 30;
const max = 100;

function curve(series: { x: number; y: number }[]) {
  const commands = [`M ${series[0].x} ${series[0].y}`];

  for (let index = 0; index < series.length - 1; index += 1) {
    const previous = series[index === 0 ? index : index - 1];
    const current = series[index];
    const next = series[index + 1];
    const after = series[index + 2] ?? next;
    const tension = 0.2;
    const control1x = current.x + (next.x - previous.x) * tension;
    const control1y = current.y + (next.y - previous.y) * tension;
    const control2x = next.x - (after.x - current.x) * tension;
    const control2y = next.y - (after.y - current.y) * tension;
    commands.push(`C ${control1x} ${control1y} ${control2x} ${control2y} ${next.x} ${next.y}`);
  }

  return commands.join(" ");
}

function toPoint(value: number, index: number, count: number) {
  const x = plotLeft + ((index + 0.5) / count) * (width - plotLeft - plotRight);
  const y = plotTop + ((max - value) / (max - min)) * (plotBottom - plotTop);
  return { x, y };
}

export function TrendChart({
  title,
  values,
  labels,
  outlier,
}: {
  title: string;
  values: number[];
  labels: string[];
  outlier?: string;
}) {
  const points = values.map((value, index) => toPoint(value, index, values.length));
  const line = curve(points);
  const ticks = [100, 80, 60, 40];
  const shownLabels = labels
    .map((label, index) => ({ label, index }))
    .filter(({ index }) => index === 0 || index === 1 || index === 3 || index === 5 || index === labels.length - 1);

  return (
    <article className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-healiu-blue">{title}</h3>
        {outlier ? (
          <span className="shrink-0 rounded-full bg-[#FDECEE] px-2.5 py-1 text-[11px] font-semibold text-[#E15B64]">
            {outlier}
          </span>
        ) : null}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title} className="mt-3 h-auto w-full">
        {ticks.map((tick) => {
          const y = toPoint(tick, 0, values.length).y;
          return (
            <g key={tick}>
              <line x1={plotLeft} x2={width - plotRight} y1={y} y2={y} stroke="#E6EDF5" strokeWidth="1" />
              <text x={plotLeft - 8} y={y + 4} textAnchor="end" fill="#8B97A6" fontSize="11">
                {tick}
              </text>
            </g>
          );
        })}
        <path d={line} fill="none" stroke="#4C9BE8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="3.5" fill="#fff" stroke="#4C9BE8" strokeWidth="2" />
        ))}
        {shownLabels.map(({ label, index }) => (
          <text key={label} x={points[index].x} y={height - 8} textAnchor="middle" fill="#8B97A6" fontSize="11">
            {label}
          </text>
        ))}
      </svg>

      <p className="mt-1 flex items-center justify-center gap-2 text-xs text-[#8B97A6]">
        <span className="h-0.5 w-4 rounded-full bg-[#4C9BE8]" />
        Weekly Vitals
      </p>
    </article>
  );
}
