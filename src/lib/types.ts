
export type CompanyType = 'contractor' | 'distributor' | 'consultant' | 'manufacturer' | 'rep';
export type Company = {
  id: string;
  name: string;
  type: CompanyType;
  city: string;
  state: string;
  services: string[];
  brands: string[];
  verticals: string[];
  verified: boolean;
  years: number;
  website: string;
  about: string;
};
