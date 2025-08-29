
import { CATEGORIES } from "@/lib/data";
import Card from "@/components/Card";

export default function HomePage() {
  const logos = ["Pelco","Legrand Ortronics","Superior Essex","WilsonPro","Zinwave","Wtec Smartengine"];
  return (
    <>
      <section className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Find proven pros & products for any low‑voltage project.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Search by brand, service, or city. Verified listings. No cold‑calling roulette.
            </p>
          </div>
          <div className="mt-8">
            <div className="w-full md:w-3/4 lg:w-2/3 rounded-2xl border shadow-sm p-2 flex flex-col md:flex-row gap-2">
              <input className="flex-1 px-4 py-3 rounded-xl outline-none" placeholder="Try ‘Pelco in Minneapolis’ or ‘Fiber termination in ND’" />
              <div className="flex gap-2">
                <select className="px-3 py-3 rounded-xl border"><option>Brand</option><option>Service</option><option>Region</option></select>
                <a href="/results" className="px-5 py-3 rounded-xl bg-gray-900 text-white grid place-items-center">Search</a>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Example: <span className="font-mono">“Zinwave installers MN”</span></p>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-10 items-center">
            {logos.map(l => <div key={l} className="text-sm text-gray-500 border rounded-xl p-3 text-center">{l}</div>)}
          </div>
        </div>
      </section>
      <section className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-semibold">Browse top categories</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(c => (
              <Card key={c}>
                <div className="text-lg font-medium">{c}</div>
                <p className="text-sm text-gray-600 mt-1">Find verified providers near you</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-semibold">Trust how Harbor ranks results</h2>
            <p className="mt-3 text-gray-600">We prioritize relevance, proximity, and verified listings. Companies can earn a verification badge by confirming territory, manufacturer certs, and references.</p>
            <ul className="mt-4 text-gray-700 list-disc pl-5 space-y-1">
              <li>Verified territories & certifications</li>
              <li>Manufacturer & rep linecards</li>
              <li>Clear categories & service regions</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-medium">How verification works</h3>
            <ol className="mt-3 space-y-3 text-gray-700 list-decimal pl-5">
              <li>Claim your listing with a work email</li>
              <li>Complete profile & upload certs</li>
              <li>Optional reference check (2 contacts)</li>
            </ol>
            <a href="/results" className="mt-5 inline-block px-4 py-2 rounded-xl bg-gray-900 text-white">Get verified</a>
          </div>
        </div>
      </section>
    </>
  );
}
