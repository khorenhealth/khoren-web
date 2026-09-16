import Image from "next/image";

import { SignupForm } from "@/components/_core/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="app-width grid h-screen items-center gap-10 pt-20 sm:pt-24 lg:grid-cols-2 lg:gap-12">
      <div className="w-full">
        <SignupForm />
      </div>

      <div className="relative hidden h-full min-h-0 w-full lg:block">
        <Image
          src="/images/pngs/auth-bg.png"
          alt="Healthcare professional welcoming you to Khoren"
          fill
          priority
          className="object-contain object-bottom"
          sizes="(max-width: 1024px) 0vw, 50vw"
        />
      </div>
    </main>
  );
}
