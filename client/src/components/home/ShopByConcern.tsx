import { Link } from "wouter";
import { healthConcerns } from "@/data/categories";
import { motion, AnimatePresence } from "framer-motion";

const ShopByConcern = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 200,
        damping: 15
      } 
    }
  };

  const hoverEffect = {
    y: -5,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 10
    }
  };

  const imageHover = {
    scale: 1.05,
    transition: { duration: 0.5 }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-3">
            Shop by Health Concern
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

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {healthConcerns.map((concern) => (
            <motion.div
              key={concern.id}
              variants={item}
            >
              <Link href={`/medicines?concern=${concern.name.toLowerCase()}`}>
                <motion.a 
                  className="block h-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  whileHover={hoverEffect}
                >
                  <motion.div
                    className="relative h-48 overflow-hidden"
                    whileHover={imageHover}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                    <img
                      src={concern.image}
                      alt={concern.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <h3 className="text-xl font-bold text-white drop-shadow-md">
                        {concern.name}
                      </h3>
                    </div>
                  </motion.div>
                  
                  <div className="p-5">
                    <p className="text-gray-600 mb-4">{concern.description}</p>
                    <motion.div
                      className="inline-flex items-center text-primary-600 font-medium"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span>Explore solutions</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1"
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.a>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ShopByConcern;