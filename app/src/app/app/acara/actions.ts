"use server";

import { getHouseholdContext } from "@/lib/context";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createHouseholdEvent(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "09:00");
  const remind = formData.get("remind") === "on";
  if (!title || !date) redirect("/app/acara?error=Isi%20judul%20%26%20tanggal");

  const { supabase, household, user } = await getHouseholdContext();
  if (!household || !user) redirect("/login");

  const startsAt = new Date(`${date}T${time}:00+07:00`).toISOString();
  await supabase.from("events").insert({
    household_id: household.id,
    member_id: null,
    title,
    starts_at: startsAt,
    is_household: true,
    remind_at: remind ? startsAt : null,
    created_by: user.id,
  });
  revalidatePath("/app/acara");
  revalidatePath("/app");
}
