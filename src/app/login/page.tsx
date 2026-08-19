"use client";

import { useState } from "react";
import { loginUser } from "../actions";
import { useRouter } from "next/navigation";
import { Briefcase, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await loginUser(formData);

    if (res.success) {
      router.push("/");
      router.refresh();
    } else {
      setError(res.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-emerald-600 p-3 rounded-xl text-white mb-2 shadow-lg shadow-emerald-600/20">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">Private JobTracker</h1>
          <p className="text-slate-400 text-sm">Restricted Access - Owner Only</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm mb-1 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                name="email"
                type="email"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                placeholder="Enter your private email"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm mb-1 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                name="password"
                type="password"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl transition shadow-lg shadow-emerald-600/20"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}