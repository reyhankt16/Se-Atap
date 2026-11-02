import { getHouseholdContext } from "@/lib/context";
import type { Item } from "@/lib/types";
import { BelanjaBoard } from "./BelanjaBoard";

export default async function BelanjaPage() {
  const { supabase, household, user } = await getHouseholdContext();
  if (!household || !user) return null;

  const { data } = await supabase.from("items").select("*").eq("household_id", household.id);
  return <BelanjaBoard householdId={household.id} initialItems={(data ?? []) as Item[]} userId={user.id} />;
}
