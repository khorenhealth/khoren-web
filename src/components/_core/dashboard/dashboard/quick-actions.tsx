import Link from "next/link";
import { CalendarPlus, ChevronRight, ClipboardList, CreditCard, FileHeart, type LucideIcon } from "lucide-react";

const actions: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Book a Visit", href: "/dashboard/appointments", icon: CalendarPlus },
  { label: "View Care Plan", href: "/dashboard/care-plan", icon: ClipboardList },
  { label: "Health Records", href: "/dashboard/health-record", icon: FileHeart },
  { label: "Payments & Billing", href: "/dashboard/payments", icon: CreditCard },
];

export function QuickActions() {
  return (
    <section className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <h2 className="text-base font-semibold text-healiu-dark-dark">Quick Actions</h2>
      <ul className="mt-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <li key={action.href} className="border-b border-[#EEF2F6] last:border-b-0">
              <Link
                href={action.href}
                className="flex items-center gap-3 py-3 text-sm font-medium text-healiu-dark-dark transition-colors hover:text-healiu-blue"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-healiu-blue-light text-healiu-blue">
                  <Icon className="size-4" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">{action.label}</span>
                <ChevronRight className="size-4 shrink-0 text-healiu-dark" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
