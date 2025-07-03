import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

// Sample saved addresses
const savedAddresses: Address[] = [
  {
    id: '1',
    type: 'Home',
    name: 'John Doe',
    phone: '9876543210',
    address: '123, Green Valley Apartments, Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    isDefault: true
  },
  {
    id: '2',
    type: 'Work',
    name: 'John Doe',
    phone: '9876543210',
    address: 'Floor 5, Tech Park, Sector 15',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122001',
    isDefault: false
  }
];

type PaymentMethod = 'cod' | 'card' | 'upi' | 'wallet';

const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal } = useCart();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  const [selectedAddress, setSelectedAddress] = useState<string>(savedAddresses.find(a => a.isDefault)?.id || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  
  const deliveryFee = cartTotal >= 299 ? 0 : 40;
  const totalAmount = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = () => {
    // In a real app, we would send the order to the server
    navigate('/order-confirmation');
  };

  return (
    <>
      <Helmet>
        <title>Checkout - MediQuick</title>
        <meta name="description" content="Complete your purchase securely. Choose delivery address and payment method." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center mb-6">
              <Link href="/cart">
                <a className="text-gray-500 hover:text-primary-600 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </a>
              </Link>
              <h1 className="text-2xl font-bold font-heading">Checkout</h1>
            </div>
            
            <div className="md:flex md:space-x-6">
              <div className="md:w-2/3">
                {/* Delivery Address */}
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Delivery Address</h2>
                    <Link href="/address">
                      <a className="text-sm text-primary-600 hover:text-primary-700">+ Add New</a>
                    </Link>
                  </div>
                  
                  {savedAddresses.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-gray-600 mb-4">No saved addresses found</p>
                      <Link href="/address">
                        <a className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition duration-300">
                          Add New Address
                        </a>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedAddresses.map(address => (
                        <div 
                          key={address.id}
                          className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${selectedAddress === address.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                          onClick={() => setSelectedAddress(address.id)}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              <input 
                                type="radio" 
                                name="address" 
                                className="text-primary-600 focus:ring-primary-500"
                                checked={selectedAddress === address.id}
                                onChange={() => setSelectedAddress(address.id)}
                              />
                            </div>
                            <div className="ml-3 flex-grow">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900 mr-2">{address.name}</span>
                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">{address.type}</span>
                                {address.isDefault && (
                                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Default</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{address.phone}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                {address.address}, {address.city}, {address.state} - {address.pincode}
                              </p>
                            </div>
                            <div className="flex-shrink-0 flex space-x-2">
                              <Link href={`/address/edit/${address.id}`}>
                                <a className="text-gray-500 hover:text-primary-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
                
                {/* Order Items */}
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Order Items ({Object.keys(
                      cartItems.reduce((acc, item) => {
                        acc[item.id] = true;
                        return acc;
                      }, {} as Record<string, boolean>)
                    ).length})</h2>
                    <Link href="/cart">
                      <a className="text-sm text-primary-600 hover:text-primary-700">Edit</a>
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(
                      cartItems.reduce((acc, item) => {
                        acc[item.id] = acc[item.id] ? [...acc[item.id], item] : [item];
                        return acc;
                      }, {} as Record<string, typeof cartItems>)
                    ).map(([id, items]) => (
                      <div key={id} className="flex items-center">
                        <img src={items[0].image} alt={items[0].name} className="h-16 w-16 object-cover rounded-md mr-4" />
                        <div className="flex-grow">
                          <h3 className="text-sm font-medium text-gray-800">{items[0].name}</h3>
                          <p className="text-xs text-gray-500">{items[0].composition}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-sm font-semibold">₹{items[0].price}</span>
                            <span className="text-xs text-gray-500 ml-2">Qty: {items.length}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Payment Method */}
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                  
                  <div className="space-y-3">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${paymentMethod === 'cod' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="payment" 
                          id="payment-cod" 
                          className="text-primary-600 focus:ring-primary-500"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                        />
                        <label htmlFor="payment-cod" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                          Cash on Delivery
                        </label>
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${paymentMethod === 'card' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="payment" 
                          id="payment-card" 
                          className="text-primary-600 focus:ring-primary-500"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                        />
                        <label htmlFor="payment-card" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                          Credit / Debit Card
                        </label>
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${paymentMethod === 'upi' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="payment" 
                          id="payment-upi" 
                          className="text-primary-600 focus:ring-primary-500"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                        />
                        <label htmlFor="payment-upi" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                          UPI
                        </label>
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${paymentMethod === 'wallet' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                      onClick={() => setPaymentMethod('wallet')}
                    >
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="payment" 
                          id="payment-wallet" 
                          className="text-primary-600 focus:ring-primary-500"
                          checked={paymentMethod === 'wallet'}
                          onChange={() => setPaymentMethod('wallet')}
                        />
                        <label htmlFor="payment-wallet" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                          Wallet (PayTM / PhonePe / Amazon Pay)
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="md:w-1/3">
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6 sticky top-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Items Total</span>
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
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition duration-300"
                      onClick={handlePlaceOrder}
                      disabled={!selectedAddress}
                    >
                      Place Order
                    </button>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500">
                    <p>By placing your order, you agree to our <Link href="/terms"><a className="text-primary-600 hover:underline">Terms of Service</a></Link> and <Link href="/privacy"><a className="text-primary-600 hover:underline">Privacy Policy</a></Link>.</p>
                  </div>
                </motion.div>
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

export default CheckoutPage;
