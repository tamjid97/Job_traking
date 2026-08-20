"use client";

import { useState } from "react";
import { JobStatus } from "@prisma/client";
import { updateJobStatus, deleteJob } from "@/app/actions";
import { Trash2, ExternalLink, FileText, MessageSquare, X } from "lucide-react";

export default function JobTable({ jobs, isAuth }: { jobs: any[]; isAuth: boolean }) {
  const [selectedComment, setSelectedComment] = useState<string | null>(null);

  async function handleStatusChange(id: string, newStatus: string) {
    if (!isAuth) return;
    await updateJobStatus(id, newStatus as JobStatus);
  }

  async function handleDelete(id: string) {
    if (!isAuth) return;
    if (confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
    }
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-lg">
        <p className="text-slate-500 dark:text-slate-400 text-base font-medium">No applications found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="bg-slate-900 dark:bg-slate-950 text-slate-100 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-2 py-3 w-[9%]">Date</th>
              <th className="px-2 py-3 w-[12%]">Company</th>
              <th className="px-2 py-3 w-[14%]">Position</th>
              <th className="px-2 py-3 w-[8%]">Nature</th>
              <th className="px-2 py-3 w-[8%]">Type</th>
              <th className="px-2 py-3 w-[9%]">Location</th>
              <th className="px-2 py-3 w-[10%]">Applied</th>
              <th className="px-2 py-3 w-[7%]">Links</th>
              <th className="px-2 py-3 w-[11%]">Status</th>
              <th className="px-2 py-3 w-[10%]">Notes</th>
              {isAuth && <th className="px-2 py-3 w-[6%] text-right">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-800 dark:text-slate-200 text-xs">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50/90 dark:hover:bg-slate-800/60 transition-colors">
                <td className="px-2 py-3 truncate text-[11px] text-slate-500 dark:text-slate-400 font-medium">{job.date || "N/A"}</td>
                <td className="px-2 py-3 font-bold text-slate-900 dark:text-white truncate text-xs" title={job.companyName}>{job.companyName}</td>
                <td className="px-2 py-3 truncate font-medium text-xs" title={job.position}>{job.position}</td>
                <td className="px-2 py-3 truncate">
                  <span className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 font-semibold text-[10px] truncate block text-center">
                    {job.jobNature || "N/A"}
                  </span>
                </td>
                <td className="px-2 py-3 truncate text-[11px] font-medium">{job.jobType || "N/A"}</td>
                <td className="px-2 py-3 truncate text-[11px] font-medium" title={job.companyLocation}>{job.companyLocation || "N/A"}</td>
                <td className="px-2 py-3 truncate text-[11px] font-semibold text-slate-600 dark:text-slate-300" title={job.howApplied}>{job.howApplied || "N/A"}</td>
                <td className="px-2 py-3 truncate flex items-center gap-1.5 pt-3">
                  {job.jobLink && (
                    <a href={job.jobLink} target="_blank" rel="noreferrer" title="Job Link" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {job.resumeDrive && (
                    <a href={job.resumeDrive} target="_blank" rel="noreferrer" title="Resume/Drive" className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400">
                      <FileText className="w-3.5 h-3.5" />
                    </a>
                  )}
                </td>
                <td className="px-2 py-3 truncate">
                  <select
                    value={job.status}
                    disabled={!isAuth}
                    onChange={(e) => handleStatusChange(job.id, e.target.value)}
                    className={`text-[11px] font-bold px-1.5 py-1 rounded border focus:outline-none shadow-sm w-full ${
                      !isAuth ? "opacity-90 cursor-not-allowed bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700" : "cursor-pointer"
                    } ${
                      job.status === "APPLIED" ? "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700" :
                      job.status === "INTERVIEWING" ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700" :
                      job.status === "OFFERED" ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700" :
                      job.status === "REJECTED" ? "bg-red-50 text-red-700 border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-700" :
                      "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                    }`}
                  >
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEWING">Interviewing</option>
                    <option value="OFFERED">Offered</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </td>
                <td className="px-2 py-3 truncate">
                  {job.comments ? (
                    <button
                      onClick={() => setSelectedComment(job.comments)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition w-full justify-center truncate"
                    >
                      <MessageSquare className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span className="truncate">View</span>
                    </button>
                  ) : (
                    <span className="text-slate-400 text-[11px]">None</span>
                  )}
                </td>
                {isAuth && (
                  <td className="px-2 py-3 text-right truncate">
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 transition-all inline-flex justify-center"
                      title="Delete Job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comment Modal */}
      {selectedComment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-500" />
                Job Comments & Notes
              </h3>
              <button
                onClick={() => setSelectedComment(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-700 dark:text-slate-300 text-base whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed">
              {selectedComment}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedComment(null)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}