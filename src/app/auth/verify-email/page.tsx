import { VerifyEmailForm } from "@/components/_core/auth/verify-email-form";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return <VerifyEmailForm email={email || "example@gmail.com"} />;
}
