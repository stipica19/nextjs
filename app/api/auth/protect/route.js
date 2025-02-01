import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/connect-db";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();
  let token;

  // Proveravamo da li postoji Bearer token u `Authorization` headeru
  const authHeader = req.headers.get("authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      token = authHeader.split(" ")[1]; // Dobijamo token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 401 }
        );
      }

      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      console.error("JWT Error:", error);
      return NextResponse.json(
        { message: "Not authorized, token failed" },
        { status: 401 }
      );
    }
  }

  return NextResponse.json(
    { message: "Not authorized, no token" },
    { status: 401 }
  );
}
