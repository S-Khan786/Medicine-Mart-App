import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import HeroBanner from "@/components/home/HeroBanner";
import TopCategories from "@/components/home/TopCategories";
import ShopByConcern from "@/components/home/ShopByConcern";
import FeaturedMedicines from "@/components/home/FeaturedMedicines";
import DoctorConsultation from "@/components/home/DoctorConsultation";
import LabTests from "@/components/home/LabTests";
import InstallPWA from "@/components/home/InstallPWA";
import SearchResults from "@/components/layout/SearchResults";
import products from "@/data/products";
import categories from "@/data/categories";
import healthConcerns from "@/data/healthConcerns";
import labTests from "@/data/labTests";
import babyCareProducts from "@/data/babyCareProducts";
import { motion, AnimatePresence } from "framer-motion";

type SearchResultItem = {
  id: string;
  name: string;
  type: string;
  [key: string]: any;
};

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    inStock: false,
    prescriptionRequired: undefined,
    category: "",
    usage: "",
    productForm: "",
  });
  const [location, navigate] = useLocation();

  const performSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Search across different data types
    const productResults = products
    .filter(
      (product) =>
        (product.name.toLowerCase().includes(lowerQuery) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(lowerQuery)
          ) ||
          product.description.toLowerCase().includes(lowerQuery) ||
          product.usage.toLowerCase().includes(lowerQuery)) &&
        filters.priceRange[0] <= product.price &&
        product.price <= filters.priceRange[1] &&
        (!filters.inStock || product.stock > 0) &&
        (filters.prescriptionRequired === undefined || 
         product.isPrescriptionRequired === filters.prescriptionRequired) && // Updated this line
        (!filters.category || product.category === filters.category) &&
        (!filters.usage ||
          product.usage
            .toLowerCase()
            .includes(filters.usage.toLowerCase())) &&
        (!filters.productForm || product.tags.includes(filters.productForm))
    )
    .map((r) => ({ ...r, type: "product" }));

    const categoryResults = categories
      .filter(
        (category) =>
          category.name.toLowerCase().includes(lowerQuery) ||
          category.description.toLowerCase().includes(lowerQuery)
      )
      .map((r) => ({ ...r, type: "category" }));

    const healthConcernResults = healthConcerns
      .filter(
        (concern) =>
          concern.name.toLowerCase().includes(lowerQuery) ||
          concern.description.toLowerCase().includes(lowerQuery)
      )
      .map((r) => ({ ...r, type: "healthConcern" }));

    const labTestResults = labTests
      .filter(
        (test) =>
          test.name.toLowerCase().includes(lowerQuery) ||
          test.description.toLowerCase().includes(lowerQuery)
      )
      .map((r) => ({ ...r, type: "labTest" }));

    const babyCareResults = babyCareProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery)
      )
      .map((r) => ({ ...r, type: "babyCare" }));

    const results = [
      ...productResults,
      ...categoryResults,
      ...healthConcernResults,
      ...labTestResults,
      ...babyCareResults,
    ];

    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };

  const handleResultClick = () => {
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 5000],
      inStock: false,
      prescriptionRequired: false,
      category: "",
      usage: "",
      productForm: "",
    });
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  }, [filters]);

  return (
    <>
      <Helmet>
        <title>MediQuick - Online Medicine Delivery</title>
        <meta
          name="description"
          content="Buy medicines online with fast delivery and amazing discounts. Choose from a wide range of medicines, health products, and more."
        />
        <meta
          property="og:title"
          content="MediQuick - Online Medicine Delivery"
        />
        <meta
          property="og:description"
          content="Buy medicines online with fast delivery and amazing discounts"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mediquick.com" />
        <meta property="og:image" content="/icons/icon-512x512.png" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          {/* Mobile-only search bar */}
          <div className="md:hidden px-4 py-3 bg-white shadow-sm">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medicines & health products"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() =>
                    searchQuery &&
                    !showSearchResults &&
                    performSearch(searchQuery)
                  }
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
                {searchQuery && (
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-400"
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchResults(false);
                    }}
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </form>

            {/* Search Results Container - Now positioned below the search bar */}
            <AnimatePresence>
              {showSearchResults && searchResults.length > 0 && (
                <motion.div
                  className="relative z-30 bg-white mt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="pt-2">
                    <div className="flex items-center mb-2">
                      <button
                        className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full mr-2"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
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
                    </div>

                    {/* Mobile Filters Panel */}
                    {showFilters && (
                      <motion.div
                        className="bg-white p-4 rounded-lg shadow-sm mb-2 border border-gray-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="space-y-4">
                          {/* Price Range */}
                          <div>
                            <h3 className="font-medium text-gray-800 mb-2">
                              Price Range
                            </h3>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600">
                                ₹{filters.priceRange[0]}
                              </span>
                              <span className="text-xs text-gray-600">
                                ₹{filters.priceRange[1]}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="5000"
                              value={filters.priceRange[1]}
                              onChange={(e) =>
                                setFilters({
                                  ...filters,
                                  priceRange: [
                                    filters.priceRange[0],
                                    parseInt(e.target.value),
                                  ],
                                })
                              }
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>

                          {/* Availability */}
                          <div>
                            <h3 className="font-medium text-gray-800 mb-2">
                              Availability
                            </h3>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="mobile-in-stock"
                                className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                                checked={filters.inStock}
                                onChange={(e) =>
                                  setFilters({
                                    ...filters,
                                    inStock: e.target.checked,
                                  })
                                }
                              />
                              <label
                                htmlFor="mobile-in-stock"
                                className="ml-2 text-sm text-gray-700"
                              >
                                In Stock Only
                              </label>
                            </div>
                          </div>

                          {/* Prescription Required */}
                          <div>
                            <h3 className="font-medium text-gray-800 mb-3">
                              Prescription
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="all-medicines"
                                  name="prescription"
                                  className="text-primary-600 focus:ring-primary-500"
                                  checked={
                                    filters.prescriptionRequired === undefined
                                  }
                                  onChange={() =>
                                    setFilters({
                                      ...filters,
                                      prescriptionRequired: undefined,
                                    })
                                  }
                                />
                                <label
                                  htmlFor="all-medicines"
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
                                  checked={
                                    filters.prescriptionRequired === true
                                  }
                                  onChange={() =>
                                    setFilters({
                                      ...filters,
                                      prescriptionRequired: true,
                                    })
                                  }
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
                                  checked={
                                    filters.prescriptionRequired === false
                                  }
                                  onChange={() =>
                                    setFilters({
                                      ...filters,
                                      prescriptionRequired: false,
                                    })
                                  }
                                />
                                <label
                                  htmlFor="no-prescription"
                                  className="ml-2 text-sm text-gray-700"
                                >
                                  No Prescription Required
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Category */}
                          <div>
                            <h3 className="font-medium text-gray-800 mb-2">
                              Category
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="mobile-all-categories"
                                  name="mobile-category"
                                  className="text-primary-600 focus:ring-primary-500 h-4 w-4"
                                  checked={filters.category === ""}
                                  onChange={() =>
                                    setFilters({ ...filters, category: "" })
                                  }
                                />
                                <label
                                  htmlFor="mobile-all-categories"
                                  className="ml-2 text-sm text-gray-700"
                                >
                                  All Categories
                                </label>
                              </div>
                              {Array.from(
                                new Set(products.map((p) => p.category))
                              ).map((category) => (
                                <div
                                  key={category}
                                  className="flex items-center"
                                >
                                  <input
                                    type="radio"
                                    id={`mobile-cat-${category}`}
                                    name="mobile-category"
                                    className="text-primary-600 focus:ring-primary-500 h-4 w-4"
                                    checked={filters.category === category}
                                    onChange={() =>
                                      setFilters({ ...filters, category })
                                    }
                                  />
                                  <label
                                    htmlFor={`mobile-cat-${category}`}
                                    className="ml-2 text-sm text-gray-700"
                                  >
                                    {category}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Product Form */}
                          <div>
                            <h3 className="font-medium text-gray-800 mb-2">
                              Product Form
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="mobile-all-forms"
                                  name="mobile-productForm"
                                  className="text-primary-600 focus:ring-primary-500 h-4 w-4"
                                  checked={filters.productForm === ""}
                                  onChange={() =>
                                    setFilters({ ...filters, productForm: "" })
                                  }
                                />
                                <label
                                  htmlFor="mobile-all-forms"
                                  className="ml-2 text-sm text-gray-700"
                                >
                                  All Forms
                                </label>
                              </div>

                              {[
                                "Tablet",
                                "Capsule",
                                "Syrup",
                                "Cream",
                                "Lotion",
                                "Device",
                              ].map((form) => (
                                <div key={form} className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`mobile-form-${form}`}
                                    name="mobile-productForm"
                                    className="text-primary-600 focus:ring-primary-500 h-4 w-4"
                                    checked={filters.productForm === form}
                                    onChange={() =>
                                      setFilters({
                                        ...filters,
                                        productForm: form,
                                      })
                                    }
                                  />
                                  <label
                                    htmlFor={`mobile-form-${form}`}
                                    className="ml-2 text-sm text-gray-700"
                                  >
                                    {form}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={clearFilters}
                              className="flex-1 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition duration-200 text-sm"
                            >
                              Clear
                            </button>
                            <button
                              onClick={() => setShowFilters(false)}
                              className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-200 text-sm"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Search Results List */}
                    <div className="max-h-[60vh] overflow-y-auto border border-gray-200 rounded-lg">
                      <SearchResults
                        results={searchResults}
                        onResultClick={(result) => {
                          if (result.type === "product") {
                            navigate(`/product/${result.id}`, {
                              state: { product: result },
                            });
                          } else {
                            navigate(`/${result.type}/${result.id}`);
                          }
                          handleResultClick();
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!showSearchResults && (
            <>
              <HeroBanner />
              <TopCategories />
              <ShopByConcern />
              <FeaturedMedicines />
              <DoctorConsultation />
              <LabTests />
              <InstallPWA />
            </>
          )}
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default HomePage;
