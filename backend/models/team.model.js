import mongoose from "mongoose";
import memberSchema from "./member.model.js";

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  theme: { type: String, required: true },
  numberOfParticipants: { type: Number, required: true },
  ppt: { type: String, default: false },
  members: [memberSchema],
  createdAt: { type: Date, default: Date.now }
});
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;