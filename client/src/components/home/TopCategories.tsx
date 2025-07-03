import { Link } from "wouter";
import { motion } from "framer-motion";
import categories from "@/data/categories";

const TopCategories = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 10 } }
  };

  const hoverEffect = {
    scale: 1.05,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
      <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-3">
            Shop by Category
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              whileHover={hoverEffect}
            >
              <Link href={`/medicines?category=${category.name.toLowerCase()}`}>
                <a className="block h-full">
                  <div className="flex flex-col items-center h-full p-4 bg-white rounded-xl border border-gray-100 hover:border-primary-300 transition-all duration-300 shadow-sm hover:shadow-md">
                    <motion.div 
                      className="relative bg-primary-50 rounded-full p-3 mb-3 group"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-primary-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-16 w-16 object-contain z-10 relative"
                      />
                    </motion.div>
                    <motion.span 
                      className="text-sm md:text-base font-medium text-gray-800 text-center"
                      whileHover={{ color: "#3b82f6" }}
                      transition={{ duration: 0.2 }}
                    >
                      {category.name}
                    </motion.span>
                    <motion.div 
                      className="w-0 h-0.5 bg-primary-500 mt-1 group-hover:w-8 transition-all duration-300"
                      layout
                    />
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopCategories;