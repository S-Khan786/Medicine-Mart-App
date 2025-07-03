import { Link } from "wouter";
import { motion } from "framer-motion";
import { labTests } from "@/data/categories";
import { ChevronRight } from "lucide-react";

const LabTests = () => {
  // Card hover animation
  const cardHover = {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { type: "spring", stiffness: 300 }
  };

  // Button hover animation
  const buttonHover = {
    scale: 1.02,
    transition: { type: "spring", stiffness: 400 }
  };

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-3">
            Lab Tests & Health Checkups
          </h2>
          <div className="flex justify-center">
            <motion.div 
              className="w-24 h-1.5 bg-primary-500 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {labTests.map((test, index) => (
            <motion.div
              key={test.id}
              className="rounded-xl border border-gray-200 overflow-hidden bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={cardHover}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={test.image}
                  alt={test.name}
                  className="w-full h-40 object-cover"
                />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.div>
              
              <div className="p-5">
                <motion.h3 
                  className="font-semibold text-lg mb-2"
                  whileHover={{ color: "#3b82f6" }}
                  transition={{ duration: 0.2 }}
                >
                  {test.name}
                </motion.h3>
                <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  whileHover={{ scale: 1.01 }}
                >
                  <div>
                    <span className="font-bold text-primary-600 text-lg">
                      ₹{test.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₹{test.originalPrice}
                    </span>
                  </div>
                  <motion.span 
                    className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium"
                    whileHover={{ scale: 1.1 }}
                  >
                    {test.discount}% OFF
                  </motion.span>
                </motion.div>
                
                <motion.button 
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2.5 rounded-lg font-medium"
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/lab-tests">
            <motion.a 
              className="inline-flex items-center text-primary-600 font-medium hover:underline"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>View All Tests</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </motion.a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LabTests;