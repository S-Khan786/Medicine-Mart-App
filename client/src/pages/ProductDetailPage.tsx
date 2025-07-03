import React, { useState } from "react";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ProductCard from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import products from "@/data/products";

const ProductDetailPage: React.FC = () => {
  const [location] = useLocation();
  const productId = location.split("/").pop();
  const product = products.find((p) => p.id === productId);

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<
    "description" | "details" | "side-effects"
  >("description");
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [pincode, setPincode] = useState("");
  const [isPincodeAvailable, setIsPincodeAvailable] = useState<boolean | null>(
    null
  );

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/medicines">
              <a className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                Browse Medicines
              </a>
            </Link>
          </div>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handlePincodeCheck = () => {
    // In a real app, we would check availability with the backend
    // For now, we'll just simulate a check based on the first digit
    if (pincode.length === 6) {
      const firstDigit = parseInt(pincode[0]);
      setIsPincodeAvailable(firstDigit % 2 === 0); // Even numbers are available
    }
  };

  const handleAddToCart = () => {
    if (product.isPrescriptionRequired) {
      setShowPrescriptionModal(true);
    } else {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const handlePrescriptionUpload = () => {
    // In a real app, we would handle the file upload
    setShowPrescriptionModal(false);
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - MediQuick</title>
        <meta
          name="description"
          content={`Buy ${product.name} online. ${
            product.composition
          }. ${product.description.substring(0, 150)}...`}
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm breadcrumbs">
              <ul className="flex items-center space-x-2">
                <li>
                  <Link href="/">
                    <a className="text-gray-500 hover:text-primary-600">Home</a>
                  </Link>
                </li>
                <li className="text-gray-500">/</li>
                <li>
                  <Link href="/medicines">
                    <a className="text-gray-500 hover:text-primary-600">
                      Medicines
                    </a>
                  </Link>
                </li>
                <li className="text-gray-500">/</li>
                <li>
                  <Link
                    href={`/medicines?category=${product.category.toLowerCase()}`}
                  >
                    <a className="text-gray-500 hover:text-primary-600">
                      {product.category}
                    </a>
                  </Link>
                </li>
                <li className="text-gray-500">/</li>
                <li className="text-gray-800 font-medium truncate">
                  {product.name}
                </li>
              </ul>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/3 p-6">
                  <motion.div
                    className="rounded-lg overflow-hidden bg-gray-100 p-4 flex items-center justify-center h-64"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </motion.div>
                </div>
                <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l border-gray-200">
                  <div className="flex flex-wrap items-center mb-2">
                    {product.bestSeller && (
                      <span className="bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded mr-2">
                        BESTSELLER
                      </span>
                    )}
                    {product.isPrescriptionRequired ? (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Prescription Required
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        No Prescription Needed
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h1>

                  <p className="text-gray-600 mb-4">{product.composition}</p>

                  {product.rating && (
                    <div className="flex items-center mb-4">
                      <div className="flex text-accent-500">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? "fill-current"
                                : "stroke-current fill-none"
                            }`}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  )}

                  <div className="flex items-center mb-6">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <>
                        <span className="text-lg text-gray-500 line-through ml-2">
                          ₹{product.originalPrice}
                        </span>
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {product.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col [@media(min-width:400px)]:flex-row items-start [@media(min-width:400px)]:items-center gap-3 mb-6">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg w-full [@media(min-width:400px)]:w-auto justify-center align-center">
                      <button
                        className="px-3 py-1 text-gray-500 hover:text-primary-600 transition-colors"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        aria-label="Decrease quantity"
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
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="w-10 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        className="px-3 py-1 text-gray-500 hover:text-primary-600 transition-colors"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        aria-label="Increase quantity"
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Add to Cart and Wishlist */}
                    <div className="flex w-full [@media(min-width:400px)]:w-auto gap-2">
                      <button
                        className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition duration-300"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition duration-300">
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
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg mb-6">
                    <div className="flex items-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-600 mr-2"
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
                      <span className="text-sm font-medium">
                        100% Genuine Product
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-600 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Fast Delivery - Get it by Tomorrow
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col [@media(min-width:440px)]:flex-row items-start [@media(min-width:440px)]:items-center mb-3">
                    <span className="font-medium text-gray-800 mb-2 [@media(min-width:440px)]:mb-0 [@media(min-width:440px)]:mr-2">
                      Check Availability:
                    </span>
                    <div className="w-full [@media(min-width:440px)]:max-w-xs flex">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        placeholder="Enter Pincode"
                        value={pincode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 6) {
                            setPincode(value);
                            setIsPincodeAvailable(null);
                          }
                        }}
                        maxLength={6}
                      />
                      <button
                        className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r-lg transition duration-300"
                        onClick={handlePincodeCheck}
                        disabled={pincode.length !== 6}
                      >
                        Check
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details Tabs */}
              <div className="border-t border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    className={`px-6 py-3 text-center whitespace-nowrap font-medium text-sm ${
                      selectedTab === "description"
                        ? "text-primary-600 border-b-2 border-primary-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setSelectedTab("description")}
                  >
                    Description
                  </button>
                  <button
                    className={`px-6 py-3 text-center whitespace-nowrap font-medium text-sm ${
                      selectedTab === "details"
                        ? "text-primary-600 border-b-2 border-primary-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setSelectedTab("details")}
                  >
                    Dosage & Usage
                  </button>
                  <button
                    className={`px-6 py-3 text-center whitespace-nowrap font-medium text-sm ${
                      selectedTab === "side-effects"
                        ? "text-primary-600 border-b-2 border-primary-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setSelectedTab("side-effects")}
                  >
                    Side Effects
                  </button>
                </div>

                <div className="p-6">
                  {selectedTab === "description" && (
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">
                        Product Description
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {product.description}
                      </p>
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-1">
                          Key Benefits:
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>Effective treatment for specified conditions</li>
                          <li>Clinically tested and approved</li>
                          <li>Made with high-quality ingredients</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Key Ingredients:
                        </h4>
                        <p className="text-gray-600">{product.composition}</p>
                      </div>
                    </div>
                  )}

                  {selectedTab === "details" && (
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">
                        Dosage & Usage
                      </h3>
                      <p className="text-gray-600 mb-4">{product.dosage}</p>
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-1">
                          How to use:
                        </h4>
                        <p className="text-gray-600">{product.usage}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Storage Instructions:
                        </h4>
                        <p className="text-gray-600">
                          Store in a cool, dry place away from direct sunlight.
                          Keep out of reach of children.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedTab === "side-effects" && (
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">
                        Side Effects
                      </h3>
                      {product.sideEffects && product.sideEffects.length > 0 ? (
                        <>
                          <p className="text-gray-600 mb-4">
                            While most people do not experience side effects,
                            some people may experience the following:
                          </p>
                          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                            {product.sideEffects.map((effect, index) => (
                              <li key={index}>{effect}</li>
                            ))}
                          </ul>
                          <p className="text-gray-600">
                            If you experience any severe or persistent side
                            effects, discontinue use and consult your doctor
                            immediately.
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-600">
                          No known side effects when used as directed. However,
                          if you experience any unusual symptoms, discontinue
                          use and consult your doctor.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Special Offers */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Special Offers</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-accent-500 rounded-full p-2 mr-4 text-white">
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
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        10% off with PayTM
                      </h3>
                      <p className="text-sm text-gray-600">
                        Use code PAYTM10 at checkout
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-accent-500 rounded-full p-2 mr-4 text-white">
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
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        5% NeuCoins on MediQuick HDFC Card
                      </h3>
                      <p className="text-sm text-gray-600">
                        Get 5% NeuCoins on HDFC Bank MediQuick Credit Card
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-accent-500 rounded-full p-2 mr-4 text-white">
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Free delivery on orders above ₹299
                      </h3>
                      <p className="text-sm text-gray-600">
                        Enjoy free shipping when you order above ₹299
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Similar Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {similarProducts.map((similarProduct) => (
                    <ProductCard
                      key={similarProduct.id}
                      product={similarProduct}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>

      {/* Prescription Upload Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
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
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Prescription Required
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        This medicine requires a valid prescription. Please
                        upload a prescription to continue.
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Upload Prescription
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handlePrescriptionUpload}
                >
                  Upload & Add to Cart
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowPrescriptionModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
