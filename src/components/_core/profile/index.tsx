"use client";

import { useState } from "react";

import { ContactInfo } from "./contact-info";
import { HealthInfo } from "./health-info";
import { Location } from "./location";
import { MedicalInfo } from "./medical-info";
import { Notification } from "./notification";
import { PersonalInfo } from "./personal-info";
import { PrivacyAndConsent } from "./privacy-and-consent";
import { Review } from "./review";
import { Welcome } from "./welcome";

type ProfileStep =
  | "welcome"
  | "personal-info"
  | "location"
  | "health-info"
  | "medical-info"
  | "contact-info"
  | "notification"
  | "privacy"
  | "review";

export function Profile() {
  const [step, setStep] = useState<ProfileStep>("welcome");

  if (step === "review") {
    return (
      <Review
        onBack={() => setStep("privacy")}
        onEdit={(target) => setStep(target)}
      />
    );
  }

  if (step === "privacy") {
    return (
      <PrivacyAndConsent
        onBack={() => setStep("notification")}
        onContinue={() => setStep("review")}
      />
    );
  }

  if (step === "notification") {
    return (
      <Notification
        onBack={() => setStep("contact-info")}
        onContinue={() => setStep("privacy")}
      />
    );
  }

  if (step === "contact-info") {
    return (
      <ContactInfo
        onBack={() => setStep("medical-info")}
        onContinue={() => setStep("notification")}
      />
    );
  }

  if (step === "medical-info") {
    return (
      <MedicalInfo
        onBack={() => setStep("health-info")}
        onContinue={() => setStep("contact-info")}
      />
    );
  }

  if (step === "health-info") {
    return (
      <HealthInfo
        onBack={() => setStep("location")}
        onContinue={() => setStep("medical-info")}
      />
    );
  }

  if (step === "location") {
    return (
      <Location
        onBack={() => setStep("personal-info")}
        onContinue={() => setStep("health-info")}
      />
    );
  }

  if (step === "personal-info") {
    return (
      <PersonalInfo
        onBack={() => setStep("welcome")}
        onContinue={() => setStep("location")}
      />
    );
  }

  return <Welcome onStart={() => setStep("personal-info")} />;
}

export {
  ContactInfo,
  HealthInfo,
  Location,
  MedicalInfo,
  Notification,
  PersonalInfo,
  PrivacyAndConsent,
  Review,
  Welcome,
};
