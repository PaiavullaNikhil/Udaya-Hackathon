import { motion } from "framer-motion";
import { Calendar, Clock, Sparkles, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { containerVariants, itemVariants } from "../utils/animations";
import ThreeJSLogo from "./ThreeJSLogo";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const screenWidth = window.innerWidth;
      const isMobileDevice = screenWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <section className="hero relative z-10 min-h-[85vh] flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-12">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT: TEXT CONTENT */}
        <motion.div
          className="text-center lg:text-left"
          variants={isMobile ? {} : containerVariants}
          initial={isMobile ? { opacity: 1 } : "hidden"}
          animate={isMobile ? { opacity: 1 } : "visible"}
        >
          {/* Title with sparkle effect */}
          <motion.div className="relative mb-6">
            <div className="flex items-center justify-center lg:justify-start w-full overflow-visible">
              <motion.h1
                className="font-black bg-gradient-to-r from-white via-orange-300 to-orange-500 bg-clip-text text-transparent drop-shadow-lg"
                style={{ backgroundSize: "200% 200%" }}
                initial={isMobile ? { opacity: 1 } : {}}
                animate={isMobile ? { opacity: 1, backgroundPosition: "0% 50%" } : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={isMobile ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <span className="block text-[clamp(4rem,8vw,6.5rem)] leading-tight whitespace-nowrap">
                  UDAYA 1.0
                </span>
              </motion.h1>
            </div>

            {/* Sparkles - disabled on mobile */}
            {!isMobile && [...Array(6)].map((_, i) => (
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
                  duration: 3 + i,
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
            className="text-[clamp(1.5rem,3vw,2rem)] text-orange-200 mb-6 font-medium drop-shadow-md"
            initial={isMobile ? { opacity: 1 } : {}}
            animate={isMobile ? { opacity: 1 } : { opacity: [0.8, 1, 0.8] }}
            transition={isMobile ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Intra DSI Hackathon
          </motion.p>

          {/* Info Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
            initial={isMobile ? { opacity: 1 } : "hidden"}
            whileInView={isMobile ? { opacity: 1 } : "visible"}
            viewport={{ once: true }}
          >
            {[
              { icon: Calendar, text: "September 27, 2025" },
              { icon: Clock, text: "8:30 AM - 8:30 PM" },
              { icon: Users, text: "12 Hours" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/15 backdrop-blur-sm rounded-2xl px-8 py-2 border border-orange-500/40 cursor-pointer shadow-lg shadow-orange-500/10"
                initial={isMobile ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                whileInView={isMobile ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
                transition={isMobile ? { duration: 0 } : { delay: index * 0.1, duration: 0.6 }}
                whileHover={isMobile ? {} : {
                  scale: 1.05,
                  borderColor: "rgba(255, 107, 53, 0.5)",
                  boxShadow: "0 20px 40px rgba(255, 107, 53, 0.3)",
                }}
                whileTap={isMobile ? {} : { scale: 0.95 }}
              >
                <motion.div
                  animate={isMobile ? { rotate: 0 } : { rotate: [0, 10, -10, 0] }}
                  transition={isMobile ? { duration: 0 } : {
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <item.icon className="w-8 h-8 text-orange-300 mb-2 mx-auto drop-shadow-sm" />
                </motion.div>
                <span className="text-base md:text-lg font-semibold text-white drop-shadow-sm">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Register Button */}
          <motion.div className="mt-8 md:mt-12" variants={isMobile ? {} : itemVariants} initial={isMobile ? { opacity: 1 } : {}} animate={isMobile ? { opacity: 1 } : {}}>
            <motion.button
             onClick={() => window.open("https://udaya-1-0.devfolio.co/", "_blank")}
              className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-black px-8 md:px-12 py-4 md:py-6 rounded-full text-lg md:text-xl font-bold transition-all duration-300 border-2 border-orange-400 shadow-lg shadow-orange-500/30 relative overflow-hidden"
              initial={isMobile ? { opacity: 1, scale: 1 } : {}}
              animate={isMobile ? { opacity: 1, scale: 1, boxShadow: "0 10px 20px rgba(255, 107, 53, 0.3)" } : {
                boxShadow: [
                  "0 10px 20px rgba(255, 107, 53, 0.3)",
                  "0 20px 40px rgba(255, 107, 53, 0.5)",
                  "0 10px 20px rgba(255, 107, 53, 0.3)",
                ],
              }}
              whileHover={isMobile ? {} : {
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 107, 53, 0.5)",
              }}
              whileTap={isMobile ? {} : { scale: 0.95 }}
              transition={isMobile ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={isMobile ? { x: "0%" } : { x: ["-100%", "100%"] }}
                transition={isMobile ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10">Register Now</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT: 3D LOGO */}
        <div className="relative w-full max-w-[500px] sm:max-w-[600px] xl:max-w-[700px] mx-auto h-auto overflow-visible">
          <ThreeJSLogo />
        </div>
      </div>

      {/* Scroll Down Button at center of HeroSection */}
      <motion.div
        onClick={() => {
          const hero = document.querySelector("section.hero");
          if (hero) {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            window.scrollTo({ top: heroBottom, behavior: "smooth" });
          }
        }}
        className="cursor-pointer absolute bottom-16 sm:bottom-12 md:bottom-8" // responsive positioning
        animate={isMobile ? {} : { y: [0, -15, 0] }} // Bounce up and down
        transition={isMobile ? {} : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
