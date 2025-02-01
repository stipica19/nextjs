import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // Proveri da li korisnik već postoji
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Kreiraj korisnika
    const user = await User.create({ name, email, password });

    if (user) {
      return NextResponse.json(
        { message: "User created successfully", userId: user._id },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid user data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
