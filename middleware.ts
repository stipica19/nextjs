import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware";

import {routing} from './i18n/routing';


const intlMiddleware = createMiddleware(routing);


export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const locale = pathname.split("/")[1]; // ✅ Dobijamo trenutni jezik iz URL-a

  // ✅ Primenjujemo next-intl middleware za internacionalizaciju
  const intlResponse = intlMiddleware(req);

  // ✅ Ako korisnik pokušava pristupiti "/[locale]/admin", proveravamo JWT token
  if (pathname.startsWith(`/${locale}/admin`)) {
    const token = req.cookies.get("token")?.value;

    console.log("✅ TOKEN IZ COOKIES:", token);

    if (!token) {
      console.log("❌ Token nije pronađen! Preusmeravamo na /[locale]/login.");
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);

      console.log("✅ Token je validan:", payload);

      // Proveravamo da li korisnik ima admin prava
      if (!payload.isAdmin) {
        console.log("❌ Korisnik nije admin! Preusmeravamo na /[locale]/login.");
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
      }
    } catch (error) {
      console.error("🚨 JWT ERROR:", error);
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }
  }

  return intlResponse;
}

// ✅ Middleware se primenjuje na jezike i `/admin` rute
export const config = {
  matcher: ["/", "/(en|de)/:path*", "/(en|de)/admin/:path*"],
};
