import { Receipt } from "lucide-react";

export type UpcomingBill = {
  id: string;
  service: string;
  provider: string;
  date: string;
  invoice: string;
  amount: string;
};

export function BillRow({ bill }: { bill: UpcomingBill }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl bg-[#F6F8F9] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FFF3E4] text-[#F0A04A]">
          <Receipt className="size-4" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-healiu-dark-dark">{bill.service}</h3>
          <p className="mt-0.5 text-xs text-[#98A2B3]">
            {bill.provider} · {bill.date}
          </p>
          <p className="mt-0.5 text-xs text-[#98A2B3]">Invoice: {bill.invoice}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between gap-4 pl-[52px] sm:justify-end sm:pl-0">
        <p className="text-sm font-semibold text-healiu-dark-dark">{bill.amount}</p>
        <button
          type="button"
          className="inline-flex h-9 items-center justify-center rounded-full bg-healiu-blue px-4 text-sm font-semibold text-white transition-colors hover:bg-healiu-blue-hover"
        >
          Pay Now
        </button>
      </div>
    </article>
  );
}
