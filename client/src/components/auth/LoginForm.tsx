import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('email');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  
  // Email login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { login } = useAuth();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setIsOtpSent(true);
      // In a real app, we would send an OTP request to the server here
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      // In a real app, we would verify the OTP with the server here
      login({ name: "Test User", phone: phoneNumber });
      onClose();
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate credentials with the server
    // For demo purposes, we'll accept any input
    login({ name: "Test User", phone: "", email: email });
    onClose();
  };

  const handleGoogleLogin = () => {
    // In a real app, we would initiate Google OAuth login here
    login({ name: "Google User", phone: "" });
    onClose();
  };

  const handleFacebookLogin = () => {
    // In a real app, we would initiate Facebook login here
    login({ name: "Facebook User", phone: "" });
    onClose();
  };

  const handleDemoLogin = () => {
    // Quick login for demonstration purposes
    login({ name: "Demo User", phone: "9876543210", email: "demo@example.com" });
    onClose();
  };

  return (
    <>
      <div className="mb-4">
        <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-4">
          <button 
            className={`flex-1 py-2 font-medium ${loginMethod === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setLoginMethod('email')}
            type="button"
          >
            Email Login
          </button>
          <button 
            className={`flex-1 py-2 font-medium ${loginMethod === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setLoginMethod('phone')}
            type="button"
          >
            Phone Login
          </button>
        </div>
        
        {loginMethod === 'email' ? (
          <form onSubmit={handleEmailLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition duration-300 mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </form>
        ) : (
          <>
            {!isOtpSent ? (
              <form onSubmit={handleSendOtp}>
                <div className="mb-4">
                  <label htmlFor="loginPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="loginPhone"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    placeholder="Enter your phone number"
                    maxLength={10}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition duration-300 mb-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={phoneNumber.length !== 10}
                >
                  Send OTP
                </motion.button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="mb-4">
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                    Enter OTP sent to {phoneNumber}
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-center text-lg letter-spacing-wide"
                    placeholder="******"
                    maxLength={6}
                    required
                  />
                  <div className="mt-2 text-right">
                    <button
                      type="button"
                      className="text-primary-600 text-sm hover:underline"
                      onClick={() => setIsOtpSent(false)}
                    >
                      Change Phone Number
                    </button>
                  </div>
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition duration-300 mb-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={otp.length !== 6}
                >
                  Verify & Login
                </motion.button>
              </form>
            )}
          </>
        )}
        
        <button
          onClick={handleDemoLogin}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition duration-300 mb-4"
        >
          Quick Demo Login
        </button>
      </div>

      <div className="relative flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600 text-sm">or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="mb-4">
        <motion.button
          type="button"
          className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Google</span>
        </motion.button>
      </div>

      <div>
        <motion.button
          type="button"
          className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
          onClick={handleFacebookLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Facebook</span>
        </motion.button>
      </div>
    </>
  );
};

export default LoginForm;
