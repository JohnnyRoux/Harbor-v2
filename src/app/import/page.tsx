
"use client";
import Papa, { ParseResult } from "papaparse";
import type { Company } from "@/lib/types";
import { useState } from "react";

type CsvRow = Partial<Record<
  | "id" | "name" | "type" | "city" | "state"
  | "services" | "brands" | "verticals" | "verified" | "years" | "website" | "about",
  string
>>;

const toList = (val?: string): string[] =>
  typeof val === "string"
    ? val.split(/;|,\s*/).map((s: string) => s.trim()).filter(Boolean)
    : [];

export default function ImportPage() {
  const [rows, setRows] = useState<Company[]>([]);
  const [status, setStatus] = useState<string>("");

  const handleFile = (file: File) => {
    setStatus("Parsing CSV...");
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<CsvRow>) => {
        const out: Company[] = (results.data as CsvRow[]).map((r: CsvRow, idx: number) => ({
          id: r.id || `row_${idx}`,
          name: r.name || "",
          type: ((r.type || "contractor") as Company["type"]),
          city: r.city || "",
          state: r.state || "",
          services: toList(r.services),
          brands: toList(r.brands),
          verticals: toList(r.verticals),
          verified: String(r.verified).toLowerCase() === "true",
          years: Number(r.years || 0),
          website: r.website || "",
          about: r.about || "",
        }));
        setRows(out);
        setStatus(`Parsed ${out.length} rows. Click 'Save to browser' to use this data.`);
      },
      error: (err) => setStatus(`Error: ${err.message}`)
    });
  };

  const save = () => {
    localStorage.setItem("harbor_companies", JSON.stringify(rows));
    setStatus(`Saved ${rows.length} companies to your browser. Go to Browse to see them.`);
  };

  const clear = () => {
    localStorage.removeItem("harbor_companies");
    setStatus("Cleared imported data. Using sample data again.");
    setRows([]);
  };

  return (
    <section className="border-b">
      <div className="max-w-3xl mx-auto px-4 py-14">
        <h1 className="text-2xl font-semibold">Import companies from CSV</h1>
        <p className="text-gray-600 mt-2">Upload your filled template and save it to your browser. Then go to <span className="font-medium">Browse</span> to see results.</p>

        <div className="mt-6 rounded-2xl border p-6">
          <input type="file" accept=".csv" onChange={e => e.target.files && handleFile(e.target.files[0])} className="block w-full text-sm" />
          <div className="mt-4 text-sm text-gray-700">{status}</div>

          <div className="mt-6 flex gap-3">
            <button onClick={save} className="px-4 py-2 rounded-xl bg-gray-900 text-white disabled:opacity-50" disabled={rows.length === 0}>Save to browser</button>
            <button onClick={clear} className="px-4 py-2 rounded-xl border">Clear imported data</button>
            <a className="px-4 py-2 rounded-xl border" href="/harbor_companies_template.csv" download>Download CSV template</a>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-medium">Preview (first 10)</h2>
          <pre className="mt-2 text-xs bg-gray-50 border rounded-xl p-3 overflow-auto max-h-64">{JSON.stringify(rows.slice(0,10), null, 2)}</pre>
        </div>
      </div>
    </section>
  );
}
