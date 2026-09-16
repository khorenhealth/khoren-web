import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "./cta-button-styles";

const services = [
  "Wound Care & Dressing",
  "Physiotherapy",
  "Post-Surgery Care",
  "Elderly Care",
  "Medication Management",
  "IV Therapy",
];

const socials = [
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.875 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
        <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.86c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.91h-2.2V22c4.78-.75 8.44-4.91 8.44-9.93z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
        <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6a2.5 2.5 0 0 1 2.48-2.5zM3 8.75h3.96V21H3zm6.75 0H13.5v1.67h.06c.45-.85 1.56-1.75 3.21-1.75 3.43 0 4.06 2.26 4.06 5.2V21h-3.96v-5.7c0-1.36-.03-3.11-1.9-3.11-1.9 0-2.19 1.48-2.19 3.01V21H9.75z" />
      </svg>
    ),
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms Of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[#F4F6FA]">
      <div className="app-width pt-14 pb-8 md:pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <Image
                src="/images/svgs/khoren-logo.svg"
                alt="Khoren"
                width={135}
                height={48}
                className="h-11 w-auto sm:h-12"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-healiu-dark">
              Nigeria&apos;s trusted platform for verified home-based clinical
              care. Safe, affordable, and structured healthcare at your
              doorstep.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full bg-healiu-blue text-white transition-opacity hover:opacity-90"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-healiu-blue">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-sm text-healiu-dark transition-colors hover:text-healiu-blue"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-sm md:col-span-2 lg:col-span-1">
            <p className="text-sm leading-relaxed text-healiu-dark">
              Telemedicine, online pharmacist consulting, home nursing and
              physiotherapy, and a live hospital locator, all in one
              subscription.
            </p>
            <form className="mt-5 space-y-3" action="#">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                className="h-11 w-full rounded-full border border-border bg-white px-5 text-sm text-healiu-dark-dark outline-none placeholder:text-healiu-dark-lighter focus:border-healiu-blue"
              />
              <Button
                type="submit"
                className={`${ctaPrimaryClassName} w-full lg:w-auto`}
                style={ctaPrimaryStyle}
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex justify-center sm:mt-14" aria-hidden="true">
          <Image
            src="/images/pngs/KHOREN.png"
            alt=""
            width={1219}
            height={165}
            className="h-auto w-full max-w-5xl object-contain opacity-50 mix-blend-multiply"
          />
        </div>

        <div className="mt-10 border-t border-healiu-blue/25 pt-6 sm:mt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-healiu-dark">
              © 2026 Khoren. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-healiu-dark transition-colors hover:text-healiu-blue"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
