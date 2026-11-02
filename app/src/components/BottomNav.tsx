"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/app", label: "Hari ini", icon: "🏠" },
  { href: "/app/jadwal", label: "Jadwal", icon: "📅" },
  { href: "/app/tugas", label: "Tugas", icon: "✅" },
  { href: "/app/belanja", label: "Belanja", icon: "🛒" },
  { href: "/app/keuangan", label: "Uang", icon: "💰" },
  { href: "/app/acara", label: "Acara", icon: "🎉" },
  { href: "/app/catatan", label: "Catatan", icon: "📝" },
  { href: "/app/anggota", label: "Anggota", icon: "👥" },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-10 flex overflow-x-auto border-t border-border bg-background">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`tap-target flex min-w-[64px] flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs ${
              active ? "font-semibold text-primary" : "text-muted"
            }`}
          >
            <span aria-hidden className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
