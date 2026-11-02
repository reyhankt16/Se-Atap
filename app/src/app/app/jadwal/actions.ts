"use server";

import { createClient } from "@/lib/supabase/server";
import { getHouseholdContext } from "@/lib/context";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEvent(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "00:00");
  const memberId = String(formData.get("memberId") ?? "");
  if (!title || !date || !memberId) redirect("/app/jadwal?error=Isi%20semua%20dulu");

  const { supabase, household, user } = await getHouseholdContext();
  if (!household || !user) redirect("/login");

  const startsAt = new Date(`${date}T${time}:00+07:00`).toISOString();
  await supabase.from("events").insert({
    household_id: household.id,
    member_id: memberId,
    title,
    starts_at: startsAt,
    is_household: false,
    created_by: user.id,
  });
  revalidatePath("/app/jadwal");
  revalidatePath("/app");
}

export async function deleteEvent(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = await createClient();
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/app/jadwal");
  revalidatePath("/app");
}
