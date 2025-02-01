
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function Reisefuhrer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const t = useTranslations();

  const photos = [
    "/ckalja-motor.webp",
    "/001-6.webp",
    "/001-9.webp",
    "/000-01.webp",
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center">
      {/* Hero Section sa Pozadinskom Slikom */}
      <div className="relative w-full mt-4 h-[30vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/background.jpg')" }}>
        <div className="bg-black bg-opacity-70 p-2 max-w-3xl text-center rounded-md">
          <h1 className="text-2xl font-bold text-red-500">{t("tour_guide")}</h1>
          <p className="text-lg mt-2">
            {t("tour_guide1")}
          </p>
        </div>
      </div>

      {/* Galerija */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-10 px-1">
        {photos.map((src, index) => (
          <div key={index} className="rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform" onClick={() => setSelectedImage(src)}>
            <Image src={src} alt={`Slika ${index + 1}`} width={250} height={350} className="w-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Modal za uvećanu sliku */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <Image src={selectedImage} alt="Uvećana slika" width={600} height={800} className="rounded-lg max-w-[90%] max-h-[90%]" />
        </div>
      )}
    </div>
  );
}
