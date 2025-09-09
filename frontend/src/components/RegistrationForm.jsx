import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { User, Mail, Phone, Users, GraduationCap, Briefcase, Plus, Minus, MapPin } from "lucide-react";
import themes from "../constants/themes";

const InputField = ({ id, name, label, type = 'text', value, onChange, required = true, icon: Icon }) => (
  <div className="mb-4 w-full">
    <label htmlFor={id} className="flex items-center text-base font-medium mb-1 text-gray-300">
      {Icon && <Icon className="w-5 h-5 mr-2 text-gray-500" />}
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

const SelectField = ({ id, name, label, options, value, onChange, required = true, icon: Icon }) => (
  <div className="mb-4 w-full">
    <label htmlFor={id} className="flex items-center text-base font-medium mb-1 text-gray-300">
      {Icon && <Icon className="w-5 h-5 mr-2 text-gray-500" />}
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800/50 text-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 appearance-none"
    >
      <option value="" className="bg-gray-700 text-white">Select {label}</option>
      {options.map(opt => (
        <option key={opt} value={opt} className="bg-gray-700 text-white">{opt}</option>
      ))}
    </select>

  </div>
);

const SectionTitle = ({ children, icon: Icon }) => (
  <h2 className="flex items-center text-2xl md:text-3xl font-semibold mb-4 text-gray-300">
    {Icon && <Icon className="w-6 h-6 mr-2 text-orange-400" />}
    {children}
  </h2>
);

const ParticipantForm = ({ index, participant, handleChange, removeParticipant }) => (
  <div className="border border-gray-700 rounded-lg p-6 mb-6 bg-gray-900/50">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-lg md:text-xl text-gray-200">
        {index === 0 ? "Team Leader" : `Participant ${index + 1}`}
      </h3>
      {index !== 0 && (
        <button
          type="button"
          onClick={() => removeParticipant(index)}
          className="text-red-500 hover:text-red-700 flex items-center text-base"
        >
          <Minus className="w-5 h-5 mr-1" /> Remove
        </button>
      )}
    </div>

    <div className="flex flex-col md:flex-row gap-4">
      <InputField id={`name-${index}`} name="name" label="Full Name" value={participant.name} onChange={(e) => handleChange(index, e)} icon={User} />
      <InputField id={`email-${index}`} name="email" label="Email" type="email" value={participant.email} onChange={(e) => handleChange(index, e)} icon={Mail} />
    </div>

    <div className="flex flex-col md:flex-row gap-4">
      <InputField id={`phone-${index}`} name="phone" label="Phone Number" value={participant.phone} onChange={(e) => handleChange(index, e)} icon={Phone} />
      <InputField id={`college-${index}`} name="college" label="College Name" value={participant.college} onChange={(e) => handleChange(index, e)} icon={MapPin} />
    </div>

    <div className="flex flex-col md:flex-row gap-4">
      <SelectField id={`year-${index}`} name="year" label="Year of Study" options={["1st", "2nd", "3rd", "4th"]} value={participant.year} onChange={(e) => handleChange(index, e)} icon={GraduationCap} />
      <InputField id={`passing-${index}`} name="passingYear" label="Year of Passing" value={participant.passingYear} onChange={(e) => handleChange(index, e)} icon={GraduationCap} />
    </div>

    <div className="flex flex-col md:flex-row gap-4">
      <InputField id={`branch-${index}`} name="branch" label="Branch" value={participant.branch} onChange={(e) => handleChange(index, e)} icon={Briefcase} />
      <InputField id={`linkedin-${index}`} name="linkedin" label="LinkedIn URL" value={participant.linkedin || ""} onChange={(e) => handleChange(index, e)} icon={Briefcase} />
    </div>

    <div className="flex flex-col md:flex-row gap-4">
      <InputField id={`github-${index}`} name="github" label="GitHub URL" value={participant.github || ""} onChange={(e) => handleChange(index, e)} icon={Briefcase} />
    </div>
  </div>
);

export default function RegistrationForm() {
  const [participants, setParticipants] = useState([{ name: "", email: "", phone: "", college: "", branch: "", year: "", passingYear: "", linkedin: "", github: "" }]);
  const [teamName, setTeamName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("registrationForm");
    if (saved) {
      const data = JSON.parse(saved);
      setTeamName(data.teamName || "");
      setParticipants(data.participants?.length ? data.participants : [{ name: "", email: "", phone: "", college: "", branch: "", year: "", passingYear: "", linkedin: "", github: "" }]);
      setSelectedTheme(data.selectedTheme || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("registrationForm", JSON.stringify({ teamName, participants, selectedTheme }));
  }, [teamName, participants, selectedTheme]);

  const handleChange = (index, e) => {
    const newParticipants = [...participants];
    newParticipants[index][e.target.name] = e.target.value;
    setParticipants(newParticipants);
  };

  const addParticipant = () => {
    if (participants.length < 4) {
      setParticipants([...participants, { name: "", email: "", phone: "", college: "", branch: "", year: "", passingYear: "", linkedin: "", github: "" }]);
    }
  };

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ teamName, selectedTheme, participants });
    localStorage.removeItem("registrationForm");
    alert("Registration submitted!");
  };

  return (
    <div className="registration-form max-w-5xl mx-auto px-4">
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Team Registration
      </motion.h1>

      <motion.form onSubmit={handleSubmit} className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 shadow-2xl text-base md:text-lg">
        <SectionTitle icon={Users}>Team Information</SectionTitle>

        <InputField id="team-name" name="teamName" label="Team Name" value={teamName} onChange={e => setTeamName(e.target.value)} icon={Users} />

        <SelectField
          id="theme"
          name="selectedTheme"
          label="Select a Topic"
          options={themes.map(t => t.title)}
          value={selectedTheme}
          onChange={e => setSelectedTheme(e.target.value)}
        />

        <SectionTitle icon={User}>Participants</SectionTitle>
        {participants.map((participant, index) => (
          <ParticipantForm key={index} index={index} participant={participant} handleChange={handleChange} removeParticipant={removeParticipant} />
        ))}

        <button
          type="button"
          onClick={addParticipant}
          className={`mb-6 flex items-center px-4 py-2 rounded text-white ${participants.length < 4 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-600 cursor-not-allowed'}`}
          disabled={participants.length >= 4}
        >
          <Plus className="w-5 h-5 mr-2" /> Add Participant
        </button>

        <motion.button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-orange-500/30"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Registration
        </motion.button>
      </motion.form>
    </div>
  );
}
