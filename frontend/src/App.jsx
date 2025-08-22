import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AboutSection from './components/AboutSection';
import AnimatedBackground from './components/AnimatedBackground';
import CTASection from './components/CTASection';
import FoodSection from './components/FoodSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ScheduleSection from './components/ScheduleSection';
import SponsorsSection from './components/SponsorsSection';
import StatsSection from './components/StatsSection';
import ThemesSection from './components/ThemesSection';

function App() {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <AnimatedBackground />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ThemesSection />
      <ScheduleSection />
      <FoodSection />
      <SponsorsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;