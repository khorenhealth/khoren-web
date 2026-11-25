"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";

const totalSteps = 8;
const currentStep = 2;

const fieldClassName =
  "h-12 w-full rounded-xl border border-[#E6E8EC] bg-white px-4 text-sm text-healiu-dark-dark outline-none transition-colors placeholder:text-healiu-dark-lighter focus:border-healiu-blue";

const localGovernmentAreas: Record<string, readonly string[]> = {
  Abia: ["Aba North", "Aba South", "Ohafia", "Umuahia North", "Umuahia South"],
  Adamawa: ["Mubi North", "Mubi South", "Numan", "Yola North", "Yola South"],
  "Akwa Ibom": ["Eket", "Ikot Ekpene", "Oron", "Uyo"],
  Anambra: ["Awka South", "Idemili North", "Nnewi North", "Onitsha North", "Onitsha South"],
  Bauchi: ["Alkaleri", "Bauchi", "Dass", "Katagum", "Tafawa Balewa"],
  Bayelsa: ["Brass", "Nembe", "Ogbia", "Sagbama", "Yenagoa"],
  Benue: ["Gboko", "Katsina-Ala", "Makurdi", "Okpokwu", "Otukpo"],
  Borno: ["Biu", "Gwoza", "Jere", "Konduga", "Maiduguri"],
  "Cross River": ["Akamkpa", "Calabar Municipal", "Calabar South", "Ikom", "Ogoja"],
  Delta: ["Oshimili South", "Sapele", "Ughelli North", "Uvwie", "Warri South"],
  Ebonyi: ["Abakaliki", "Afikpo North", "Ebonyi", "Ohaukwu"],
  Edo: ["Egor", "Esan West", "Ikpoba Okha", "Oredo", "Ovia North-East"],
  Ekiti: ["Ado Ekiti", "Ikere", "Ikole", "Ijero", "Oye"],
  Enugu: ["Enugu East", "Enugu North", "Enugu South", "Nsukka", "Udi"],
  "Federal Capital Territory": ["Abaji", "Abuja Municipal", "Bwari", "Gwagwalada", "Kuje", "Kwali"],
  Gombe: ["Akko", "Billiri", "Funakaye", "Gombe", "Kaltungo"],
  Imo: ["Okigwe", "Orlu", "Owerri Municipal", "Owerri North", "Owerri West"],
  Jigawa: ["Birnin Kudu", "Dutse", "Gumel", "Hadejia", "Kazaure"],
  Kaduna: ["Chikun", "Igabi", "Kaduna North", "Kaduna South", "Zaria"],
  Kano: ["Dala", "Fagge", "Gwale", "Kano Municipal", "Nassarawa", "Tarauni"],
  Katsina: ["Daura", "Dutsin Ma", "Funtua", "Katsina", "Malumfashi"],
  Kebbi: ["Argungu", "Birnin Kebbi", "Jega", "Yauri", "Zuru"],
  Kogi: ["Ankpa", "Idah", "Kabba/Bunu", "Lokoja", "Okene"],
  Kwara: ["Ilorin East", "Ilorin South", "Ilorin West", "Offa", "Patigi"],
  Lagos: [
    "Agege",
    "Ajeromi-Ifelodun",
    "Alimosho",
    "Amuwo-Odofin",
    "Apapa",
    "Badagry",
    "Epe",
    "Eti-Osa",
    "Ibeju-Lekki",
    "Ifako-Ijaiye",
    "Ikeja",
    "Ikorodu",
    "Kosofe",
    "Lagos Island",
    "Lagos Mainland",
    "Mushin",
    "Ojo",
    "Oshodi-Isolo",
    "Somolu",
    "Surulere",
  ],
  Nasarawa: ["Akwanga", "Karu", "Keffi", "Lafia", "Nasarawa"],
  Niger: ["Bida", "Chanchaga", "Kontagora", "Lapai", "Suleja"],
  Ogun: ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Ijebu Ode", "Sagamu"],
  Ondo: ["Akure North", "Akure South", "Ilaje", "Ondo West", "Owo"],
  Osun: ["Ede South", "Ife Central", "Ilesa West", "Iwo", "Osogbo"],
  Oyo: ["Ibadan North", "Ibadan North-East", "Ibadan South-West", "Ogbomosho North", "Oyo West"],
  Plateau: ["Barkin Ladi", "Jos East", "Jos North", "Jos South", "Pankshin"],
  Rivers: ["Bonny", "Eleme", "Ikwerre", "Obio-Akpor", "Port Harcourt"],
  Sokoto: ["Gwadabawa", "Sokoto North", "Sokoto South", "Tambuwal", "Wamako"],
  Taraba: ["Bali", "Jalingo", "Sardauna", "Takum", "Wukari"],
  Yobe: ["Bade", "Damaturu", "Geidam", "Nguru", "Potiskum"],
  Zamfara: ["Anka", "Gusau", "Kaura Namoda", "Maru", "Talata Mafara"],
};

