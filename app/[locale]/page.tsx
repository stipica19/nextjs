import About from "@/components/About";
import AboutBosna from "@/components/AboutBosna";
import Hero from "@/components/Hero";
import Motorcycles from "@/components/Motorcycles";
import Rules from "@/components/Rules";
import SliderImage from "@/components/SliderImage";
import Tour from "@/components/Tour";
import Unterkunft from "@/components/Unterkunft";
import { useTranslations } from "next-intl";

import type { Metadata } from "next";

type Params = { locale: "de" | "en" };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: "/de",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      url: `https://endurodriftbosnien.com/${locale}`,
    },
  };
}

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
