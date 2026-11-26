"use client";

import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const pages: { href: string; title: string }[] = [
  { href: "/dashboard/care-plan", title: "Care Plan" },
  { href: "/dashboard/appointments", title: "Appointments" },
  { href: "/dashboard/providers", title: "My Providers" },
  { href: "/dashboard/health-record", title: "Health Record" },
  { href: "/dashboard/payments", title: "Payments" },
  { href: "/dashboard/settings", title: "Settings" },
  { href: "/dashboard/profile", title: "Profile" },
];

function titleFor(pathname: string) {
  const match = pages.find(
    (page) => pathname === page.href || pathname.startsWith(`${page.href}/`),
  );
  if (match) return match.title;

  const segment = pathname.split("/").filter(Boolean).pop() ?? "Dashboard";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function PageHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/dashboard";

  return (
    <header
      className={cn(
        "flex flex-col gap-3 px-4 pt-5 sm:flex-row sm:justify-between sm:px-6 lg:pt-6",
        isHome ? "sm:items-end" : "sm:items-center",
      )}
    >
      {isHome ? (
        <div>
          <p className="text-sm text-healiu-dark">Good morning,</p>
          <h1 className="text-2xl font-semibold tracking-tight text-healiu-dark-dark">
            Adaeze Okonkwo
          </h1>
        </div>
      ) : (
        <h1 className="text-2xl font-semibold tracking-tight text-healiu-dark-dark">
          {titleFor(pathname)}
        </h1>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-healiu-dark">Monday, March 16, 2026</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-healiu-blue-light px-3 py-1 text-xs font-semibold text-healiu-blue">
          <Sparkles className="size-3.5" strokeWidth={2.25} />
          Free Plan
        </span>
      </div>
    </header>
  );
}
