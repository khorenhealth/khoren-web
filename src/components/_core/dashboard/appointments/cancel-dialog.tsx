"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Info } from "lucide-react";

export function CancelDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#102844]/40 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-6 py-7 text-center shadow-[0_24px_60px_rgba(16,40,68,0.22)] transition duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#FDECEE] text-[#E23B4A]">
            <Info className="size-6" strokeWidth={2} />
          </span>
          <Dialog.Title className="mt-4 text-base font-semibold text-healiu-dark-dark">
            Cancel Appointment?
          </Dialog.Title>
          <Dialog.Description className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-healiu-dark">
            Cancellations made within 4 hours of the visit may incur a cancellation fee.
          </Dialog.Description>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#E7EEF5] px-5 text-sm font-semibold text-healiu-dark-dark transition-colors hover:bg-[#DCE6F0]"
            >
              Keep Appointment
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#A61D36] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#8E1830]"
            >
              Yes, Cancel
            </button>
          </div>
          <Dialog.Close className="sr-only">Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
