import { AboutHero } from "@/components/_core/landing-pages/about-us/hero";
import { KhorenServices } from "@/components/_core/landing-pages/about-us/khoren-services";
import { Faq } from "@/components/_core/landing-pages/home/faq";
import { FeaturedServiceBoard } from "@/components/_core/landing-pages/home/featured-service-board";
import { GetStarted } from "@/components/_core/landing-pages/home/get-started";
import { HowDoesItWorks } from "@/components/_core/landing-pages/home/how-does-it-works";
import { OpinionsOfOurUsers } from "@/components/_core/landing-pages/home/opinions-of-our-users";
import { Footer } from "@/components/_core/landing-pages/shared/footer";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";

export default function AboutUsPage() {
  return (
    <>
      <main className="relative flex-1">
        <Navbar />
        <div className="-mt-20 sm:-mt-24">
          <AboutHero />
        </div>
        <KhorenServices />
        <HowDoesItWorks />
        <FeaturedServiceBoard />
        <OpinionsOfOurUsers />
        <Faq />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
