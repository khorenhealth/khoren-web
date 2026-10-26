"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { AuthHeader } from "@/components/_core/auth/auth-header";
import { cn } from "@/lib/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const centered = pathname === "/auth/verify-email";

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(141.31deg, #F8F7F6 48.91%, #ADD1F2 97.36%)",
      }}
    >
      <AuthHeader />
      <main className="relative h-screen overflow-hidden pt-20 sm:pt-24">
        <div
          className={cn(
            "app-width-start relative z-10 flex h-full overflow-y-auto pr-6 lg:w-1/2 lg:pr-16",
            centered ? "items-center" : "items-end",
          )}
        >
          <div className="w-full max-w-260">{children}</div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 top-16 right-0 hidden w-1/2 lg:block">
          <Image
            src="/images/pngs/auth-bg.png"
            alt="Healthcare professional welcoming you to Khoren"
            fill
            priority
            className="object-contain object-bottom-right"
            sizes="50vw"
          />
        </div>
      </main>
    </div>
  );
}
