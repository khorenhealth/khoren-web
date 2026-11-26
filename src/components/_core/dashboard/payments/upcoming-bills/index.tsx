import { BillRow, type UpcomingBill } from "./bill-row";

const bills: UpcomingBill[] = [
  {
    id: "wound-a",
    service: "Wound Dressing & IV Therapy",
    provider: "Nurse Chiamaka Obi",
    date: "Mar 17, 2025",
    invoice: "INV-2025-0148",
    amount: "₦15,000",
  },
  {
    id: "physio",
    service: "Physiotherapy Session",
    provider: "Dr. Amina Hassan",
    date: "Mar 19, 2025",
    invoice: "INV-2025-0150",
    amount: "₦15,000",
  },
  {
    id: "wound-b",
    service: "Wound Dressing & IV Therapy",
    provider: "Nurse Chiamaka Obi",
    date: "Mar 17, 2025",
    invoice: "INV-2025-0148",
    amount: "₦15,000",
  },
];

export function UpcomingBills() {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <ul className="flex flex-col gap-3">
        {bills.map((bill) => (
          <li key={bill.id}>
            <BillRow bill={bill} />
          </li>
        ))}
      </ul>
      <div className="mt-5 flex gap-2.5 px-1">
        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#E15B64]" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-healiu-dark-dark">HMO Integration Coming Soon</p>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-[#98A2B3]">
            We&apos;re partnering with major HMOs in Nigeria. Soon you&apos;ll be able to process claims directly from this
            dashboard. NHIS, Leadway Health, and AXA Mansard integration is in progress.
          </p>
        </div>
      </div>
    </section>
  );
}
