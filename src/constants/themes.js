// src/data/themes.js
import { Gamepad2, GraduationCap, Heart, Wheat, Zap } from 'lucide-react';

const themes = [
  {
    iconComponent: GraduationCap,
    title: "AI in Education",
    description: "Personalized learning, tools for students/teachers",
    color: "from-blue-600 to-cyan-600"
  },
  {
    iconComponent: Wheat,
    title: "AI in Agriculture",
    description: "AI tools for better farming, yield, sustainability",
    color: "from-green-600 to-emerald-600"
  },
  {
    iconComponent: Heart,
    title: "AI in Healthcare",
    description: "AI for patient care, diagnostics, healthcare systems",
    color: "from-red-600 to-rose-600"
  },
  {
    iconComponent: Zap,
    title: "Speculative / Future Design",
    description: "Visionary tech + human-machine interaction",
    color: "from-orange-600 to-red-600"
  },
  {
    iconComponent: Gamepad2,
    title: "Immersive Interaction Design",
    description: "Innovative AR/VR/XR experiences",
    color: "from-purple-600 to-pink-600"
  },
];

export default themes;