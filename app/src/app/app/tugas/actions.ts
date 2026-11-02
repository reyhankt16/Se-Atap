"use server";

import { getHouseholdContext } from "@/lib/context";
import { todayWIB } from "@/lib/date";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const recur = String(formData.get("recur") ?? "") || null;
  const memberId = String(formData.get("memberId") ?? "") || null;
  const icon = String(formData.get("icon") ?? "") || null;
  if (!title) redirect("/app/tugas?error=Isi%20judul%20tugas");

  const { supabase, household, user } = await getHouseholdContext();
  if (!household || !user) redirect("/login");

  await supabase.from("tasks").insert({
    household_id: household.id,
    member_id: memberId,
    title,
    icon,
    recur,
    due_date: recur ? todayWIB() : null,
    created_by: user.id,
  });
  revalidatePath("/app/tugas");
  revalidatePath("/app");
}

export async function claimTask(formData: FormData) {
  const taskId = String(formData.get("taskId"));
  const { supabase, me } = await getHouseholdContext();
  if (!me) redirect("/login");
  await supabase.from("tasks").update({ member_id: me.id }).eq("id", taskId);
  revalidatePath("/app/tugas");
}

export async function completeTask(formData: FormData) {
  const taskId = String(formData.get("taskId"));
  const memberId = String(formData.get("memberId"));
  const { supabase } = await getHouseholdContext();
  await supabase
    .from("task_logs")
    .insert({ task_id: taskId, member_id: memberId, done_on: todayWIB() })
    .select(); // unique(task_id, member_id, done_on) cegah dobel di hari yang sama
  revalidatePath("/app/tugas");
  revalidatePath("/app");
}

export async function deleteTask(formData: FormData) {
  const id = String(formData.get("id"));
  const { supabase } = await getHouseholdContext();
  await supabase.from("tasks").delete().eq("id", id);
  revalidatePath("/app/tugas");
}
