import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (!isInView) return;

    const steps = isMobile ? 20 : 50; // fewer updates on mobile
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      setCount(Math.floor(progress * end));
      if (progress === 1) clearInterval(interval);
    }, (duration * 1000) / steps);

    return () => clearInterval(interval);
  }, [isInView, end, duration, isMobile]);

  return <span ref={ref}>{count}</span>;
};

export default AnimatedCounter;
