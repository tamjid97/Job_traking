import { getJobs, checkAuth, logoutUser } from "./actions";
import { redirect } from "next/navigation";
import StatsHeader from "@/components/StatsHeader";
import AddJobModal from "@/components/AddJobModal";
import JobTable from "@/components/JobTable";
import ThemeToggle from "@/components/ThemeToggle";
import { Briefcase, LogOut } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const isAuth = await checkAuth();
  if (!isAuth) {
    redirect("/login");
  }

  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header section with Theme Toggle & Logout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <Briefcase className="w-6 h-6" />
              <h1 className="text-2xl font-bold tracking-tight">
                JobTracker Pro
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Your secure, private job application management dashboard.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AddJobModal />
            <form action={logoutUser}>
              <button
                type="submit"
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl text-sm font-medium transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Stats */}
        <StatsHeader jobs={jobs} />

        {/* Main Content Area */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Applications</h2>
          </div>
          
          <JobTable jobs={jobs} />
        </div>
        
      </div>
    </div>
  );
}