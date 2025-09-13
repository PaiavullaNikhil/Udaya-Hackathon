import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Team from "../models/team.model.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerTeam = async (req, res) => {
  try {
    const { teamName, theme, numMembers } = req.body;
    const members = req.body.members ? JSON.parse(req.body.members) : [];

    if (!teamName || !theme) {
      return res.status(400).json({ message: "Team name and theme are required" });
    }

    // ✅ Normalize team name (case insensitive check)
    const existingTeam = await Team.findOne({ teamName: { $regex: `^${teamName}$`, $options: "i" } });
    if (existingTeam) {
      return res.status(400).json({ message: "Team name already exists" });
    }

    let pptUrl = null;

    if (req.file) {
      console.log("Received file:", req.file);

      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "raw",
          folder: "udaya_ppts",
        });
        pptUrl = result.secure_url;
        console.log("Cloudinary upload successful. URL:", pptUrl);

        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        return res.status(500).json({ message: "Failed to upload PPT" });
      }
    }

    const newTeam = new Team({
      teamName,
      theme,
      numberOfParticipants: Number(numMembers),
      members,
      ...(pptUrl && { ppt: pptUrl }),
    });

    await newTeam.save();

    res.status(201).json({
      message: "Team registered successfully",
      pptUrl: pptUrl || null,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default registerTeam;
