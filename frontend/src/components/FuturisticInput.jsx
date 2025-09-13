import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    const [selectedFile, setSelectedFile] = useState(type === "file" ? value || null : null);

    useEffect(() => {
        if (type === "file") setSelectedFile(value || null);
    }, [value, type]);

    const displayValue = type === "file" ? (selectedFile ? selectedFile.name : "") : value || "";

    const handleFileClick = () => {
        const fileInput = document.getElementById(`${label}-file`);
        setIsFocused(true);
        fileInput.value = null; // reset to detect cancel
        fileInput.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0] || null;
        setSelectedFile(file);
        onChange(file);
        setIsFocused(!!file);
    };

    const handleFileBlur = () => {
        if (!selectedFile) setIsFocused(false);
    };

    const handleDeleteFile = () => {
        setSelectedFile(null);
        onChange(null);
        setIsFocused(false);
    };

    return (
        <motion.div
            className="relative mb-6"
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="relative bg-black/50 backdrop-blur-xl border border-orange-400/30 rounded-2xl p-1">
                {/* Floating label for non-file inputs */}
                {type !== "file" && (
                    <label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocused || displayValue || options
                                ? "top-2 text-xs text-orange-300 font-semibold"
                                : "top-1/2 -translate-y-1/2 text-gray-400"
                            }`}
                    >
                        {label} {required && <span className="text-red-400">*</span>}
                    </label>
                )}

                {options ? (
                    <select
                        value={value || ""}
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        required={required}
                        className="w-full bg-black/70 text-white pt-8 pb-4 px-4 focus:outline-none text-lg font-medium appearance-none"
                    >
                        <option value="" disabled hidden className="bg-black/70 text-gray-400">
                            Select your {label}
                        </option>
                        {options.map((opt) => (
                            <option
                                key={opt.value}
                                value={opt.value}
                                className="bg-black/70 text-white"
                            >
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : type === "file" ? (
                    <div className="relative w-full pt-6 pb-4 px-4 flex items-center gap-4">
                        {/* Pinned label for file input */}
                        <span className="absolute top-1 left-3 text-xs text-orange-300 font-semibold pointer-events-none">
                            {label} {required && <span className="text-red-400">*</span>}
                        </span>

                        <div className="flex-1 cursor-pointer" onClick={handleFileClick}>
                            <input
                                id={`${label}-file`}
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                onBlur={handleFileBlur}
                            />
                            <span className={`block text-lg ${selectedFile ? "text-white" : "text-gray-500"}`}>
                                {selectedFile ? selectedFile.name : "No file selected"}
                            </span>
                        </div>

                        {selectedFile && (
                            <button
                                type="button"
                                onClick={handleDeleteFile}
                                className="px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-700"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ) : (
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

                {/* Underline animation */}
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500"
                    animate={{ width: isFocused ? "100%" : "0%", opacity: isFocused ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
};

export default FuturisticInput;
