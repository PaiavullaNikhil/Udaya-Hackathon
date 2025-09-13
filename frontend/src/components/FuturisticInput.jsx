import { motion } from "framer-motion";
import { useState } from "react";

const FuturisticInput = ({
    label,
    value,
    onChange,
    type = "text",
    required = false,
    options = null,
    placeholder = "",
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const displayValue = type === "file" && value ? value.name : value || "";

    return (
        <motion.div
            className="relative mb-6"
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Soft Glow Border */}
            <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                    background: isFocused
                        ? "linear-gradient(90deg, rgba(255,140,60,0.25), rgba(255,140,60,0.05))"
                        : "transparent",
                }}
                animate={{ opacity: isFocused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Glowing Background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-500/10 rounded-2xl blur-xl"
                animate={{
                    opacity: isFocused ? 0.7 : isHovered ? 0.3 : 0,
                    scale: isFocused ? 1.03 : 1,
                }}
                transition={{ duration: 0.3 }}
            />

            <div className="relative bg-black/50 backdrop-blur-xl border border-orange-400/30 rounded-2xl p-1">
                {/* Floating Label */}
                <motion.label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none 
                        ${(isFocused || value || options)
                            ? "top-2 text-xs text-orange-300 font-semibold"
                            : "top-1/2 -translate-y-1/2 text-gray-400"
                        }`}
                    animate={{
                        color: isFocused ? "#FF8C3C" : "#9CA3AF",
                        textShadow: isFocused
                            ? "0 0 10px rgba(255,140,60,0.8)"
                            : "0 0 0px transparent",
                    }}
                >
                    {label} {required && <span className="text-red-400">*</span>}
                </motion.label>

                {/* Select Input */}
                {options ? (
                    <select
                        value={value || ""}
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        required={required}
                        className="w-full bg-transparent text-white pt-8 pb-4 px-4 focus:outline-none text-lg font-medium appearance-none"
                    >
                        <option value="" disabled hidden className="bg-black/60 text-gray-400">
                            Select your {label}
                        </option>
                        {options.map((opt) => (
                            <option
                                key={opt.value}
                                value={opt.value}
                                className="bg-black/60 text-white"
                            >
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : type === "file" ? (
                    <div
                        className="relative w-full pt-8 pb-4 px-4 cursor-pointer"
                        onClick={() => {
                            const fileInput = document.getElementById(`${label}-file`);
                            setIsFocused(true); // keep focus when opening dialog
                            fileInput.click();
                        }}
                    >
                        <input
                            id={`${label}-file`}
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                onChange(e);       
                                setIsFocused(false);
                            }}
                            required={required}
                        />
                        <span
                            className={`block text-lg font-medium transition-colors duration-300 ${displayValue ? "text-white" : "text-gray-500"
                                }`}
                        >
                            {displayValue}
                        </span>
                    </div>
                )
                : (
                // Regular Text Input
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-white pt-8 pb-4 px-4 focus:outline-none text-lg font-medium placeholder-transparent"
                />
                )}

                {/* Underline Animation */}
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500"
                    animate={{
                        width: isFocused ? "100%" : "0%",
                        opacity: isFocused ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
};

export default FuturisticInput;
