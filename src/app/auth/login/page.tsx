import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6">
      <p className="text-healiu-dark">Sign in page coming next.</p>
      <Link href="/auth/sign-up" className="font-semibold text-healiu-blue">
        Go to Sign up
      </Link>
    </div>
  );
}
