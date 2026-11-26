"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { BookVisitDialog } from "./book-visit-dialog";
import { ProviderCard } from "./provider-card";
import { browseProviders, careTeam } from "./providers-data";

const tabs = [
  { id: "team", label: "My Care Team" },
  { id: "browse", label: "Browse Providers" },
] as const;

export function ProvidersView() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("team");
  const [bookingName, setBookingName] = useState<string | null>(null);
  const providers = tab === "team" ? careTeam : browseProviders;

  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pt-4 pb-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full bg-white p-1 shadow-[0_1px_2px_rgba(16,40,68,0.04)]" role="tablist">
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
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  selected ? "bg-[#F4F7FB] font-semibold text-healiu-dark-dark shadow-sm" : "text-[#8B97A6]",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setBookingName("Nurse Chiamaka Obi")}
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-healiu-blue px-4 text-sm font-semibold text-white transition-colors hover:bg-healiu-blue-hover"
        >
          <Plus className="size-4" strokeWidth={2.25} />
          Book New Visit
        </button>
      </div>

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {providers.map((provider) => (
          <li key={provider.id}>
            <ProviderCard provider={provider} onBook={() => setBookingName(provider.name)} />
          </li>
        ))}
      </ul>

      <BookVisitDialog
        open={bookingName !== null}
        providerName={bookingName ?? ""}
        onOpenChange={(open) => {
          if (!open) setBookingName(null);
        }}
      />
    </div>
  );
}
