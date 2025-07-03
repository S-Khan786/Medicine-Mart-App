import React from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

interface CartItemProps {
  item: Product;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, quantity }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <motion.div 
      className="flex flex-col [@media(min-width:461px)]:flex-row justify-between py-4 border-b border-gray-200 space-y-4 [@media(min-width:461px)]:space-y-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
        <div>
          <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
          <p className="text-xs text-gray-500 mb-1">{item.composition}</p>
          <div className="flex items-center">
            <span className="font-semibold text-gray-800">₹{item.price}</span>
            {item.originalPrice > item.price && (
              <span className="text-xs text-gray-500 line-through ml-2">₹{item.originalPrice}</span>
            )}
            {item.discount > 0 && (
              <span className="text-xs text-green-600 ml-2">{item.discount}% OFF</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end [@media(max-width:460px)]:flex-row [@media(max-width:460px)]:items-start [@media(max-width:460px)]:space-x-4">
  <div className="flex items-center border border-gray-300 rounded-lg mb-2 [@media(max-width:460px)]:mb-0">
    <button 
      className="px-2 py-1 text-gray-500 hover:text-primary-600 transition-colors"
      onClick={() => decreaseQuantity(item.id)}
      disabled={quantity <= 1}
      aria-label="Decrease quantity"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
      </svg>
    </button>
    <span className="w-8 text-center text-sm">{quantity}</span>
    <button 
      className="px-2 py-1 text-gray-500 hover:text-primary-600 transition-colors"
      onClick={() => increaseQuantity(item.id)}
      aria-label="Increase quantity"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
  <button 
    className="text-xs text-red-500 hover:text-red-700 transition-colors"
    onClick={() => removeFromCart(item.id)}
  >
    Remove
  </button>
</div>
    </motion.div>
  );
};

export default CartItem;
