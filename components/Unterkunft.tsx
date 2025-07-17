"use client"; //

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslations } from "next-intl";

const images = [
  "/hotel/hotel0.jpeg",
  "/hotel/hotel00.jpeg",
  "/hotel/hotel1.jpeg",
  "/hotel/hotel4.jpeg",
  "/hotel/hotel5.jpeg",
];

export default function Unterkunft() {
  const t = useTranslations();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        {/* Naslov */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6 relative inline-block">
          {t("hotel_title")}
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-red-600"></span>
        </h2>
        <p className="text-sm sm:text-lg mt-2 text-gray-700 text-left mx-auto max-w-[90%] leading-relaxed">
          {t("hotel")}
        </p>

        {/* Slider */}
        <div className="mt-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            breakpoints={{
              768: { slidesPerView: 3 }, // Tableti
              1024: { slidesPerView: 4 }, // Laptopi i veći ekrani
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            loop={true}
            className="w-full max-w-full mx-auto"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="relative w-full h-96">
                  <Image
                    src={src}
                    alt={`Hotel image ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
