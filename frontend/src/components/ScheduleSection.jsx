import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import schedule from '../constants/schedule';

const ScheduleSection = () => {
  const [screenSize, setScreenSize] = useState('desktop');

  // Detect screen size for smoother mobile/tablet performance
  useEffect(() => {
    const updateScreen = () => {
      const width = window.innerWidth;
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Event Timeline
        </motion.h2>

        <div className="space-y-4">
          {schedule.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-6 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 cursor-pointer"
              initial={
                screenSize === 'desktop'
                  ? { x: -50, opacity: 0 }
                  : { opacity: 0.5 }
              }
              whileInView={
                screenSize === 'desktop'
                  ? { x: 0, opacity: 1 }
                  : { opacity: 1 }
              }
              transition={
                screenSize === 'desktop'
                  ? { delay: index * 0.1, duration: 0.6 }
                  : { duration: 0.5 }
              }
              whileHover={
                screenSize === 'desktop'
                  ? { scale: 1.02, borderColor: 'rgba(255, 107, 53, 0.4)', x: 10 }
                  : {}
              }
            >
              <motion.div
                className="flex items-center justify-center w-12 h-12 bg-orange-600/20 rounded-full"
                whileHover={screenSize === 'desktop' ? { rotate: 360, scale: 1.1 } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="text-orange-400">
                  <item.iconComponent className="w-6 h-6" />
                </div>
              </motion.div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <motion.span
                    className="text-lg font-semibold text-white mb-1 md:mb-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.event}
                  </motion.span>
                  <motion.span
                    className="text-orange-400 font-mono text-sm md:text-base"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {item.time}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ScheduleSection;
