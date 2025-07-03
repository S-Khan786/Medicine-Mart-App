import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { useState } from "react";
import { Check, ShoppingCart, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAnimating) return;
    
    addToCart(product);
    setIsAdded(true);
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsAdded(false);
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <motion.a 
        className="product-card w-full h-full flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-md transition duration-300 border border-gray-100"
        whileHover={{ y: -5 }}
      >
        <div className="relative aspect-[4/3]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <div className="flex items-center mb-1">
            {product.isPrescriptionRequired ? (
              <>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded font-medium">Rx</span>
                <span className="ml-2 text-xs text-gray-500">Prescription</span>
              </>
            ) : (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-medium">OTC</span>
            )}
          </div>
          <h3 className="font-medium text-sm mb-1 line-clamp-2 h-10 flex items-center">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2 line-clamp-2 h-10 flex items-center">
            {product.composition}
          </p>
          
          <div className="mt-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
              </div>
              
              <motion.button 
                className={`relative overflow-hidden text-xs rounded-md px-3 py-2 transition-all ${
                  isAdded 
                    ? "bg-green-500 text-white" 
                    : "bg-primary-500 hover:bg-primary-600 text-white"
                }`}
                onClick={handleAddToCart}
                disabled={isAnimating}
                whileTap={!isAnimating ? { scale: 0.95 } : {}}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.div
                      key="added"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="flex items-center justify-center gap-1"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Check size={16} />
                      </motion.div>
                      <span>Added</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="add"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="flex items-center justify-center gap-1"
                    >
                      <motion.div
                        animate={{
                          rotate: isAnimating ? 180 : 0,
                          scale: isAnimating ? 1.2 : 1
                        }}
                        transition={{ type: "spring" }}
                      >
                        <Plus size={16} />
                      </motion.div>
                      <span>Add to Cart</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Animated circle effect */}
                <AnimatePresence>
                  {isAnimating && (
                    <motion.span
                      className="absolute inset-0 rounded-md bg-white opacity-20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.a>
    </Link>
  );
};

export default ProductCard;