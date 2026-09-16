import Image from "next/image";
import {
  CalendarCheck,
  MapPin,
  Plus,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

const services: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Telemedicine",
    description:
      "Video consultations with licensed doctors, anytime, from home.",
    icon: Stethoscope,
  },
  {
    title: "Online Consulting",
    description: "Direct chat and guidance from partnered pharmacists.",
    icon: CalendarCheck,
  },
  {
    title: "Home Care",
    description:
      "Physiotherapy, caregiving, and nursing visits on subscription.",
    icon: Plus,
  },
  {
    title: "Location Services",
    description:
      "A live map showing the nearest hospitals and the exact services each one offers.",
    icon: MapPin,
  },
];

function DotPattern() {
  return (
    <div
      className="absolute bottom-6 left-1/2 z-0 grid -translate-x-1/2 grid-cols-6 gap-1.5"
      aria-hidden="true"
    >
      {Array.from({ length: 24 }, (_, i) => (
        <span
          key={i}
          className="size-1.5 rounded-full bg-healiu-blue/35"
        />
      ))}
    </div>
  );
}

export function KhorenServices() {
  return (
    <section className="overflow-x-hidden bg-healiu-neutral-light py-16 md:py-24">
      <div className="app-width">
        <h2
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
          data-aos="fade-up"
        >
          <span className="text-healiu-blue">Khoren&apos;s</span>{" "}
          <span className="text-healiu-dark-dark">Services</span>
        </h2>

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            data-aos="fade-right"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] bg-healiu-blue-light/80 px-6 pt-8 pb-10 sm:px-8 sm:pt-10">
              <span
                className="absolute right-10 top-12 size-20 rounded-full bg-healiu-blue/10"
                aria-hidden="true"
              />
              <DotPattern />

              <div className="relative z-10 mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden">
                <Image
                  src="/images/pngs/support.png"
                  alt="Licensed Khoren care provider"
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-healiu-blue-light/90 to-transparent" />
              </div>
            </div>

            <span className="absolute top-1/2 -left-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_rgba(11,105,201,0.15)] sm:-left-4 sm:size-14">
              <ShieldCheck className="size-6 text-healiu-blue sm:size-7" />
            </span>
          </div>

          <div className="flex flex-col gap-8" data-aos="fade-left">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-healiu-blue text-healiu-blue">
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-healiu-dark-dark">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-healiu-dark sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
