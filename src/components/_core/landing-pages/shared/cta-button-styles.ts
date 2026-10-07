import { cn } from "@/lib/utils";

/** Shared Calendly booking link for consultation / Book CTAs */
export const BOOKING_URL = "https://calendly.com/joytitus652/30min";

/** Shared sizing for paired CTAs (e.g. Sign In + Buy a service) */
export const ctaEqualWidth = "w-[150px] max-w-[150px] justify-center";

export const ctaButtonBase =
  "h-10 rounded-full px-6 text-sm font-medium shadow-sm";

export const ctaPrimaryClassName = cn(
  ctaButtonBase,
  "border-transparent text-white hover:opacity-95",
);

export const ctaPrimaryStyle = {
  background: "linear-gradient(180deg, #0B69C9 0%, #084F97 100%)",
} as const;

export const ctaOutlineClassName = cn(
  ctaButtonBase,
  "border-primary bg-white/80 text-primary hover:bg-healiu-blue-light hover:text-primary",
);
