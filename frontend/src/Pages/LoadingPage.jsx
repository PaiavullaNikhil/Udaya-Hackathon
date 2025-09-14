import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

const LoadingPage = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const canvasRef = useRef(null);

  // Disable scrolling during loading
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // Prevent scrolling
    return () => {
      document.body.style.overflow = originalOverflow; // Restore
    };
  }, []);

  // Optional subtle star background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger fade-out after some delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => navigate("/"), 1200);
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const itemVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black px-4 overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground className="absolute inset-0 w-full h-full z-0" />

      {/* Optional subtle starfield on top of animated background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 opacity-20" />

      {/* Main content */}
      <motion.div
        className="relative z-20 flex flex-col items-center gap-6 md:gap-8 text-center"
        initial="initial"
        animate={fadeOut ? "exit" : "animate"}
        variants={{
          initial: {},
          animate: {},
          exit: {},
        }}
      >
        {/* College Logo */}
        <motion.img
          src="/DSCE.png"
          alt="College Logo"
          className="h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-orange-400 shadow-lg shadow-orange-500/50"
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* College Name */}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-orange-300 tracking-wide"
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
        >
          DAYANANDA SAGAR COLLEGE OF ENGINEERING
        </motion.h2>

        {/* Department */}
        <motion.p
          className="text-lg md:text-2xl text-gray-300"
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        >
          Department of Computer Science & Design Presents
        </motion.p>

        {/* Event Logo */}
        <motion.img
          src="/Udaya.png"
          alt="UDAYA Logo"
          className="h-36 w-36 md:h-48 md:w-48 object-contain drop-shadow-2xl"
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Event Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-200 to-orange-500 bg-clip-text text-transparent drop-shadow-lg"
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
        >
          UDAYA 1.0
        </motion.h1>

        {/* Sponsors */}
        <motion.div
          className="flex flex-col items-center gap-4"
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
        >
          <span className="text-gray-400 text-lg md:text-xl font-semibold tracking-wide">
            Powered by
          </span>
          <div className="flex items-center gap-8">
            <img src="/DERBI.png" alt="DERBI" className="h-14 md:h-16 drop-shadow-lg" />
            <img src="/SAGAR.png" alt="Sagar Hospitals" className="h-14 md:h-16 drop-shadow-lg" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
