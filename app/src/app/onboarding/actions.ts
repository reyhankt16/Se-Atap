"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createHousehold(formData: FormData) {
  const householdName = String(formData.get("householdName") ?? "").trim();
  const memberName = String(formData.get("memberName") ?? "").trim();
  if (!householdName || !memberName) redirect("/onboarding?error=Isi%20dulu%20ya");

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");

  const { data: household, error } = await supabase
    .from("households")
    .insert({ name: householdName })
    .select()
    .single();
  if (error || !household) redirect(`/onboarding?error=${encodeURIComponent(error?.message ?? "Gagal bikin rumah")}`);

  const { error: memberError } = await supabase.from("members").insert({
    household_id: household.id,
    user_id: auth.user.id,
    name: memberName,
    color: "#2563eb",
  });
  if (memberError) redirect(`/onboarding?error=${encodeURIComponent(memberError.message)}`);

  redirect("/onboarding?step=catat");
}

export async function captureFirstThing(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");

  const { data: me } = await supabase
    .from("members")
    .select("household_id")
    .eq("user_id", auth.user.id)
    .maybeSingle();
  if (!me) redirect("/onboarding");

  if (title) {
    await supabase
      .from("tasks")
      .insert({ household_id: me.household_id, title, created_by: auth.user.id });
  }
  redirect("/onboarding?step=undang");
}

export async function skipToApp() {
  redirect("/app");
}
