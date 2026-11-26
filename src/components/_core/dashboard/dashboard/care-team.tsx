import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";

const rating = 4.9;

export function CareTeam() {
  return (
    <section className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <h2 className="text-base font-semibold text-healiu-dark-dark">My Care Team</h2>

      <div className="relative mt-4 aspect-[5/4] overflow-hidden rounded-2xl bg-[#E7EEF4]">
        <Image
          src="/images/pngs/lady.png"
          alt="Dr. Amina Hassan"
          fill
          sizes="360px"
          className="object-cover object-[center_18%]"
        />
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-healiu-green-dark shadow-sm">
          <BadgeCheck className="size-3.5 text-healiu-green" />
          Verified
        </span>
      </div>

      <div className="mt-4 text-center">
        <p className="text-base font-semibold text-healiu-dark-dark">Dr. Amina Hassan</p>
        <p className="mt-0.5 text-sm text-healiu-dark">Lead Physician</p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-healiu-dark">
          <span className="flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }, (_, index) => {
              const fill = Math.min(1, Math.max(0, rating - index));
              return (
                <span key={index} className="relative size-3.5">
                  <Star className="size-3.5 text-[#E4E8EE]" fill="currentColor" strokeWidth={0} />
                  <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                    <Star className="size-3.5 text-amber-400" fill="currentColor" strokeWidth={0} />
                  </span>
                </span>
              );
            })}
          </span>
          <span className="font-semibold text-healiu-dark-dark">4.9</span>
          <span>(186 reviews)</span>
        </p>
      </div>

      <Link
        href="/dashboard/appointments"
        className="mt-4 flex h-11 items-center justify-center rounded-xl bg-[#102844] text-sm font-semibold text-white transition-colors hover:bg-[#183656]"
      >
        Book a Visit
      </Link>
    </section>
  );
}
