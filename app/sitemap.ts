import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://endurodriftbosnien.com", lastModified: new Date() },
    { url: "https://endurodriftbosnien.com/de", lastModified: new Date() },
    { url: "https://endurodriftbosnien.com/en", lastModified: new Date() },
    {
      url: "https://endurodriftbosnien.com/de/anmeldung",
      lastModified: new Date(),
    },
    {
      url: "https://endurodriftbosnien.com/en/anmeldung",
      lastModified: new Date(),
    },
    {
      url: "https://endurodriftbosnien.com/en/galerie",
      lastModified: new Date(),
    },

    {
      url: "https://endurodriftbosnien.com/en/galerie",
      lastModified: new Date(),
    },

    {
      url: "https://endurodriftbosnien.com/en/kontakt",
      lastModified: new Date(),
    },

    {
      url: "https://endurodriftbosnien.com/en/kontakt",
      lastModified: new Date(),
    },
    {
      url: "https://endurodriftbosnien.com/en/termine",
      lastModified: new Date(),
    },
    {
      url: "https://endurodriftbosnien.com/en/termine",
      lastModified: new Date(),
    },
  ];
}
