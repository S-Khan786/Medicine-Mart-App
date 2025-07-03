import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/auth/LoginModal";
import { useToast } from "@/hooks/use-toast";

const ProfilePage: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "account" | "address" | "orders" | "wishlist"
  >("account");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG or PNG image",
        variant: "destructive",
      });
      return;
    }

    // Check file size (e.g., 2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Create a preview of the image
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImage(event.target?.result as string);
      setIsUploading(false);
      toast({
        title: "Profile image updated",
        description: "Your profile image has been changed (local preview)",
      });
    };
    reader.readAsDataURL(file);
  };

  // For account editing (UI-only)
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would update user info here
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
      duration: 3000,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
      duration: 3000,
    });
  };

  // Sample saved addresses for UI
  const savedAddresses = [
    {
      id: "1",
      type: "Home",
      name: "John Doe",
      phone: "9876543210",
      address: "123, Green Valley Apartments, Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    },
    {
      id: "2",
      type: "Work",
      name: "John Doe",
      phone: "9876543210",
      address: "Floor 5, Tech Park, Sector 15",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122001",
      isDefault: false,
    },
  ];

  // Sample wishlist items
  const wishlistItems = [
    {
      id: "3",
      name: "HealthVit Vitamin C Tablets",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    },
    {
      id: "5",
      name: "Accu-Check Active Glucometer",
      price: 1350,
      image:
        "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    },
  ];

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>My Profile - MediQuick</title>
          <meta
            name="description"
            content="Manage your profile, view orders, saved addresses, and wishlisted items."
          />
        </Helmet>

        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow bg-gray-50">
            <div className="container mx-auto px-4 py-12">
              <div className="bg-white rounded-xl shadow-sm max-w-md mx-auto p-6 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400 mb-4"
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
                <h2 className="text-xl font-medium mb-2">
                  Please login to view your profile
                </h2>
                <p className="text-gray-600 mb-6">
                  You need to be logged in to access your profile information
                </p>
                <button
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login to continue
                </button>
              </div>
            </div>
          </main>

          <Footer />
          <MobileBottomNav />

          {showLoginModal && (
            <LoginModal onClose={() => setShowLoginModal(false)} />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Profile - MediQuick</title>
        <meta
          name="description"
          content="Manage your profile, view orders, saved addresses, and wishlisted items."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 font-heading">My Profile</h1>

            <div className="md:flex md:space-x-6">
              {/* Sidebar/Tabs */}
              <div className="md:w-1/4 mb-6 md:mb-0">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        {profileImage || user?.avatar ? (
                          <img
                            src={profileImage || user?.avatar}
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold mr-4 border border-primary-600">
                            {user?.name?.charAt(0) || "U"}
                          </div>
                        )}

                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute -bottom-1 -right-1 bg-primary-500 hover:bg-primary-600 text-white rounded-full p-1.5 cursor-pointer transition-colors"
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <svg
                              className="h-4 w-4 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                        </button>

                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/jpeg,image/png"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg">
                          {user?.name || "User"}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {user?.phone || ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <nav className="space-y-1">
                      <button
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          activeTab === "account"
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() => setActiveTab("account")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3"
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
                        Account Information
                      </button>

                      <button
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          activeTab === "address"
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() => setActiveTab("address")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Saved Addresses
                      </button>

                      <button
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          activeTab === "orders"
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() => setActiveTab("orders")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3"
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
                        My Orders
                      </button>

                      <button
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          activeTab === "wishlist"
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() => setActiveTab("wishlist")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3"
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
                        Wishlist
                      </button>

                      <button
                        className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg mt-4"
                        onClick={handleLogout}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </nav>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="md:w-3/4">
                {/* Account Information */}
                {activeTab === "account" && (
                  <motion.div
                    className="bg-white rounded-xl shadow-sm p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">
                        Account Information
                      </h2>
                      {!isEditing && (
                        <button
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={editFormData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={editFormData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                              maxLength={10}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Email (Optional)
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={editFormData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="mt-6 flex space-x-4">
                          <button
                            type="submit"
                            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition duration-300"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition duration-300"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm text-gray-500 mb-1">
                            Full Name
                          </h3>
                          <p>{user?.name || "Not provided"}</p>
                        </div>

                        <div>
                          <h3 className="text-sm text-gray-500 mb-1">
                            Phone Number
                          </h3>
                          <p>{user?.phone || "Not provided"}</p>
                        </div>

                        <div>
                          <h3 className="text-sm text-gray-500 mb-1">Email</h3>
                          <p>{user?.email || "Not provided"}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Saved Addresses */}
                {activeTab === "address" && (
                  <motion.div
                    className="bg-white rounded-xl shadow-sm p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col [@media(min-width:351px)]:flex-row justify-between items-start [@media(min-width:351px)]:items-center mb-6">
                      <h2 className="text-lg font-semibold mb-2 [@media(min-width:351px)]:mb-0">
                        Saved Addresses
                      </h2>
                      <Link href="/address">
                        <a className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-1.5 rounded text-sm font-medium transition duration-300">
                          + Add New
                        </a>
                      </Link>
                    </div>

                    <div className="space-y-4">
                      {savedAddresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4">
                          <div className="flex flex-col [@media(min-width:381px)]:flex-row justify-between mb-2">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900 mr-2">
                                {address.name}
                              </span>
                              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                {address.type}
                              </span>
                              {address.isDefault && (
                                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="flex space-x-2 mt-2 [@media(min-width:381px)]:mt-0 self-end [@media(min-width:381px)]:self-auto">
                              <Link href={`/address/edit/${address.id}`}>
                                <a className="text-gray-500 hover:text-primary-600">
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
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </a>
                              </Link>
                              <button className="text-gray-500 hover:text-red-600">
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
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {address.phone}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.address}, {address.city}, {address.state} -{" "}
                            {address.pincode}
                          </p>
                          {!address.isDefault && (
                            <button className="mt-2 text-xs text-primary-600 hover:underline">
                              Set as Default
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Orders Redirect */}
                {activeTab === "orders" && (
                  <motion.div
                    className="bg-white rounded-xl shadow-sm p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center py-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-primary-300 mb-4"
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
                      <h3 className="text-lg font-medium mb-2">
                        View Your Orders
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Track your orders, download invoices, and reorder your
                        favorite medicines
                      </p>
                      <Link href="/orders">
                        <a className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                          Go to My Orders
                        </a>
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* Wishlist */}
                {activeTab === "wishlist" && (
                  <motion.div
                    className="bg-white rounded-xl shadow-sm p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">Wishlist</h2>
                    </div>

                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 mx-auto text-gray-300 mb-4"
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
                        <h3 className="text-lg font-medium mb-2">
                          Your wishlist is empty
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Save your favorite products for future reference
                        </p>
                        <Link href="/medicines">
                          <a className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                            Browse Medicines
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {wishlistItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col [@media(min-width:578px)]:flex-row items-start justify-between border rounded-lg p-4 space-y-4 [@media(min-width:578px)]:space-y-0"
                          >
                            <div className="flex items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md mr-4"
                              />
                              <div>
                                <h3 className="font-medium text-gray-800">
                                  {item.name}
                                </h3>
                                <p className="text-primary-600 font-semibold mt-1">
                                  ₹{item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2 self-end [@media(min-width:578px)]:self-auto">
                              <button className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded text-sm transition duration-300">
                                Add to Cart
                              </button>
                              <button className="text-gray-500 hover:text-red-600">
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
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
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

export default ProfilePage;
