import { FaqSection } from "@/components/_core/landing-pages/faq/faq-section";
import { Footer } from "@/components/_core/landing-pages/shared/footer";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";

export default function FaqPage() {
  return (
    <>
      <main className="relative flex-1">
        <Navbar />
        <div className="-mt-20 sm:-mt-24">
          <FaqSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
