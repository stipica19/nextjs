import Image from "next/image";
import Button from "./Button";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const Hero = () => {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 md:flex-col-reverse xl:flex-row-reverse relative">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-[80vh] -z-10">
        <Image
          src="/logobg.webp"
          alt="Pozadinska slika Enduro Drift Bosnien"
          fill
          priority
          quality={30}
          className="object-cover object-center opacity-10"
        />
      </div>
      <div className="relative  flex-1 items-center justify-center lg:w-1/2 hidden lg:flex">
        <Image
          src="/logobg.webp"
          alt="Enduro Drift Bosnien Logo"
          width={800}
          height={600}
          className="object-contain"
          loading="lazy"
        />
      </div>

      {/* L strana - Tekst i dugme */}
      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        {/* AKCIJA 
        <div className="bg-red-600 text-white font-bold text-center py-2 px-4 rounded-md text-lg animate-bounce">
          {t("akcija")}
        </div> */}
        <h1 className="bold-52 lg:bold-88">
          Enduro Drift <span className="text-red-500">Bosnien</span>{" "}
        </h1>
        <p className="regular-16 font-roboto mt-6 text-gray-30 xl:max-w-[520px]">
          {t("hero-text")}
        </p>

        <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image
                  src="/star.png"
                  key={index}
                  alt="star"
                  width={24}
                  height={24}
                />
              ))}
          </div>

          <p className="bold-16 lg:bold-20 text-blue-70">
            203
            <span className="regular-16 lg:regular-20 ml-1">{t("star")}</span>
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row">
          <Link href={`/${locale}/anmeldung`}>
            <Button type="button" title={t("dugme")} variant="btn_red" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
