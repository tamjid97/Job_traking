"use client";

import { useState } from "react";
import { createJob } from "@/app/actions";
import { Plus, X } from "lucide-react";

export default function AddJobModal() {
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const data = {
      companyName: formData.get("companyName") as string,
      position: formData.get("position") as string,
      date: formData.get("date") as string,
      resumeDrive: formData.get("resumeDrive") as string,
      jobNature: formData.get("jobNature") as string,
      jobType: formData.get("jobType") as string,
      companyLocation: formData.get("companyLocation") as string,
      jobLink: formData.get("jobLink") as string,
      howApplied: formData.get("howApplied") as string,
      comments: formData.get("comments") as string,
    };
    await createJob(data as any);
    setIsOpen(false);
  }

  if (!isOpen) return (
    <button onClick={() => setIsOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition">
      <Plus className="w-4 h-4" /> Add Job
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold dark:text-white">Add New Job</h2>
          <button onClick={() => setIsOpen(false)}><X className="text-slate-400 hover:text-red-500" /></button>
        </div>
        <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form Fields */}
          <input name="companyName" placeholder="Company Name" required className="col-span-2 p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
          <input name="position" placeholder="Position" required className="p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
          <input name="date" type="date" className="p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
          <input name="jobNature" placeholder="Nature (e.g. Remote/Onsite)" className="p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
          <input name="jobType" placeholder="Type (e.g. Full-time)" className="p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
          <input name="companyLocation" placeholder="Location" className="p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
          <input name="jobLink" placeholder="Job Link" className="col-span-2 p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
          <input name="howApplied" placeholder="How Applied" className="p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
          <input name="resumeDrive" placeholder="Resume Link" className="p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
          <textarea name="comments" placeholder="Comments" className="col-span-2 p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700" rows={3} />
          
          <button className="col-span-2 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700">Save Job</button>
        </form>
      </div>
    </div>
  );
}