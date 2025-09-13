import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  usn: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  college: { type: String, required: true }
});

export default memberSchema;