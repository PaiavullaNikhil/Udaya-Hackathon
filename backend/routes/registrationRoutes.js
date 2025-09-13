import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import registerTeam from "../controllers/registrationController.js";

const router = express.Router();

// Ensure tmp folder exists
if (!fs.existsSync("tmp")) fs.mkdirSync("tmp");

// Multer setup (temporary local storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "tmp/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// Use multer to handle single file field 'pptFile'
router.post("/", upload.single("pptFile"), registerTeam);

export default router;
