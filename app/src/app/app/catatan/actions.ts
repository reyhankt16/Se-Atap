"use server";

import { getHouseholdContext } from "@/lib/context";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNote(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim() || null;
  const photo = formData.get("photo") as File | null;
  if (!title) redirect("/app/catatan?error=Isi%20judul%20dulu");

  const { supabase, household, user } = await getHouseholdContext();
  if (!household || !user) redirect("/login");

  let photoPath: string | null = null;
  if (photo && photo.size > 0) {
    const path = `${household.id}/${Date.now()}-${photo.name}`;
    const { error: uploadErr } = await supabase.storage.from("notes").upload(path, photo);
    if (!uploadErr) photoPath = path;
  }

  await supabase.from("notes").insert({
    household_id: household.id,
    title,
    body,
    photo_path: photoPath,
    created_by: user.id,
  });
  revalidatePath("/app/catatan");
}

export async function deleteNote(formData: FormData) {
  const id = String(formData.get("id"));
  const { supabase } = await getHouseholdContext();
  await supabase.from("notes").delete().eq("id", id);
  revalidatePath("/app/catatan");
}
