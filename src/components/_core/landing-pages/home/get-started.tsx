import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "../shared/cta-button-styles";
import { cn } from "@/lib/utils";

export function GetStarted() {
  return (
    <section className="bg-white pb-16 md:pb-24">
      <div className="app-width" data-aos="fade-up">
        <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
          <Image
            src="/images/pngs/get-started-image.png"
            alt="Khoren healthcare providers ready to care for you"
            width={1170}
            height={442}
            className="h-[320px] w-full object-cover sm:h-[380px] lg:h-[420px]"
            sizes="(max-width: 1440px) 100vw, 1440px"
            priority={false}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/25" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl px-6 py-10 sm:px-10 lg:px-14">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Get the care you deserved
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
                At Khoren, we are dedicated to providing exceptional caregiving
                services tailored to your unique needs.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  className={ctaPrimaryClassName}
                  style={ctaPrimaryStyle}
                >
                  Buy a service
                </Button>
                <Button
                  className={cn(
                    "h-10 rounded-full border-0 bg-white px-6 text-sm font-medium text-healiu-dark-dark shadow-sm hover:bg-white/95",
                  )}
                >
                  Become a Provider
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
