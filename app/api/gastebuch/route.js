import { NextResponse } from "next/server";
import dbConnect from "@/lib/connect-db";
import GuestBook from "@/models/GuestBook";

export async function GET() {
  try {
    await dbConnect();
    const messages = await GuestBook.find({ isVisible: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Greška pri dohvatanju poruka:", error);
    return NextResponse.json(
      { message: "Greška pri dohvatanju podataka." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newMessage = new GuestBook({
      name: body.name,
      email: body.email,
      message: body.message,
      isVisible: false, //Mi odobravamo
    });

    await newMessage.save();

    return NextResponse.json(
      { message: "Poruka uspešno dodana!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Greška pri dodavanju poruke:", error);
    return NextResponse.json(
      { message: "Greška pri dodavanju poruke." },
      { status: 500 }
    );
  }
}
