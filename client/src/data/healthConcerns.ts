export interface HealthConcern {
  id: string;
  name: string;
  description: string;
  image: string;
}

const healthConcerns: HealthConcern[] = [
  {
    id: "1",
    name: "Diabetes Care",
    description: "Monitors, Strips & more",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  },
  {
    id: "2",
    name: "Cardiac Care",
    description: "BP Monitors & Supplements",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  },
  {
    id: "3",
    name: "Skin & Hair",
    description: "Creams, Serums & more",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  },
  {
    id: "4",
    name: "Vitamins & Supplements",
    description: "Daily Nutritional Support",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  },
  {
    id: "5",
    name: "Respiratory Care",
    description: "Inhalers, Nebulizers & more",
    image:
      "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  },
  {
    id: "6",
    name: "Orthopedic Care",
    description: "Supports, Braces & more",
    image:
      "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  },
  {
    id: "7",
    name: "Digestive Health",
    description: "Probiotics & Digestive Aids",
    image:
      "https://images.unsplash.com/photo-1542736705-53e8d9d8cc4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  },
  {
    id: "8",
    name: "Mental Wellness",
    description: "Stress Relief & Sleep Aids",
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  },
];

export default healthConcerns;