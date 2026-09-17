"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  ctaEqualWidth,
  ctaOutlineClassName,
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "./cta-button-styles";

const navLinks = [
  { label: "About Us", href: "/about-us", hasDropdown: false },
  { label: "Our Services", href: "/#services", hasDropdown: false },
  { label: "Find a Care Provider", href: "/provider", hasDropdown: false },
  { label: "Contact", href: "/contact", hasDropdown: false },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 shadow-sm transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-[#0B69C9]/10 bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="app-width mx-auto flex h-20 items-center justify-between gap-6 sm:h-24">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/svgs/khoren-logo.svg"
            alt="Khoren"
            width={135}
            height={48}
            className="h-11 w-auto sm:h-14"
            priority
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-start gap-7 pl-8 lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href !== "/#services" && pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-healiu-blue",
                  isActive ? "text-healiu-blue" : "text-healiu-dark-dark",
                )}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="size-3.5 opacity-60" strokeWidth={2} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link href="/auth/login">
            <Button
              variant="outline"
              className={cn(ctaOutlineClassName, ctaEqualWidth)}
            >
              Sign In
            </Button>
          </Link>
          <Button
            className={cn(ctaPrimaryClassName, ctaEqualWidth)}
            style={ctaPrimaryStyle}
          >
            Buy a service
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 shrink-0 rounded-full border-primary text-primary"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[min(100%,20rem)] flex-col gap-0 p-0"
            >
              <SheetHeader className="border-b border-border px-4 py-5 text-left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Image
                  src="/images/svgs/khoren-logo.svg"
                  alt="Khoren"
                  width={135}
                  height={48}
                  className="h-10 w-auto"
                />
              </SheetHeader>

              <nav className="flex flex-1 flex-col gap-1 px-2 py-4">
                {navLinks.map((link) => {
                  const isActive =
                    link.href !== "/#services" && pathname === link.href;

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-healiu-blue-light hover:text-healiu-blue",
                        isActive
                          ? "bg-healiu-blue-light text-healiu-blue"
                          : "text-healiu-dark-dark",
                      )}
                    >
                      {link.label}
                      {link.hasDropdown && (
                        <ChevronDown
                          className="size-3.5 opacity-60"
                          strokeWidth={2}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-3 border-t border-border p-4">
                <Button
                  variant="outline"
                  className={cn(ctaOutlineClassName, "w-full")}
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Button>
                <Button
                  className={cn(ctaPrimaryClassName, "w-full")}
                  style={ctaPrimaryStyle}
                  onClick={() => setOpen(false)}
                >
                  Buy a service
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
