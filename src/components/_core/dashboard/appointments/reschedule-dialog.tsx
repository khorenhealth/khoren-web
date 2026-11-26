"use client";

import { useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronDown } from "lucide-react";

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

export function RescheduleDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (next: { date: string; time: string }) => void;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("8:00 AM");
  const [reason, setReason] = useState("");
  const [dateError, setDateError] = useState(false);
  const pickerRef = useRef<HTMLInputElement>(null);

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) {
      setDate("");
      setTime("8:00 AM");
      setReason("");
      setDateError(false);
    }
  }

  function applyNativeDate(value: string) {
    if (!value) {
      setDate("");
      return;
    }
    const [year, month, day] = value.split("-");
    setDate(`${day}/${month}/${year}`);
    setDateError(false);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const iso = toIsoDate(date);
    if (!iso) {
      setDateError(true);
      return;
    }
    onConfirm({ date: iso, time });
    handleOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#102844]/40 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[26.5rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(16,40,68,0.22)] transition duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-6">
          <Dialog.Title className="text-lg font-semibold tracking-tight text-healiu-dark-dark">
            Reschedule Appointment
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-healiu-dark">Edit personal data here</Dialog.Description>

          <form className="mt-5" onSubmit={submit}>
            <label className="block text-sm font-medium text-healiu-dark-dark" htmlFor="reschedule-date">
              New Date
            </label>
            <div className="relative mt-2">
              <input
                id="reschedule-date"
                required
                inputMode="numeric"
                placeholder="dd/mm/yyyy"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                  setDateError(false);
                }}
                aria-invalid={dateError}
                className="h-11 w-full rounded-lg border border-[#E4EAF1] bg-white px-3 pr-10 text-sm text-healiu-dark-dark outline-none placeholder:text-[#9AA6B2] focus:border-healiu-blue aria-invalid:border-[#E15B64]"
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
                className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center text-[#8B97A6]"
              >
                <ChevronDown className="size-4" strokeWidth={2} />
              </button>
            </div>

            <label className="mt-4 block text-sm font-medium text-healiu-dark-dark" htmlFor="reschedule-time">
              New Time
            </label>
            <div className="relative mt-2">
              <select
                id="reschedule-time"
                required
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#E4EAF1] bg-white px-3 pr-9 text-sm text-healiu-dark-dark outline-none focus:border-healiu-blue"
              >
                {times.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#8B97A6]"
                strokeWidth={2}
              />
            </div>

            <label className="mt-4 block text-sm font-medium text-healiu-dark-dark" htmlFor="reschedule-reason">
              Reason For Rescheduling
            </label>
            <textarea
              id="reschedule-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Optional"
              className="mt-2 min-h-20 w-full resize-none rounded-lg border border-[#E4EAF1] bg-white px-3 py-2.5 text-sm text-healiu-dark-dark outline-none placeholder:text-[#9AA6B2] focus:border-healiu-blue"
            />

            <button
              type="submit"
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-healiu-blue text-sm font-semibold text-white transition-colors hover:bg-healiu-blue-hover"
            >
              Confirm Reschedule
            </button>
          </form>

          <Dialog.Close className="sr-only">Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
