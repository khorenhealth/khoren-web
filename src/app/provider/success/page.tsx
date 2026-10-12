import { BookingSuccess } from "@/components/_core/landing-pages/provider/booking-success";
import { Footer } from "@/components/_core/landing-pages/shared/footer";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";

type ProviderSuccessPageProps = {
  searchParams: Promise<{ reference?: string }>;
};

export default async function ProviderSuccessPage({
  searchParams,
}: ProviderSuccessPageProps) {
  const { reference } = await searchParams;

  return (
    <>
      <main className="relative flex-1">
        <Navbar />
        <div className="-mt-20 sm:-mt-24">
          <BookingSuccess redirectToForm={Boolean(reference)} />
        </div>
      </main>
      <Footer />
    </>
  );
}
