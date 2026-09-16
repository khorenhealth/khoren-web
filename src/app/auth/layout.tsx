import { AuthHeader } from "@/components/_core/auth/auth-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(84.07% 84.07% at 67.84% 15.93%, #FFFFFF 0%, #E4EFFF 100%)",
      }}
    >
      <AuthHeader />
      {children}
    </div>
  );
}
