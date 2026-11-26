export type Appointment = {
  id: string;
  title: string;
  provider: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  when: "upcoming" | "past";
  outcome?: "completed" | "missed";
  rating?: number | null;
};

export const appointments: Appointment[] = [
  {
    id: "wound-iv-17",
    title: "Wound Dressing & IV Therapy",
    provider: "Nurse Chiamaka Obi",
    date: "2025-03-17",
    time: "10:00 AM",
    duration: "60 min",
    location: "5 Admiralty Way, Lekki",
    when: "upcoming",
  },
  {
    id: "physio-19",
    title: "Physiotherapy Session",
    provider: "Dr. Amina Hassan",
    date: "2025-03-19",
    time: "2:00 PM",
    duration: "45 min",
    location: "5 Admiralty Way, Lekki",
    when: "upcoming",
  },
  {
    id: "iv-20-am",
    title: "IV Therapy",
    provider: "Nurse Chiamaka Obi",
    date: "2025-03-20",
    time: "9:00 AM",
    duration: "30 min",
    location: "5 Admiralty Way, Lekki",
    when: "upcoming",
  },
  {
    id: "iv-20-late",
    title: "IV Therapy",
    provider: "Nurse Chiamaka Obi",
    date: "2025-03-20",
    time: "10:00 AM",
    duration: "30 min",
    location: "5 Admiralty Way, Lekki",
    when: "upcoming",
  },
  {
    id: "wound-21",
    title: "Wound Dressing & Vitals",
    provider: "Nurse Chiamaka Obi",
    date: "2025-03-21",
    time: "10:00 AM",
    duration: "45 min",
    location: "5 Admiralty Way, Lekki",
    when: "upcoming",
  },
  {
    id: "past-wound-iv-a",
    title: "Wound Dressing & IV Therapy",
    provider: "Nurse Chiamaka Obi",
    date: "2025-03-14",
    time: "10:00 AM",
    duration: "45 min",
    location: "5 Admiralty Way, Lekki",
    when: "past",
    outcome: "completed",
    rating: 4,
  },
  {
    id: "past-physio",
    title: "Physiotherapy Session",
    provider: "Dr. Amina Hassan",
    date: "2025-03-12",
    time: "2:00 PM",
    duration: "45 min",
    location: "5 Admiralty Way, Lekki",
    when: "past",
    outcome: "completed",
    rating: null,
  },
  {
    id: "past-iv-vitals",
    title: "IV Therapy & Vitals",
    provider: "Nurse Chiamaka Obi",
    date: "2025-03-14",
    time: "10:00 AM",
    duration: "45 min",
    location: "5 Admiralty Way, Lekki",
    when: "past",
    outcome: "completed",
    rating: 4,
  },
  {
    id: "past-wound-missed",
    title: "Wound Dressing",
    provider: "Nurse Chiamaka Obi",
    date: "2025-03-07",
    time: "10:00 AM",
    duration: "45 min",
    location: "5 Admiralty Way, Lekki",
    when: "past",
    outcome: "missed",
  },
  {
    id: "past-wound-iv-b",
    title: "Wound Dressing & IV Therapy",
    provider: "Nurse Chiamaka Obi",
    date: "2025-03-14",
    time: "10:00 AM",
    duration: "45 min",
    location: "5 Admiralty Way, Lekki",
    when: "past",
    outcome: "completed",
    rating: 4,
  },
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatVisitDate(value: string) {
  const date = parseDate(value);
  return `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

export function mondayOf(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  const day = next.getDay();
  const delta = day === 0 ? -6 : 1 - day;
  next.setDate(next.getDate() + delta);
  return next;
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function formatMonthYear(date: Date) {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

export const weekStartsOn = mondayOf(parseDate("2025-03-17"));
