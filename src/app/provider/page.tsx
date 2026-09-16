import { ProvidersDirectory } from "@/components/_core/landing-pages/provider/providers-directory";
import { Footer } from "@/components/_core/landing-pages/shared/footer";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";

export default function ProviderPage() {
  return (
    <>
      <main className="relative flex-1">
        <Navbar />
        <div className="-mt-20 sm:-mt-24">
          <ProvidersDirectory />
        </div>
      </main>
      <Footer />
    </>
  );
}
