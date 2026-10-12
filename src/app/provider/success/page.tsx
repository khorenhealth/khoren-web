import { redirect } from "next/navigation";

import { BookingSuccess } from "@/components/_core/landing-pages/provider/booking-success";
import { Footer } from "@/components/_core/landing-pages/shared/footer";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";

const PROVIDER_FORM_URL =
  process.env.NEXT_PUBLIC_PROVIDER_FORM_URL ??
  "https://docs.google.com/forms/d/1BGmDs1_yPNawJTfAL6YfZuaRo4Kgjkehv8vGXUnikrM/viewform";

type ProviderSuccessPageProps = {
  searchParams: Promise<{ reference?: string }>;
};

export default async function ProviderSuccessPage({
  searchParams,
}: ProviderSuccessPageProps) {
  const { reference } = await searchParams;

  if (reference) {
    redirect(PROVIDER_FORM_URL);
  }

  return (
    <>
      <main className="relative flex-1">
        <Navbar />
        <div className="-mt-20 sm:-mt-24">
          <BookingSuccess />
        </div>
      </main>
      <Footer />
    </>
  );
}
