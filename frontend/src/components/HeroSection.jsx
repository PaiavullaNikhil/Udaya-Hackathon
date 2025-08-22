import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Sparkles } from 'lucide-react';
import { containerVariants, itemVariants } from '../utils/animations';

const HeroSection = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <motion.div 
        className="text-center max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            UDAYA 1.0
          </motion.h1>
          
          {/* Sparkle effects around title */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-orange-400"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-orange-300 mb-8 font-light"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Inter-College Hackathon
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          variants={containerVariants}
        >
          {[
            { icon: Calendar, text: "September 27, 2024" },
            { icon: Clock, text: "8 AM - 8 PM" },
            { icon: Users, text: "12 Hours" }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 107, 53, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                <item.icon className="w-6 h-6 text-orange-400" />
              </motion.div>
              <span className="text-lg font-semibold">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12"
          variants={itemVariants}
        >
          <motion.button 
            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-black px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 border-2 border-orange-400 shadow-lg shadow-orange-500/30 relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 107, 53, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 10px 20px rgba(255, 107, 53, 0.3)",
                "0 20px 40px rgba(255, 107, 53, 0.5)",
                "0 10px 20px rgba(255, 107, 53, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">Register Now</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;