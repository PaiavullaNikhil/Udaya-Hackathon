import { Brain, Calendar, Users, UtensilsCrossed, Zap } from 'lucide-react';

const schedule = [
  { time: "8:30 AM", event: "Event Officially Starts — Welcome & Instructions", iconComponent: Users },
  { time: "9:00 AM", event: "Opening Ceremony followed by Team Formation", iconComponent: Users },
  { time: "10:00 AM", event: "Hackathon Begins — Ideation Phase for All Teams", iconComponent: Brain },
  { time: "12:30 PM", event: "Lunch Break — Relax and Recharge", iconComponent: UtensilsCrossed },
  { time: "2:00 PM", event: "Development Phase Continues — Coding and Building Projects", iconComponent: Zap },
  { time: "5:30 PM", event: "Evening Snacks — Quick Refresh", iconComponent: UtensilsCrossed },
  { time: "6:00 PM", event: "Final Presentations — Each Team Presents Their Project", iconComponent: Users },
  { time: "7:30 PM", event: "Top 10 Teams Selection & Pitching Round", iconComponent: Brain },
  { time: "8:30 PM", event: "Winner Announcement & Closing Ceremony — Awards and Farewell", iconComponent: Calendar }
];

export default schedule;