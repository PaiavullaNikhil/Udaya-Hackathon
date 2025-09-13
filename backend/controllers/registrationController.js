import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Team from "../models/team.model.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerTeam = async (req, res) => {
  try {
    const { teamName, theme, numMembers, driveLink } = req.body;
    const members = req.body.members ? JSON.parse(req.body.members) : [];

    if (!teamName || !theme) {
      return res.status(400).json({ message: "Team name and theme are required" });
    }

    // ✅ Normalize team name (case insensitive check)
    const existingTeam = await Team.findOne({
      teamName: { $regex: `^${teamName}$`, $options: "i" },
    });
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

    // ✅ Save Team in DB
    const newTeam = new Team({
      teamName,
      theme,
      numberOfParticipants: Number(numMembers),
      members,
      driveLink: driveLink || null,
      ...(pptUrl && { ppt: pptUrl }),
    });

    await newTeam.save();

    // ✅ Send Email to all members
    try {
      const emails = members.map((m) => m.email).filter(Boolean); // only valid emails
      const msg = {
        to: emails,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: `✅ Team "${teamName}" Registered Successfully!`,
        text: `Hey team, your registration for UDAYA 1.0 was successful!\n\nTeam Name: ${teamName}\nTheme: ${theme}\nNumber of Participants: ${numMembers}\n\nAll the best!`,
        html: `
          <h2>🎉 Registration Successful!</h2>
          <p>Your team <strong>${teamName}</strong> has been successfully registered for <strong>UDAYA 1.0</strong>.</p>
          <p><strong>Theme:</strong> ${theme}</p>
          <p><strong>Participants:</strong> ${numMembers}</p>
          <p>Good luck, and see you at the event!</p>
        `,
      };

      await sgMail.sendMultiple(msg); // send to multiple recipients at once
      console.log("✅ Confirmation emails sent to team members");
    } catch (emailError) {
      console.error("Failed to send confirmation emails:", emailError);
      // Not throwing error here because registration succeeded
    }

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
