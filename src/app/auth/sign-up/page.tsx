import Image from "next/image";

import { SignupForm } from "@/components/_core/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="relative h-screen overflow-hidden pt-20 sm:pt-24">
      <div className="relative z-10 flex h-full w-full items-end px-6 lg:w-1/2 lg:px-10">
        <div className="w-full max-w-2xl">
          <SignupForm />
        </div>
      </div>

      <div className="absolute inset-y-0 top-20 right-0 hidden w-1/2 pt-20 sm:pt-24 lg:block">
        <Image
          src="/images/pngs/auth-bg.png"
          alt="Healthcare professional welcoming you to Khoren"
          fill
          priority
          className="object-contain object-right-bottom"
          sizes="50vw"
        />
      </div>
    </main>
  );
}
