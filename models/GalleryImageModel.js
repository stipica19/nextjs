import mongoose from "mongoose";

const GalleryImageSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
  },
  { timestamps: true }
);

export default mongoose.models.GalleryImageModel ||
  mongoose.model("GalleryImageModel", GalleryImageSchema);
