import Link from "next/link";
import { Calendar } from "lucide-react";

const reports = [
  {
    title: "Wound Dressing",
    author: "RN Chiamaka Okafor",
    summary:
      "Wound cleaned and dressing changed. No signs of infection. Healing is progressing as expected.",
    date: "Mar 14, 2026",
  },
  {
    title: "Physiotherapy",
    author: "PT Emeka Nwosu",
    summary:
      "Range of motion is improving. Mobility exercises were reviewed and the session was well tolerated.",
    date: "Mar 12, 2026",
  },
  {
    title: "Vitals Check",
    author: "RN Chiamaka Okafor",
    summary:
      "Blood pressure slightly elevated at 148/92. Rest and follow-up monitoring were advised.",
    date: "Mar 10, 2026",
  },
];

export function RecentVisitReports() {
  return (
    <section className="rounded-2xl border border-[#E7EEF6] bg-white p-4 shadow-[0_8px_24px_rgba(29,36,45,0.04)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-healiu-dark-dark">Recent Visit Reports</h2>
        <Link
          href="/dashboard/health-record"
          className="text-sm font-medium text-healiu-blue hover:text-healiu-blue-hover"
        >
          All reports
        </Link>
      </div>

      <div className="mt-4 grid gap-3 @xl:grid-cols-2 @4xl:grid-cols-3">
        {reports.map((report) => (
          <article key={report.title} className="rounded-xl bg-[#F7F9FC] p-4">
            <h3 className="text-sm font-semibold text-healiu-dark-dark">{report.title}</h3>
            <p className="mt-0.5 text-xs text-healiu-dark">{report.author}</p>
            <p className="mt-3 text-sm leading-relaxed text-healiu-dark">{report.summary}</p>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-healiu-dark">
              <Calendar className="size-3.5" />
              {report.date}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
