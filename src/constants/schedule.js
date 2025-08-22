import { Coffee, Users, Brain, UtensilsCrossed, Zap, Calendar } from 'lucide-react';

const schedule = [
  { time: "8:00 AM", event: "Registration & Morning Tea/Coffee", iconComponent: Coffee  },
  { time: "9:00 AM", event: "Opening Ceremony & Team Formation", iconComponent: Users  },
  { time: "10:00 AM", event: "Hackathon Begins - Ideation Phase", iconComponent: Brain  },
  { time: "12:30 PM", event: "Lunch Break", iconComponent: UtensilsCrossed  },
  { time: "2:00 PM", event: "Development Phase Continues", iconComponent: Zap  },
  { time: "5:30 PM", event: "Evening Snacks", iconComponent: Coffee  },
  { time: "7:00 PM", event: "Final Presentations", iconComponent: Users  },
  { time: "8:00 PM", event: "Results & Closing Ceremony", iconComponent: Calendar  }
];

export default schedule;