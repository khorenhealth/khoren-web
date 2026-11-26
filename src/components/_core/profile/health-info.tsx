"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

import { ctaPrimaryStyle } from "@/components/_core/landing-pages/shared/cta-button-styles";
import {
  ProfileFormActions,
  profileSectionClassName,
  type ProfilePresentation,
} from "./presentation";
import { cn } from "@/lib/utils";

const totalSteps = 8;
const currentStep = 3;

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"] as const;

const allergyStatuses = [
  { value: "known", label: "Known allergies" },
  { value: "none", label: "None known" },
  { value: "unknown", label: "Unknown" },
] as const;

type AllergyStatus = (typeof allergyStatuses)[number]["value"];

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

export function HealthInfo({
  onBack,
  onContinue,
  presentation = "setup",
}: {
  onBack?: () => void;
  onContinue?: () => void;
  presentation?: ProfilePresentation;
}) {
  const [condition, setCondition] = useState("Post-Appendectomy Recovery");
  const [bloodGroup, setBloodGroup] = useState("");
  const [allergyStatus, setAllergyStatus] = useState<AllergyStatus>("known");
  const [knownAllergies, setKnownAllergies] = useState("Penicillin");
  const [otherConditions, setOtherConditions] = useState("");

  return (
    <section className={profileSectionClassName(presentation)}>
      {presentation === "setup" ? (
      <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-healiu-blue sm:text-sm">
          Step {currentStep} of {totalSteps} · Medical information
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
        Tell us about your health
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-healiu-dark">
        Share what you know. You can choose Unknown rather than guess.{" "}
        <span className="text-healiu-dark-dark">*</span> Required.
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          onContinue?.();
        }}
      >
        <div className="flex gap-3 rounded-xl bg-healiu-blue-light px-4 py-3">
          <Info className="mt-0.5 size-4 shrink-0 text-healiu-blue" strokeWidth={2.25} />
          <div>
            <p className="text-sm font-semibold text-healiu-dark-dark">
              Self-reported information
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-healiu-dark">
              These details are provided by you, not clinically verified. A care provider
              reviews them when arranging your care.
            </p>
          </div>
        </div>

        <div className="relative">
          <FieldLabel htmlFor="primary-condition">
            Primary condition or reason for care *
          </FieldLabel>
          <input
            id="primary-condition"
            name="condition"
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
            required
            className={fieldClassName}
          />
        </div>

        <div>
          <div className="relative">
            <FieldLabel htmlFor="blood-group">Blood group *</FieldLabel>
            <select
              id="blood-group"
              name="bloodGroup"
              value={bloodGroup}
              onChange={(event) => setBloodGroup(event.target.value)}
              required
              className={cn(
                fieldClassName,
                "appearance-none pr-10",
                bloodGroup ? "text-healiu-dark-dark" : "text-healiu-dark-lighter",
              )}
            >
              <option value="" disabled>
                Select
              </option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-healiu-dark" />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-healiu-dark">
            Options: A+, A-, B+, B-, AB+, AB-, O+, O- or Unknown.
          </p>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-healiu-dark">Allergy status *</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {allergyStatuses.map((status) => {
              const selected = allergyStatus === status.value;

              return (
                <button
                  key={status.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAllergyStatus(status.value)}
                  className={cn(
                    "h-11 rounded-xl border text-sm font-medium transition-colors",
                    selected
                      ? "border-transparent text-white"
                      : "border-[#E6E8EC] bg-white text-healiu-dark-dark hover:border-healiu-blue hover:text-healiu-blue",
                  )}
                  style={selected ? ctaPrimaryStyle : undefined}
                >
                  {status.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {allergyStatus === "known" ? (
          <div>
            <div className="relative">
              <FieldLabel htmlFor="known-allergies">Known allergies *</FieldLabel>
              <input
                id="known-allergies"
                name="knownAllergies"
                value={knownAllergies}
                onChange={(event) => setKnownAllergies(event.target.value)}
                required
                className={fieldClassName}
              />
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-healiu-dark">
              You can list a few, such as Penicillin, Peanuts, and Pollen.
            </p>
          </div>
        ) : null}

        <div>
          <div className="relative">
            <FieldLabel htmlFor="other-conditions">
              Other relevant conditions (Optional)
            </FieldLabel>
            <input
              id="other-conditions"
              name="otherConditions"
              value={otherConditions}
              onChange={(event) => setOtherConditions(event.target.value)}
              placeholder="Enter other relevant conditions"
              className={fieldClassName}
            />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-healiu-dark">
            Any other conditions or health concerns you would like the care team to know.
          </p>
        </div>

        <ProfileFormActions presentation={presentation} onBack={onBack} />
      </form>
    </section>
  );
}
