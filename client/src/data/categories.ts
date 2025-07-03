export interface Category {
  id: string;
  name: string;
  image: string; // SVG path
  description: string;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Diabetes",
    image: "/assets/sugar-blood-level.png",
    description: "Products for diabetes management"
  },
  {
    id: "2",
    name: "Fever",
    image: "/assets/sick.png",
    description: "Medication for fever and temperature control"
  },
  {
    id: "3",
    name: "Pain Relief",
    image: "/assets/pain.png",
    description: "Products for pain management"
  },
  {
    id: "4",
    name: "Immunity",
    image: "/assets/healthcare.png",
    description: "Products to boost your immune system"
  },
  {
    id: "5",
    name: "First Aid",
    image: "/assets/first-aid-kit.png",
    description: "Essential first aid supplies"
  },
  {
    id: "6",
    name: "Skincare",
    image: "/assets/skincare.png",
    description: "Products for skin health and care"
  },
  {
    id: "7",
    name: "Vitamins",
    image: "/assets/vitamin.png",
    description: "Essential vitamins and supplements"
  },
  {
    id: "8",
    name: "Cough & Cold",
    image: "/assets/cough.png",
    description: "Remedies for cough, cold and flu"
  },
  {
    id: "9",
    name: "Pain Relief",
    image: "/assets/pain.png",
    description: "Medications for pain management"
  },
  {
    id: "10",
    name: "Allergy",
    image: "/assets/allergy.png",
    description: "Allergy relief medications"
  },
  {
    id: "11",
    name: "Acidity",
    image: "/assets/gastric.png",
    description: "Medications for acid reflux and heartburn"
  },
  {
    id: "12",
    name: "Cold & Cough",
    image: "/assets/cough.png",
    description: "Cold and cough remedies"
  },
];

export interface HealthConcern {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const healthConcerns: HealthConcern[] = [
  {
    id: "1",
    name: "Diabetes Care",
    description: "Monitors, Strips & more",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
  },
  {
    id: "2",
    name: "Cardiac Care",
    description: "BP Monitors & Supplements",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
  },
  {
    id: "3",
    name: "Skin & Hair",
    description: "Creams, Serums & more",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
  },
  {
    id: "4",
    name: "Vitamins & Supplements",
    description: "Daily Nutritional Support",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
  },
  {
    id: "5",
    name: "Respiratory Care",
    description: "Inhalers, Nebulizers & more",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
  },
  {
    id: "6",
    name: "Orthopedic Care",
    description: "Supports, Braces & more",
    image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
  }
];

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

export const babyCareProducts: BabyCareProduct[] = [
  {
    id: "bc1",
    name: "Gentle Baby Shampoo",
    description: "Tear-free formula for sensitive baby skin",
    price: 199,
    originalPrice: 249,
    discount: 20,
    image: "https://images.unsplash.com/photo-1594117782204-e0d2c1a32e60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "0-12 months",
    category: "Bath & Skincare"
  },
  {
    id: "bc2",
    name: "Baby Diaper Rash Cream",
    description: "Soothes and prevents diaper rash",
    price: 149,
    originalPrice: 199,
    discount: 25,
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "0-24 months",
    category: "Bath & Skincare"
  },
  {
    id: "bc3",
    name: "Soft Teething Toy",
    description: "BPA-free silicone teether for sore gums",
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: "https://images.unsplash.com/photo-1596478265837-4d52b748d965?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "3-12 months",
    category: "Toys & Teethers"
  },
  {
    id: "bc4",
    name: "Baby Immune Support Drops",
    description: "Gentle vitamin D supplement for babies",
    price: 349,
    originalPrice: 499,
    discount: 30,
    image: "https://images.unsplash.com/photo-1512267747574-cfbe16fddcf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "0-24 months",
    category: "Nutrition & Feeding"
  },
  {
    id: "bc5",
    name: "Organic Baby Food",
    description: "100% organic fruit puree",
    price: 99,
    originalPrice: 129,
    discount: 23,
    image: "https://images.unsplash.com/photo-1626170733248-536107e5f5f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "6-24 months",
    category: "Nutrition & Feeding"
  },
  {
    id: "bc6",
    name: "Baby Sleep Soother",
    description: "White noise machine with lullabies",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image: "https://images.unsplash.com/photo-1590010605879-e3721aeae72b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "0-36 months",
    category: "Sleep & Comfort"
  }
];

export interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
}

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

export const labTests: LabTest[] = [
  {
    id: "1",
    name: "Complete Blood Count",
    description: "Comprehensive analysis of blood cells",
    price: 399,
    originalPrice: 599,
    discount: 33,
    image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Blood",
    reportTime: "12 hours",
    homeCollection: true,
    prerequisites: "8 hours fasting recommended"
  },
  {
    id: "2",
    name: "Thyroid Profile",
    description: "Comprehensive thyroid function assessment",
    price: 449,
    originalPrice: 699,
    discount: 35,
    image: "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Hormone",
    reportTime: "24 hours",
    homeCollection: true,
    prerequisites: "No special preparation needed"
  },
  {
    id: "3",
    name: "Full Body Checkup",
    description: "Comprehensive health assessment",
    price: 1999,
    originalPrice: 3299,
    discount: 40,
    image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Preventive Health",
    reportTime: "48 hours",
    homeCollection: true,
    prerequisites: "8-12 hours fasting required"
  },
  {
    id: "4",
    name: "Vitamin D Test",
    description: "Measures vitamin D levels in blood",
    price: 599,
    originalPrice: 899,
    discount: 33,
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Vitamin",
    reportTime: "24 hours",
    homeCollection: true,
    prerequisites: "No special preparation needed"
  },
  {
    id: "5",
    name: "Liver Function Test",
    description: "Assessment of liver health and function",
    price: 499,
    originalPrice: 799,
    discount: 38,
    image: "https://images.unsplash.com/photo-1550831106-17269463fda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Organ Function",
    reportTime: "24 hours",
    homeCollection: true,
    prerequisites: "8 hours fasting recommended"
  },
  {
    id: "6",
    name: "Diabetes Screening",
    description: "Blood glucose and HbA1c analysis",
    price: 549,
    originalPrice: 849,
    discount: 35,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Diabetes",
    reportTime: "24 hours",
    homeCollection: true,
    prerequisites: "8-12 hours fasting required"
  },
  {
    id: "7",
    name: "Kidney Function Test",
    description: "Assessment of kidney health and function",
    price: 499,
    originalPrice: 749,
    discount: 33,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Organ Function",
    reportTime: "24 hours",
    homeCollection: true,
    prerequisites: "No special preparation needed"
  },
  {
    id: "8",
    name: "Lipid Profile",
    description: "Measures cholesterol and triglycerides",
    price: 399,
    originalPrice: 599,
    discount: 33,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Cardiac",
    reportTime: "24 hours",
    homeCollection: true,
    prerequisites: "12 hours fasting required"
  }
];

export default categories;
