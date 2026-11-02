import { redirect } from "next/navigation";
import { getHouseholdContext } from "@/lib/context";
import { BottomNav } from "@/components/BottomNav";

export default async function AppLayout({ children }: LayoutProps<"/app">) {
  const { household } = await getHouseholdContext();
  if (!household) redirect("/onboarding");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
