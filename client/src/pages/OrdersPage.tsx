import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/auth/LoginModal';

// Sample order data for UI-only implementation
const sampleOrders = [
  {
    id: 'MQ872456',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: 'Delivered',
    items: [
      { id: '1', name: 'Novamox 500mg Capsule', quantity: 2, price: 85 },
      { id: '2', name: 'Crocin Pain Relief Tablet', quantity: 1, price: 45 }
    ],
    total: 215,
    address: 'Home, 123 Green Valley Apartments, Mumbai - 400001',
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'MQ786123',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    status: 'Delivered',
    items: [
      { id: '3', name: 'HealthVit Vitamin C Tablets', quantity: 1, price: 299 },
      { id: '7', name: 'Dettol Antiseptic Liquid', quantity: 1, price: 190 }
    ],
    total: 489,
    address: 'Work, Floor 5, Tech Park, Sector 15, Gurugram - 122001',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'MQ654789',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    status: 'Delivered',
    items: [
      { id: '5', name: 'Accu-Check Active Glucometer', quantity: 1, price: 1350 }
    ],
    total: 1350,
    address: 'Home, 123 Green Valley Apartments, Mumbai - 400001',
    paymentMethod: 'UPI'
  }
];

const OrdersPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>My Orders - MediQuick</title>
          <meta name="description" content="View and track your medicine orders. Check delivery status and reorder your previous purchases." />
        </Helmet>

        <div className="flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-grow bg-gray-50">
            <div className="container mx-auto px-4 py-12">
              <div className="bg-white rounded-xl shadow-sm max-w-md mx-auto p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 className="text-xl font-medium mb-2">Please login to view your orders</h2>
                <p className="text-gray-600 mb-6">You need to be logged in to access your order history</p>
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
          
          {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Orders - MediQuick</title>
        <meta name="description" content="View and track your medicine orders. Check delivery status and reorder your previous purchases." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 font-heading">My Orders</h1>
            
            {sampleOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
                <Link href="/medicines">
                  <a className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                    Browse Medicines
                  </a>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {sampleOrders.map((order, index) => (
                  <motion.div 
                    key={order.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                            <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : order.status === 'Processing' 
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'Shipped'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Ordered on: {order.date.toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div className="mt-3 md:mt-0 flex space-x-3">
                          <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                            </svg>
                            Download Invoice
                          </button>
                          <button className="text-sm bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded transition duration-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reorder
                          </button>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 -mx-6 px-6 py-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-800">{item.quantity}x</span>
                              <span className="ml-2">{item.name}</span>
                            </div>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-200 -mx-6 px-6 py-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Total Amount:</span>
                          <span className="font-semibold">₹{order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Payment Method:</span>
                          <span>{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivered To:</span>
                          <span className="text-right max-w-xs">{order.address}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-center">
                        <Link href={`/order-details/${order.id}`}>
                          <a className="text-primary-600 hover:text-primary-700 text-sm font-medium hover:underline">View Order Details</a>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
        
        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default OrdersPage;
