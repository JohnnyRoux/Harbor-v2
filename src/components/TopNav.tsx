
"use client";
import { useRouter, usePathname } from "next/navigation";
export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const link = (href: string, label: string) => (
    <button onClick={() => router.push(href)} className={`hover:text-gray-600 ${pathname === href ? "font-semibold" : ""}`}>{label}</button>
  );
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl bg-gray-900 text-white grid place-items-center font-bold">H</div>
          <span className="font-semibold text-lg tracking-tight">Harbor</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {link("/", "Home")}
          {link("/results", "Browse")}
          {link("/pricing", "Pricing")}
          {link("/import", "Import CSV")}
        </nav>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100">Sign in</button>
          <button className="px-3 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-black" onClick={() => router.push("/results")}>
            List your company
          </button>
        </div>
      </div>
    </header>
  );
}
