"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Item } from "@/lib/types";
import { EmptyState } from "@/components/EmptyState";

export function BelanjaBoard({ householdId, initialItems, userId }: { householdId: string; initialItems: Item[]; userId: string }) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`items-${householdId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "items", filter: `household_id=eq.${householdId}` },
        (payload) => {
          setItems((current) => {
            if (payload.eventType === "DELETE") {
              return current.filter((i) => i.id !== (payload.old as Item).id);
            }
            const row = payload.new as Item;
            const withoutRow = current.filter((i) => i.id !== row.id);
            return [...withoutRow, row];
          });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [householdId]); // eslint-disable-line react-hooks/exhaustive-deps

  const needed = items.filter((i) => i.needed).sort((a, b) => a.name.localeCompare(b.name));
  const stock = items.filter((i) => !i.needed).sort((a, b) => a.name.localeCompare(b.name));

  async function addItem(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    if (!name) return;
    const location = String(formData.get("location") ?? "").trim() || null;
    const isRoutine = formData.get("isRoutine") === "on";
    await supabase.from("items").insert({ household_id: householdId, name, location, is_routine: isRoutine, needed: true, added_by: userId });
  }

  async function markBought(id: string) {
    await supabase.from("items").update({ needed: false, checked_at: new Date().toISOString() }).eq("id", id);
  }

  async function markNeeded(id: string) {
    await supabase.from("items").update({ needed: true, checked_at: null }).eq("id", id);
  }

  async function removeItem(id: string) {
    await supabase.from("items").delete().eq("id", id);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Belanja &amp; stok</h1>

      <form action={addItem} className="flex flex-col gap-2 rounded-card border border-border p-3">
        <p className="font-medium">Tambah barang</p>
        <input name="name" required placeholder="Nama barang" className="rounded-card border border-border px-3 py-2" />
        <input name="location" placeholder="Disimpan di mana? (opsional)" className="rounded-card border border-border px-3 py-2" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isRoutine" />
          Barang rutin (sering kebeli ulang)
        </label>
        <button className="rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
          Simpan
        </button>
      </form>

      <div>
        <h2 className="mb-2 font-semibold">Daftar belanja</h2>
        {needed.length === 0 ? (
          <EmptyState example="Contoh: Minyak goreng — dapur" hint="Belum ada yang perlu dibeli." />
        ) : (
          <div className="flex flex-col gap-2">
            {needed.map((i) => (
              <label key={i.id} className="flex items-center gap-3 rounded-card border border-border p-3">
                <input type="checkbox" className="h-5 w-5" onChange={() => markBought(i.id)} />
                <span className="flex-1">
                  {i.name}
                  {i.location && <span className="text-sm text-muted"> · {i.location}</span>}
                </span>
                <button type="button" onClick={() => removeItem(i.id)} className="text-sm text-muted">Hapus</button>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-2 font-semibold">Barang di rumah</h2>
        {stock.length === 0 ? (
          <p className="text-sm text-muted">Belum ada barang stok yang dicatat.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {stock.map((i) => (
              <div key={i.id} className="flex items-center gap-3 rounded-card border border-border p-3">
                <span className="flex-1">
                  {i.name}
                  {i.location && <span className="text-sm text-muted"> · {i.location}</span>}
                </span>
                <button type="button" onClick={() => markNeeded(i.id)} className="tap-target rounded-full border border-border px-3 text-sm">
                  Tandai abis
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
