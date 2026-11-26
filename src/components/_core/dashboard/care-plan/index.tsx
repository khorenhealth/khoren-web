import { MedicationSchedule } from "./medication-schedule";
import { PlanMilestones } from "./plan-milestones";
import { PlanSummary } from "./plan-summary";
import { TreatmentGoals } from "./treatment-goals";
import { VisitSchedule } from "./visit-schedule";

export function CarePlanView() {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pt-4 pb-5 sm:px-6 lg:pb-6">
      <PlanSummary />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.9fr)]">
        <div className="flex min-w-0 flex-col gap-4">
          <MedicationSchedule />
          <VisitSchedule />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <TreatmentGoals />
          <PlanMilestones />
        </div>
      </div>
    </div>
  );
}
