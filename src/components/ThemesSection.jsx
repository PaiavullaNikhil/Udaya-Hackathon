import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Wheat, Heart, Zap, Gamepad2 } from 'lucide-react';
import { floatingVariants } from '../utils/animations';
import themes from '../constants/themes';

const ThemesSection = () => {

  return (
    <motion.section 
      className="relative z-10 py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Challenge Themes
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <motion.div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20 cursor-pointer overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(255, 107, 53, 0.5)",
                boxShadow: "0 20px 40px rgba(255, 107, 53, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-0 group-hover:opacity-10 rounded-2xl`}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${theme.color.includes('orange') ? '#FF6B35' : '#8B5CF6'}, transparent)`
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.3 }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="text-orange-400 mb-4 group-hover:text-orange-300 transition-colors duration-300"
                  variants={floatingVariants}
                  animate="animate"
                >
                  {theme.icon}
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold mb-3 text-white group-hover:text-orange-100 transition-colors duration-300"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {theme.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {theme.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ThemesSection;