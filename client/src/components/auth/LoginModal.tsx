import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
      >
        <div 
          className="absolute inset-0 bg-black bg-opacity-50" 
          onClick={onClose}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4">
          <motion.div 
            className="bg-white rounded-xl shadow-xl"
            variants={modalVariants}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={onClose}
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center font-heading">Login / Sign Up</h2>
                <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />
                
                {activeTab === 'login' ? (
                  <LoginForm onClose={onClose} />
                ) : (
                  <SignupForm onClose={onClose} />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
