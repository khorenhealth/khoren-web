"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ComponentType } from "react";
import { Menu } from "lucide-react";

import {
  AngleSVG,
  AppointmentSVG,
  CarePlanSVG,
  DashboardSVG,
  HealthRecordSVG,
  MyProvidersSVG,
  NotificationsSVG,
  PaymentsSVG,
  SettingsSVG,
} from "@/components/_core/dashboard/svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems: {
  label: string;
  href: string;
  icon: ComponentType;
  exact?: boolean;
}[] = [
    { label: "Dashboard", href: "/dashboard", icon: DashboardSVG, exact: true },
    { label: "Care Plan", href: "/dashboard/care-plan", icon: CarePlanSVG },
    { label: "Appointments", href: "/dashboard/appointments", icon: AppointmentSVG },
    { label: "My Providers", href: "/dashboard/providers", icon: MyProvidersSVG },
    { label: "Health Record", href: "/dashboard/health-record", icon: HealthRecordSVG },
    { label: "Payments", href: "/dashboard/payments", icon: PaymentsSVG },
    { label: "Settings", href: "/dashboard/settings", icon: SettingsSVG },
  ];

function itemIsActive(pathname: string, item: (typeof navItems)[number]) {
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E7EEF6] bg-white">
      <div className="grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <Link href="/dashboard" className="shrink-0">
          <Image
            src="/images/svgs/khoren-logo.svg"
            alt="Khoren"
            width={135}
            height={48}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav
          className="col-start-2 hidden min-w-0 overflow-x-auto lg:flex scrollbar-none [&::-webkit-scrollbar]:hidden"
          style={{ justifyContent: "safe center" }}
          aria-label="Patient"
        >
          <ul className="flex w-max items-center gap-0.5 rounded-full bg-[#F4F7FB] p-1">
            {navItems.map((item) => {
              const active = itemIsActive(pathname, item);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                      active
                        ? "bg-healiu-blue text-white"
                        : "text-healiu-dark hover:bg-white hover:text-healiu-dark-dark",
                    )}
                  >
                    <span className="inline-flex size-5 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                      <Icon />
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="col-start-3 flex shrink-0 items-center gap-1.5">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className="flex size-9 items-center justify-center rounded-full text-healiu-dark hover:bg-[#F4F7FB] lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100%,20rem)] gap-0 bg-white p-0"
            >
              <SheetHeader className="border-b border-[#E7EEF6] px-5 py-5 text-left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Image
                  src="/images/svgs/khoren-logo.svg"
                  alt="Khoren"
                  width={135}
                  height={48}
                  className="h-8 w-auto"
                />
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Patient">
                {navItems.map((item) => {
                  const active = itemIsActive(pathname, item);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-healiu-blue text-white"
                          : "text-healiu-dark hover:bg-[#F4F7FB]",
                      )}
                    >
                      <span className="inline-flex size-5 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                        <Icon />
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-10 items-center justify-center rounded-xl bg-[#F3F5F8] text-[#1C242F] hover:bg-[#E8EDF3]"
          >
            <span className="inline-flex size-4.5 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
              <NotificationsSVG />
            </span>
          </button>
          <Link
            href="/dashboard/profile"
            aria-label="Profile"
            aria-current={pathname.startsWith("/dashboard/profile") ? "page" : undefined}
            className="flex h-10 items-center gap-4 rounded-md border border-[#E4E8EE] bg-white py-1 pr-1.5 pl-1 hover:bg-[#F7F9FC]"
          >
            <span className="relative size-8 overflow-hidden rounded-lg bg-[#F4B4B4]">
              <Image
                src="/images/pngs/patient-avatar.jpg"
                alt=""
                fill
                sizes="32px"
                className="origin-center scale-[1.35] object-cover"
              />
            </span>
            <AngleSVG />
          </Link>
        </div>
      </div>
    </header>
  );
}
