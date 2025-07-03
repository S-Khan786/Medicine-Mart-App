import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

interface AddressFormData {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
}

const initialFormData: AddressFormData = {
  name: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
  addressType: 'Home',
  isDefault: false
};

const AddressPage: React.FC = () => {
  const [location, navigate] = useLocation();
  const isEditMode = location.startsWith('/address/edit/');
  const addressId = isEditMode ? location.split('/').pop() : '';

  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode && addressId) {
      // In a real app, we would fetch the address data from the server
      // For now, let's simulate it with some dummy data
      setFormData({
        name: 'John Doe',
        phone: '9876543210',
        addressLine1: '123, Green Valley Apartments',
        addressLine2: 'Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        addressType: 'Home',
        isDefault: true
      });
    }
  }, [isEditMode, addressId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // In a real app, we would send the data to the server
      setTimeout(() => {
        setIsSubmitting(false);
        // Redirect back to the checkout page or address list
        navigate('/checkout');
      }, 1000);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isEditMode ? 'Edit Address' : 'Add New Address'} - MediQuick</title>
        <meta name="description" content="Manage your delivery addresses for faster checkout." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center mb-6">
              <button 
                className="text-gray-500 hover:text-primary-600 mr-2"
                onClick={() => navigate(-1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold font-heading">{isEditMode ? 'Edit Address' : 'Add New Address'}</h1>
            </div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="House No., Building Name"
                  />
                  {errors.addressLine1 && <p className="mt-1 text-xs text-red-500">{errors.addressLine1}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    placeholder="Area, Street, Sector, Village"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter city name"
                    />
                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter state"
                    />
                    {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="6-digit pincode"
                      maxLength={6}
                    />
                    {errors.pincode && <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Type
                  </label>
                  <div className="flex space-x-4">
                    {(['Home', 'Work', 'Other'] as const).map(type => (
                      <div key={type} className="flex items-center">
                        <input
                          type="radio"
                          id={`type-${type.toLowerCase()}`}
                          name="addressType"
                          value={type}
                          checked={formData.addressType === type}
                          onChange={handleChange}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor={`type-${type.toLowerCase()}`} className="ml-2 text-sm text-gray-700">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isDefault"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleChange}
                      className="text-primary-600 focus:ring-primary-500 h-4 w-4"
                    />
                    <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                      Set as default address
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300 flex-grow md:flex-grow-0"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : isEditMode ? 'Update Address' : 'Save Address'}
                  </button>
                  <button
                    type="button"
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition duration-300 flex-grow md:flex-grow-0"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
            
            {/* Map Placeholder */}
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Pin your location on map</h2>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-500">Map would be displayed here</p>
                    <p className="text-xs text-gray-400 mt-1">(This is a UI-only representation)</p>
                  </div>
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

export default AddressPage;
