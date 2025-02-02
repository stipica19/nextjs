"use client";

import { useState } from "react";

export default function Galerie() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const photos = [
    "/bg_termine.webp",
    "/prokosko.webp",
    "/slider2.webp",
    "/slider4.webp",
    "/slide3.webp",
    "/bg_termine.webp",
    "/prokosko.webp",
    "/slider2.webp",
    "/slider4.webp",
    "/slide3.webp",
  ];

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      {/* Masonry Gallery */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {photos.map((src, index) => (
          <div key={index} className="break-inside-avoid">
            <img
              src={src}
              alt={`Slika ${index + 1}`}
              className="w-full rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => setSelectedImage(src)}
            />
          </div>
        ))}
      </div>

      {/* Modal za prikaz uvećane slike */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Uvećana slika" className="max-w-5xl max-h-[90vh] rounded-lg" />
        </div>
      )}
    </div>
  );
}
