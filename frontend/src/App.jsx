import { ReactLenis } from "lenis/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutSection from "./components/AboutSection";
import AnimatedBackground from "./components/AnimatedBackground";
import CTASection from "./components/CTASection";
import FoodSection from "./components/FoodSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import ScheduleSection from "./components/ScheduleSection";
import SponsorsSection from "./components/SponsorsSection";
import StatsSection from "./components/StatsSection";
import ThemesSection from "./components/ThemesSection";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
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
};

function App() {
  return (
    <Router>
      <ReactLenis root options={{ smoothWheel: true, duration: 1.5 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ReactLenis>
    </Router>
  );
}

export default App;
