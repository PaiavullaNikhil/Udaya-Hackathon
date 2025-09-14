import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutSection from "./components/AboutSection";
import AnimatedBackground from "./components/AnimatedBackground";
import CTASection from "./components/CTASection";
import FoodSection from "./components/FoodSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import RegisterPageView from "./components/RegisterPageView";
import ScheduleSection from "./components/ScheduleSection";
import SponsorsSection from "./components/SponsorsSection";
import StatsSection from "./components/StatsSection";
import ThemesSection from "./components/ThemesSection";
import LoadingPage from "./components/LoadingPage";

const HomePage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apply.devfolio.co/v2/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <AnimatedBackground />
      <Header/>
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
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3500); // show loading for 4.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Toaster position="top-center" />
      <ReactLenis root options={{ smoothWheel: true, duration: 1.5 }}>
        {showLoading ? (
          <LoadingPage /> // 👈 shows splash screen
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPageView />} />
          </Routes>
        )}
      </ReactLenis>
    </Router>
  );
}

export default App;
