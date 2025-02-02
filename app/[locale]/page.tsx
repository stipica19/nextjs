import About from "@/components/About";
import AboutBosna from "@/components/AboutBosna";
import Hero from "@/components/Hero";
import Motorcycles from "@/components/Motorcycles";
import Rules from "@/components/Rules";
import SliderImage from "@/components/SliderImage";
import Tour from "@/components/Tour";
import Unterkunft from "@/components/Unterkunft";
import { useTranslations } from "next-intl";

// ✅ SEO metapodaci za Google i društvene mreže
/*export async function generateMetadata({ params }: { params?: { locale?: string } }) {
  const locale = params?.locale ?? 'en';

  return {
    title: locale === "de" ? "Enduro Touren in Bosnien" : "Enduro Tours in Bosnia",
    description: locale === "de"
      ? "Planen Sie Ihre nächste Offroad-Tour mit Enduro Drift Bosnien."
      : "Plan your next off-road tour with Enduro Drift Bosnia.",
    keywords: locale === "de"
      ? "Enduro Touren, Motorrad, Offroad, Abenteuer, Bosnien"
      : "Enduro Tours, Motorcycle, Offroad, Adventure, Bosnia",
    openGraph: {
      title: locale === "de" ? "Enduro Touren in Bosnien" : "Enduro Tours in Bosnia",
      description: locale === "de"
        ? "Planen Sie Ihre nächste Offroad-Tour mit Enduro Drift Bosnien."
        : "Plan your next off-road tour with Enduro Drift Bosnia.",
      url: `https://endurodriftbosnien.com/${locale}`,
      siteName: "Enduro Drift Bosnien",
      images: [
        {
          url: "https://endurodriftbosnien.com/bt_termine.webp",
          width: 1200,
          height: 630,
          alt: "Enduro Drift Bosnien - Offroad Adventure",
        },
      ],
      type: "website",
    },
  };
}
*/

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <Hero />
      <About />
      <SliderImage />
      <Tour />
      <AboutBosna />
      <Unterkunft />
      <Motorcycles />
      <Rules />
    </>
  );
}
