import React, { useState } from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { healthConcerns } from '@/data/categories';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { ShoppingCart, Check } from 'lucide-react';

// Sample healthcare products
const healthcareProducts: Product[] = [
  {
    id: 'hc1',
    name: 'Blood Pressure Monitor',
    composition: 'Digital device',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b9a37?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600',
    isPrescriptionRequired: false,
    tags: ['healthcare', 'cardiac care', 'device'],
    stock: 15,
    category: 'Healthcare',
    description: 'Automatic digital BP monitor for accurate readings at home',
    dosage: 'N/A',
    sideEffects: [],
    usage: 'Follow user manual for correct usage',
    bestSeller: true,
    rating: 4.5,
    reviews: 123
  },
  {
    id: 'hc2',
    name: 'Digital Thermometer',
    composition: 'Electronic device',
    price: 299,
    originalPrice: 499,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600',
    isPrescriptionRequired: false,
    tags: ['healthcare', 'fever', 'device'],
    stock: 50,
    category: 'Healthcare',
    description: 'Accurate digital thermometer with backlight display',
    dosage: 'N/A',
    sideEffects: [],
    usage: 'Clean with alcohol before and after use',
    bestSeller: false,
    rating: 4.3,
    reviews: 89
  },
  {
    id: 'hc3',
    name: 'Pulse Oximeter',
    composition: 'Electronic device',
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1584308878768-57d3ebb77161?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600',
    isPrescriptionRequired: false,
    tags: ['healthcare', 'respiratory', 'device'],
    stock: 20,
    category: 'Healthcare',
    description: 'Fingertip pulse oximeter for measuring oxygen saturation and pulse rate',
    dosage: 'N/A',
    sideEffects: [],
    usage: 'Place on fingertip for reading',
    bestSeller: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 'hc4',
    name: 'First Aid Kit',
    composition: 'Multiple medical supplies',
    price: 699,
    originalPrice: 999,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600',
    isPrescriptionRequired: false,
    tags: ['healthcare', 'emergency', 'kit'],
    stock: 25,
    category: 'Healthcare',
    description: 'Comprehensive first aid kit for home and travel',
    dosage: 'N/A',
    sideEffects: [],
    usage: 'Refer to enclosed booklet for proper use of contents',
    bestSeller: false,
    rating: 4.4,
    reviews: 72
  },
  {
    id: 'hc5',
    name: 'Nebulizer',
    composition: 'Electronic device',
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1584308666409-2ba472ab678f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600',
    isPrescriptionRequired: false,
    tags: ['healthcare', 'respiratory', 'device'],
    stock: 10,
    category: 'Healthcare',
    description: 'Portable nebulizer for respiratory medication delivery',
    dosage: 'N/A',
    sideEffects: [],
    usage: 'Clean after each use',
    bestSeller: false,
    rating: 4.6,
    reviews: 45
  },
  {
    id: 'hc6',
    name: 'Orthopedic Back Support',
    composition: 'Elastic material with support panels',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1594824483967-74c92bc85358?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600',
    isPrescriptionRequired: false,
    tags: ['healthcare', 'orthopedic', 'support'],
    stock: 18,
    category: 'Healthcare',
    description: 'Lumbar support belt for back pain relief',
    dosage: 'N/A',
    sideEffects: [],
    usage: 'Wear over clothing, do not overtighten',
    bestSeller: false,
    rating: 4.2,
    reviews: 67
  }
];

const HealthcarePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  // Filter products based on search and category
  const filteredProducts = healthcareProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory ? 
                          product.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase()) ||
                          product.category.toLowerCase() === selectedCategory.toLowerCase() : 
                          true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Healthcare Products | MediQuick</title>
        <meta name="description" content="Shop for the best healthcare devices and supplies. Medical devices, first aid supplies, mobility aids, and more." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl md:text-3xl font-bold font-heading mb-4">Healthcare Products</h1>
            
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search healthcare products..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Browse by Health Concern</h2>
              <motion.div 
  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-50px" }}
>
  {healthConcerns.map((concern, index) => (
    <motion.div
      key={concern.id}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { 
            type: "spring",
            stiffness: 300,
            damping: 15
          }
        }
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
        boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div
        className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
          selectedCategory === concern.name.toLowerCase()
            ? "ring-2 ring-primary-500 ring-offset-2"
            : ""
        }`}
        onClick={() =>
          setSelectedCategory(
            selectedCategory === concern.name.toLowerCase()
              ? null
              : concern.name.toLowerCase()
          )
        }
      >
        {/* Image with parallax effect */}
        <motion.div 
          className="aspect-w-16 aspect-h-9 relative overflow-hidden"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={concern.image}
            alt={concern.name}
            className="object-cover h-40 w-full"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400";
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
          
          {/* Shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0"
            whileHover={{
              opacity: 0.6,
              x: ["-100%", "100%"],
              transition: { duration: 1.5 }
            }}
          />
        </motion.div>

        {/* Concern name with fade-in animation */}
        <motion.div 
          className="absolute inset-0 flex items-end justify-center pb-4 px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-white font-semibold text-center text-sm md:text-base drop-shadow-lg bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 w-full mx-2">
            {concern.name}
          </h3>
        </motion.div>

        {/* Active indicator with pulse animation */}
        {selectedCategory === concern.name.toLowerCase() && (
          <motion.div 
            className="absolute top-3 right-3 w-3 h-3 bg-primary-400 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
    </motion.div>
  ))}
</motion.div>
            </div>
            
            {/* Products */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : 'All Healthcare Products'}
                </h2>
                {selectedCategory && (
                  <button 
                    className="text-primary-600 font-medium flex items-center"
                    onClick={() => setSelectedCategory(null)}
                  >
                    <span>Clear Filter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-gray-600">Try changing your search or filter criteria</p>
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
                            e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";
                          }}
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-2 left-2 bg-accent-500 text-white text-xs font-bold rounded-full px-2 py-1">
                            {product.discount}% OFF
                          </div>
                        )}
                        {product.bestSeller && (
                          <div className="absolute top-2 right-2 bg-secondary-500 text-white text-xs font-bold rounded-full px-2 py-1">
                            BESTSELLER
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.description.substring(0, 60)}...</p>
                        
                        <div className="flex items-center mb-2">
                          <div className="flex text-accent-500">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                            {product.discount > 0 && (
                              <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <motion.button 
                        className={`w-full py-2 rounded-lg font-medium relative overflow-hidden ${
                          addedProductId === product.id 
                            ? 'bg-green-600 text-white' 
                            : 'bg-primary-500 hover:bg-primary-600 text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        whileTap={addedProductId === product.id ? {} : { scale: 0.95 }}
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
            
            {/* CTA Banner */}
            <div className="mt-12 mb-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 p-6 md:p-10 relative z-10">
                  <h2 className="text-2xl md:text-3xl text-white font-bold mb-3">Need healthcare guidance?</h2>
                  <p className="text-white text-opacity-90 mb-6">Schedule a virtual consultation with our healthcare experts for personalized advice.</p>
                  <Link href="/doctor-consultation" className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-medium shadow-md hover:bg-gray-100 transition duration-300">
                    Book Consultation
                  </Link>
                </div>
                <div className="md:w-1/3 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                    alt="Healthcare Consultation" 
                    className="w-full h-48 md:h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80";
                    }}
                  />
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

export default HealthcarePage;