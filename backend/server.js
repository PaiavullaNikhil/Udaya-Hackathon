import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./configs/db.js";
import registrationRoutes from "./routes/registrationRoutes.js"; // your routes file

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URI, credentials: true }));
app.use(express.json()); // for JSON
app.use(bodyParser.urlencoded({ extended: true })); // for URL-encoded

// Routes
app.use("/register", registrationRoutes);

connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
