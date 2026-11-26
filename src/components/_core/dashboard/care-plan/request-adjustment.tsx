"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { AlertCircle, ChevronDown } from "lucide-react";

const adjustmentTypes = [
  "Medication change",
  "Visit schedule",
  "Treatment goal",
  "Plan duration",
  "Other",
];

export function RequestAdjustmentDialog({
  open,
  onOpenChange,
  onSubmitted,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
}) {
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) {
      setType("");
      setReason("");
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!type || !reason.trim()) return;
    onSubmitted();
    handleOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#102844]/40 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[26.5rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(16,40,68,0.22)] transition duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-6">
          <Dialog.Title className="text-lg font-semibold tracking-tight text-healiu-dark-dark">
            Request Care Plan Adjustment
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-healiu-dark">
            Edit personal data here
          </Dialog.Description>

          <form className="mt-5" onSubmit={submit}>
            <label className="block text-sm font-medium text-healiu-dark-dark" htmlFor="adjustment-type">
              Adjustment Type
            </label>
            <div className="relative mt-2">
              <select
                id="adjustment-type"
                required
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#E4EAF1] bg-white px-3 pr-9 text-sm text-healiu-dark-dark outline-none focus:border-healiu-blue"
              >
                <option value="" disabled>
                  Select
                </option>
                {adjustmentTypes.map((item) => (
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

            <label className="mt-4 block text-sm font-medium text-healiu-dark-dark" htmlFor="adjustment-reason">
              Reason / Details
            </label>
            <textarea
              id="adjustment-reason"
              required
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Describe the adjustment you're requesting and why..."
              className="mt-2 min-h-24 w-full resize-none rounded-lg border border-[#E4EAF1] bg-[#F8FAFC] px-3 py-2.5 text-sm text-healiu-dark-dark outline-none placeholder:text-[#9AA6B2] focus:border-healiu-blue"
            />

            <p className="mt-4 flex gap-2 rounded-lg border border-[#F3E2A8] bg-[#FFF8E8] px-3 py-2.5 text-xs leading-relaxed text-[#8A6A22]">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-[#E0A31A]" strokeWidth={2} />
              Your request will be reviewed by your clinical supervisor. Changes will only be applied after
              clinical approval.
            </p>

            <button
              type="submit"
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-healiu-blue text-sm font-semibold text-white transition-colors hover:bg-healiu-blue-hover"
            >
              Submit Request
            </button>
          </form>

          <Dialog.Close className="sr-only">Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
