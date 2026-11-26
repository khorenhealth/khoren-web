"use client";

import { useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const services = ["Wound Care", "IV Therapy", "Post-Surgery", "Physiotherapy", "Home Nursing", "Vitals Check"];

const times = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const fieldClassName =
  "h-12 w-full rounded-xl border border-[#E6E8EC] bg-white px-4 text-sm text-healiu-dark-dark outline-none transition-colors placeholder:text-healiu-dark-lighter focus:border-healiu-blue aria-invalid:border-[#E15B64]";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="absolute -top-2.5 left-3 z-10 bg-white px-1.5 text-xs font-medium text-healiu-dark"
    >
      {children}
    </label>
  );
}

function toIsoDate(value: string) {
  const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function BookVisitDialog({
  open,
  providerName,
  onOpenChange,
}: {
  open: boolean;
  providerName: string;
  onOpenChange: (open: boolean) => void;
}) {
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("8:00 AM");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [invalid, setInvalid] = useState({ service: false, date: false, address: false });
  const pickerRef = useRef<HTMLInputElement>(null);
  const providerRef = useRef(providerName);
  if (providerName) providerRef.current = providerName;

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) {
      setService("");
      setDate("");
      setTime("8:00 AM");
      setAddress("");
      setNotes("");
      setInvalid({ service: false, date: false, address: false });
    }
  }

  function applyNativeDate(value: string) {
    if (!value) {
      setDate("");
      return;
    }
    const [year, month, day] = value.split("-");
    setDate(`${day}/${month}/${year}`);
    setInvalid((current) => ({ ...current, date: false }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextInvalid = {
      service: service.length === 0,
      date: toIsoDate(date) === null,
      address: address.trim().length === 0,
    };
    setInvalid(nextInvalid);
    if (nextInvalid.service || nextInvalid.date || nextInvalid.address) return;
    handleOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#102844]/40 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[28rem] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(16,40,68,0.22)] transition duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-6">
          <Dialog.Title className="text-lg font-semibold tracking-tight text-healiu-dark-dark">
            Book a Visit
          </Dialog.Title>
          <Dialog.Description className="mt-0.5 text-sm text-[#8B97A6]">
            with {providerName || providerRef.current}
          </Dialog.Description>

          <form className="mt-6 space-y-5" onSubmit={submit}>
            <div className="relative">
              <FieldLabel htmlFor="visit-service">Service Type</FieldLabel>
              <select
                id="visit-service"
                value={service}
                onChange={(event) => {
                  setService(event.target.value);
                  setInvalid((current) => ({ ...current, service: false }));
                }}
                aria-invalid={invalid.service}
                className={cn(
                  fieldClassName,
                  "appearance-none pr-10",
                  service ? "text-healiu-dark-dark" : "text-healiu-dark-lighter",
                )}
              >
                <option value="" disabled>
                  Select
                </option>
                {services.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-healiu-dark" />
            </div>

            <div className="relative">
              <FieldLabel htmlFor="visit-date">Date</FieldLabel>
              <input
                id="visit-date"
                inputMode="numeric"
                placeholder="dd/mm/yyyy"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                  setInvalid((current) => ({ ...current, date: false }));
                }}
                aria-invalid={invalid.date}
                className={cn(fieldClassName, "pr-10")}
              />
              <input
                ref={pickerRef}
                type="date"
                tabIndex={-1}
                aria-hidden
                className="sr-only"
                onChange={(event) => applyNativeDate(event.target.value)}
              />
              <button
                type="button"
                aria-label="Choose date"
                onClick={() => {
                  const picker = pickerRef.current;
                  if (picker && typeof picker.showPicker === "function") picker.showPicker();
                }}
                className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center text-healiu-dark"
              >
                <ChevronDown className="size-4" strokeWidth={2} />
              </button>
            </div>

            <div className="relative">
              <FieldLabel htmlFor="visit-time">Time</FieldLabel>
              <select
                id="visit-time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className={cn(fieldClassName, "appearance-none pr-10")}
              >
                {times.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-healiu-dark" />
            </div>

            <div className="relative">
              <FieldLabel htmlFor="visit-address">Home Address</FieldLabel>
              <input
                id="visit-address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                  setInvalid((current) => ({ ...current, address: false }));
                }}
                placeholder="Enter your full address..."
                autoComplete="street-address"
                aria-invalid={invalid.address}
                className={fieldClassName}
              />
            </div>

            <div className="relative">
              <FieldLabel htmlFor="visit-notes">Additional Notes</FieldLabel>
              <textarea
                id="visit-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Any special care instructions..."
                className="min-h-24 w-full resize-none rounded-xl border border-[#E6E8EC] bg-white px-4 py-3 text-sm text-healiu-dark-dark outline-none transition-colors placeholder:text-healiu-dark-lighter focus:border-healiu-blue"
              />
            </div>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-full bg-healiu-blue text-sm font-semibold text-white transition-colors hover:bg-healiu-blue-hover"
            >
              Confirm Booking
            </button>

            <p className="flex items-center justify-between text-sm text-[#8B97A6]">
              <span>Estimated Cost</span>
              <span className="font-semibold text-healiu-dark-dark">₦7,500/visit</span>
            </p>
          </form>

          <Dialog.Close className="sr-only">Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
