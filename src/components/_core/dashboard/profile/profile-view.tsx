"use client";

import { useState } from "react";
import {
  Bell,
  HeartPulse,
  MapPin,
  Phone,
  Pill,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { ContactInfo } from "@/components/_core/profile/contact-info";
import { HealthInfo } from "@/components/_core/profile/health-info";
import { Location } from "@/components/_core/profile/location";
import { MedicalInfo } from "@/components/_core/profile/medical-info";
import { Notification } from "@/components/_core/profile/notification";
import { PersonalInfo } from "@/components/_core/profile/personal-info";
import { PrivacyAndConsent } from "@/components/_core/profile/privacy-and-consent";
import { cn } from "@/lib/utils";

const sections: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "personal", label: "Personal information", icon: UserRound },
  { id: "address", label: "Home visit address", icon: MapPin },
  { id: "health", label: "Health information", icon: HeartPulse },
  { id: "medications", label: "Medications & records", icon: Pill },
  { id: "emergency", label: "Emergency contact", icon: Phone },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & consent", icon: ShieldCheck },
];

export function DashboardProfile() {
  const [active, setActive] = useState(sections[0].id);

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pt-4 pb-6 lg:flex-row lg:items-start lg:gap-6 lg:px-6">
      <aside className="lg:sticky lg:top-20 lg:w-64 lg:shrink-0">
        <nav
          aria-label="Profile sections"
          className="flex gap-1 overflow-x-auto rounded-2xl bg-white p-2 shadow-[0_8px_30px_rgba(15,23,42,0.04)] lg:flex-col"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            const selected = active === section.id;

            return (
              <button
                key={section.id}
                type="button"
                aria-current={selected ? "page" : undefined}
                onClick={() => setActive(section.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium whitespace-nowrap transition-colors",
                  selected
                    ? "bg-healiu-blue text-white"
                    : "text-healiu-dark hover:bg-[#F4F7FB]",
                )}
              >
                <Icon className="size-4 shrink-0" strokeWidth={2} />
                {section.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="min-w-0 flex-1 rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-8">
        {active === "personal" ? <PersonalInfo presentation="dashboard" /> : null}
        {active === "address" ? <Location presentation="dashboard" /> : null}
        {active === "health" ? <HealthInfo presentation="dashboard" /> : null}
        {active === "medications" ? <MedicalInfo presentation="dashboard" /> : null}
        {active === "emergency" ? <ContactInfo presentation="dashboard" /> : null}
        {active === "notifications" ? <Notification presentation="dashboard" /> : null}
        {active === "privacy" ? <PrivacyAndConsent presentation="dashboard" /> : null}
      </section>
    </div>
  );
}
