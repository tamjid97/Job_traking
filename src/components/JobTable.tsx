"use client";

import { JobStatus } from "@prisma/client";
import { updateJobStatus, deleteJob } from "@/app/actions";
import { Trash2, ExternalLink, FileText } from "lucide-react";

export default function JobTable({ jobs }: { jobs: any[] }) {
  async function handleStatusChange(id: string, newStatus: string) {
    await updateJobStatus(id, newStatus as JobStatus);
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
    }
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm">
        <p className="text-slate-500 dark:text-slate-400">No applications yet. Add your first job application!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-slate-900 dark:bg-slate-950 text-slate-200 uppercase text-xs tracking-wider border-b border-slate-800">
          <tr>
            <th className="px-4 py-3.5">Date</th>
            <th className="px-4 py-3.5">Company</th>
            <th className="px-4 py-3.5">Position</th>
            <th className="px-4 py-3.5">Nature</th>
            <th className="px-4 py-3.5">Type</th>
            <th className="px-4 py-3.5">Location</th>
            <th className="px-4 py-3.5">How Applied</th>
            <th className="px-4 py-3.5">Links</th>
            <th className="px-4 py-3.5">Status</th>
            <th className="px-4 py-3.5">Comments</th>
            <th className="px-4 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
              <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">{job.date || "N/A"}</td>
              <td className="px-4 py-3.5 font-semibold text-slate-900 dark:text-white whitespace-nowrap">{job.companyName}</td>
              <td className="px-4 py-3.5 whitespace-nowrap">{job.position}</td>
              <td className="px-4 py-3.5 whitespace-nowrap text-xs">
                <span className="px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium">
                  {job.jobNature || "N/A"}
                </span>
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap text-xs">{job.jobType || "N/A"}</td>
              <td className="px-4 py-3.5 whitespace-nowrap text-xs">{job.companyLocation || "N/A"}</td>
              <td className="px-4 py-3.5 whitespace-nowrap text-xs font-medium text-slate-600 dark:text-slate-300">{job.howApplied || "N/A"}</td>
              <td className="px-4 py-3.5 whitespace-nowrap flex items-center gap-2 pt-4">
                {job.jobLink && (
                  <a href={job.jobLink} target="_blank" rel="noreferrer" title="Job Link" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {job.resumeDrive && (
                  <a href={job.resumeDrive} target="_blank" rel="noreferrer" title="Resume/Drive" className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400">
                    <FileText className="w-4 h-4" />
                  </a>
                )}
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap">
                <select
                  value={job.status}
                  onChange={(e) => handleStatusChange(job.id, e.target.value)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer transition ${
                    job.status === "APPLIED" ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800" :
                    job.status === "INTERVIEWING" ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800" :
                    job.status === "OFFERED" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800" :
                    job.status === "REJECTED" ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800" :
                    "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                  }`}
                >
                  <option value="APPLIED">Applied</option>
                  <option value="INTERVIEWING">Interviewing</option>
                  <option value="OFFERED">Offered</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </td>
              <td className="px-4 py-3.5 text-xs max-w-xs truncate text-slate-500 dark:text-slate-400" title={job.comments}>
                {job.comments || "-"}
              </td>
              <td className="px-4 py-3.5 text-right whitespace-nowrap">
                <button
                  onClick={() => handleDelete(job.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                  title="Delete Job"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}