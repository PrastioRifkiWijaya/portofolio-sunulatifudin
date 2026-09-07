export type StateInstitutionCategory = 'Eksekutif' | 'Legislatif' | 'Yudikatif' | 'Eksaminatif' | 'Lainnya';

export interface StateInstitution {
  id: string;
  name: string;
  fullName: string;
  category: StateInstitutionCategory;
  shortDescription: string;
  duties: string[];
  authorities: string[];
  legalBasis: string[];
  // Untuk visualisasi hierarki/hubungan (opsional, tergantung implementasi visual)
  relatedTo?: string[]; 
}

export interface LegislativeStep {
  id: string;
  order: number;
  title: string;
  description: string;
  actors: string[]; // Contoh: ["DPR", "Presiden"]
  documentState?: string;
  legalBasis?: string[];
}

export type RealitaModuleStatus = "active" | "development" | "planned";

export interface RealitaModule {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string; // Will be mapped to Lucide icons
  status: RealitaModuleStatus;
  href: string;
  category?: string;
}
