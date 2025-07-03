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

const labTests: LabTest[] = [
  {
    id: "1",
    name: "Complete Blood Count",
    description: "Comprehensive analysis of blood cells",
    price: 399,
    originalPrice: 599,
    discount: 33,
    image:
      "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Blood",
    reportTime: "12 hours",
    homeCollection: true,
    prerequisites: "8 hours fasting recommended",
  },
  {
    id: "2",
    name: "Thyroid Profile",
    description: "Comprehensive thyroid function assessment",
    price: 449,
    originalPrice: 699,
    discount: 35,
    image:
      "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Hormone",
    reportTime: "24 hours",
    homeCollection: true,
    prerequisites: "No special preparation needed",
  },
  {
    id: "3",
    name: "Full Body Checkup",
    description: "Comprehensive health assessment",
    price: 1999,
    originalPrice: 3299,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Preventive Health",
    reportTime: "48 hours",
    homeCollection: true,
    prerequisites: "8-12 hours fasting required",
  },
  {
    id: "4",
    name: "Vitamin D Test",
    description: "Measures vitamin D levels in blood",
    price: 599,
    originalPrice: 899,
    discount: 33,
    image:
      "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Vitamin",
    reportTime: "24 hours",
    homeCollection: true,
    prerequisites: "No special preparation needed",
  },
  {
    id: "5",
    name: "Liver Function Test",
    description: "Assessment of liver health and function",
    price: 499,
    originalPrice: 799,
    discount: 38,
    image:
      "https://images.unsplash.com/photo-1550831106-17269463fda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Organ Function",
    reportTime: "24 hours",
    homeCollection: true,
    prerequisites: "8 hours fasting recommended",
  },
  {
    id: "6",
    name: "Diabetes Screening",
    description: "Blood glucose and HbA1c analysis",
    price: 549,
    originalPrice: 849,
    discount: 35,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Diabetes",
    reportTime: "24 hours",
    homeCollection: true,
    prerequisites: "8-12 hours fasting required",
  },
];

export default labTests;