import { Faq } from "@/components/_core/landing-pages/home/faq";
import { FeaturedServiceBoard } from "@/components/_core/landing-pages/home/featured-service-board";
import { GetStarted } from "@/components/_core/landing-pages/home/get-started";
import { Hero } from "@/components/_core/landing-pages/home/hero";
import { HowDoesItWorks } from "@/components/_core/landing-pages/home/how-does-it-works";
import { KeyFeatures } from "@/components/_core/landing-pages/home/key-features";
import { OpinionsOfOurUsers } from "@/components/_core/landing-pages/home/opinions-of-our-users";
import { Providers } from "@/components/_core/landing-pages/home/providers";
import { Stats } from "@/components/_core/landing-pages/home/stats";
import { Footer } from "@/components/_core/landing-pages/shared/footer";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";

export default function Home() {
  return (
    <>
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
        <Providers />
        <FeaturedServiceBoard />
        <OpinionsOfOurUsers />
        <Faq />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
