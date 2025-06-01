import Navbar from "@/components/Navbar";
import "../globals.css";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Providers from "../providers";

import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await Promise.resolve(params);

  return {
    title:
      locale === "de"
        ? "Enduro Touren in Bosnien | Enduro Drift Bosnien - Entdecken Sie das Abenteuer!"
        : "Enduro Tours in Bosnia | Enduro Drift Bosnia - Discover the Adventure!",
    description:
      locale === "de"
        ? "Fordern Sie sich selbst heraus zu einem unvergesslichen Enduro-Abenteuer durch die wunderschönen bosnischen Berge mit Enduro Bosnien Tours."
        : "Experience the best Enduro tours in Bosnia and enjoy an unforgettable adventure!",
    keywords:
      locale === "de"
        ? "Enduro Touren, Motorrad, Offroad, Bosnien, Abenteuer,Enduro touren Bosnien,enduro balkan, ktm,Enduro Croatia"
        : "Enduro Tours, Motorcycle, Offroad, Bosnia, Adventure",
    openGraph: {
      title:
        locale === "de"
          ? "Enduro Drift Bosnien - Offroad Touren"
          : "Enduro Drift Bosnia - Offroad Tours",
      description:
        locale === "de"
          ? "Erleben Sie die besten Enduro-Touren in Bosnien und genießen Sie ein unvergessliches Abenteuer!"
          : "Experience the best Enduro tours in Bosnia and enjoy an unforgettable adventure!",
      url: `https://www.endurodriftbosnien.com/de`,
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
          <div className="mx-auto screen">
            <Navbar />
            <main className="relative overflow-hidden">{children}</main>
            <Footer />
            <ScrollToTopButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
