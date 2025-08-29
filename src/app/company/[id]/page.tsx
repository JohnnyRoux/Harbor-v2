
"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { Company } from "@/lib/types";
import { SAMPLE_COMPANIES } from "@/lib/data";
import Badge from "@/components/Badge";
import Link from "next/link";

function getCompanies(): Company[] {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("harbor_companies");
    if (raw) { try { return JSON.parse(raw) as Company[]; } catch {} }
  }
  return SAMPLE_COMPANIES;
}

export default function CompanyPage() {
  const params = useParams<{ id: string }>();
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => { setCompanies(getCompanies()); }, []);
  const company = useMemo(() => companies.find(c => c.id === params.id) || companies[0], [companies, params.id]);
  if (!company) return null;
  const c = company;

  return (
    <section className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Link href="/results" className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block">← Back to results</Link>
        <div className="rounded-2xl border p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-semibold flex items-center gap-2">{c.name}{c.verified && <span className="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-full">Verified</span>}</div>
              <div className="text-sm text-gray-600 capitalize">{c.type} • {c.city}, {c.state} • {c.years} yrs</div>
            </div>
            <a href={c.website} className="px-4 py-2 rounded-xl bg-gray-900 text-white">Visit website</a>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2">
              <h3 className="font-medium">About</h3>
              <p className="text-gray-700 mt-2">{c.about}</p>
              <h3 className="font-medium mt-6">Services</h3>
              <div className="mt-2 flex flex-wrap gap-2">{c.services.map((s: string) => <Badge key={s}>{s}</Badge>)}</div>
              <h3 className="font-medium mt-6">Brands</h3>
              <div className="mt-2 flex flex-wrap gap-2">{c.brands.map((b: string) => <Badge key={b}>{b}</Badge>)}</div>
              <h3 className="font-medium mt-6">Vertical experience</h3>
              <div className="mt-2 flex flex-wrap gap-2">{c.verticals.map((v: string) => <Badge key={v}>{v}</Badge>)}</div>
            </div>
            <div>
              <div className="rounded-2xl border p-4">
                <h4 className="font-medium">Contact</h4>
                <div className="text-sm text-gray-700 mt-2">General: info@example.com</div>
                <div className="text-sm text-gray-700">Sales: sales@example.com</div>
                <div className="text-sm text-gray-700">Phone: (555) 123‑4567</div>
                <button className="mt-4 px-4 py-2 rounded-xl border w-full">Request contact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
