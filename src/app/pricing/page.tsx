
const PLANS = [
  { name: "Free", price: "$0", features: ["Basic company profile","1 location","Appears in search"], cta: "List your company" },
  { name: "Pro", price: "$79/mo", features: ["Verified badge","Priority ranking","Unlimited categories","Basic analytics"], cta: "Start 14‑day trial", highlight: true },
  { name: "Partner", price: "$399/mo", features: ["Featured placement","Lead routing","Training/event posts","Content highlights"], cta: "Talk to sales" },
] as const;

export default function PricingPage() {
  return (
    <section className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold">Simple pricing</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {PLANS.map(p => (
            <div key={p.name} className={`rounded-2xl border p-6 flex flex-col ${p.highlight ? "ring-2 ring-gray-900" : ""}`}>
              <div className="flex-1">
                <div className="text-sm uppercase tracking-wide text-gray-500">{p.name}</div>
                <div className="text-3xl font-semibold mt-1">{p.price}</div>
                <ul className="mt-4 space-y-2 text-gray-700">
                  {p.features.map(f => (
                    <li key={f} className="flex gap-2"><span>•</span><span>{f}</span></li>
                  ))}
                </ul>
              </div>
              <button className="mt-6 px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black">{p.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
