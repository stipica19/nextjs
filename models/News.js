// models/News.ts
import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: String,
  url: String,
  public_id: String,
  summary: String,
  createdAt: { type: Date, default: Date.now },
});

export const News = mongoose.models.News || mongoose.model("News", NewsSchema);
