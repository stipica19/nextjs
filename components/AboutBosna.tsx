import { useTranslations } from "next-intl";
import Image from "next/image";

const locations = [
  {
    id: 1,
    name: "Prokoško See",
    description:
      "best_p6", image: "/prokosko.webp",
  },
  {
    id: 2,
    name: "Vranica",
    description:
      "best_p7",
    image: "/vranica.webp",
  },
  {
    id: 3,
    name: "Rama See",
    description: "ramsko",
    image: "/ramsko.webp",
  },
  {
    id: 4,
    name: "Raduša",
    description: "",
    image: "/radusa.webp",
  },
  {
    id: 5,
    name: "Bosnien Tour",
    description: "",
    image: "/tour.jpg",
  },
  {
    id: 6,
    name: "Standortkarte",
    description: "",
    image: "/mapa.webp",
  },
];

export default function AboutBosna() {
  const t = useTranslations();

  return (
    <section className="py-20 bg-gray-10">
      <div className="container mx-auto px-1 lg:px-20 text-center">
        {/* Naslov */}
        <h2 className="sm:text-base md:text-3xl   font-roboto font-semibold text-gray-900 mb-8">
          🏔️ {t("best_title")}
        </h2>

        {/* Opis */}
        <p className="text-sm sm:text-base md:text-lg mt-2  text-gray-700 text-left mx-auto max-w-[80%] leading-relaxed">
          {t("best_p1")}

        </p>
        <p className="text-sm sm:text-base md:text-lg mt-2 text-gray-700 text-left mx-auto max-w-[80%] leading-relaxed">
          {t("best_p2")}
        </p>
        <p className="text-sm sm:text-base md:text-lg mt-2 text-gray-700 text-left mx-auto max-w-[80%] leading-relaxed">
          {t("best_p3")}

        </p>

        <p className="text-sm sm:text-base md:text-lg mt-2 text-gray-700 text-left mx-auto max-w-[80%] leading-relaxed">
          {t("best_p4")}

        </p>

        {/* Lokacija */}
        <div className="mt-12 bg-white shadow-xl rounded-lg p-8 lg:p-10 text-left">
          <h3 className=" font-bold text-red-600 flex items-center text-2xl">
            📍 {t("best_lokacija").toUpperCase()}
          </h3>
          <p className="text-gray-700 mt-2 leading-relaxed text-sm">
            {t("best_p5")}
          </p>
        </div>

        {/* Galerija */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative w-full h-64">
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {location.name}
                </h3>
                <p className="text-gray-600 mt-2 leading-relaxed text-sm">
                  {location.description ? t(location.description) : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
