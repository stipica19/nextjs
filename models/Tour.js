import mongoose from "mongoose";

const TourSchema = new mongoose.Schema(
  {
    tour_number: {
      type: String,
      required: true,
    },
    checkIn_date: {
      type: Date,
      required: true,
    },
    checkOut_date: {
      type: Date,
      required: true,
    },
    tour_duration: {
      type: String,
      required: true,
      default: "5/8",
    },
    tour_availability: {
      type: Boolean,
      required: true,
      default: true,
    },
    tour_space: {
      type: Number,
      required: true,
      default: 20,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tour || mongoose.model("Tour", TourSchema);
