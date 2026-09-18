"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FileText, Mail, Phone, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";

const contactDetails = [
  {
    title: "Phone",
    value: "+234  07071475982",
    href: "tel:+234  07071475982",
    icon: Phone,
    iconClassName: "bg-[#E7F0FA] text-healiu-blue",
  },
  {
    title: "Our Email",
    value: "admin@trykhoren.com",
    href: "mailto:admin@trykhoren.com",
    icon: Mail,
    iconClassName: "bg-[#F3E8FF] text-[#7C3AED]",
  },
  {
    title: "Documentation",
    value: "admin@trykhoren.com/docs",
    href: "mailto:admin@trykhoren.com",
    icon: FileText,
    iconClassName: "bg-[#E7F0FA] text-healiu-blue",
  },
];

function BackgroundBlobs() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -left-24 top-40  size-104 rounded-full bg-[#D6E8FF]/80 blur-3xl" />
      <div className="absolute -right-20 top-24 size-112 rounded-full bg-[#D8F5E8]/70 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 size-88 -translate-x-1/2 rounded-full bg-[#EAF7F0]/60 blur-3xl" />
    </div>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  as = "input",
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  as?: "input" | "textarea";
  autoComplete?: string;
}) {
  const sharedClassName = cn(
    "w-full rounded-xl border border-border bg-white px-4 text-sm text-healiu-dark-dark outline-none transition-colors placeholder:text-healiu-dark-lighter",
    "focus:border-healiu-blue",
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-healiu-dark-dark"
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          rows={5}
          className={cn(sharedClassName, "resize-none py-3")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(sharedClassName, "h-12")}
        />
      )}
    </div>
  );
}

function ContactDetailCard({
  title,
  value,
  href,
  icon: Icon,
  iconClassName,
}: {
  title: string;
  value: string;
  href: string;
  icon: LucideIcon;
  iconClassName: string;
}) {
  return (
    <a
      href={href}
      className="flex flex-col items-start gap-3 rounded-2xl border border-[#EEF2F7] bg-[#F8FAFC] p-4 transition-colors hover:border-healiu-blue/20 hover:bg-white"
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          iconClassName,
        )}
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-healiu-dark-dark">
          {title}
        </span>
        <span className="mt-0.5 block truncate text-sm text-healiu-dark">
          {value}
        </span>
      </span>
    </a>
  );
}

export function ContactSection() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 40,
    });
  }, []);

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
      <BackgroundBlobs />

      <div className="app-width relative z-10">
        <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
          <h1 className="text-3xl font-bold tracking-tight text-healiu-dark-dark sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Contact our friendly team
          </h1>
          <p className="mt-3 text-base text-healiu-dark sm:text-lg">
            Let us know how we can help.
          </p>
        </div>

        <div
          className="mt-10 rounded-[1.75rem] border border-[#EEF2F7] bg-white p-6 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:mt-12 sm:p-8 lg:p-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-healiu-dark-dark">
                Contact Us
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-healiu-dark sm:text-base">
                We&apos;ll show you self-help options first. Additional help is
                available if you need it, including live chat with our
                specialist.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {contactDetails.map((detail) => (
                  <ContactDetailCard key={detail.title} {...detail} />
                ))}
              </div>
            </div>

            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Field
                id="full-name"
                label="Full Name"
                placeholder="Full Name"
                autoComplete="name"
              />
              <Field
                id="email"
                label="Email address"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
              />
              <Field
                id="inquiry"
                label="About your inquiry"
                placeholder="Enter your message"
                as="textarea"
              />
              <Button
                type="submit"
                className={cn(ctaPrimaryClassName, "h-12 w-full rounded-xl")}
                style={ctaPrimaryStyle}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
