// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import themes from '../constants/themes';
import { floatingVariants } from '../utils/animations';

const ThemesAndPrizesSection = () => {

  return (
    <motion.section 
      className="relative z-10 py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Challenge Themes & Prizes
        </motion.h2>

        <motion.div 
          className="text-center mb-20"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="text-5xl md:text-6xl font-black text-orange-400 mb-3"
          >
            ₹90,000
          </motion.div>
          <p className="text-xl text-gray-300 font-semibold">Total Prize Pool</p>
        </motion.div>
        
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
                boxShadow: "0 20px 40px rgba(255, 107, 53, 0.2)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              animate={{
                scale: 1,
                borderColor: "rgba(255, 107, 53, 0.2)",
                boxShadow: "0 0 0 rgba(255, 107, 53, 0)",
                transition: { duration: 0.3 }
              }}
            >
              {/* Background overlay */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${theme.color} rounded-2xl`}
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: 0.1,
                  transition: { duration: 0.2 }
                }}
                animate={{ 
                  opacity: 0,
                  transition: { duration: 0.3 }
                }}
              />

              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
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
                  className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-6 leading-relaxed"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {theme.description}
                </motion.p>

                <motion.div 
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full border border-orange-500/30"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.15 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                  animate={{ 
                    scale: 1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Trophy className="w-4 h-4 text-orange-400 mr-2" />
                  <span className="text-orange-300 font-semibold">{theme.prize}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ThemesAndPrizesSection;