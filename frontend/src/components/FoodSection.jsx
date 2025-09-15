'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import foodItems from '../constants/foodItems';
import { floatingVariants } from '../utils/animations';

const FoodSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size (similar to ScheduleSection)
  useEffect(() => {
    const updateScreen = () => {
      const width = window.innerWidth;
      const isMobileDevice =
        width < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileDevice);
    };
    updateScreen();
    window.addEventListener('resize', updateScreen);
    return () => window.removeEventListener('resize', updateScreen);
  }, []);

  return (
    <motion.section
      className="relative z-10 py-20 px-4"
      initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
      whileInView={isMobile ? { opacity: 1 } : { opacity: 1 }}
      transition={isMobile ? { duration: 0 } : { duration: 1 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          initial={isMobile ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          whileInView={isMobile ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.8 }}
        >
          Fuel Your Innovation
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {foodItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20 cursor-pointer"
              initial={isMobile ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              whileInView={isMobile ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
              transition={
                isMobile
                  ? { duration: 0 }
                  : { delay: index * 0.1, duration: 0.6 }
              }
              whileHover={
                isMobile
                  ? {}
                  : {
                      scale: 1.05,
                      borderColor: 'rgba(255, 107, 53, 0.5)',
                      boxShadow: "0 20px 40px rgba(255, 107, 53, 0.3)",
                    }
              }
            >
              {/* Floating effect only on desktop */}
              <motion.div
                variants={!isMobile ? floatingVariants : {}}
                animate={!isMobile ? 'animate' : undefined}
              >
                <item.icon className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FoodSection;