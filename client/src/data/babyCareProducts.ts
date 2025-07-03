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

const babyCareProducts: BabyCareProduct[] = [
  {
    id: "bc1",
    name: "Gentle Baby Shampoo",
    description: "Tear-free formula for sensitive baby skin",
    price: 199,
    originalPrice: 249,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1594117782204-e0d2c1a32e60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "0-12 months",
    category: "Bath & Skincare",
  },
  {
    id: "bc2",
    name: "Baby Diaper Rash Cream",
    description: "Soothes and prevents diaper rash",
    price: 149,
    originalPrice: 199,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "0-24 months",
    category: "Bath & Skincare",
  },
  {
    id: "bc3",
    name: "Soft Teething Toy",
    description: "BPA-free silicone teether for sore gums",
    price: 299,
    originalPrice: 399,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1596478265837-4d52b748d965?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "3-12 months",
    category: "Toys & Teethers",
  },
  {
    id: "bc4",
    name: "Baby Immune Support Drops",
    description: "Gentle vitamin D supplement for babies",
    price: 349,
    originalPrice: 499,
    discount: 30,
    image:
      "https://images.unsplash.com/photo-1512267747574-cfbe16fddcf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "0-24 months",
    category: "Nutrition & Feeding",
  },
  {
    id: "bc5",
    name: "Organic Baby Food",
    description: "100% organic fruit puree",
    price: 99,
    originalPrice: 129,
    discount: 23,
    image:
      "https://images.unsplash.com/photo-1626170733248-536107e5f5f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "6-24 months",
    category: "Nutrition & Feeding",
  },
  {
    id: "bc6",
    name: "Baby Sleep Soother",
    description: "White noise machine with lullabies",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image:
      "https://images.unsplash.com/photo-1590010605879-e3721aeae72b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "0-36 months",
    category: "Sleep & Comfort",
  },
  {
    id: "bc7",
    name: "Baby Bottle Sterilizer",
    description: "Electric steam sterilizer for bottles and accessories",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    image:
      "https://images.unsplash.com/photo-1583947581924-a8b1d4b6f4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "0-24 months",
    category: "Feeding Accessories",
  },
  {
    id: "bc8",
    name: "Baby Carrier Wrap",
    description: "Breathable fabric baby carrier for hands-free carrying",
    price: 799,
    originalPrice: 999,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    ageGroup: "0-18 months",
    category: "Carriers & Slings",
  },
];

export default babyCareProducts;