import About from "@/components/About";
import AboutBosna from "@/components/AboutBosna";
import Hero from "@/components/Hero";
import Motorcycles from "@/components/Motorcycles";
import Rules from "@/components/Rules";
import SliderImage from "@/components/SliderImage";
import Tour from "@/components/Tour";
import Unterkunft from "@/components/Unterkunft";
import { useTranslations } from "next-intl";

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
