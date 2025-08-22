import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="relative z-10 py-12 px-4 border-t border-orange-500/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          className="text-2xl font-bold text-orange-400 mb-4"
          animate={{
            textShadow: [
              "0 0 10px rgba(255, 107, 53, 0.5)",
              "0 0 20px rgba(255, 107, 53, 0.8)",
              "0 0 10px rgba(255, 107, 53, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          UDAYA 1.0
        </motion.div>
        <p className="text-gray-400">
          © 2025 Udaya Hackathon. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;