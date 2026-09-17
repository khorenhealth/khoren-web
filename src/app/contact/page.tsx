import { ContactSection } from "@/components/_core/landing-pages/contact/contact-section";
import { Footer } from "@/components/_core/landing-pages/shared/footer";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";

export default function ContactPage() {
  return (
    <>
      <main className="relative flex-1">
        <Navbar />
        <div className="-mt-20 sm:-mt-24">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
