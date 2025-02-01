import mongoose from "mongoose";

const anmeldungSchema = new mongoose.Schema(
  {
    tour_type: {
      type: String,
      required: true,
    },
    tour_number: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tour",
    },
    email: { type: String, required: true },
    name: { type: String, required: true },
    number_person: { type: Number, required: true },
    address: { type: String },
    phone: { type: String },
    transport: { type: String, required: true },
    rentaBike: { type: Boolean, require: true },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Anmeldung ||
  mongoose.model("Anmeldung", anmeldungSchema);
