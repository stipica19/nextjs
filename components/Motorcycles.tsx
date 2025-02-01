import { useTranslations } from "next-intl";
import Image from "next/image";

const motorcycles = [
  {
    id: 1,
    name: "BETA 300 RR 2023",
    image: "/beta-300-rr.webp",
  },
  {
    id: 2,
    name: "BETA 300 XTRAINER 2023",
    image: "/beta-300-xtrainer.webp",
  },
];

export default function Motorcycles() {
  const t = useTranslations();

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-20 text-center">

        {/* Naslov */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          MOTORCYCLES
        </h2>
        <p className="text-lg mt-2 text-gray-700 text-left mx-auto mx-auto max-w-[80%] leading-relaxed">
          {t("moto_p1")}
        </p>

        {/* Opis */}
        <div className="text-left  mx-auto mt-6 text-gray-700">
          <p className="text-lg mt-2 text-gray-700 text-left  mx-auto max-w-[80%] leading-relaxed">
            {t("moto_p2")}
          </p>
          <p className="text-lg mt-2 text-gray-700 text-left  mx-auto max-w-[80%] leading-relaxed">
            {t("moto_p3")}
          </p>
          <p className="text-lg mt-2 text-gray-700 text-left  mx-auto max-w-[80%] leading-relaxed">
            {t("moto_p4")} 👇
          </p>
          <ul className="mt-2 font-semibold mx-auto max-w-[80%]">
            <li className="mx-auto ">🏍️ BETA 300 RR 2023</li>
            <li className="mx-auto">🏍️ BETA 300 XTRAINER 2023</li>
          </ul>
        </div>

        {/* Slike motora */}

        <div className="mt-6 grid md:grid-cols-2 gap-0">
          {motorcycles.map((bike) => (
            <div key={bike.id} className="text-center">
              <div className="relative w-full h-64">
                <Image
                  src={bike.image}
                  alt={bike.name}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Oprema */}
        <div className="mt-12  p-6 lg:p-10 text-left">
          <h3 className="text-2xl text-center font-bold text-gray-900">🏍️{t("gang_title")}</h3>
          <p className="text-left  max-w-[80%] mx-auto mt-6 text-gray-700">
            {t("gang")}
          </p>
          <p className="text-left max-w-[80%] mx-auto mt-6 text-gray-700">
            {t("gang1")}
          </p>
          <ul className=" space-y-2  font-semibold text-left  max-w-[80%] mx-auto mt-6 text-gray-700">
            <li>🪖  {t("gang2")}</li>
            <li>🥾 {t("gang3")}</li>
            <li>🧤 {t("gang4")}</li>
            <li>🛡️ {t("gang5")}</li>
          </ul>
          <p className="mt-4  text-left  max-w-[80%] mx-auto mt-6 text-gray-700">
            {t("gang6")}
          </p>
        </div>

      </div>
    </section>
  );
}
