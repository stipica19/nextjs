import { NextResponse } from "next/server";
import { News } from "@/models/News";
import connectDB from "@/lib/connect-db";

export async function POST(req) {
  const { url, public_id, title, summary } = await req.json();
  console.log(url, public_id, title, summary);
  if (!url || !public_id) {
    return NextResponse.json(
      { error: "Nedostaje URL ili public_id" },
      { status: 400 }
    );
  }
  await connectDB();
  const post = await News.create({ url, public_id, title, summary });

  console.log(post, "created");

  return NextResponse.json(post);
}

export async function GET() {
  await connectDB();
  const images = await News.find().sort({ createdAt: -1 });
  console.log(images);
  return NextResponse.json(images);
}
