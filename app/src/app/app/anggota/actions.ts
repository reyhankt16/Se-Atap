"use server";

import { getHouseholdContext } from "@/lib/context";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const COLORS = ["#2563eb", "#16a34a", "#d97706", "#db2777", "#7c3aed", "#0891b2"];

export async function addMember(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const isAdult = formData.get("isAdult") === "on";
  const canRead = formData.get("canRead") === "on";
  if (!name) redirect("/app/anggota?error=Isi%20nama%20dulu");

  const { supabase, household, members } = await getHouseholdContext();
  if (!household) redirect("/login");

  const color = COLORS[members.length % COLORS.length];
  await supabase.from("members").insert({
    household_id: household.id,
    user_id: null,
    name,
    color,
    is_adult: isAdult,
    can_read: canRead,
  });
  revalidatePath("/app/anggota");
  revalidatePath("/app/tugas");
}
