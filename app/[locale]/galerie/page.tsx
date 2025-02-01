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
    <div style={styles.container}>
      {/* Masonry Gallery */}
      <div className="masonry">
        {photos.map((src, index) => (
          <div key={index} style={styles.masonryItem}>
            <img
              src={src}
              alt={`Slika ${index + 1}`}
              style={styles.image}
              onClick={() => setSelectedImage(src)}
            />
          </div>
        ))}
      </div>

      {/* Modal za prikaz uvećane slike */}
      {
        selectedImage && (
          <div style={styles.modal} onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} alt="Uvećana slika" style={styles.modalImage} />
          </div>
        )
      }
    </div >
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center" as const,
  },
  masonry: {
    columnCount: 3, // 3 kolone za veće ekrane
    columnGap: "10px",
    margin: "0 auto",
  },
  masonryItem: {
    breakInside: "avoid", // Sprečava da se slike lome između kolona
    marginBottom: "10px",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  },
  modal: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalImage: {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "8px",
  },
};

