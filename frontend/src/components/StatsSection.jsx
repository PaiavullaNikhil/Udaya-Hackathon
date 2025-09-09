 
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import stats from '../constants/stats';
import { pulseVariants } from '../utils/animations';
import AnimatedCounter from './AnimatedCounter';

const StatsSection = () => {
  return (
    <motion.section 
      className="relative z-10 py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(255, 107, 53, 0.5)"
              }}
            >
              <motion.div 
                className="text-4xl md:text-5xl font-bold text-orange-400 mb-2"
                variants={pulseVariants}
                animate="animate"
              >
                <AnimatedCounter end={stat.number} />
                {stat.suffix}
              </motion.div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;