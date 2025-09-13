import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import themes from "../constants/themes";
import { containerVariants } from "../utils/animations";
import AnimatedBackground from "./AnimatedBackground";
import FuturisticInput from "./FuturisticInput";


const RegistrationPageView = () => {
  const navigate = useNavigate();
  const [driveLink, setDriveLink] = useState("");
  const [file, setFile] = useState(null);
  const [isParticipantsHovered, setIsParticipantsHovered] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [theme, setTheme] = useState("");

  const [numMembers, setNumMembers] = useState(2); // default 2 participants
  const [members, setMembers] = useState(
    Array.from({ length: numMembers }, () => ({
      fullName: "",
      email: "",
      usn: "",
      college: "",
      phoneNumber: "",
    }))
  );

  const [teamName, setTeamName] = useState("");

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const sparkleCount = isMobile ? 3 : 6;

  const totalSteps = 3;

  const updateMember = (index, field, value) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const nextStep = () =>
    currentStep < totalSteps - 1 && setCurrentStep(currentStep + 1);
  const prevStep = () =>
    currentStep > 0 && setCurrentStep(currentStep - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const isStepValid = () => {
    if (currentStep === 0) return teamName.trim() !== "" && numMembers >= 1;
    if (currentStep === 1)
      return members.slice(0, numMembers).every(
        (m) =>
          m.fullName.trim() &&
          m.email.trim() &&
          m.usn.trim() &&
          m.college.trim() &&
          m.phoneNumber.trim()
      );
    return true;
  };

  const isFormValid = () =>
    teamName.trim() !== "" &&
    members.slice(0, numMembers).every(
      (m) =>
        m.fullName.trim() &&
        m.email.trim() &&
        m.usn.trim() &&
        m.college.trim() &&
        m.phoneNumber.trim()
    );

  const sparklePositions = useMemo(() => {
    return [...Array(sparkleCount)].map(() => ({
      left: `${Math.random() * 90}%`,
      top: `${Math.random() * 90}%`,
    }));
  }, [sparkleCount]);

  useEffect(() => {
    setMembers((prev) => {
      return Array.from({ length: numMembers }, (_, i) => prev[i] || {
        fullName: "",
        email: "",
        usn: "",
        college: "",
        phoneNumber: "",
      });
    });
  }, [numMembers]);

  const handleNext = () => {
    if (!isStepValid()) {
      toast.error("Please fill all required details!");
      return;
    }
    nextStep();
  };

  const handleFinalSubmit = async () => {
    if (!isFormValid()) {
      toast.error("Please fill all required details!");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("teamName", teamName);
      formData.append("theme", theme);
      formData.append("numMembers", numMembers);
      formData.append("members", JSON.stringify(members.slice(0, numMembers)));
      formData.append("pptFile", file);
      formData.append("driveLink", driveLink);

      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitSuccess(true);
        toast.success(
          "Registration Successful! Confirmation mail has been sent to your spam folder too."
        );

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate("/"); // replace "/" with your home route
        }, 3000);
      } else {
        toast.error(data.message || "Team name already exists!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }

    setIsSubmitting(false);
  };

  return (
    <section className="relative min-h-screen flex justify-center items-center bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Sparkles */}
      {sparklePositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-orange-400"
          style={{ left: pos.left, top: pos.top }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
            x: ["0%", "5%", "-5%"], // smaller movement on mobile
            y: ["0%", "-5%", "5%"],
          }}
          transition={{
            duration: isMobile ? 4 + i : 3 + i, // slower on mobile
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          <Sparkles className={`w-6 h-6 ${isMobile ? "w-4 h-4" : ""}`} />
        </motion.div>
      ))}

      {/* Form Card */}
      <motion.div
        className="relative z-10 max-w-4xl w-full mx-auto  bg-black/60 backdrop-blur-md rounded-3xl p-8 border border-orange-400/30 shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-orange-300 text-center mb-6">
          Register for UDAYA 1.0
        </h1>

        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-10 relative w-3/4 mx-auto">
          {[...Array(totalSteps)].map((_, i) => {
            const isActive = i === currentStep;
            return (
              <div key={i} className="flex-1 flex flex-col items-center relative">
                <motion.div
                  className="absolute w-12 h-12 rounded-full bg-orange-500 blur-lg"
                  animate={{ opacity: isActive ? 0.8 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all
                    ${isActive ? "bg-orange-500 text-black border-orange-400" : "border-orange-400/40 text-orange-300"}`}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    boxShadow: isActive ? "0 0 20px rgba(255,140,60,0.9)" : "0 0 0px rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {i + 1}
                </motion.div>
                <span className={`text-sm mt-3 ${isActive ? "text-orange-300 font-bold" : "text-gray-400"}`}>
                  {i === 0 ? "Team" : i === 1 ? "Members" : "Review"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step 1 */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-orange-300">Team Information</h2>

            {/* Team Name */}
            <FuturisticInput
              label="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              required={false}
            />
            {/* Theme */}
            <FuturisticInput
              label="Theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              options={themes.map((t) => ({ value: t.title, label: t.title }))}
              required={false}
            />
            {/* Number of Participants Buttons */}
            <motion.div
              className="relative mb-6"
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setIsParticipantsHovered(true)}
              onHoverEnd={() => setIsParticipantsHovered(false)}
            >
              {/* Glowing Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-500/10 rounded-2xl blur-xl pointer-events-none"
                animate={{
                  opacity: numMembers ? 0.7 : isParticipantsHovered ? 0.3 : 0,
                  scale: numMembers ? 1.03 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Outer Container */}
              <div className="relative bg-black/50 backdrop-blur-xl border border-orange-400/30 rounded-2xl px-4 pt-6 pb-4">
                {/* Pinned Label */}
                <motion.span
                  className="absolute left-4 top-2 text-sm transition-colors duration-300 font-semibold"
                  animate={{
                    color: "gray",
                  }}
                >
                  Number of Participants
                </motion.span>

                {/* Buttons */}
                <div className="flex mt-3 gap-4">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNumMembers(n)}
                      className={`px-5 py-2 rounded-xl font-semibold text-lg transition-all duration-200
            ${numMembers === n
                          ? "bg-orange-500 text-black shadow-md"
                          : "bg-black/70 text-orange-300 hover:bg-orange-400/40"}
          `}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-orange-300">Team Members</h2>
            {members.map((member, index) => (
              <div key={index} className="bg-black/50 rounded-2xl p-4 border border-orange-400/20 space-y-3">
                <h3 className="text-lg font-semibold text-orange-300">
                  Member {index + 1} {index === 0 && "(Leader)"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FuturisticInput
                    label="Full Name"
                    value={member.fullName}
                    onChange={(e) => updateMember(index, "fullName", e.target.value)}
                    required={false}
                    placeholder="Full Name"

                  />
                  <FuturisticInput
                    label="Email"
                    type="email"
                    value={member.email}
                    onChange={(e) => updateMember(index, "email", e.target.value)}
                    required={false}
                  />
                  <FuturisticInput
                    label="USN/ID"
                    value={member.usn}
                    onChange={(e) => updateMember(index, "usn", e.target.value)}
                    required={false}
                  />
                  <FuturisticInput
                    label="College"
                    value={member.college}
                    onChange={(e) => updateMember(index, "college", e.target.value)}
                    placeholder="Select your college"
                    options={[
                      { value: "Dayananda Sagar College of Engineering", label: "Dayananda Sagar College of Engineering" },
                      { value: "Dayananda Sagar University", label: "Dayananda Sagar University" },
                      { value: "Dayananda Sagar Academy of Technology and Management", label: "Dayananda Sagar Academy of Technology and Management" },
                    ]}
                  />
                  <FuturisticInput
                    label="Phone Number"
                    value={member.phoneNumber}
                    onChange={(e) => updateMember(index, "phoneNumber", e.target.value)}
                    placeholder="Enter Phone number"
                    required={false}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 2 && (
          <div className="space-y-6 text-center">
            {!submitSuccess ? (
              <>
                <h2 className="text-2xl font-bold text-orange-300">Review & Submit</h2>

                <div className="bg-black/50 p-6 rounded-xl border border-orange-400/20 text-left space-y-4">
                  <h3 className="text-xl font-bold text-orange-300 mb-2">Team: {teamName}</h3>

                  {members.filter((m) => m.fullName).map((m, i) => (
                    <p key={i} className="text-gray-200">
                      {m.fullName} {i === 0 && "(Leader)"} — {m.email}
                    </p>
                  ))}

                  {/* PPT Upload */}
                  <FuturisticInput
                    label="Team PPT"
                    type="file"
                    value={file}
                    onChange={(file) => setFile(file)}
                  />
                  {/* Google Drive Link Input */}
                  <FuturisticInput
                    label="Google Drive Link"
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="Paste your shareable Google Drive link"
                  />
                </div>
              </>
            ) : (
              <div className="text-green-400">
                <h2 className="text-2xl font-bold">Registration Successful!</h2>
              </div>
            )}
          </div>
        )}


        {/* Footer Buttons */}
        {!submitSuccess && (
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2 bg-gray-700 text-white rounded-full disabled:opacity-50"
            >
              Previous
            </button>
            {currentStep < totalSteps - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-orange-400 hover:bg-orange-500 text-black font-semibold rounded-full"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default RegistrationPageView;
