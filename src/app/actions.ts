"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { JobStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Check if user is logged in via cookie
export async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("isLoggedIn")?.value === "true";
}

// Simple Login using .env credentials
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const adminEmail = process.env.ADMIN_EMAIL || "admin@jobtracker.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (email === adminEmail && password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("isLoggedIn", "true", { httpOnly: true, secure: true, path: "/" });
    return { success: true };
  }

  return { success: false, error: " ভুল ইমেইল অথবা পাসওয়ার্ড! " };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("isLoggedIn");
  redirect("/login");
}

// Job Actions (Get jobs is now public so anyone can view them)
export async function getJobs() {
  try {
    return await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return [];
  }
}

export async function createJob(data: {
  companyName: string;
  position: string;
  date?: string;
  resumeDrive?: string;
  jobNature?: string;
  jobType?: string;
  companyLocation?: string;
  jobLink?: string;
  howApplied?: string;
  comments?: string;
  salary?: string;
  location?: string;
  status?: JobStatus;
  notes?: string;
}) {
  const isAuth = await checkAuth();
  if (!isAuth) return { success: false, error: "Unauthorized" };

  try {
    await prisma.job.create({ data });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create job:", error);
    return { success: false, error: "Failed to create job" };
  }
}

export async function updateJobStatus(id: string, status: JobStatus) {
  const isAuth = await checkAuth();
  if (!isAuth) return { success: false, error: "Unauthorized" };

  try {
    await prisma.job.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteJob(id: string) {
  const isAuth = await checkAuth();
  if (!isAuth) return { success: false, error: "Unauthorized" };

  try {
    await prisma.job.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete job" };
  }
}