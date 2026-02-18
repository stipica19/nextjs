import Navbar from "@/components/Navbar";
import "../globals.css";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Providers from "../providers";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";

import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "de"
      ? "Enduro Touren in Bosnien - Enduro Urlaub | Enduro Drift Bosnien"
      : "Enduro Tours in Bosnia - Adventure Enduro Trips | Enduro Drift Bosnien";

  const description =
    locale === "de"
      ? "Enduro Tour in Bosnien - erleben Sie ein unvergessliches Abenteuer in den wunderschönen Bergen mit Enduro Bosnien Tours."
      : "Experience the best Enduro tours in Bosnia and enjoy an unforgettable adventure!";

  return {
    metadataBase: new URL("https://endurodriftbosnien.com"),
    title,
    description,
    keywords:
      locale === "de"
        ? "Enduro Tour Bosnien, Enduro Reisen Bosnien, Enduro Urlaub Bosnien, Enduro Abenteuer Bosnien, Enduro Touren Balkan, Offroad Motorradtour Bosnien, geführte Enduro Touren Bosnien, Enduro Motorradreise Bosnien Berge, Enduro Urlaub Balkan, Enduro Bosnien Tours"
        : "Enduro Tours, Motorcycle, Offroad, Bosnia, Adventure",
    robots: { index: true, follow: true },
    authors: [{ name: "Enduro Drift Bosnien" }],

    // ✅ canonical za locale root (/de ili /en)
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: "/de",
        en: "/en",
        "x-default": "/",
      },
    },

    openGraph: {
      title:
        locale === "de"
          ? "Enduro Drift Bosnien - Offroad Touren"
          : "Enduro Drift Bosnia - Offroad Tours",
      description,
      // ✅ non-www + dinamički locale
      url: `https://endurodriftbosnien.com/${locale}`,
      siteName: "Enduro Drift Bosnien",
      images: [
        {
          url: "https://res.cloudinary.com/stipica/image/upload/c_limit,w_2048/f_auto/q_auto/v1/Your_paragraph_text_1_jabt8n?_a=BAVAZGBz0",
          alt: "Enduro Drift Bosnien - Offroad Adventure",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}

// Use Next.js viewport export instead of metadata.viewport
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de" | "en")) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale} messages={messages}>
          {/* JSON-LD for Organization */}
          <OrganizationJsonLd />
          <div className="mx-auto screen">
            <Navbar />
            <main className="relative overflow-hidden min-h-screen">
              {children}
            </main>
            <Footer locale={locale} />
            <ScrollToTopButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
