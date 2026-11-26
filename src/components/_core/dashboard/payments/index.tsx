"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { PaymentHistory } from "./payment-history";
import { UpcomingBills } from "./upcoming-bills";
import { SummaryStats, TopUpWalletButton } from "./wallet-summary";

const tabs = [
  { id: "upcoming", label: "Upcoming Bills" },
  { id: "history", label: "Payment History" },
  { id: "methods", label: "Payment Methods" },
] as const;

export function PaymentsView() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("upcoming");

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pt-4 pb-6 sm:px-6">
      <section className="flex flex-col gap-4 rounded-2xl bg-[#EAF4FC] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm text-[#8B97A6]">Payments & Billing</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-healiu-dark-dark">Your Payment Summary</h2>
          <p className="mt-1 text-sm text-[#8B97A6]">March 2025 · Post-Surgery Recovery Plan</p>
        </div>
        <SummaryStats />
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1" role="tablist" aria-label="Payments">
          {tabs.map((item) => {
            const selected = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(item.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm transition-colors",
                  selected ? "bg-white font-semibold text-healiu-dark-dark shadow-sm" : "font-medium text-[#8B97A6]",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <TopUpWalletButton />
      </div>

      {tab === "upcoming" ? <UpcomingBills /> : null}
      {tab === "history" ? <PaymentHistory /> : null}
      {tab === "methods" ? (
        <section className="rounded-2xl bg-white px-5 py-8 text-sm text-[#8B97A6] shadow-[0_8px_24px_rgba(29,36,45,0.04)]">
          Payment methods will show here.
        </section>
      ) : null}
    </div>
  );
}
