import Navbar from "@/components/Navbar";
import "../globals.css";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Providers from "../providers";


// 📌 Generišemo SEO meta podatke
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  return {
    title: locale === "de" ? "Enduro Touren in Bosnien | Enduro Drift Bosnien - Entdecken Sie das Abenteuer!" : "Enduro Touren in Bosnien | Enduro Drift Bosnien - Entdecken Sie das Abenteuer!",
    description: locale === "de"
      ? "Fordern Sie sich selbst heraus zu einem unvergesslichen Enduro-Abenteuer durch die wunderschönen bosnischen Berge mit Enduro Bosnien Tours. Wir bieten ein kraftvolles Enduro-Erlebnis mit faszinierendem Blick auf die Landschaft. Entdecken Sie die besten Enduro-Touren in Bosnien, wo jeder Moment den Geist des Abenteuers erweckt. Schließen Sie sich uns an und spüren Sie die Kraft des Enduro-Motorradfahrens im Herzen des Balkans."
      : "Experience the best Enduro tours in Bosnia and enjoy an unforgettable adventure!",
    keywords: locale === "de"
      ? "Enduro Touren, Motorrad, Offroad, Bosnien, Abenteuer,Enduro touren Bosnien,enduro balkan, ktm,Enduro Croatia"
      : "Enduro Tours, Motorcycle, Offroad, Bosnia, Adventure",
    openGraph: {
      title: locale === "de" ? "Enduro Drift Bosnien - Offroad Touren" : "Enduro Drift Bosnia - Offroad Tours",
      description: locale === "de"
        ? "Erleben Sie die besten Enduro-Touren in Bosnien und genießen Sie ein unvergessliches Abenteuer!"
        : "Experience the best Enduro tours in Bosnia and enjoy an unforgettable adventure!",
      url: `https://endurodriftbosnien.com/`,
      siteName: "Enduro Drift Bosnien",
      images: [
        {
          url: "https://endurodriftbosnien.com/bg_termine.webp",
          width: 1200,
          height: 630,
          alt: "Enduro Drift Bosnien - Offroad Adventure",
        },
      ],
      type: "website",
    },
  };
}


// 📌 Funkcija za dohvaćanje prevoda
async function getMessages(locale: string) {
  try {
    return (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }]; // ✅ Generišemo podržane jezike
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale; // ✅ Osiguravamo da `params.locale` postoji
  const messages = await getMessages(locale); // ✅ Osiguravamo da učitamo prevode


  return (
    <html lang={locale}>
      <head>
        {/* ✅ Ručno dodani SEO meta tagovi */}
        <meta name="author" content="Enduro Drift Bosnien" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://endurodriftbosnien.com`} />
      </head>
      <body>
        <Providers locale={locale} messages={messages}>
          <div className="mx-auto screen">
            <Navbar />
            <main className="relative overflow-hidden">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
