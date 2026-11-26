import Image from "next/image";
import Link from "next/link";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-dvh flex-col"
      style={{
        background: "linear-gradient(180deg, #F7F9FC 0%, #E8F1FB 100%)",
      }}
    >
      <header>
        <div className="app-width flex h-20 items-center justify-between sm:h-24">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/svgs/khoren-logo.svg"
              alt="Khoren"
              width={135}
              height={48}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </Link>
          <p className="text-sm text-healiu-dark">
            Need help?{" "}
            <Link href="/contact" className="font-medium text-healiu-blue hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-6">
        {children}
      </main>

      <footer className="flex items-center gap-6 px-4 py-6 text-sm text-[#0B69C9]">
        <Link href="#" className="hover:text-healiu-blue hover:underline">
          Privacy Policy
        </Link>
        <Link href="#" className="hover:text-healiu-blue hover:underline">
          Terms & Conditions
        </Link>
      </footer>
    </div>
  );
}
