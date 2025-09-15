'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import schedule from '../constants/schedule';

const ScheduleSection = () => {
  const [screenSize, setScreenSize] = useState('desktop');
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size and set flags
  useEffect(() => {
    const updateScreen = () => {
      const width = window.innerWidth;
      const isMobileDevice =
        width < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileDevice);

      if (width < 768) setScreenSize('mobile');
      else if (width >= 768 && width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    updateScreen();
    window.addEventListener('resize', updateScreen);
    return () => window.removeEventListener('resize', updateScreen);
  }, []);

  return (
    <motion.section
      className="relative z-10 py-20 px-4"
      initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: isMobile ? 0 : 1 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          initial={isMobile ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: isMobile ? 0 : 0.8 }}
        >
          Event Timeline
        </motion.h2>

        {/* Schedule Cards */}
        <div className="flex flex-col items-center space-y-4">
          {schedule.map((item, index) => (
            <motion.div
              key={index}
              className={`flex ${
                isMobile
                  ? 'flex-row items-center justify-between space-x-4'
                  : 'flex-row items-start space-x-6'
              } bg-white/5 backdrop-blur-sm rounded-2xl px-6 md:px-8 py-4 md:py-6 border border-orange-500/20 w-full cursor-pointer`}
              initial={
                isMobile
                  ? { x: 0, opacity: 1 }
                  : screenSize === 'desktop'
                  ? { x: -50, opacity: 0 }
                  : { x: 0, opacity: 1 }
              }
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: isMobile ? 0 : 0.6,
                delay: isMobile ? 0 : index * 0.1,
              }}
              whileHover={isMobile ? {} : {
                scale: 1.02,
                borderColor: "rgba(255, 107, 53, 0.5)",
                boxShadow: "0 20px 40px rgba(255, 107, 53, 0.3)",
              }}
            >
              {/* Icon */}
              <motion.div
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-orange-600/20 rounded-full"
                whileHover={
                  !isMobile && screenSize === 'desktop'
                    ? { rotate: 360, scale: 1.1 }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                <item.iconComponent className="text-orange-400 w-5 h-5 md:w-7 md:h-7" />
              </motion.div>

              {/* Text */}
              <div
                className={`flex-1 ${
                  isMobile ? 'flex flex-row items-center justify-between' : 'flex flex-col'
                }`}
              >
                {/* Event + Time */}
                <div
                  className={`${
                    isMobile
                      ? 'flex flex-row items-center justify-between w-full gap-2'
                      : 'flex items-center justify-between mb-2'
                  }`}
                >
                  <motion.span
                    className="text-sm md:text-xl font-semibold text-white truncate"
                    initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: isMobile ? 0 : 0.2 }}
                  >
                    {item.event}
                  </motion.span>
                  <motion.span
                    className="text-orange-400 font-mono text-xs md:text-lg text-right"
                    initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: isMobile ? 0 : 0.3 }}
                  >
                    {item.time}
                  </motion.span>
                </div>

                {/* Description & Tags (Desktop/Tablet Only) */}
                {!isMobile && item.description && (
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed border-t border-orange-500/20 pt-3">
                    {item.description}
                  </p>
                )}
                {!isMobile && item.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ScheduleSection;
