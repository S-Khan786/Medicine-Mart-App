import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/auth/LoginModal';

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  const validCoupons = [
    { code: 'FIRST10', discount: 10 },
    { code: 'WELCOME20', discount: 20 },
    { code: 'FREESHIP', discount: 50 }
  ];

  const deliveryFee = cartTotal >= 299 ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee - couponDiscount;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const coupon = validCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setCouponDiscount(coupon.discount);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponDiscount(0);
    }
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate('/checkout');
    }
  };

  return (
    <>
      <Helmet>
        <title>Your Cart - MediQuick</title>
        <meta
          name="description"
          content="Review and checkout items in your cart. Fast delivery and secure payment options available."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 font-heading">Your Cart</h1>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-gray-300"
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
                </div>
                <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">
                  Add medicines and healthcare products to your cart
                </p>
                <Link href="/medicines">
                  <a className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                    Browse Medicines
                  </a>
                </Link>
              </div>
            ) : (
              <div className="md:flex md:space-x-6">
                <div className="md:w-2/3">
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">
                        Cart Items ({cartItems.length})
                      </h2>
                      <button
                        className="text-sm text-red-500 hover:text-red-700"
                        onClick={clearCart}
                      >
                        Clear Cart
                      </button>
                    </div>

                    <AnimatePresence>
                      {Object.entries(
                        cartItems.reduce((acc, item) => {
                          acc[item.id] = acc[item.id]
                            ? [...acc[item.id], item]
                            : [item];
                          return acc;
                        }, {} as Record<string, typeof cartItems>)
                      ).map(([id, items]) => (
                        <CartItem
                          key={id}
                          item={items[0]}
                          quantity={items.length}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold mb-4">Apply Coupon</h2>
                    <div className="w-full">
                      <div className="flex w-full flex-shrink">
                        <input
                          type="text"
                          className="flex-grow min-w-0 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) =>
                            setCouponCode(e.target.value.toUpperCase())
                          }
                        />
                        <button
                          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r-lg transition duration-300"
                          onClick={handleApplyCoupon}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                    {couponError && (
                      <p className="mt-2 text-sm text-red-500">{couponError}</p>
                    )}
                    {couponDiscount > 0 && (
                      <p className="mt-2 text-sm text-green-600">
                        Coupon applied successfully! You saved ₹{couponDiscount}
                      </p>
                    )}

                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">
                        Available Coupons:
                      </h3>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-600 flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0"
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
                          <div className="break-words min-w-0">
                            Use code{" "}
                            <span className="font-medium text-primary-600">
                              FIRST10
                            </span>{" "}
                            to get 10% off on your first order
                          </div>
                        </li>

                        <li className="text-sm text-gray-600 flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0"
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
                          <div className="break-words min-w-0">
                            Use code{" "}
                            <span className="font-medium text-primary-600">
                              WELCOME20
                            </span>{" "}
                            for 20% off (new users only)
                          </div>
                        </li>

                        <li className="text-sm text-gray-600 flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0"
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
                          <div className="break-words min-w-0">
                            Use code{" "}
                            <span className="font-medium text-primary-600">
                              FREESHIP
                            </span>{" "}
                            for free delivery on orders below ₹299
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/3">
                  <motion.div
                    className="bg-white rounded-xl shadow-sm p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-lg font-semibold mb-4">
                      Order Summary
                    </h2>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Delivery Fee</span>
                        {deliveryFee === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          <span>₹{deliveryFee.toFixed(2)}</span>
                        )}
                      </div>
                      {couponDiscount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Coupon Discount</span>
                          <span className="text-green-600">
                            -₹{couponDiscount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>₹{finalTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition duration-300"
                      onClick={handleProceedToCheckout}
                    >
                      Proceed to Checkout
                    </button>

                    <div className="mt-4">
                      <div className="flex items-center mb-2">
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
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          Secure Checkout
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
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          Free delivery on orders above ₹299
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default CartPage;
