import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  gradientFrom: string;
  gradientTo: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: "Stay Healthy, Stay Safe",
    subtitle: "Get 20% off on all health supplements",
    buttonText: "Shop Now",
    buttonLink: "/medicines?category=supplements",
    backgroundImage: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500",
    gradientFrom: "from-primary-500",
    gradientTo: "to-blue-600"
  },
  {
    id: 2,
    title: "Fast Home Delivery",
    subtitle: "Free delivery on orders above ₹299",
    buttonText: "Order Now",
    buttonLink: "/medicines",
    backgroundImage: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500",
    gradientFrom: "from-accent-500",
    gradientTo: "to-yellow-600"
  },
  {
    id: 3,
    title: "Consult with Expert Doctors",
    subtitle: "Online doctor consultation from ₹199 only",
    buttonText: "Book Now",
    buttonLink: "/doctor-consultation",
    backgroundImage: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500",
    gradientFrom: "from-secondary-500",
    gradientTo: "to-indigo-600"
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Re-enable autoplay after 5s
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Re-enable autoplay after 5s
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="bg-white py-2 md:py-4">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
            <AnimatePresence mode="wait">
              {bannerSlides.map((slide, index) => (
                index === currentSlide && (
                  <motion.div
                    key={slide.id}
                    className={`absolute inset-0 rounded-xl flex items-center overflow-hidden`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {/* Background image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url('${slide.backgroundImage}')`,
                      }}
                    />
                    
                    {/* Color overlay with gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradientFrom} ${slide.gradientTo} opacity-80`}></div>
                    
                    {/* Additional dark overlay for better text visibility */}
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    {/* Content */}
                    <div className="p-6 md:p-10 lg:p-12 relative z-10 w-full md:w-1/2 lg:w-2/5">
                      <motion.h2 
                        className="text-white text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-2 md:mb-3 leading-tight"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {slide.title}
                      </motion.h2>
                      <motion.p 
                        className="text-white text-sm sm:text-base md:text-lg mb-4 md:mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.a
                        href={slide.buttonLink}
                        className="inline-block bg-white text-primary-600 px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-medium shadow-md hover:bg-gray-100 transition duration-300 hover:scale-105 transform"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        {slide.buttonText}
                      </motion.a>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Navigation arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
              {bannerSlides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6 sm:w-8' : 'bg-white/50'}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;