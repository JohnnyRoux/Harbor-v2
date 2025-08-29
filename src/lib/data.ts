
import type { Company } from "@/lib/types";
export const SAMPLE_COMPANIES: Company[] = [
  { id: "c1", name: "North Star Low Voltage", type: "contractor", city: "Minneapolis", state: "MN",
    services: ["Fiber Termination","DAS","CCTV"], brands: ["Ortronics","Pelco","WilsonPro"],
    verticals: ["Healthcare","Higher-Ed"], verified: true, years: 12,
    website: "https://northstarlowvoltage.example.com",
    about: "Design and install teams specializing in fiber, DAS and camera systems across MN/ND/SD." },
  { id: "c2", name: "Dakota Data & Power", type: "contractor", city: "Fargo", state: "ND",
    services: ["Network Cabling","Testing","Access Control"],
    brands: ["Superior Essex","Legrand Ortronics"], verticals: ["Industrial","Logistics"],
    verified: false, years: 6, website: "https://dakotadp.example.com",
    about: "Turn-key low-voltage builds and maintenance. Rapid response across the Red River Valley." },
  { id: "c3", name: "Twin Ports Distribution — Duluth Branch", type: "distributor", city: "Duluth", state: "MN",
    services: ["Counter Sales","Pickup","Local Delivery"], brands: ["Superior Essex","Great Lakes","WilsonPro"],
    verticals: ["All"], verified: true, years: 20, website: "https://twinportsdist.example.com",
    about: "Stocked branch for cabling, racks, cabinets, and cellular enhancement gear. Counter 7am–5pm." },
  { id: "c4", name: "Prairie Vision Integrators", type: "contractor", city: "Sioux Falls", state: "SD",
    services: ["Cameras & VMS","Access Control","Commissioning"], brands: ["Pelco","Hanwha"],
    verticals: ["Healthcare","Retail"], verified: true, years: 9, website: "https://prairievision.example.com",
    about: "Healthcare-grade security deployments with certified commissioning and service SLAs." }
];
export const CATEGORIES = [
  "Fiber & Cabling","Racks & Cabinets","PoE Lighting","Cellular DAS",
  "Cameras & VMS","Access Control","Testing & Cert","Distribution",
] as const;
