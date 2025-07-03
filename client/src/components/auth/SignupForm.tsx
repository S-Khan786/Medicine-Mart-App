import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

interface SignupFormProps {
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      const phoneValue = value.replace(/\D/g, "");
      if (phoneValue.length <= 10) {
        setFormData({ ...formData, [name]: phoneValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this data to the server
    login({ name: formData.name, phone: formData.phone });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="signupName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="signupName"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="signupPhone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="signupPhone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          placeholder="Enter your phone number"
          maxLength={10}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700 mb-1">
          Email (Optional)
        </label>
        <input
          type="email"
          id="signupEmail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          placeholder="Enter your email"
        />
      </div>
      <motion.button
        type="submit"
        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!formData.name || formData.phone.length !== 10}
      >
        Create Account
      </motion.button>
    </form>
  );
};

export default SignupForm;
