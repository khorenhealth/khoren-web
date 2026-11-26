export type CareProvider = {
  id: string;
  name: string;
  role: string;
  image: string;
  photoBg: string;
  rating: number;
  reviews: number;
  specialties: string[];
  totalVisits?: string;
  nextVisit?: string;
  action: string;
};

export const careTeam: CareProvider[] = [
  {
    id: "aaron-coat",
    name: "Dr. Aaron Wanbisaka",
    role: "Registered Nurse (RN)",
    image: "/images/pngs/doctor-1.png",
    photoBg: "#D5E4F2",
    rating: 4.5,
    reviews: 63,
    specialties: ["Wound Care", "IV Therapy", "Post-Surgery"],
    totalVisits: "12 sessions",
    nextVisit: "Mon, Mar 17",
    action: "Book Again",
  },
  {
    id: "aaron-glasses",
    name: "Dr. Aaron Wanbisaka",
    role: "Registered Nurse (RN)",
    image: "/images/pngs/doctor-2.png",
    photoBg: "#D8DDE3",
    rating: 4.5,
    reviews: 63,
    specialties: ["Wound Care", "IV Therapy", "Post-Surgery"],
    totalVisits: "12 sessions",
    nextVisit: "Mon, Mar 17",
    action: "Book Again",
  },
  {
    id: "aaron-scrubs",
    name: "Dr. Aaron Wanbisaka",
    role: "Registered Nurse (RN)",
    image: "/images/pngs/providers/adeola-jacob.png",
    photoBg: "#E6EBF0",
    rating: 4.5,
    reviews: 63,
    specialties: ["Wound Care", "IV Therapy", "Post-Surgery"],
    totalVisits: "12 sessions",
    nextVisit: "Mon, Mar 17",
    action: "Book Again",
  },
];

export const browseProviders: CareProvider[] = [
  {
    id: "adeola-jacob",
    name: "RN. Adeola Jacob",
    role: "Registered Nurse (RN)",
    image: "/images/pngs/providers/adeola-jacob.png",
    photoBg: "#E6EBF0",
    rating: 4.8,
    reviews: 42,
    specialties: ["Wound Care", "Home Nursing"],
    action: "Book Visit",
  },
  {
    id: "victor-oshimagyeuye",
    name: "DR. Victor Oshimagyeuye",
    role: "Doctor",
    image: "/images/pngs/providers/victor-oshimagyeuye.png",
    photoBg: "#D5E4F2",
    rating: 4.9,
    reviews: 118,
    specialties: ["Post-Surgery", "Check-ups"],
    action: "Book Visit",
  },
  {
    id: "aishat-abdulraheem",
    name: "PT. Aishat Abdulraheem",
    role: "Physiotherapist",
    image: "/images/pngs/providers/aishat-abdulraheem.png",
    photoBg: "#E4E7EB",
    rating: 4.7,
    reviews: 76,
    specialties: ["Physiotherapy", "Post-Surgery"],
    action: "Book Visit",
  },
  {
    id: "micheal-okoh",
    name: "PT. Michael Okoh",
    role: "Physiotherapist",
    image: "/images/pngs/providers/micheal-okoh.png",
    photoBg: "#DCE3EA",
    rating: 4.6,
    reviews: 54,
    specialties: ["Physiotherapy", "Mobility"],
    action: "Book Visit",
  },
  {
    id: "jenifer-tanko",
    name: "RN. Jennifer Tanko",
    role: "Registered Nurse (RN)",
    image: "/images/pngs/providers/jenifer-tanko.png",
    photoBg: "#E7EEF4",
    rating: 4.8,
    reviews: 91,
    specialties: ["IV Therapy", "Wound Care"],
    action: "Book Visit",
  },
  {
    id: "faith-harris",
    name: "RM. Faith Harris",
    role: "Midwife",
    image: "/images/pngs/providers/faith-harris.png",
    photoBg: "#E8EEF3",
    rating: 4.9,
    reviews: 64,
    specialties: ["Maternal Care", "Home Nursing"],
    action: "Book Visit",
  },
];
