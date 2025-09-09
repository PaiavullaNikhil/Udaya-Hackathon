// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <motion.section 
      className="relative z-10 py-20 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        >
          Shape the Future
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Join us for an intensive 12-hour hackathon where innovation meets imagination. 
          Collaborate with brilliant minds, push technological boundaries, and create solutions 
          that will shape tomorrow's world.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default AboutSection;