import { Briefcase, CheckCircle, Clock, FileText, XCircle } from "lucide-react";
import { JobStatus } from "@prisma/client";

interface StatsHeaderProps {
  jobs: { status: JobStatus }[];
}

export default function StatsHeader({ jobs }: StatsHeaderProps) {
  const total = jobs.length;
  const applied = jobs.filter((j) => j.status === "APPLIED").length;
  const interviewing = jobs.filter((j) => j.status === "INTERVIEWING").length;
  const offered = jobs.filter((j) => j.status === "OFFERED").length;
  const rejected = jobs.filter((j) => j.status === "REJECTED").length;

  const stats = [
    {
      label: "Total Applications",
      value: total,
      icon: Briefcase,
      color: "bg-blue-500/10 text-blue-600",
      border: "border-blue-200",
    },
    {
      label: "Applied",
      value: applied,
      icon: FileText,
      color: "bg-gray-500/10 text-gray-600",
      border: "border-gray-200",
    },
    {
      label: "Interviewing",
      value: interviewing,
      icon: Clock,
      color: "bg-yellow-500/10 text-yellow-600",
      border: "border-yellow-200",
    },
    {
      label: "Offered",
      value: offered,
      icon: CheckCircle,
      color: "bg-green-500/10 text-green-600",
      border: "border-green-200",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "bg-red-500/10 text-red-600",
      border: "border-red-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`p-4 rounded-xl border bg-white shadow-sm flex items-center justify-between transition-all hover:shadow-md ${stat.border}`}
        >
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
          <div className={`p-3 rounded-full ${stat.color}`}>
            <stat.icon className="w-5 h-5" />
          </div>
        </div>
      ))}
    </div>
  );
}
