import Image from "next/image";
import { ShieldCheck, Star } from "lucide-react";

import type { CareProvider } from "./providers-data";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.min(1, Math.max(0, rating - index));
        return (
          <span key={index} className="relative size-3">
            <Star className="size-3 text-[#E4E8EE]" fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-3 text-[#F5A524]" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function ProviderCard({
  provider,
  onBook,
}: {
  provider: CareProvider;
  onBook: () => void;
}) {
  return (
    <article className="flex flex-col rounded-[1.35rem] border border-[#EEF2F6] bg-white p-3 shadow-[0_10px_28px_rgba(16,40,68,0.05)]">
      <div
        className="relative aspect-[5/4] overflow-hidden rounded-2xl"
        style={{ backgroundColor: provider.photoBg }}
      >
        <Image
          src={provider.image}
          alt={provider.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain object-bottom"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#2FBF71] px-2 py-1 text-[11px] font-semibold text-white shadow-sm">
          <ShieldCheck className="size-3.5" strokeWidth={2.25} />
          Verified
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1.5 pt-3.5 pb-1">
        <h2 className="text-[15px] font-semibold text-healiu-dark-dark">{provider.name}</h2>
        <p className="mt-0.5 text-xs text-[#8B97A6]">{provider.role}</p>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-[#8B97A6]">
          <Stars rating={provider.rating} />
          <span className="font-semibold text-healiu-dark-dark">{provider.rating.toFixed(1)}</span>
          <span>({provider.reviews} reviews)</span>
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {provider.specialties.map((specialty) => (
            <li
              key={specialty}
              className="rounded-full bg-[#F2F4F7] px-2 py-0.5 text-[11px] font-medium text-[#5C6B7A]"
            >
              {specialty}
            </li>
          ))}
        </ul>

        {provider.totalVisits && provider.nextVisit ? (
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <dt className="text-[11px] text-[#8B97A6]">Total Visits</dt>
              <dd className="mt-0.5 text-sm font-semibold text-healiu-dark-dark">{provider.totalVisits}</dd>
            </div>
            <div>
              <dt className="text-[11px] text-[#8B97A6]">Next Visit</dt>
              <dd className="mt-0.5 text-sm font-semibold text-healiu-dark-dark">{provider.nextVisit}</dd>
            </div>
          </dl>
        ) : null}

        <button
          type="button"
          onClick={onBook}
          className="mt-4 flex h-10 items-center justify-center rounded-xl bg-healiu-blue text-sm font-semibold text-white transition-colors hover:bg-healiu-blue-hover"
        >
          {provider.action}
        </button>
      </div>
    </article>
  );
}
