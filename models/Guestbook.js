import mongoose from "mongoose";

const gastebuchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  isVisible: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.GuestBook ||
  mongoose.model("GuestBook", gastebuchSchema);
