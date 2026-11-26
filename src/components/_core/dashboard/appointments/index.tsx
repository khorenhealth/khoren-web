"use client";

import { useState } from "react";

import { AppointmentList } from "./appointment-list";
import { appointments as initialAppointments, weekStartsOn, type Appointment } from "./appointments-data";
import { CancelDialog } from "./cancel-dialog";
import { RateDialog } from "./rate-dialog";
import { RescheduleDialog } from "./reschedule-dialog";
import { VisitCalendar } from "./visit-calendar";

export function AppointmentsView() {
  const [visits, setVisits] = useState<Appointment[]>(initialAppointments);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [rateId, setRateId] = useState<string | null>(null);
  const [weekStart, setWeekStart] = useState(weekStartsOn);

  const visible = visits.filter((visit) => visit.when === tab);
  const upcomingCount = visits.filter((visit) => visit.when === "upcoming").length;
  const pastCount = visits.filter((visit) => visit.when === "past").length;
  const rateVisit = visits.find((visit) => visit.id === rateId) ?? null;

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pt-4 pb-5 sm:px-6 lg:pb-6">
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <AppointmentList
          visits={visible}
          tab={tab}
          upcomingCount={upcomingCount}
          pastCount={pastCount}
          onTabChange={setTab}
          onReschedule={setRescheduleId}
          onCancel={setCancelId}
          onRate={setRateId}
        />
        <VisitCalendar weekStart={weekStart} visits={visits} onWeekChange={setWeekStart} />
      </div>
      <RescheduleDialog
        open={rescheduleId !== null}
        onOpenChange={(open) => {
          if (!open) setRescheduleId(null);
        }}
        onConfirm={({ date, time }) => {
          setVisits((current) =>
            current.map((visit) => (visit.id === rescheduleId ? { ...visit, date, time } : visit)),
          );
        }}
      />
      <CancelDialog
        open={cancelId !== null}
        onOpenChange={(open) => {
          if (!open) setCancelId(null);
        }}
        onConfirm={() => {
          setVisits((current) => current.filter((visit) => visit.id !== cancelId));
        }}
      />
      <RateDialog
        open={rateId !== null}
        visit={rateVisit}
        onOpenChange={(open) => {
          if (!open) setRateId(null);
        }}
        onConfirm={(rating) => {
          setVisits((current) => current.map((visit) => (visit.id === rateId ? { ...visit, rating } : visit)));
        }}
      />
    </div>
  );
}
