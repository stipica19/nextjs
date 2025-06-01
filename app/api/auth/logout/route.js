import { NextResponse } from "next/server";

export async function GET() {
  // Obriši JWT cookie ili bilo koji auth cookie
  const response = NextResponse.json({ message: "Logout uspjesan :D" });

  // Ako koristiš JWT u cookie-u:
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // odmah istekne
  });

  return response;
}
