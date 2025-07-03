import React, { useState } from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { babyCareProducts } from '@/data/categories';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Check } from 'lucide-react';

// BabyCare categories
const babyCategories = [
  {
    id: 'bc1',
    name: 'Bath & Skincare',
    icon: 'M21 15.9A10 10 0 0111.25 1a8.25 8.25 0 00-7.851 10.79L3 15.9l8.25 2.85L21 15.9z',
    image: 'https://images.unsplash.com/photo-1594117782204-e0d2c1a32e60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'bc2',
    name: 'Nutrition & Feeding',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    image: 'https://images.unsplash.com/photo-1626170733248-536107e5f5f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'bc3',
    name: 'Toys & Teethers',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
    image: 'https://images.unsplash.com/photo-1596478265837-4d52b748d965?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'bc4',
    name: 'Diapers & Wipes',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'bc5',
    name: 'Sleep & Comfort',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    image: 'https://images.unsplash.com/photo-1590010605879-e3721aeae72b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'bc6',
    name: 'Health & Safety',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  }
];

// Age groups for filtering
const ageGroups = [
  '0-6 months',
  '6-12 months',
  '1-2 years',
  '2-3 years',
  'All ages'
];

const BabyCarePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Filter products based on search, category, and age group
  const filteredProducts = babyCareProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? 
                          product.category.toLowerCase() === selectedCategory.toLowerCase() : 
                          true;
    
    // Check if the product's age group contains the selected age group (or if no age group is selected)
    const matchesAgeGroup = selectedAgeGroup && selectedAgeGroup !== 'All ages' ? 
                          product.ageGroup.includes(selectedAgeGroup.split(' ')[0]) : 
                          true;
    
    return matchesSearch && matchesCategory && matchesAgeGroup;
  });

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      composition: "Baby Care Product",
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      isPrescriptionRequired: false,
      tags: [product.category.toLowerCase(), product.ageGroup],
      stock: 10,
      category: "Baby Care",
      description: product.description,
      dosage: "N/A",
      sideEffects: [],
      usage: `Suitable for ${product.ageGroup}`
    });
    
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Baby Care Products | MediQuick</title>
        <meta
          name="description"
          content="Shop the best baby care products. Find baby skincare, nutrition, toys, diapers, and more for your little one."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl md:text-3xl font-bold font-heading mb-4">
              Baby Care Products
            </h1>

            {/* Hero Banner */}
            <div className="mb-8 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 p-6 md:p-10">
                  <h2 className="text-2xl md:text-3xl text-gray-800 font-bold mb-3">
                    Gentle Care for Your Little One
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Shop our specially curated collection of baby products that
                    are gentle, safe, and perfect for your baby's delicate skin
                    and needs.
                  </p>
                  <div className="flex flex-col [@media(min-width:351px)]:flex-row gap-3">
                    <button
                      className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition duration-300"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Shop All
                    </button>
                    <button
                      className="border border-primary-500 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg font-medium transition duration-300"
                      onClick={() => setSelectedCategory("bath & skincare")}
                    >
                      Baby Skincare
                    </button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1544126592-807ade215a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Baby Care Products"
                    className="w-full h-48 md:h-72 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search baby care products..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3,
                    },
                  },
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                {babyCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.95 },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        },
                      },
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div
                      className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                        selectedCategory === category.name.toLowerCase()
                          ? "ring-2 ring-primary-500 ring-offset-2"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category.name.toLowerCase()
                            ? null
                            : category.name.toLowerCase()
                        )
                      }
                    >
                      {/* Image with zoom effect */}
                      <motion.div
                        className="aspect-w-16 aspect-h-9 relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="object-cover h-40 w-full"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";
                          }}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Shimmer effect on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0"
                          whileHover={{
                            opacity: 1,
                            x: ["-100%", "100%"],
                            transition: { duration: 1.2, repeat: Infinity },
                          }}
                        />
                      </motion.div>

                      {/* Category name with slide-up animation */}
                      <motion.div
                        className="absolute inset-0 flex items-end justify-center pb-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-white font-semibold text-center px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full">
                          {category.name}
                        </h3>
                      </motion.div>

                      {/* Active indicator */}
                      {selectedCategory === category.name.toLowerCase() && (
                        <motion.div
                          className="absolute top-2 right-2 w-3 h-3 bg-primary-500 rounded-full shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Age Filter */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Shop by Age</h2>
              <motion.div
                className="flex flex-wrap gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                {ageGroups.map((age) => (
                  <motion.button
                    key={age}
                    className={`px-4 py-2 rounded-full border-2 transition-all duration-300 font-medium text-sm md:text-base ${
                      selectedAgeGroup === age
                        ? "bg-primary-500 text-white border-primary-500 shadow-lg"
                        : "bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:shadow-md"
                    }`}
                    onClick={() =>
                      setSelectedAgeGroup(selectedAgeGroup === age ? null : age)
                    }
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 300 },
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {age}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Products */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedCategory
                    ? `${
                        selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1)
                      }`
                    : "All Baby Products"}
                  {selectedAgeGroup && selectedAgeGroup !== "All ages"
                    ? ` (${selectedAgeGroup})`
                    : ""}
                </h2>
                {(selectedCategory || selectedAgeGroup) && (
                  <button
                    className="text-primary-600 font-medium flex items-center"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedAgeGroup(null);
                    }}
                  >
                    <span>Clear Filters</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600">
                    Try changing your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden product-card"
                      whileHover={{ y: -5 }}
                    >
                      <Link href={`/product/${product.id}`} className="block">
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";
                            }}
                          />
                          {product.discount > 0 && (
                            <div className="absolute top-2 left-2 bg-accent-500 text-white text-xs font-bold rounded-full px-2 py-1">
                              {product.discount}% OFF
                            </div>
                          )}
                          <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-bold rounded-full px-2 py-1">
                            {product.ageGroup}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {product.description}
                          </p>
                          <div className="flex items-center mb-2">
                            <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-1">
                              {product.category}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-bold text-gray-900">
                                ₹{product.price}
                              </span>
                              {product.discount > 0 && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="px-4 pb-4">
                        <motion.button
                          className={`w-full py-2 rounded-lg font-medium relative overflow-hidden ${
                            addedProductId === product.id
                              ? "bg-green-600 text-white"
                              : "bg-green-500 hover:bg-green-600 text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          whileTap={
                            addedProductId === product.id ? {} : { scale: 0.95 }
                          }
                          disabled={addedProductId === product.id}
                        >
                          <AnimatePresence mode="wait">
                            {addedProductId === product.id ? (
                              <motion.div
                                key="added"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center justify-center gap-1"
                              >
                                <Check className="w-4 h-4" />
                                <span>Added</span>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="add"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center justify-center gap-1"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                <span>Add to Cart</span>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Ripple effect */}
                          {addedProductId === product.id && (
                            <motion.span
                              className="absolute inset-0 bg-white opacity-20 rounded-lg"
                              initial={{ scale: 0 }}
                              animate={{ scale: 2, opacity: 0 }}
                              transition={{ duration: 0.6 }}
                            />
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Safety Info Banner */}
            <div className="mt-12 mb-8 bg-blue-50 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  Baby Product Safety
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-blue-500 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Quality Assured</h3>
                    <p className="text-sm text-gray-600">
                      All our baby products undergo rigorous quality testing to
                      ensure they meet safety standards.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-blue-500 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Gentle Formulations</h3>
                    <p className="text-sm text-gray-600">
                      Our baby skincare products are specially formulated to be
                      gentle on sensitive baby skin.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-blue-500 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Expert Reviewed</h3>
                    <p className="text-sm text-gray-600">
                      Our product selection is vetted by pediatricians to ensure
                      they meet baby health standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default BabyCarePage;