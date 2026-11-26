"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

import {
  ProfileFormActions,
  profileSectionClassName,
  type ProfilePresentation,
} from "./presentation";
import { cn } from "@/lib/utils";

const totalSteps = 8;
const currentStep = 5;

const relationships = ["Spouse", "Parent", "Sibling", "Friend", "Carer", "Other"] as const;

const fieldClassName =
  "h-12 w-full rounded-xl border border-[#E6E8EC] bg-white px-4 text-sm text-healiu-dark-dark outline-none transition-colors placeholder:text-healiu-dark-lighter focus:border-healiu-blue";

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="absolute -top-2.5 left-3 z-10 bg-white px-1.5 text-xs font-medium text-healiu-dark"
    >
      {children}
    </label>
  );
}

function NigeriaFlag() {
  return (
    <svg viewBox="0 0 18 12" className="h-3 w-4 shrink-0 rounded-[2px]" aria-hidden="true">
      <rect width="6" height="12" fill="#008751" />
      <rect x="6" width="6" height="12" fill="#ffffff" />
      <rect x="12" width="6" height="12" fill="#008751" />
    </svg>
  );
}

function isContactPhone(value: string) {
  return /^[1-9]\d{9}$/.test(value);
}

export function ContactInfo({
  onBack,
  onContinue,
  presentation = "setup",
}: {
  onBack?: () => void;
  onContinue?: () => void;
  presentation?: ProfilePresentation;
}) {
  const [fullName, setFullName] = useState("Mr. Chidi Okonkwo");
  const [relationship, setRelationship] = useState<(typeof relationships)[number]>("Spouse");
  const [phone, setPhone] = useState("");
  const [permission, setPermission] = useState(true);
  const phoneIsValid = isContactPhone(phone);
  const canContinue = fullName.trim().length > 0 && phoneIsValid && permission;

  return (
    <section className={profileSectionClassName(presentation)}>
      {presentation === "setup" ? (
      <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-healiu-blue sm:text-sm">
          Step {currentStep} of {totalSteps} · Emergency contact
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
      </>
      ) : null}

      <h1 className={cn("text-2xl font-bold tracking-tight text-healiu-dark-dark sm:text-[1.75rem]", presentation === "setup" && "mt-5")}>
        Who can we contact?
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-healiu-dark">
        Choose someone other than yourself who we may contact in an emergency.{" "}
        <span className="text-healiu-dark-dark">*</span> Required.
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (!canContinue) return;
          onContinue?.();
        }}
      >
        <div className="flex gap-3 rounded-xl bg-healiu-blue-light px-4 py-3">
          <Info className="mt-0.5 size-4 shrink-0 text-healiu-blue" strokeWidth={2.25} />
          <div>
            <p className="text-sm font-semibold text-healiu-dark-dark">
              This is your contact&apos;s information
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-healiu-dark">
              Your patient phone is{" "}
              <span className="font-semibold text-healiu-dark-dark">+234 801 234 5678</span>.
              Enter a separate number belonging to your emergency contact below; we have not
              copied your number.
            </p>
          </div>
        </div>

        <div className="relative">
          <FieldLabel htmlFor="contact-name">Contact full name *</FieldLabel>
          <input
            id="contact-name"
            name="contactName"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            autoComplete="name"
            required
            className={fieldClassName}
          />
        </div>

        <div>
          <div className="relative">
            <FieldLabel htmlFor="relationship">Relationship to you *</FieldLabel>
            <select
              id="relationship"
              name="relationship"
              value={relationship}
              onChange={(event) =>
                setRelationship(event.target.value as (typeof relationships)[number])
              }
              required
              className={cn(fieldClassName, "appearance-none pr-10")}
            >
              {relationships.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-healiu-dark" />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-healiu-dark">
            Spouse, Parent, Sibling, Friend, Carer or Other
          </p>
        </div>

        <div>
          <div className="relative">
            <FieldLabel htmlFor="contact-phone">Contact phone number *</FieldLabel>
            <div className="flex h-12 items-center rounded-xl border border-[#E6E8EC] bg-white focus-within:border-healiu-blue">
              <div className="relative flex h-full shrink-0 items-center gap-1.5 border-r border-[#E6E8EC] pr-2 pl-3">
                <NigeriaFlag />
                <select
                  aria-label="Country code"
                  defaultValue="+234"
                  className="appearance-none bg-transparent pr-4 text-sm text-healiu-dark-dark outline-none"
                >
                  <option value="+234">+234</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-1.5 size-3.5 -translate-y-1/2 text-healiu-dark" />
              </div>
              <input
                id="contact-phone"
                name="contactPhone"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="Enter contact phone number"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                }
                pattern="[1-9][0-9]{9}"
                required
                className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-healiu-dark-dark outline-none placeholder:text-healiu-dark-lighter"
              />
            </div>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-healiu-dark">
            Nigeria (+234) · Enter your contact&apos;s own 10-digit number after +234
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-healiu-dark">
            We use this contact only when needed for your safety or urgent care coordination.
            They do not receive access to your full health records.
          </p>
          <label className="flex items-start gap-2.5 text-sm leading-relaxed text-healiu-dark-dark">
            <input
              type="checkbox"
              checked={permission}
              onChange={(event) => setPermission(event.target.checked)}
              required
              className="mt-0.5 size-4 shrink-0 rounded border-border accent-healiu-blue"
            />
            <span>
              I have permission to share this person&apos;s details and for Khoren to contact
              them in an emergency. *
            </span>
          </label>
          {phoneIsValid ? null : (
            <p className="text-xs leading-relaxed text-healiu-dark">
              Enter a valid contact phone number to continue. You can save this incomplete
              step and return later.
            </p>
          )}
        </div>

        <ProfileFormActions
          presentation={presentation}
          onBack={onBack}
          submitDisabled={!canContinue}
        />
      </form>
    </section>
  );
}
