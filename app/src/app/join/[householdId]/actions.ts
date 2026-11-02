"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function joinHousehold(formData: FormData) {
  const householdId = String(formData.get("householdId"));
  const memberName = String(formData.get("memberName") ?? "").trim();
  if (!memberName) redirect(`/join/${householdId}?error=Isi%20nama%20dulu`);

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");

  const { error } = await supabase.from("members").insert({
    household_id: householdId,
    user_id: auth.user.id,
    name: memberName,
    color: "#16a34a",
  });
  if (error) redirect(`/join/${householdId}?error=${encodeURIComponent(error.message)}`);

  redirect("/app");
}