const states = Object.keys(localGovernmentAreas);

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

export function Location({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [street, setStreet] = useState("5 Admiralty Way, Lekki Phase 1, Lagos");
  const [stateName, setStateName] = useState("Lagos");
  const [localGovernment, setLocalGovernment] = useState("Eti-Osa");
  const [landmark, setLandmark] = useState("");
  const [accessNotes, setAccessNotes] = useState("");
  const areas = localGovernmentAreas[stateName] ?? [];

  function handleStateChange(nextState: string) {
    const nextAreas = localGovernmentAreas[nextState] ?? [];
    setStateName(nextState);
    setLocalGovernment((current) =>
      nextAreas.includes(current) ? current : (nextAreas[0] ?? ""),
    );
  }

  return (
    <section className="my-auto w-full max-w-xl rounded-[1.75rem] bg-white px-6 py-7 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:px-8">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-healiu-blue sm:text-sm">
          Step {currentStep} of {totalSteps} · Home visit address
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
        Where can we visit you?
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-healiu-dark">
        Add the address you would use for home visits. Fields marked * are required.
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          onContinue();
        }}
      >
        <div className="flex gap-3 rounded-xl bg-healiu-blue-light px-4 py-3">
          <Info className="mt-0.5 size-4 shrink-0 text-healiu-blue" strokeWidth={2.25} />
          <div>
            <p className="text-sm font-semibold text-healiu-dark-dark">
              Your home visit location
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-healiu-dark">
              This helps with planning if you book a visit. Adding an address does not
              create an appointment.
            </p>
          </div>
        </div>

        <div className="relative">
          <FieldLabel htmlFor="street-address">Street address *</FieldLabel>
          <input
            id="street-address"
            name="street"
            value={street}
            onChange={(event) => setStreet(event.target.value)}
            autoComplete="street-address"
            required
            className={fieldClassName}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <FieldLabel htmlFor="state">State *</FieldLabel>
            <select
              id="state"
              name="state"
              value={stateName}
              onChange={(event) => handleStateChange(event.target.value)}
              autoComplete="address-level1"
              required
              className={cn(fieldClassName, "appearance-none pr-10")}
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-healiu-dark" />
          </div>
          <div className="relative">
            <FieldLabel htmlFor="local-government">Local government area *</FieldLabel>
            <select
              id="local-government"
              name="localGovernment"
              value={localGovernment}
              onChange={(event) => setLocalGovernment(event.target.value)}
              required
              className={cn(fieldClassName, "appearance-none pr-10")}
            >
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-healiu-dark" />
          </div>
        </div>

        <div>
          <div className="relative">
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <input
              id="country"
              name="country"
              value="Nigeria"
              readOnly
              autoComplete="country-name"
              className={cn(fieldClassName, "text-healiu-dark")}
            />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-healiu-dark">
            Home visits are currently available in supported Nigerian locations.
          </p>
        </div>

        <div>
          <div className="relative">
            <FieldLabel htmlFor="landmark">Landmark (Optional)</FieldLabel>
            <input
              id="landmark"
              name="landmark"
              value={landmark}
              onChange={(event) => setLandmark(event.target.value)}
              placeholder="Enter landmark"
              className={fieldClassName}
            />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-healiu-dark">
            A nearby building, junction or place that helps us find you.
          </p>
        </div>

        <div>
          <div className="relative">
            <FieldLabel htmlFor="access-notes">
              Access & accessibility directions (Optional)
            </FieldLabel>
            <input
              id="access-notes"
              name="accessNotes"
              value={accessNotes}
              onChange={(event) => setAccessNotes(event.target.value)}
              placeholder="Enter access & accessibility directions"
              className={fieldClassName}
            />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-healiu-dark">
            For example, gate access, stairs, a lift or mobility support you may need.
          </p>
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
