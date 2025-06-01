import { NextResponse } from "next/server";
import GalleryImageModel from "@/models/GalleryImageModel";
import connectDB from "@/lib/connect-db";

export async function POST(req) {
  const { url, public_id } = await req.json();
  console.log(url, public_id, "url and public id");
  if (!url || !public_id) {
    return NextResponse.json(
      { error: "Nedostaje URL ili public_id" },
      { status: 400 }
    );
  }
  await connectDB();
  const image = await GalleryImageModel.create({ url, public_id });

  console.log(image, " created");

  return NextResponse.json(image);
}

export async function GET() {
  console.log("ssssssssssssssssssssssss");
  await connectDB();
  const images = await GalleryImageModel.find().sort({ createdAt: -1 });
  console.log(images);
  return NextResponse.json(images);
}
