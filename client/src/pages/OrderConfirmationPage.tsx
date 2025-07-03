import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useCart } from '@/context/CartContext';

const OrderConfirmationPage: React.FC = () => {
  const { clearCart } = useCart();
  const orderId = "MQ" + Math.floor(100000 + Math.random() * 900000); // Generate random order ID
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 2); // Delivery in 2 days
  
  useEffect(() => {
    // Clear cart on successful order
    clearCart();
  }, [clearCart]);
  
  return (
    <>
      <Helmet>
        <title>Order Placed Successfully - MediQuick</title>
        <meta name="description" content="Your order has been placed successfully. Track your order status and delivery details." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-12">
            <motion.div 
              className="bg-white rounded-xl shadow-sm max-w-2xl mx-auto p-6 md:p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <div className="bg-green-100 text-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
                <p className="text-gray-600">Thank you for shopping with MediQuick</p>
              </div>
              
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-medium">{orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Date</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <p className="font-medium">Cash on Delivery</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                    <p className="font-medium">{estimatedDelivery.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  We've sent the order confirmation and details to your email. 
                  You can track your order status in the "My Orders" section.
                </p>
                
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
                  <Link href="/orders">
                    <motion.a 
                      className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Track Order
                    </motion.a>
                  </Link>
                  <Link href="/">
                    <motion.a 
                      className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue Shopping
                    </motion.a>
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <div className="max-w-2xl mx-auto mt-8">
              <div className="bg-primary-50 rounded-xl p-6 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mt-0.5 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Need Help with Your Order?</h3>
                  <p className="text-gray-600 text-sm">
                    If you have any questions or concerns about your order, please contact our customer support 
                    at <a href="mailto:support@mediquick.com" className="text-primary-600 hover:underline">support@mediquick.com</a> or 
                    call us at <a href="tel:+1800123456" className="text-primary-600 hover:underline">1800-123-456</a> (Toll-free).
                  </p>
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

export default OrderConfirmationPage;
