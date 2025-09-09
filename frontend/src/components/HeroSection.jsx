import { motion } from "framer-motion";
import { Calendar, Clock, Sparkles, Users } from "lucide-react";
import { containerVariants, itemVariants } from "../utils/animations";
import ThreeJSLogo from "./ThreeJSLogo";

const HeroSection = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-12">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: TEXT CONTENT */}
        <motion.div
          className="text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title with sparkle effect */}
          <motion.div className="relative mb-6">
            <motion.h1
              className="font-black bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 200%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <span className="block text-[clamp(3.5rem,12vw,7rem)] leading-tight">
                UDAYA 1.0
              </span>
            </motion.h1>

            {/* Sparkles */}
            {/* Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-orange-400"
                style={{
                  left: `${-10 + Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0],
                  x: ["0%", "10%", "-10%"],
                  y: ["0%", "-10%", "10%"],
                }}
                transition={{
                  duration: 3  + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            ))}

          </motion.div>

          <motion.p
            className="text-[clamp(1rem,3vw,2rem)] text-orange-300 mb-6 font-light"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Inter-College Hackathon
          </motion.p>

          {/* Info Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Calendar, text: "September 27, 2025" },
              { icon: Clock, text: "8 AM - 8 PM" },
              { icon: Users, text: "12 Hours" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20 cursor-pointer"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(255, 107, 53, 0.5)",
                  boxShadow: "0 20px 40px rgba(255, 107, 53, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <item.icon className="w-8 h-8 text-orange-400 mb-2 mx-auto" />
                </motion.div>
                <span className="text-base md:text-lg font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Register Button */}
          <motion.div className="mt-8 md:mt-12" variants={itemVariants}>
            <motion.button
              className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-black px-8 md:px-12 py-4 md:py-6 rounded-full text-lg md:text-xl font-bold transition-all duration-300 border-2 border-orange-400 shadow-lg shadow-orange-500/30 relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 107, 53, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 20px rgba(255, 107, 53, 0.3)",
                  "0 20px 40px rgba(255, 107, 53, 0.5)",
                  "0 10px 20px rgba(255, 107, 53, 0.3)",
                ],
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

        {/* RIGHT: 3D LOGO */}
        <div className="relative w-full max-w-[800px] mx-auto aspect-square">
          <ThreeJSLogo />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
