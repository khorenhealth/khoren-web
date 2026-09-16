import { Globe, Handshake, Smile, Users } from "lucide-react";

const stats = [
  {
    icon: Smile,
    value: "150+",
    label: "Patients",
    iconBg: "bg-[#E8DEFF]",
    iconColor: "text-[#7C5CBF]",
  },
  {
    icon: Users,
    value: "15+",
    label: "Monthly visitor",
    iconBg: "bg-[#FFE4DC]",
    iconColor: "text-[#E07A5F]",
  },
  {
    icon: Globe,
    value: "3",
    label: "States",
    iconBg: "bg-healiu-blue-light",
    iconColor: "text-healiu-blue",
  },
  {
    icon: Handshake,
    value: "10",
    label: "Partners",
    iconBg: "bg-[#FFF3D6]",
    iconColor: "text-[#D4A017]",
  },
];

export function Stats() {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl bg-white px-6 py-12 shadow-[0_8px_40px_rgba(11,105,201,0.08)] sm:px-10 sm:py-14">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4">
            <div
              className={`flex size-12 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
            >
              <stat.icon className={`size-5 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-healiu-dark-dark">
                {stat.value}
              </p>
              <p className="text-sm text-healiu-dark">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
