import React from 'react';
import { motion } from 'framer-motion';
import Sponsors from '../constants/Sponsors';

const SponsorsSection = () => {
  return (
    <motion.section
      className="relative z-10 py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Our Sponsors
        </motion.h2>

        {/* <motion.div 
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-orange-500/20 mb-8 relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ 
            scale: 1.02,
            borderColor: "rgba(255, 107, 53, 0.5)"
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-orange-400/5"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(255, 107, 53, 0.05), rgba(255, 107, 53, 0.1))",
                "linear-gradient(90deg, rgba(255, 107, 53, 0.1), rgba(255, 107, 53, 0.05))",
                "linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(255, 107, 53, 0.1))"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Main Sponsor</h3>
            <motion.div 
              className="text-3xl font-bold text-white mb-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Gyankool Research Labs
            </motion.div>
            <p className="text-gray-400">Empowering innovation through cutting-edge research</p>
          </div>
        </motion.div> */}

        {Sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-orange-500/20 mb-8 relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{
              scale: 1.02,
              borderColor: "rgba(255, 107, 53, 0.5)"
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-orange-400/5"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(255, 107, 53, 0.05), rgba(255, 107, 53, 0.1))",
                  "linear-gradient(90deg, rgba(255, 107, 53, 0.1), rgba(255, 107, 53, 0.05))",
                  "linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(255, 107, 53, 0.1))"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">{sponsor.heading}</h3>
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {sponsor.name}
              </motion.div>
              <p className="text-gray-400">{sponsor.desc}</p>
            </div>
          </motion.div>
        ))}

        <motion.p
          className="text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          More sponsors coming soon...
        </motion.p>
      </div>
    </motion.section>
  );
};

export default SponsorsSection;