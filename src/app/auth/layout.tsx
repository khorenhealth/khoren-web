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
        background: "linear-gradient(141.31deg, #F8F7F6 48.91%, #ADD1F2 97.36%)",
      }}
    >
      <AuthHeader />
      {children}
    </div>
  );
}
