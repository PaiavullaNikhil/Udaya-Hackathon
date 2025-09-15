// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Mail, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CTASection = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const screenWidth = window.innerWidth;
      const isMobileDevice = screenWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.section 
      className="relative z-10 py-20 px-4"
      initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
      whileInView={isMobile ? { opacity: 1 } : { opacity: 1 }}
      transition={isMobile ? { duration: 0 } : { duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={isMobile ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          whileInView={isMobile ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.8 }}
        >
          Ready to Innovate?
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 mb-12"
          initial={isMobile ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          whileInView={isMobile ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
          transition={isMobile ? { duration: 0 } : { delay: 0.2, duration: 0.8 }}
        >
          Don't miss out on this opportunity to showcase your skills and creativity.
        </motion.p>
        
        <motion.div 
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
          initial={isMobile ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          whileInView={isMobile ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
          transition={isMobile ? { duration: 0 } : { delay: 0.4, duration: 0.8 }}
        >
          <motion.button 
            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-black px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 border-2 border-orange-400 shadow-lg shadow-orange-500/30 relative overflow-hidden cursor-pointer"
            onClick={()=>navigate("/register")}
            whileHover={isMobile ? {} : { 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 107, 53, 0.5)"
            }}
            whileTap={isMobile ? {} : { scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={isMobile ? {} : { x: ["-100%", "100%"] }}
              transition={isMobile ? {} : { duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10 flex items-center space-x-2">
              <Rocket className="w-5 h-5" />
              <span>Register Your Team</span>
            </span>
          </motion.button>
          <motion.div 
            className="flex items-center space-x-2 text-gray-400"
            whileHover={isMobile ? {} : { scale: 1.05, color: "#FF6B35" }}
          >
            <Mail className="w-5 h-5" />
            <span>udaya1.0.hackathon@gmail.com</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTASection;