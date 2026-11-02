import { createClient } from "@/lib/supabase/server";
import type { Household, Member } from "@/lib/types";

// Satu user = satu rumah (multi-rumah per user sengaja tidak dibangun).
export async function getHouseholdContext() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) return { supabase, user: null, household: null, me: null, members: [] as Member[] };

  const { data: me } = await supabase
    .from("members")
    .select("*, households(*)")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!me) return { supabase, user, household: null, me: null, members: [] as Member[] };

  const household = me.households as unknown as Household;
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .eq("household_id", household.id)
    .order("created_at");

  const meRow = me as Member;
  return { supabase, user, household, me: meRow, members: (members ?? []) as Member[] };
}

export function hasChild(members: Member[]) {
  return members.some((m) => !m.can_read);
}
