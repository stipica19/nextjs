"use client";
import Loader from "@/components/Loader";
import { CldImage } from "next-cloudinary";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Galerie() {
  const t = useTranslations();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setPhotos(data.map((item: { public_id: string }) => item.public_id));
      } catch (error) {
        console.error("Greška pri dohvatanju slika:", error);
      } finally {
        setLoading(false); // 👈 Uvijek završi loading
      }
    }
    fetchPhotos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        📸 {t("gallery_title")}
      </h1>
      <p className="text-gray-700 max-w-2xl mx-auto mb-8">{t("gallery_p")}</p>

      {loading ? (
        <Loader />
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((url, index) => (
            <div
              key={index}
              className="break-inside-avoid"
              onClick={() => setSelectedImage(url)}
            >
              <CldImage
                src={url}
                alt={`Enduro gallery image ${index + 1}`}
                width={600}
                height={700}
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <CldImage
            src={selectedImage}
            width={1000}
            height={700}
            alt="Enduro gallery image"
            className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg transition-all duration-200"
          />
        </div>
      )}
    </div>
  );
}
