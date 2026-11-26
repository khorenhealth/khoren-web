import { SiteHeader } from "@/components/_core/dashboard/layout/site-header";

export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[#F7F9FC]">
      <SiteHeader />
      <main>{children}</main>
    </div>
  );
}
