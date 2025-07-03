import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ProductCard from "@/components/product/ProductCard";
import products from "@/data/products";

type SortOption = "popularity" | "priceLow" | "priceHigh" | "newest";
type FilterOption = "all" | "prescription" | "nonPrescription";
type CategoryFilter = string | null;
type PriceRange = [number, number];

const ProductListingPage: React.FC = () => {
  const [sort, setSort] = useState<SortOption>("popularity");
  const [filterType, setFilterType] = useState<FilterOption>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter products
  let filteredProducts = [...products];

  if (filterType === "prescription") {
    filteredProducts = filteredProducts.filter((p) => p.isPrescriptionRequired);
  } else if (filterType === "nonPrescription") {
    filteredProducts = filteredProducts.filter(
      (p) => !p.isPrescriptionRequired
    );
  }

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  filteredProducts = filteredProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Sort products
  if (sort === "priceLow") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "priceHigh") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "newest") {
    filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
  } else {
    // Default popularity sort (bestsellers first, then by rating)
    filteredProducts.sort((a, b) => {
      if (a.bestSeller && !b.bestSeller) return -1;
      if (!a.bestSeller && b.bestSeller) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setFilterType("all");
    setCategoryFilter(null);
    setPriceRange([0, 5000]);
  };

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <>
      <Helmet>
        <title>Browse Medicines - MediQuick</title>
        <meta
          name="description"
          content="Browse and buy high-quality medicines online with quick delivery and best prices."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold font-heading">
                Browse Medicines
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-white px-3 py-2 rounded-lg border border-gray-300 shadow-sm flex items-center md:hidden"
                  onClick={toggleFilters}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                </button>
                <div className="hidden md:block relative" ref={sortRef}>
                  <button
                    className="flex items-center justify-between bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700 w-52"
                    aria-label="Sort By"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                  >
                    <span>
                      {sort === "popularity" && "Relevance"}
                      {sort === "priceLow" && "Price: Low to High"}
                      {sort === "priceHigh" && "Price: High to Low"}
                      {sort === "newest" && "Newest First"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform ml-1 ${
                        isSortOpen ? "transform rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {isSortOpen && (
                    <div className="absolute mt-1 w-52 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            sort === "popularity"
                              ? "bg-gray-100 text-primary-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setSort("popularity");
                            setIsSortOpen(false);
                          }}
                        >
                          Relevance
                        </button>
                        <button
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            sort === "priceLow"
                              ? "bg-gray-100 text-primary-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setSort("priceLow");
                            setIsSortOpen(false);
                          }}
                        >
                          Price: Low to High
                        </button>
                        <button
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            sort === "priceHigh"
                              ? "bg-gray-100 text-primary-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setSort("priceHigh");
                            setIsSortOpen(false);
                          }}
                        >
                          Price: High to Low
                        </button>
                        <button
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            sort === "newest"
                              ? "bg-gray-100 text-primary-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setSort("newest");
                            setIsSortOpen(false);
                          }}
                        >
                          Newest First
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Filter Sidebar for Desktop */}
              <div className="hidden md:block w-1/4 bg-white p-5 rounded-lg shadow-sm">
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">Category</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cat-all"
                        name="category"
                        className="text-primary-600 focus:ring-primary-500"
                        checked={categoryFilter === null}
                        onChange={() => setCategoryFilter(null)}
                      />
                      <label
                        htmlFor="cat-all"
                        className="ml-2 text-sm text-gray-700"
                      >
                        All Categories
                      </label>
                    </div>
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`cat-${index}`}
                          name="category"
                          className="text-primary-600 focus:ring-primary-500"
                          checked={categoryFilter === category}
                          onChange={() => setCategoryFilter(category)}
                        />
                        <label
                          htmlFor={`cat-${index}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Prescription
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="all-meds"
                        name="prescription"
                        className="text-primary-600 focus:ring-primary-500"
                        checked={filterType === "all"}
                        onChange={() => setFilterType("all")}
                      />
                      <label
                        htmlFor="all-meds"
                        className="ml-2 text-sm text-gray-700"
                      >
                        All Medicines
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="prescription-required"
                        name="prescription"
                        className="text-primary-600 focus:ring-primary-500"
                        checked={filterType === "prescription"}
                        onChange={() => setFilterType("prescription")}
                      />
                      <label
                        htmlFor="prescription-required"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Prescription Required
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="no-prescription"
                        name="prescription"
                        className="text-primary-600 focus:ring-primary-500"
                        checked={filterType === "nonPrescription"}
                        onChange={() => setFilterType("nonPrescription")}
                      />
                      <label
                        htmlFor="no-prescription"
                        className="ml-2 text-sm text-gray-700"
                      >
                        No Prescription Needed
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Price Range
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      ₹{priceRange[0]}
                    </span>
                    <span className="text-sm text-gray-600">
                      ₹{priceRange[1]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition duration-200"
                >
                  Clear Filters
                </button>
              </div>

              {/* Mobile Filter Modal */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-5"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                      }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Filters</h3>
                        <button
                          onClick={toggleFilters}
                          className="text-gray-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
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
                      </div>

                      <div className="mb-4 relative">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Sort By
                        </h4>
                        <button
                          className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 w-full"
                          onClick={() => setIsMobileSortOpen(!isMobileSortOpen)}
                        >
                          <span>
                            {sort === "popularity" && "Relevance"}
                            {sort === "priceLow" && "Price: Low to High"}
                            {sort === "priceHigh" && "Price: High to Low"}
                            {sort === "newest" && "Newest First"}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform ${
                              isMobileSortOpen ? "transform rotate-180" : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {/* Dropdown menu */}
                        {isMobileSortOpen && (
                          <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                              <button
                                className={`block px-4 py-2 text-sm w-full text-left ${
                                  sort === "popularity"
                                    ? "bg-gray-100 text-primary-600"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                  setSort("popularity");
                                  setIsMobileSortOpen(false);
                                }}
                              >
                                Relevance
                              </button>
                              <button
                                className={`block px-4 py-2 text-sm w-full text-left ${
                                  sort === "priceLow"
                                    ? "bg-gray-100 text-primary-600"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                  setSort("priceLow");
                                  setIsMobileSortOpen(false);
                                }}
                              >
                                Price: Low to High
                              </button>
                              <button
                                className={`block px-4 py-2 text-sm w-full text-left ${
                                  sort === "priceHigh"
                                    ? "bg-gray-100 text-primary-600"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                  setSort("priceHigh");
                                  setIsMobileSortOpen(false);
                                }}
                              >
                                Price: High to Low
                              </button>
                              <button
                                className={`block px-4 py-2 text-sm w-full text-left ${
                                  sort === "newest"
                                    ? "bg-gray-100 text-primary-600"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                  setSort("newest");
                                  setIsMobileSortOpen(false);
                                }}
                              >
                                Newest First
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Category
                        </h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="m-cat-all"
                              name="m-category"
                              className="text-primary-600 focus:ring-primary-500"
                              checked={categoryFilter === null}
                              onChange={() => setCategoryFilter(null)}
                            />
                            <label
                              htmlFor="m-cat-all"
                              className="ml-2 text-sm text-gray-700"
                            >
                              All Categories
                            </label>
                          </div>
                          {categories.map((category, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="radio"
                                id={`m-cat-${index}`}
                                name="m-category"
                                className="text-primary-600 focus:ring-primary-500"
                                checked={categoryFilter === category}
                                onChange={() => setCategoryFilter(category)}
                              />
                              <label
                                htmlFor={`m-cat-${index}`}
                                className="ml-2 text-sm text-gray-700"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Prescription
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="m-all-meds"
                              name="m-prescription"
                              className="text-primary-600 focus:ring-primary-500"
                              checked={filterType === "all"}
                              onChange={() => setFilterType("all")}
                            />
                            <label
                              htmlFor="m-all-meds"
                              className="ml-2 text-sm text-gray-700"
                            >
                              All Medicines
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="m-prescription-required"
                              name="m-prescription"
                              className="text-primary-600 focus:ring-primary-500"
                              checked={filterType === "prescription"}
                              onChange={() => setFilterType("prescription")}
                            />
                            <label
                              htmlFor="m-prescription-required"
                              className="ml-2 text-sm text-gray-700"
                            >
                              Prescription Required
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="m-no-prescription"
                              name="m-prescription"
                              className="text-primary-600 focus:ring-primary-500"
                              checked={filterType === "nonPrescription"}
                              onChange={() => setFilterType("nonPrescription")}
                            />
                            <label
                              htmlFor="m-no-prescription"
                              className="ml-2 text-sm text-gray-700"
                            >
                              No Prescription Needed
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Price Range
                        </h4>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">
                            ₹{priceRange[0]}
                          </span>
                          <span className="text-sm text-gray-600">
                            ₹{priceRange[1]}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5000"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              parseInt(e.target.value),
                            ])
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={clearFilters}
                          className="flex-1 py-3 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition duration-200"
                        >
                          Clear
                        </button>
                        <button
                          onClick={toggleFilters}
                          className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-200"
                        >
                          Apply
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Product Grid */}
              <div className="w-full md:w-3/4">
                {filteredProducts.length === 0 ? (
                  <div className="w-full bg-white p-8 rounded-lg shadow-sm text-center">
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
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      No products found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your filters or search terms
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition duration-200"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
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

export default ProductListingPage;
