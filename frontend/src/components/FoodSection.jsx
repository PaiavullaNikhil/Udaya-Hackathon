import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, UtensilsCrossed } from 'lucide-react';
import { floatingVariants } from '../utils/animations';
import foodItems from '../constants/foodItems';

const FoodSection = () => {

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
          Fuel Your Innovation
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {foodItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(255, 107, 53, 0.5)"
              }}
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
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