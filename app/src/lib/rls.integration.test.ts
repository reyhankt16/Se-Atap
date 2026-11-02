// T1 — isolasi data antar rumah (DB-9). Test INTEGRASI: butuh project Supabase
// nyata (skip otomatis kalau env belum ada). Jalanin manual sesudah schema.sql
// di-apply: SUPABASE_SERVICE_ROLE_KEY=... npx tsx src/lib/rls.integration.test.ts
// (atau `node --test` sesudah nambahin file ini ke pola test script).
import { test } from "node:test";
import assert from "node:assert/strict";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const ready = Boolean(url && anonKey && serviceKey);

test("T1: user rumah A nggak bisa baca/tulis data rumah B", { skip: !ready && "butuh SUPABASE_SERVICE_ROLE_KEY — lihat komentar di atas file ini" }, async () => {
  const admin = createClient(url!, serviceKey!);

  async function makeHousehold(label: string) {
    const email = `rls-test-${label}-${Date.now()}@example.com`;
    const password = "test-password-123";
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    assert.ifError(createErr);
    const { data: household, error: hhErr } = await admin
      .from("households")
      .insert({ name: `Rumah ${label}` })
      .select()
      .single();
    assert.ifError(hhErr);
    await admin.from("members").insert({
      household_id: household!.id,
      user_id: created!.user!.id,
      name: label,
    });
    const { data: item } = await admin
      .from("items")
      .insert({ household_id: household!.id, name: `Barang rahasia ${label}`, added_by: created!.user!.id })
      .select()
      .single();

    const client = createClient(url!, anonKey!);
    await client.auth.signInWithPassword({ email, password });
    return { client, householdId: household!.id, itemId: item!.id, userId: created!.user!.id };
  }

  const a = await makeHousehold("A");
  const b = await makeHousehold("B");

  try {
    const { data: leaked } = await a.client.from("items").select("*").eq("household_id", b.householdId);
    assert.equal(leaked?.length ?? 0, 0, "rumah A tidak boleh bisa membaca item rumah B");

    const { error: writeErr } = await a.client
      .from("items")
      .update({ name: "diubah paksa" })
      .eq("id", b.itemId);
    const { data: stillIntact } = await admin.from("items").select("name").eq("id", b.itemId).single();
    assert.equal(stillIntact?.name, "Barang rahasia B", "rumah A tidak boleh bisa menulis item rumah B");
    void writeErr;
  } finally {
    await admin.from("households").delete().in("id", [a.householdId, b.householdId]);
    await admin.auth.admin.deleteUser(a.userId);
    await admin.auth.admin.deleteUser(b.userId);
  }
});
