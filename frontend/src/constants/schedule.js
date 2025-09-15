import { Brain, Calendar, Users, UtensilsCrossed, Zap } from 'lucide-react';

const schedule = [
  { 
    time: "8:30 AM", 
    event: "Event Kickoff — Welcome & Briefing", 
    description: "Kick off the day with a warm welcome from the organizers, event guidelines, and an overview of the hackathon journey ahead.",
    tags: ["Opening", "Info"],
    iconComponent: Users 
  },
  { 
    time: "9:00 AM", 
    event: "Opening Ceremony", 
    description: "The official inauguration of the event, setting the tone for an exciting day of innovation and collaboration.",
    tags: ["Ceremony"],
    iconComponent: Users 
  },
  { 
    time: "10:00 AM", 
    event: "Hackathon Begins — Ideation Phase", 
    description: "Teams start brainstorming ideas, selecting problem statements, and outlining solutions before diving into development.",
    tags: ["Ideation", "Brainstorm"],
    iconComponent: Brain 
  },
  { 
    time: "12:30 PM", 
    event: "Lunch Break — Relax and Recharge", 
    description: "Take a well-deserved break to refuel with delicious food and recharge your energy for the development phase.",
    tags: ["Food", "Break"],
    iconComponent: UtensilsCrossed 
  },
  { 
    time: "2:00 PM", 
    event: "Dev Phase Continues — Coding Time", 
    description: "Put your ideas into action by writing code, building prototypes, and collaborating with your teammates to bring your vision to life.",
    tags: ["Coding", "Teamwork"],
    iconComponent: Zap 
  },
  { 
    time: "5:30 PM", 
    event: "Evening Snacks — Quick Refresh", 
    description: "Grab a quick bite to keep your energy levels high as you prepare to finalize your project before submission.",
    tags: ["Food", "Break"],
    iconComponent: UtensilsCrossed 
  },
  { 
    time: "6:00 PM", 
    event: "Final Presentations — Project Demos", 
    description: "Each team presents their completed projects to the judges and audience, showcasing their work and solution approach.",
    tags: ["Presentations", "Judging"],
    iconComponent: Users 
  },
  { 
    time: "7:30 PM", 
    event: "Top 8 Teams Selection & Pitching Round", 
    description: "The best teams are shortlisted for the pitching round where they give a focused, high-impact presentation of their solution.",
    tags: ["Pitch", "Competition"],
    iconComponent: Brain 
  },
  { 
    time: "8:30 PM", 
    event: "Winner Announcement & Closing Ceremony", 
    description: "Celebrate the winners, distribute awards, and close the event with final remarks and a heartfelt farewell to participants.",
    tags: ["Awards", "Closing"],
    iconComponent: Calendar 
  }
];

export default schedule;
