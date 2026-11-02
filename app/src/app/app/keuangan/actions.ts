"use server";

import { getHouseholdContext } from "@/lib/context";
import { parseRupiahInput } from "@/lib/money";
import { todayWIB } from "@/lib/date";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addExpense(formData: FormData) {
  const amount = parseRupiahInput(String(formData.get("amount") ?? ""));
  const category = String(formData.get("category") ?? "");
  const note = String(formData.get("note") ?? "").trim() || null;
  if (!amount || !["wajib", "rumah", "senang"].includes(category)) {
    redirect("/app/keuangan?error=Isi%20nominal%20%26%20kategori");
  }

  const { supabase, household, me, user } = await getHouseholdContext();
  if (!household || !user || !me?.is_adult) redirect("/app");

  await supabase.from("expenses").insert({
    household_id: household.id,
    amount_idr: amount,
    category,
    note,
    spent_on: todayWIB(),
    added_by: user.id,
  });
  revalidatePath("/app/keuangan");
}

export async function deleteExpense(formData: FormData) {
  const id = String(formData.get("id"));
  const { supabase } = await getHouseholdContext();
  await supabase.from("expenses").delete().eq("id", id);
  revalidatePath("/app/keuangan");
}
