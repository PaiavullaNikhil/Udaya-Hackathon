// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import stats from '../constants/stats';
import { pulseVariants } from '../utils/animations';
import AnimatedCounter from './AnimatedCounter';
import { useState, useEffect } from 'react';

const StatsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const screenWidth = window.innerWidth;
      const isMobileDevice = screenWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <motion.section 
      className="relative z-10 py-12 md:py-16 lg:py-20 px-4"
      initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
      whileInView={isMobile ? { opacity: 1 } : { opacity: 1 }}
      transition={isMobile ? { duration: 0 } : { duration: 1 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* ✅ Responsive grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white/15 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-orange-500/20 cursor-pointer"
              initial={isMobile ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              whileInView={isMobile ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
              transition={isMobile ? { duration: 0 } : { delay: index * 0.1, duration: 0.6 }}
              whileHover={isMobile ? {} : { 
                scale: 1.05,
                borderColor: "rgba(255, 107, 53, 0.5)",
                boxShadow: "0 20px 40px rgba(255, 107, 53, 0.3)",
              }}
            >
              {/* ✅ Smaller font size on mobile/tablet */}
              <motion.div 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-2"
                variants={isMobile ? {} : pulseVariants}
                animate={isMobile ? {} : "animate"}
              >
                <AnimatedCounter end={stat.number} />
                {stat.suffix}
              </motion.div>
              <div className="text-sm sm:text-base text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;
