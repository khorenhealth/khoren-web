"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { InvoiceDialog } from "./invoice-dialog";

type PaymentStatus = "paid" | "refunded";

type Payment = {
  id: string;
  invoice: string;
  service: string;
  provider: string;
  amount: string;
  date: string;
  method: string;
  status: PaymentStatus;
};

const pageSize = 8;

const payments: Payment[] = [
  ["Card", "paid", "₦7,500"],
  ["Bank Transfer", "paid", "₦7,500"],
  ["Wallet", "paid", "₦7,500"],
  ["Card", "refunded", "-₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Bank Transfer", "paid", "₦7,500"],
  ["Wallet", "paid", "₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Card", "refunded", "-₦7,500"],
  ["Wallet", "paid", "₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Bank Transfer", "paid", "₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Wallet", "paid", "₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Card", "paid", "₦7,500"],
  ["Bank Transfer", "paid", "₦7,500"],
  ["Card", "refunded", "-₦7,500"],
].map(([method, status, amount], index) => ({
  id: `payment-${index + 1}`,
  invoice: "INV-2025-0142",
  service: "Wound Dressing (Visit #12)",
  provider: "Nurse Chiamaka",
  amount,
  date: "Mar 14, 2025",
  method,
  status: status as PaymentStatus,
}));

const pageCount = Math.ceil(payments.length / pageSize);

export function PaymentHistory() {
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState<Payment | null>(null);
  const rows = payments.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className="rounded-2xl bg-white px-4 py-5 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:px-5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] border-separate border-spacing-y-1 text-left">
          <thead>
            <tr className="text-[11px] font-medium tracking-wide text-[#98A2B3] uppercase">
              <th className="px-2 pb-2 font-medium">Invoice</th>
              <th className="px-2 pb-2 font-medium">Service</th>
              <th className="px-2 pb-2 font-medium">Provider</th>
              <th className="px-2 pb-2 font-medium">Amount</th>
              <th className="px-2 pb-2 font-medium">Date</th>
              <th className="px-2 pb-2 font-medium">Method</th>
              <th className="px-2 pb-2 font-medium">Status</th>
              <th className="px-2 pb-2 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((payment) => (
              <tr key={payment.id} className="text-sm text-healiu-dark-dark">
                <td className="px-2 py-2.5 whitespace-nowrap">{payment.invoice}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">{payment.service}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">{payment.provider}</td>
                <td
                  className={cn(
                    "px-2 py-2.5 font-medium whitespace-nowrap",
                    payment.status === "refunded" && "text-[#E15B64]",
                  )}
                >
                  {payment.amount}
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap text-[#667085]">{payment.date}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">{payment.method}</td>
                <td className="px-2 py-2.5">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                      payment.status === "paid"
                        ? "bg-[#F3FBE8] text-[#7CBF2E]"
                        : "bg-[#FDECEE] text-[#E15B64]",
                    )}
                  >
                    {payment.status === "paid" ? "Paid" : "Refunded"}
                  </span>
                </td>
                <td className="px-2 py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => setViewing(payment)}
                    className="inline-flex h-8 items-center justify-center rounded-lg bg-healiu-blue px-3.5 text-xs font-semibold text-white transition-colors hover:bg-healiu-blue-hover"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-end gap-1 text-sm text-[#98A2B3]">
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page === 1}
          className="inline-flex h-8 items-center gap-0.5 rounded-lg px-2 disabled:opacity-40"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
          Prev
        </button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => setPage(number)}
            aria-current={page === number ? "page" : undefined}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-lg",
              page === number ? "bg-[#EEF1F4] font-semibold text-healiu-dark-dark" : "text-[#98A2B3]",
            )}
          >
            {number}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          disabled={page === pageCount}
          className="inline-flex h-8 items-center gap-0.5 rounded-lg px-2 disabled:opacity-40"
        >
          Next
          <ChevronRight className="size-4" strokeWidth={2} />
        </button>
      </div>
      <InvoiceDialog open={viewing !== null} payment={viewing} onOpenChange={(open) => !open && setViewing(null)} />
    </section>
  );
}
