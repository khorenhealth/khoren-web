"use client";

import { useRef } from "react";
import { Dialog } from "@base-ui/react/dialog";

export type InvoicePayment = {
  invoice: string;
  date: string;
  service: string;
  provider: string;
  method: string;
  amount: string;
};

const fields = [
  { key: "invoice", label: "Invoice ID" },
  { key: "date", label: "Date" },
  { key: "service", label: "Service" },
  { key: "provider", label: "Provider" },
  { key: "method", label: "Method" },
] as const;

function downloadInvoice(payment: InvoicePayment) {
  const lines = fields.map((field) => `${field.label}: ${payment[field.key]}`);
  const url = URL.createObjectURL(new Blob([["Invoice", ...lines].join("\n")], { type: "text/plain" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${payment.invoice}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

export function InvoiceDialog({
  open,
  payment,
  onOpenChange,
}: {
  open: boolean;
  payment: InvoicePayment | null;
  onOpenChange: (open: boolean) => void;
}) {
  const paymentRef = useRef(payment);
  if (payment) paymentRef.current = payment;
  const shown = payment ?? paymentRef.current;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#102844]/40 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-6 py-5 shadow-[0_24px_60px_rgba(16,40,68,0.22)] transition duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <Dialog.Title className="text-lg font-semibold tracking-tight text-healiu-dark-dark">Invoice</Dialog.Title>
          <Dialog.Description className="sr-only">
            {shown ? `${shown.invoice} for ${shown.service}` : "Invoice details"}
          </Dialog.Description>

          {shown ? (
            <>
              <dl className="mt-5 flex flex-col gap-3.5 text-sm">
                {fields.map((field) => (
                  <div key={field.key} className="flex items-start justify-between gap-6">
                    <dt className="text-[#98A2B3]">{field.label}</dt>
                    <dd className="text-right text-healiu-dark-dark">{shown[field.key]}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={() => downloadInvoice(shown)}
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-healiu-blue text-sm font-semibold text-white transition-colors hover:bg-healiu-blue-hover"
              >
                Download PDF Invoice
              </button>
            </>
          ) : null}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
