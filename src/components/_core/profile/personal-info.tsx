"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  ProfileFormActions,
  profileSectionClassName,
  type ProfilePresentation,
} from "./presentation";
import { cn } from "@/lib/utils";

const genders = [
  "Female",
  "Male",
  "Non-binary",
  "Self-describe",
  "Prefer not to say",
] as const;

const totalSteps = 8;
const maxPhotoBytes = 5 * 1024 * 1024;

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

function initials(firstName: string, lastName: string) {
  const letters = `${firstName.trim().charAt(0)}${lastName.trim().charAt(0)}`;
  return letters.toUpperCase() || "—";
}

export function PersonalInfo({
  onBack,
  onContinue,
  presentation = "setup",
}: {
  onBack?: () => void;
  onContinue?: () => void;
  presentation?: ProfilePresentation;
}) {
  const photoInputId = useId();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const photoUrlRef = useRef<string | null>(null);
  const [firstName, setFirstName] = useState("Adaeze");
  const [lastName, setLastName] = useState("Okonkwo");
  const [dateOfBirth, setDateOfBirth] = useState("14/08/1990");
  const [gender, setGender] = useState<(typeof genders)[number]>("Female");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  useEffect(() => {
    photoUrlRef.current = photoUrl;
  }, [photoUrl]);

  useEffect(() => {
    return () => {
      if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    };
  }, []);

  function setPhoto(next: string | null) {
    setPhotoUrl((current) => {
      if (current && current !== next) URL.revokeObjectURL(current);
      return next;
    });
  }

  function handlePhotoChange(file: File | undefined) {
    if (!file) return;

    const isAllowed = file.type === "image/jpeg" || file.type === "image/png";
    if (!isAllowed) {
      setPhotoError("Use a JPG or PNG image.");
      return;
    }

    if (file.size > maxPhotoBytes) {
      setPhotoError("Photo must be 5 MB or smaller.");
      return;
    }

    setPhotoError(null);
    setPhoto(URL.createObjectURL(file));
  }

  function removePhoto() {
    setPhoto(null);
    setPhotoError(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
  }

  return (
    <section className={profileSectionClassName(presentation)}>
      {presentation === "setup" ? (
      <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-healiu-blue sm:text-sm">
          Step 1 of {totalSteps} · Personal information
        </p>
        <p className="shrink-0 text-xs text-healiu-dark">0 of {totalSteps} steps done</p>
      </div>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full",
              index === 0 ? "bg-healiu-blue" : "bg-[#E4E7EC]",
            )}
          />
        ))}
      </div>
      </>
      ) : null}

      <h1 className={cn("text-2xl font-bold tracking-tight text-healiu-dark-dark sm:text-[1.75rem]", presentation === "setup" && "mt-5")}>
        Let&apos;s start with you
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-healiu-dark">
        Use your own details for your patient profile. Fields marked * are required.
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          onContinue?.();
        }}
      >
        <div className="flex items-center gap-3">
          <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-healiu-blue-light text-base font-semibold text-healiu-blue">
            {photoUrl ? (
              // Blob previews are created in the browser and are not a remote image source.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoUrl} alt="" className="size-full object-cover" />
            ) : (
              initials(firstName, lastName)
            )}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-healiu-dark-dark">
              Profile photo · Optional
            </p>
            <div className="mt-0.5 flex items-center gap-3">
              <label
                htmlFor={photoInputId}
                className="cursor-pointer text-sm font-medium text-healiu-blue hover:underline"
              >
                Upload photo
              </label>
              <button
                type="button"
                onClick={removePhoto}
                disabled={!photoUrl}
                className={cn(
                  "text-sm font-medium",
                  photoUrl
                    ? "text-healiu-dark hover:text-healiu-dark-dark"
                    : "cursor-not-allowed text-healiu-dark-lighter",
                )}
              >
                Remove photo
              </button>
            </div>
            <p className="mt-0.5 text-xs leading-relaxed text-healiu-dark">
              JPG or PNG · Up to 5 MB · Remove becomes available after upload
            </p>
            {photoError ? (
              <p className="mt-1 text-xs text-red-500">{photoError}</p>
            ) : null}
            <input
              ref={photoInputRef}
              id={photoInputId}
              name="photo"
              type="file"
              accept="image/jpeg,image/png"
              className="sr-only"
              onChange={(event) => handlePhotoChange(event.target.files?.[0])}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <FieldLabel htmlFor="first-name">First name *</FieldLabel>
            <input
              id="first-name"
              name="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              autoComplete="given-name"
              required
              className={fieldClassName}
            />
          </div>
          <div className="relative">
            <FieldLabel htmlFor="last-name">Last name *</FieldLabel>
            <input
              id="last-name"
              name="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              autoComplete="family-name"
              required
              className={fieldClassName}
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <FieldLabel htmlFor="account-email">Account email · Verified</FieldLabel>
            <input
              id="account-email"
              name="email"
              type="email"
              value="adaeze.okonkwo@email.com"
              readOnly
              className={cn(fieldClassName, "text-healiu-dark")}
            />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-healiu-dark">
            Verified during sign-up. This is your sign-in email. It is read-only here.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="relative">
              <FieldLabel htmlFor="date-of-birth">Date of birth *</FieldLabel>
              <input
                id="date-of-birth"
                name="dateOfBirth"
                inputMode="numeric"
                placeholder="DD/MM/YYYY"
                autoComplete="bday"
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(event.target.value)}
                pattern="\d{2}/\d{2}/\d{4}"
                required
                className={fieldClassName}
              />
            </div>
            <p className="mt-1.5 text-xs text-healiu-dark">DD/MM/YYYY</p>
          </div>
          <div>
            <div className="relative">
              <FieldLabel htmlFor="gender">Gender *</FieldLabel>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(event) =>
                  setGender(event.target.value as (typeof genders)[number])
                }
                required
                className={cn(fieldClassName, "appearance-none pr-10")}
              >
                {genders.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-healiu-dark" />
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-healiu-dark">
              Female, Male, Non-binary, Self-describe or Prefer not to say
            </p>
          </div>
        </div>

        <div>
          <div className="relative">
            <FieldLabel htmlFor="phone">Your phone number *</FieldLabel>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              className={fieldClassName}
            />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-healiu-dark">
            Nigeria (+234) · Enter 10 digits after +234; omit the leading 0.
          </p>
        </div>

        <ProfileFormActions presentation={presentation} onBack={onBack} />
      </form>
    </section>
  );
}
