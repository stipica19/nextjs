import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations();
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
        {/* Lijeva strana - Tekst */}
        <div className="lg:w-1/2 flex flex-col justify-center animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
            🌍 {t("about_title")}
          </h2>
          <p className="text-lg font-medium text-gray-700 mb-6">
            👋 {t("about_p1")}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">{t("about_p2")}</p>
          <p className="text-gray-600 leading-relaxed">{t("about_p3")}</p>
        </div>

        {/* Desna strana - Slika */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-[350px] h-[450px] rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-500">
            <Image
              width={250}
              height={550}
              src="/ckalja-motor.webp"
              alt="Enduro Rider"
              className="rounded-xl object-cover w-full h-full"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
