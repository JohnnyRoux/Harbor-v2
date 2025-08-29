
"use client";
import { useEffect, useMemo, useState } from "react";
import type { Company } from "@/lib/types";
import { SAMPLE_COMPANIES } from "@/lib/data";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Link from "next/link";

type Filters = { type: string[]; services: string[]; states: string[] };

function FiltersPane({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }) {
  const toggle = (group: keyof Filters, value: string) => {
    const set = new Set(filters[group]);
    set.has(value) ? set.delete(value) : set.add(value);
    setFilters({ ...filters, [group]: Array.from(set) });
  };
  const TYPES = ["contractor","distributor","consultant"] as const;
  const SERVICES = ["Fiber Termination","Network Cabling","Cameras & VMS","Access Control","DAS","Testing"] as const;
  const STATES = ["MN","ND","SD"] as const;
  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="rounded-2xl border p-4 space-y-5 sticky top-20">
        <div>
          <div className="font-medium mb-2">Type</div>
          <div className="space-y-1">
            {TYPES.map(t => (
              <label key={t} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={filters.type.includes(t)} onChange={() => toggle("type", t)} />
                <span className="capitalize">{t}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="font-medium mb-2">Services</div>
          <div className="space-y-1">
            {SERVICES.map(s => (
              <label key={s} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={filters.services.includes(s)} onChange={() => toggle("services", s)} />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="font-medium mb-2">State</div>
          <div className="space-y-1">
            {STATES.map(st => (
              <label key={st} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={filters.states.includes(st)} onChange={() => toggle("states", st)} />
                <span>{st}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function getCompanies(): Company[] {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("harbor_companies");
    if (raw) { try { return JSON.parse(raw) as Company[]; } catch {} }
  }
  return SAMPLE_COMPANIES;
}

export default function ResultsPage() {
  const [query, setQuery] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({ type: [], services: [], states: [] });
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => { setCompanies(getCompanies()); }, []);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return companies.filter(c => {
      const qMatch = !q ||
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.brands.join(" ").toLowerCase().includes(q) ||
        c.services.join(" ").toLowerCase().includes(q);
      const typeOk = filters.type.length === 0 || filters.type.includes(c.type);
      const svcOk = filters.services.length === 0 || filters.services.some(s => c.services.includes(s));
      const stateOk = filters.states.length === 0 || filters.states.includes(c.state);
      return qMatch && typeOk && svcOk && stateOk;
    });
  }, [companies, query, filters]);

  return (
    <section className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="rounded-2xl border p-2 flex gap-2 mb-6">
          <input value={query} onChange={e => setQuery(e.target.value)} className="flex-1 px-4 py-3 rounded-xl outline-none" placeholder="Search brands, services, cities..." />
          <button className="px-5 py-3 rounded-xl bg-gray-900 text-white">Search</button>
        </div>
        <div className="flex gap-6">
          <FiltersPane filters={filters} setFilters={setFilters} />
          <div className="flex-1">
            <div className="text-sm text-gray-600 mb-3">{matches.length} results</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map(c => (
                <Card key={c.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-semibold flex items-center gap-2">
                        <Link href={`/company/${encodeURIComponent(c.id)}`}>{c.name}</Link>
                        {c.verified && <span className="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-full">Verified</span>}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">{c.type} • {c.city}, {c.state} • {c.years} yrs</div>
                    </div>
                    <Badge>{c.state}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">{c.services.slice(0,4).map((s: string) => <Badge key={s}>{s}</Badge>)}</div>
                  <div className="mt-2 flex flex-wrap gap-2">{c.brands.slice(0,5).map((b: string) => <span key={b} className="text-xs text-gray-600">{b}</span>)}</div>
                  <div className="mt-3 flex gap-3 text-sm">
                    <Link href={`/company/${encodeURIComponent(c.id)}`} className="px-3 py-1.5 rounded-lg border">View profile</Link>
                    <a href={c.website} className="px-3 py-1.5 rounded-lg border">Website</a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
