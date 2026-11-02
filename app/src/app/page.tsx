import { redirect } from "next/navigation";

// Landing page (L5) belum dibangun di tahap ini — "/" langsung masuk ke app (D6).
export default function Home() {
  redirect("/app");
}
