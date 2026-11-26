import { CarePlanProgress } from "./care-plan-progress";
import { CareTeam } from "./care-team";
import { Greeting } from "./greeting";
import { QuickActions } from "./quick-actions";
import { RecentVisitReports } from "./recent-visit-reports";
import { SummaryStats } from "./summary-stats";
import { TodaysMedications } from "./todays-medications";
import { UpcomingVisits } from "./upcoming-visits";
import { WeeklyVitals } from "./weekly-vitals";

export function DashboardHome() {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-5 sm:px-6 lg:py-6 xl:grid xl:grid-cols-[minmax(0,1fr)_22.5rem] xl:items-start xl:gap-5">
      <div className="@container flex min-w-0 flex-col gap-4">
        <Greeting />
        <SummaryStats />
        <WeeklyVitals />
        <div className="grid gap-4 @4xl:grid-cols-2">
          <UpcomingVisits />
          <TodaysMedications />
        </div>
        <RecentVisitReports />
      </div>
      <aside className="flex min-w-0 flex-col gap-4">
        <CareTeam />
        <CarePlanProgress />
        <QuickActions />
      </aside>
    </div>
  );
}
