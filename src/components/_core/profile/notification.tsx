"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";

const totalSteps = 8;
const currentStep = 6;

const updates = [
  {
    key: "visitReminders",
    title: "Visit reminders",
    description: "Reminders before a home visit you have booked.",
  },
  {
    key: "medicationReminders",
    title: "Medication reminders",
    description: "Reminders when a medication schedule is set up with your care team.",
  },
  {
    key: "visitReports",
    title: "Visit reports ready",
    description: "Let me know when a new visit report is available.",
  },
  {
    key: "clinicalAlerts",
    title: "Clinical alerts",
    description: "Important updates about my care when available.",
  },
] as const;

type UpdateKey = (typeof updates)[number]["key"];

const channels = [
  { key: "email", label: "Email" },
  { key: "sms", label: "SMS" },
  { key: "inApp", label: "In-app" },
] as const;

type ChannelKey = (typeof channels)[number]["key"];

function PreferenceSwitch({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`${label}, ${checked ? "on" : "off"}`}
      onClick={() => onChange(!checked)}
      className="flex shrink-0 flex-col items-center gap-1"
    >
      <span
        className={cn(
          "relative h-7 w-12 rounded-md border transition-colors",
          checked
            ? "border-healiu-blue bg-healiu-blue"
            : "border-[#D5DCE6] bg-[#EEF1F6]",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-6 rounded-sm bg-white shadow-sm transition-transform",
            checked && "translate-x-5",
          )}
        />
      </span>
      <span className="text-[11px] text-healiu-dark">{checked ? "On" : "Off"}</span>
    </button>
  );
}

export function Notification({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [preferences, setPreferences] = useState<Record<UpdateKey, boolean>>({
    visitReminders: true,
    medicationReminders: true,
    visitReports: true,
    clinicalAlerts: true,
  });
  const [selectedChannels, setSelectedChannels] = useState<Record<ChannelKey, boolean>>({
    email: true,
    sms: true,
    inApp: true,
  });
  const [promotions, setPromotions] = useState(false);

  function toggleChannel(key: ChannelKey) {
    setSelectedChannels((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <section className="my-auto w-full max-w-xl rounded-[1.75rem] bg-white px-6 py-7 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:px-8">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-healiu-blue sm:text-sm">
          Step {currentStep} of {totalSteps} · Notifications
        </p>
        <p className="shrink-0 text-xs text-healiu-dark">
          {currentStep - 1} of {totalSteps} steps done
        </p>
      </div>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full",
              index < currentStep ? "bg-healiu-blue" : "bg-[#E4E7EC]",
            )}
          />
        ))}
      </div>

      <h1 className="mt-5 text-2xl font-bold tracking-tight text-healiu-dark-dark sm:text-[1.75rem]">
        Stay informed, your way
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-healiu-dark">
        Choose the updates you&apos;d like to receive. These preferences do not create
        visits or medication schedules.
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          onContinue();
        }}
      >
        <div className="space-y-3">
          {updates.map((update) => (
            <div
              key={update.key}
              className="flex items-center justify-between gap-4 rounded-xl border border-[#E6E8EC] px-4 py-3.5"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-healiu-dark-dark">{update.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-healiu-dark">
                  {update.description}
                </p>
              </div>
              <PreferenceSwitch
                checked={preferences[update.key]}
                label={update.title}
                onChange={(checked) =>
                  setPreferences((current) => ({ ...current, [update.key]: checked }))
                }
              />
            </div>
          ))}
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-healiu-dark-dark">
            Communication channels
          </legend>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {channels.map((channel) => (
              <label
                key={channel.key}
                className="flex items-center gap-2 text-sm text-healiu-dark-dark"
              >
                <input
                  type="checkbox"
                  checked={selectedChannels[channel.key]}
                  onChange={() => toggleChannel(channel.key)}
                  className="size-4 rounded border-border accent-healiu-blue"
                />
                {channel.label}
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-healiu-dark">
            Email: adaeze.okonkwo@email.com · SMS: +234 801 234 5678. In-app updates
            appear in your dashboard. Essential account and service messages may still be
            sent.
          </p>
        </fieldset>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E6E8EC] px-4 py-3.5">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-healiu-dark-dark">
              Promotions & tips (Optional)
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-healiu-dark">
              I&apos;d like health tips and promotional updates by my selected channels. You
              can opt out anytime.
            </p>
          </div>
          <PreferenceSwitch
            checked={promotions}
            label="Promotions and tips"
            onChange={setPromotions}
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-12 w-28 shrink-0 rounded-xl border-healiu-blue bg-white text-sm font-medium text-healiu-blue hover:bg-healiu-blue-light hover:text-healiu-blue"
          >
            Back
          </Button>
          <Button
            type="submit"
            className={cn(ctaPrimaryClassName, "h-12 flex-1 rounded-xl")}
            style={ctaPrimaryStyle}
          >
            Continue
          </Button>
        </div>

        <p className="text-sm">
          <Link href="/" className="font-medium text-healiu-blue hover:underline">
            Save & exit
          </Link>
        </p>
      </form>
    </section>
  );
}
