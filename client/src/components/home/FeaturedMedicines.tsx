import { Link } from "wouter";
import ProductCard from "@/components/product/ProductCardHomePage";
import products from "@/data/products";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedMedicines = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4 relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-3">
            Top Medicines
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

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-hidden px-2"
          >
            <div
              className="flex space-x-5"
              style={{ minWidth: "min-content" }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 md:w-56 h-full"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="text-center mt-8">
          <Link href="/medicines">
            <motion.a 
              className="inline-flex items-center text-primary-600 font-medium hover:underline"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>View All Medicines</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </motion.a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMedicines;