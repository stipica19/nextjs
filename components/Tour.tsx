import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

const tours = [
  {
    id: 1,
    title: "tour1_title",

    image: "/tura1-map.webp",
    prices: {
      ownBike: "tour1_priceOwnBike",
      rentalBike: "tour1_priceRentalBike",
    },
    details: [
      "tour1_detail1",
      "tour1_detail2",
      "tour1_detail3",
      "tour1_detail4",
      "tour1_detail5",
    ],
  },
  {
    id: 2,
    title: "tour2_title",

    image: "/tura2-map.webp",
    prices: {
      ownBike: "tour2_priceOwnBike",
      rentalBike: "tour2_priceRentalBike",
    },
    details: [
      "tour2_detail1",
      "tour2_detail2",
      "tour2_detail3",
      "tour2_detail4",
      "tour2_detail5",
    ],
  },
  {
    id: 3,
    title: "tour3_title",

    image: "/tura22-map.webp",
    prices: {
      ownBike: "tour3_priceOwnBike",
      rentalBike: "tour3_priceRentalBike",
    },
    details: [
      "tour3_detail1",
      "tour3_detail2",
      "tour3_detail3",
      "tour3_detail4",
      "tour3_detail5",
    ],
  },
];

export default function Tour() {
  const t = useTranslations();



  return (
    <section className="relative  py-20 bg-gray-10">
      <div className="absolute inset-0 bg-[url('/splash1.webp')] bg-no-repeat bg-center bg-cover opacity-10"></div>

      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          🏍️ {t("toure_title")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 ">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className=" shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl  clip-trapezoid"
            >
              {/* Slika */}
              <div className="relative w-full h-64">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Tekstualni deo sa nagibom */}
              <div className="bg-white text-black p-6 clip-diamond-text">
                {/* Naslov i opis ture */}
                <h3 className="text-[18px]  font-semibold ml-[10%]">
                  {t(tour.title)}
                </h3>

                {/* Cjenik */}
                <div className="mt-4 text-left ">
                  <p className="text-[12px] font-semibold text-black-300 ml-[6%]">
                    💰 Cijene:
                  </p>
                  <p className="text-black ml-[7%] text-[12px]">
                    {t(tour.prices.ownBike)}
                  </p>
                  <p className="text-black-300 ml-[6%] text-[12px]">
                    {t(tour.prices.rentalBike)}
                  </p>
                </div>

                {/* Detalji ture */}
                <ul className="mt-4 text-left space-y-2 ">
                  {tour.details.map((detail, index) => (
                    <li
                      key={index}
                      className={`text-black-300 text-[12px]  flex items-center detail-${index + 1
                        }`}
                    >
                      {t(detail)}
                    </li>
                  ))}
                </ul>
                <Link href="/de/anmeldung">
                  {/* Dugme za rezervaciju */}
                  <button className="mt-6 mr-20 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition w-3/4 font-semibold">
                    {t("dugme")}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
