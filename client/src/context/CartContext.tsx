import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("mediquick_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("mediquick_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === productId);
      
      if (itemIndex !== -1) {
        const updatedCart = [...prevItems];
        const removedProduct = updatedCart[itemIndex];
        
        // Remove all instances of the product
        const filteredCart = updatedCart.filter((item) => item.id !== productId);
        
        toast({
          title: "Removed from cart",
          description: `${removedProduct.name} has been removed from your cart.`,
          duration: 2000,
        });
        
        return filteredCart;
      }
      
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (productId: string) => {
    setCartItems((prevItems) => {
      const product = prevItems.find((item) => item.id === productId);
      if (!product) return prevItems;
      
      return [...prevItems, product];
    });
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === productId);
      if (itemIndex === -1) return prevItems;
      
      const updatedCart = [...prevItems];
      updatedCart.splice(itemIndex, 1);
      return updatedCart;
    });
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);
  
  // Calculate cart count
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
