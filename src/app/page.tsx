import { Hero } from "@/components/_core/landing-pages/home/hero";
import { HowDoesItWorks } from "@/components/_core/landing-pages/home/how-does-it-works";
import { KeyFeatures } from "@/components/_core/landing-pages/home/key-features";
import { Stats } from "@/components/_core/landing-pages/home/stats";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";

export default function Home() {
  return (
    <main className="relative flex-1">
      <Navbar />
      <div className="-mt-20 sm:-mt-24">
        <Hero />
      </div>
      <div className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:-mt-12 sm:px-6 lg:px-8">
        <Stats />
      </div>
      <KeyFeatures />
      <HowDoesItWorks />
    </main>
  );
}
