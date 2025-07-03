import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCardHomePage: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    
    // Reset after animation completes
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <motion.a 
        className="product-card w-full h-full flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-md transition duration-300 border border-gray-100"
        whileHover={{ y: -5 }}
      >
        <div className="relative aspect-square">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
          {product.discount > 0 && (
            <motion.div 
              className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {product.discount}% OFF
            </motion.div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center mb-2">
            {product.isPrescriptionRequired ? (
              <>
                <motion.span 
                  className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Rx
                </motion.span>
                <span className="ml-2 text-xs text-gray-500">Prescription</span>
              </>
            ) : (
              <motion.span 
                className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-medium"
                whileHover={{ scale: 1.05 }}
              >
                OTC
              </motion.span>
            )}
          </div>
          <motion.h3 
            className="font-medium text-sm mb-1 line-clamp-2 h-10 flex items-center"
            whileHover={{ color: "#10b981" }}
          >
            {product.name}
          </motion.h3>
          <p className="text-xs text-gray-500 mb-3 line-clamp-2 h-10 flex items-center">
            {product.composition}
          </p>
          
          <div className="mt-auto">
            <div className="mb-3">
              <motion.span 
                className="font-bold text-gray-800"
                whileHover={{ scale: 1.02 }}
              >
                ₹{product.price}
              </motion.span>
              {product.originalPrice > product.price && (
                <motion.span 
                  className="text-xs text-gray-500 line-through ml-1"
                  whileHover={{ scale: 1.02 }}
                >
                  ₹{product.originalPrice}
                </motion.span>
              )}
            </div>
            <motion.button 
              className="w-full flex items-center justify-center gap-1 text-sm rounded-md px-3 py-2 transition-colors relative overflow-hidden"
              initial={{ backgroundColor: "#10b981" }}
              animate={{ 
                backgroundColor: "#10b981"
              }}
              whileHover={{ 
                backgroundColor: "#10b981",
                scale: 1.02 
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.div
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-1"
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
                    className="flex items-center gap-1"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Ripple effect */}
              {isAdded && (
                <motion.span
                  className="absolute inset-0 bg-white opacity-20 rounded-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </motion.a>
    </Link>
  );
};

export default ProductCardHomePage;