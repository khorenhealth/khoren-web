import { SiteHeader } from "@/components/_core/dashboard/layout/site-header";

export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#F7F9FC]">
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
