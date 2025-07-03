import React, { useState } from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { labTests } from '@/data/categories';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Lab test categories
const labCategories = [
  'All Tests',
  'Blood',
  'Hormone',
  'Cardiac',
  'Diabetes',
  'Vitamin',
  'Organ Function',
  'Preventive Health'
];

const LabTestPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tests');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedTest, setSelectedTest] = useState<typeof labTests[0] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    address: '',
    pincode: '',
  });
  
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  // Filter tests based on search and category
  const filteredTests = labTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Tests' ? 
                          true : 
                          test.category?.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookNow = (test: typeof labTests[0]) => {
    if (isAuthenticated) {
      setSelectedTest(test);
      setShowBookingForm(true);
      
      // Pre-fill form with user data if available
      if (user) {
        setFormData(prev => ({
          ...prev,
          name: user.name || prev.name,
          phone: user.phone || prev.phone,
          email: user.email || prev.email
        }));
      }
    } else {
      toast({
        title: "Login Required",
        description: "Please login to book a lab test",
        variant: "destructive"
      });
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would make the API call to submit the booking
    
    toast({
      title: "Booking Successful",
      description: `Your appointment for ${selectedTest?.name} has been scheduled.`,
    });
    
    setShowBookingForm(false);
    setSelectedTest(null);
  };

  return (
    <>
      <Helmet>
        <title>Lab Tests & Health Checkups | MediQuick</title>
        <meta
          name="description"
          content="Book lab tests and health checkups online. Blood tests, thyroid profile, full body checkup and more with home sample collection."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl md:text-3xl font-bold font-heading mb-4">
              Lab Tests & Health Checkups
            </h1>

            {/* Hero Banner */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 p-6 md:p-10">
                  <h2 className="text-2xl md:text-3xl text-gray-800 font-bold mb-3">
                    Reliable Health Tests at Home
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Get accurate lab tests with home sample collection. Receive
                    digital reports within 24-48 hours.
                  </p>
                  <div className="space-y-4 md:space-y-0 md:space-x-3 md:flex">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">NABL Certified Labs</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">Free Home Collection</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">Digital Reports</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1666214280982-206b3234468c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Lab Tests"
                    className="w-full h-48 md:h-72 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for lab tests..."
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
                {labCategories.map((category) => (
                  <motion.button
                    key={category}
                    className={`px-4 py-2 rounded-full border transition-all duration-300 font-medium text-sm md:text-base ${
                      selectedCategory === category
                        ? "bg-primary-600 text-white border-primary-600 shadow-lg"
                        : "bg-white text-gray-800 border-gray-300 hover:border-primary-500 hover:text-primary-600 hover:shadow-md"
                    }`}
                    onClick={() => setSelectedCategory(category)}
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
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Popular Health Packages */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Popular Health Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100">
                  <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                    <h3 className="font-bold text-lg text-gray-800">
                      Basic Health Checkup
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-4">
                      <div className="text-2xl font-bold text-gray-900">
                        ₹999
                      </div>
                      <div className="text-sm text-gray-500 line-through self-end">
                        ₹1499
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Complete Blood Count</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Lipid Profile</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Liver Function Test</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Kidney Function Test</span>
                      </div>
                    </div>
                    <button
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition duration-300"
                      onClick={() =>
                        handleBookNow({
                          id: "package1",
                          name: "Basic Health Checkup",
                          description:
                            "Essential health tests for routine checkup",
                          price: 999,
                          originalPrice: 1499,
                          discount: 33,
                          image: "",
                          category: "Preventive Health",
                          reportTime: "24 hours",
                          homeCollection: true,
                          prerequisites: "8-12 hours fasting required",
                        })
                      }
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100">
                  <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                    <h3 className="font-bold text-lg text-gray-800">
                      Comprehensive Checkup
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-4">
                      <div className="text-2xl font-bold text-gray-900">
                        ₹1999
                      </div>
                      <div className="text-sm text-gray-500 line-through self-end">
                        ₹3299
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Complete Blood Count</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Lipid Profile</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Liver Function Test</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Kidney Function Test</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Thyroid Profile</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Vitamin Profiles</span>
                      </div>
                    </div>
                    <button
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition duration-300"
                      onClick={() =>
                        handleBookNow({
                          id: "package2",
                          name: "Comprehensive Checkup",
                          description:
                            "Complete health assessment with 65+ parameters",
                          price: 1999,
                          originalPrice: 3299,
                          discount: 40,
                          image: "",
                          category: "Preventive Health",
                          reportTime: "48 hours",
                          homeCollection: true,
                          prerequisites: "8-12 hours fasting required",
                        })
                      }
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100">
                  <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                    <h3 className="font-bold text-lg text-gray-800">
                      Diabetes Screening
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-4">
                      <div className="text-2xl font-bold text-gray-900">
                        ₹549
                      </div>
                      <div className="text-sm text-gray-500 line-through self-end">
                        ₹849
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Fasting Blood Sugar</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Post Prandial Blood Sugar</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>HbA1c</span>
                      </div>
                    </div>
                    <button
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition duration-300"
                      onClick={() =>
                        handleBookNow({
                          id: "package3",
                          name: "Diabetes Screening",
                          description: "Blood glucose and HbA1c analysis",
                          price: 549,
                          originalPrice: 849,
                          discount: 35,
                          image: "",
                          category: "Diabetes",
                          reportTime: "24 hours",
                          homeCollection: true,
                          prerequisites: "8-12 hours fasting required",
                        })
                      }
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Tests */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {selectedCategory === "All Tests"
                  ? "All Lab Tests"
                  : `${selectedCategory} Tests`}
              </h2>

              {filteredTests.length === 0 ? (
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
                  <h3 className="text-lg font-medium mb-2">No tests found</h3>
                  <p className="text-gray-600">
                    Try changing your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTests.map((test) => (
                    <motion.div
                      key={test.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                      whileHover={{ y: -2 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-2 md:border-r p-4 flex flex-col justify-center items-center">
                          <div className="text-xl font-bold text-gray-900 mb-1">
                            ₹{test.price}
                          </div>
                          {test.discount > 0 && (
                            <div className="text-sm text-gray-500 line-through">
                              ₹{test.originalPrice}
                            </div>
                          )}
                          {test.discount > 0 && (
                            <div className="text-xs bg-accent-500 text-white px-2 py-0.5 rounded mt-1">
                              {test.discount}% OFF
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-7 p-4">
                          <h3 className="font-semibold text-lg mb-1">
                            {test.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {test.description}
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                            {test.category && (
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-gray-500 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                  />
                                </svg>
                                <span>{test.category}</span>
                              </div>
                            )}

                            {test.reportTime && (
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-gray-500 mr-1"
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
                                <span>Report: {test.reportTime}</span>
                              </div>
                            )}

                            {test.homeCollection && (
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-gray-500 mr-1"
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
                                <span>Home Collection</span>
                              </div>
                            )}

                            {test.prerequisites && (
                              <div className="flex items-center col-span-2 md:col-span-3 mt-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-amber-500 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                  />
                                </svg>
                                <span>{test.prerequisites}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-3 p-4 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-100">
                          <button
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition duration-300 mb-2"
                            onClick={() => handleBookNow(test)}
                          >
                            Book Now
                          </button>
                          <Link
                            href={`#details-${test.id}`}
                            className="text-primary-600 text-sm hover:underline"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Booking Process Info */}
            <div className="mt-12 mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                  How it Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-primary-600"
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
                    </div>
                    <h3 className="font-medium mb-2">Book a Test</h3>
                    <p className="text-sm text-gray-600">
                      Select your required tests and book an appointment online
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-primary-600"
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
                    </div>
                    <h3 className="font-medium mb-2">Sample Collection</h3>
                    <p className="text-sm text-gray-600">
                      Our phlebotomist visits your home to collect samples
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-primary-600"
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
                    </div>
                    <h3 className="font-medium mb-2">Lab Processing</h3>
                    <p className="text-sm text-gray-600">
                      Samples are processed in NABL accredited labs
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-primary-600"
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
                    <h3 className="font-medium mb-2">View Reports</h3>
                    <p className="text-sm text-gray-600">
                      Receive digital reports via email or app
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

      {/* Booking Form Modal */}
      {showBookingForm && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Book Appointment
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowBookingForm(false)}
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

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-1">{selectedTest.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedTest.description}
                </p>
                <div className="flex justify-between">
                  <div className="font-bold text-lg">₹{selectedTest.price}</div>
                  {selectedTest.discount > 0 && (
                    <div className="text-sm text-gray-500 line-through">
                      ₹{selectedTest.originalPrice}
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmitBooking}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      required
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
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Preferred Time *
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        required
                      >
                        <option value="">Select time</option>
                        <option value="6:00 AM - 8:00 AM">
                          6:00 AM - 8:00 AM
                        </option>
                        <option value="8:00 AM - 10:00 AM">
                          8:00 AM - 10:00 AM
                        </option>
                        <option value="10:00 AM - 12:00 PM">
                          10:00 AM - 12:00 PM
                        </option>
                        <option value="12:00 PM - 2:00 PM">
                          12:00 PM - 2:00 PM
                        </option>
                        <option value="4:00 PM - 6:00 PM">
                          4:00 PM - 6:00 PM
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs text-gray-500 mb-4">
                    * Note: If fasting is required for the test, please ensure
                    you have fasted for the recommended duration before the
                    appointment.
                  </p>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition duration-300"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LabTestPage;