import { motion } from "framer-motion";
import { usePWA } from "@/hooks/usePWA";

const InstallPWA = () => {
  const { isInstallable, triggerInstall } = usePWA();

  if (!isInstallable) return null;

  return (
    <section className="py-6 bg-primary-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 p-6 md:p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10 md:w-2/3">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 font-heading">Install MediQuick App</h2>
            <p className="text-white text-opacity-90 mb-4">Get quick access to your medicines and health needs even when offline</p>
            <motion.button 
              className="pwa-btn bg-white text-primary-700 px-6 py-2 rounded-lg font-medium shadow-md hover:bg-gray-100 transition duration-300"
              onClick={triggerInstall}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Install Now
            </motion.button>
          </div>
          <div className="absolute right-0 bottom-0 w-32 h-32 md:w-48 md:h-48 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-full h-full text-white" viewBox="0 0 24 24">
              <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstallPWA;
