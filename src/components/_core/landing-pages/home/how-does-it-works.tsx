import Image from "next/image";

export function HowDoesItWorks() {
  return (
    <section className="overflow-hidden bg-healiu-neutral-light py-16 md:py-24">
      <div className="app-width">
        <h2
          className="text-center text-3xl font-bold tracking-tight text-healiu-dark-dark sm:text-4xl"
          data-aos="fade-up"
        >
          How does <span className="text-healiu-blue">Khoren</span> works
        </h2>

        <div className="relative mt-10 lg:mt-14">
          <div
            className="pointer-events-none absolute left-1/2 top-0 w-[min(100%,960px)] -translate-x-1/2 select-none"
            aria-hidden="true"
          >
            <Image
              src="/images/pngs/KHOREN.png"
              alt=""
              width={1219}
              height={165}
              className="h-auto w-full opacity-45 mix-blend-multiply"
            />
          </div>

          <div
            className="relative mx-auto w-full max-w-5xl pt-8 sm:pt-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <Image
              src="/images/pngs/how-does-khoren-works.png"
              alt="How Khoren works: Subscribe, Request or Consult, Get Matched, and Care Delivered"
              width={1265}
              height={724}
              className="h-auto w-full object-contain"
              sizes="(max-width: 1280px) 100vw, 1024px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
