import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import LoginModal from "@/components/auth/LoginModal";
import SearchResults from "@/components/layout/SearchResults";
import { SearchResultItem } from "@/types";
import products from "@/data/products";
import categories from "@/data/categories";
import healthConcerns from "@/data/healthConcerns";
import labTests from "@/data/labTests";
import babyCareProducts from "@/data/babyCareProducts";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [location, navigate] = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { cartItems } = useCart();
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
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

  const handleSearchResults = (results: SearchResultItem[]) => {
    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  const handleResultClick = () => {
    setShowSearchResults(false);
    setSearchQuery("");
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between py-3 md:hidden">
            <div className="flex items-center">
              <button
                className="mr-2 text-gray-600"
                onClick={toggleMobileMenu}
                aria-label="Menu"
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
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
              <Link href="/" className="flex items-center">
                <svg
                  className="w-8 h-8 text-primary-500"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6h-4V2H9v4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 2h2v2h-2V8zm0 4h2v6h-2v-6zM9 4h6v2H9V4z" />
                </svg>
                <span className="ml-2 font-bold text-lg text-primary-600 font-heading">
                  MediQuick
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/medicines"
                className="text-gray-600"
                aria-label="Search"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
              <Link
                href="/cart"
                className="relative text-gray-600"
                aria-label="Shopping Cart"
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between py-4">
              <Link href="/" className="flex items-center">
                <svg
                  className="w-8 h-8 text-primary-500"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6h-4V2H9v4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 2h2v2h-2V8zm0 4h2v6h-2v-6zM9 4h6v2H9V4z" />
                </svg>
                <span className="ml-2 font-bold text-xl text-primary-600 font-heading">
                  MediQuick
                </span>
              </Link>
              <div className="flex-1 mx-8 relative">
                <div className="relative">
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      placeholder="Search medicines, brands, health issues..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                  </form>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                {isAuthenticated ? (
                  <Link href="/profile">
                    <a className="flex items-center text-gray-700 hover:text-primary-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>{user?.name || "My Account"}</span>
                    </a>
                  </Link>
                ) : (
                  <button
                    className="flex items-center text-gray-700 hover:text-primary-600"
                    onClick={toggleLoginModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Login</span>
                  </button>
                )}
                <Link href="/offers">
                  <a className="flex items-center text-gray-700 hover:text-primary-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>Offers</span>
                  </a>
                </Link>
                <Link href="/cart">
                  <a className="flex items-center text-gray-700 hover:text-primary-600">
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </div>
                  </a>
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-200 flex items-center justify-center">
              <nav className="flex space-x-14 py-3">
                <Link href="/">
                  <a
                    className={`${
                      location === "/"
                        ? "text-primary-600"
                        : "text-gray-600 hover:text-primary-600"
                    } font-medium`}
                  >
                    Home
                  </a>
                </Link>
                <Link href="/medicines">
                  <a
                    className={`${
                      location === "/medicines"
                        ? "text-primary-600"
                        : "text-gray-600 hover:text-primary-600"
                    }`}
                  >
                    Medicines
                  </a>
                </Link>
                <Link href="/healthcare">
                  <a
                    className={`${
                      location === "/healthcare"
                        ? "text-primary-600"
                        : "text-gray-600 hover:text-primary-600"
                    }`}
                  >
                    Healthcare
                  </a>
                </Link>
                <Link href="/baby-care">
                  <a
                    className={`${
                      location === "/baby-care"
                        ? "text-primary-600"
                        : "text-gray-600 hover:text-primary-600"
                    }`}
                  >
                    Baby Care
                  </a>
                </Link>
                <Link href="/lab-tests">
                  <a
                    className={`${
                      location === "/lab-tests"
                        ? "text-primary-600"
                        : "text-gray-600 hover:text-primary-600"
                    }`}
                  >
                    Lab Tests
                  </a>
                </Link>
                <Link href="/doctor-consultation">
                  <a
                    className={`${
                      location === "/doctor-consultation"
                        ? "text-primary-600"
                        : "text-gray-600 hover:text-primary-600"
                    }`}
                  >
                    Doctor Consultation
                  </a>
                </Link>
                <Link href="/health-blog">
                  <a
                    className={`${
                      location === "/health-blog"
                        ? "text-primary-600"
                        : "text-gray-600 hover:text-primary-600"
                    }`}
                  >
                    Health Blog
                  </a>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Search Results with Filters */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="fixed inset-0 top-[120px] z-30 bg-white">
          <div className="container mx-auto px-4 h-full">
            <div className="flex h-full">
              {/* Filters Panel - Always 20% width */}
              <div className="w-1/5 p-5 bg-white rounded-lg shadow-sm overflow-y-auto border-r border-gray-200">
                <h3 className="font-medium text-lg text-gray-800 mb-6">
                  Filter Results
                </h3>

                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">
                      Price Range
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        ₹{filters.priceRange[0]}
                      </span>
                      <span className="text-sm text-gray-600">
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
                    <h3 className="font-medium text-gray-800 mb-3">
                      Availability
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="in-stock"
                          className="rounded text-primary-600 focus:ring-primary-500"
                          checked={filters.inStock}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              inStock: e.target.checked,
                            })
                          }
                        />
                        <label
                          htmlFor="in-stock"
                          className="ml-2 text-sm text-gray-700"
                        >
                          In Stock Only
                        </label>
                      </div>
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
                          checked={filters.prescriptionRequired === undefined}
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
                          checked={filters.prescriptionRequired === true}
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
                          checked={filters.prescriptionRequired === false}
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
                    <h3 className="font-medium text-gray-800 mb-3">Category</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="all-categories"
                          name="category"
                          className="text-primary-600 focus:ring-primary-500"
                          checked={filters.category === ""}
                          onChange={() =>
                            setFilters({ ...filters, category: "" })
                          }
                        />
                        <label
                          htmlFor="all-categories"
                          className="ml-2 text-sm text-gray-700"
                        >
                          All Categories
                        </label>
                      </div>
                      {Array.from(new Set(products.map((p) => p.category))).map(
                        (category) => (
                          <div key={category} className="flex items-center">
                            <input
                              type="radio"
                              id={`cat-${category}`}
                              name="category"
                              className="text-primary-600 focus:ring-primary-500"
                              checked={filters.category === category}
                              onChange={() =>
                                setFilters({ ...filters, category })
                              }
                            />
                            <label
                              htmlFor={`cat-${category}`}
                              className="ml-2 text-sm text-gray-700"
                            >
                              {category}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Product Form */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">
                      Product Form
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="all-forms"
                          name="productForm"
                          className="text-primary-600 focus:ring-primary-500"
                          checked={filters.productForm === ""}
                          onChange={() =>
                            setFilters({ ...filters, productForm: "" })
                          }
                        />
                        <label
                          htmlFor="all-forms"
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
                            id={`form-${form}`}
                            name="productForm"
                            className="text-primary-600 focus:ring-primary-500"
                            checked={filters.productForm === form}
                            onChange={() =>
                              setFilters({ ...filters, productForm: form })
                            }
                          />
                          <label
                            htmlFor={`form-${form}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {form}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={clearFilters}
                    className="w-full py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition duration-200 text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Search Results - Always 80% width */}
              <div className="w-4/5 p-4 overflow-y-auto">
                <SearchResults
                  results={searchResults}
                  onResultClick={(result) => {
                    if (result.type === "product") {
                      // Pass the product data as state when navigating
                      navigate(`/product/${result.id}`, {
                        state: { product: result },
                      });
                    } else {
                      // Handle other result types normally
                      navigate(`/${result.type}/${result.id}`);
                    }
                    handleResultClick();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={toggleMobileMenu}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-3/4 max-w-xs bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <Link href="/">
                  <a className="flex items-center">
                    <svg
                      className="w-8 h-8 text-primary-500"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 6h-4V2H9v4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 2h2v2h-2V8zm0 4h2v6h-2v-6zM9 4h6v2H9V4z" />
                    </svg>
                    <span className="ml-2 font-bold text-lg text-primary-600 font-heading">
                      MediQuick
                    </span>
                  </a>
                </Link>
                <button onClick={toggleMobileMenu} className="text-gray-500">
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
            </div>
            <div className="py-4">
              {!isAuthenticated ? (
                <button
                  className="flex items-center w-full px-4 py-3 hover:bg-gray-50"
                  onClick={() => {
                    toggleMobileMenu();
                    toggleLoginModal();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Login / Signup</span>
                </button>
              ) : (
                <Link href="/profile">
                  <a className="flex items-center w-full px-4 py-3 hover:bg-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>My Account</span>
                  </a>
                </Link>
              )}
              <Link href="/">
                <a className="flex items-center w-full px-4 py-3 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Home</span>
                </a>
              </Link>
              <Link href="/medicines">
                <a className="flex items-center w-full px-4 py-3 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span>Medicines</span>
                </a>
              </Link>
              <Link href="/healthcare">
                <a className="flex items-center w-full px-4 py-3 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Healthcare</span>
                </a>
              </Link>
              <Link href="/baby-care">
                <a className="flex items-center w-full px-4 py-3 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Baby Care</span>
                </a>
              </Link>
              <Link href="/lab-tests">
                <a className="flex items-center w-full px-4 py-3 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  <span>Lab Tests</span>
                </a>
              </Link>
              <Link href="/doctor-consultation">
                <a className="flex items-center w-full px-4 py-3 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Doctor Consultation</span>
                </a>
              </Link>
              <Link href="/orders">
                <a className="flex items-center w-full px-4 py-3 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span>My Orders</span>
                </a>
              </Link>
              <Link href="/cart">
                <a className="flex items-center w-full px-4 py-3 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>Cart</span>
                </a>
              </Link>
              <Link href="/help">
                <a className="flex items-center w-full px-4 py-3 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Help</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={toggleLoginModal} />}
    </>
  );
};

export default Header;
