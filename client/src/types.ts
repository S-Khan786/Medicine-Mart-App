// Product Interface (based on your products array)
export interface Product {
  id: string;
  name: string;
  composition: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  isPrescriptionRequired: boolean;
  tags: string[];
  stock: number;
  category: string;
  description: string;
  dosage: string;
  sideEffects: string[];
  usage: string;
  bestSeller?: boolean;
  rating?: number;
  reviews?: number;
}

// Category Interface (based on your categories array)
export interface Category {
  id: string;
  name: string;
  icon: string; // SVG path
  description: string;
}

// HealthConcern Interface (based on your healthConcerns array)
export interface HealthConcern {
  id: string;
  name: string;
  description: string;
  image: string;
}

// LabTest Interface (based on your labTests array)
export interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category?: string;
  reportTime?: string;
  homeCollection?: boolean;
  prerequisites?: string;
}

// BabyCareProduct Interface (based on your babyCareProducts array)
export interface BabyCareProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  ageGroup: string;
  category: string;
}

// You might also want to add a combined type for search results
export type SearchResultItem =
  | (Product & { type: "product" })
  | (Category & { type: "category" })
  | (HealthConcern & { type: "healthConcern" })
  | (LabTest & { type: "labTest" })
  | (BabyCareProduct & { type: "babyCare" });
