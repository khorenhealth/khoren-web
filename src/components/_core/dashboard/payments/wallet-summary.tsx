import { Plus } from "lucide-react";

const stats = [
  { label: "Total Paid (Mar)", value: "₦52,000" },
  { label: "Wallet Balance", value: "₦25,000" },
];

export function SummaryStats() {
  return (
    <div className="flex flex-wrap gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="min-w-36 rounded-xl bg-[#102844] px-4 py-3 text-center text-white">
          <p className="text-[11px] text-white/70">{stat.label}</p>
          <p className="mt-0.5 text-lg font-semibold tracking-tight">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export function TopUpWalletButton() {
  return (
    <button
      type="button"
      className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-healiu-green px-4 text-sm font-semibold text-[#102844] transition-colors hover:bg-healiu-green-hover"
    >
      <Plus className="size-4" strokeWidth={2.5} />
      Top Up Wallet
    </button>
  );
}
