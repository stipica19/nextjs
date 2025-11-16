import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const partners = [
  "/saloon.png",
  "/saraj.webp",
  "/zona.png",
  "/fork-socks.webp",
];

export default function Footer({ locale = "de" }: { locale?: string }) {
  const isDe = locale === "de";
  return (
    <footer className="bg-gray-900 text-white py-12 text-[12px] sm:text-[14px] md:text-[16px]">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kontakt podaci */}
        <div>
          <h3 className="text-2xl font-bold mb-4">
            {isDe ? "📍 Kontakt" : "📍 Contact"}
          </h3>
          <p className="text-gray-300">
            Silvija Strahimira Kranjcevica, 70280 - Gornji Vakuf-Uskoplje,
            Bosnia and Hercegovina
          </p>
          <p className="text-gray-300 mt-2">📞 +387 63 136 095</p>
          <p className="text-gray-300">✉️ endurodriftbosnien@gmail.com</p>
        </div>

        {/* Logotipi partnera */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            {isDe ? "🤝 Partner" : "🤝 Partners"}
          </h3>
          <div className="flex justify-center gap-4">
            {partners.map((logo, index) => (
              <div key={index} className="w-20 h-20 relative">
                <Image
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Društvene mreže */}
        <div className="text-center md:text-right ">
          <h3 className="text-2xl font-bold mb-4">
            {isDe ? "🌐 Folge uns" : "🌐 Follow us"}
          </h3>
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100054829614691"
              target="_blank"
              className="text-gray-400 hover:text-blue-500 text-3xl"
              aria-label="Facebook profil"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/enduro_drift_bosnien/?locale=en-TH&hl=ar"
              target="_blank"
              className="text-gray-400 hover:text-pink-500 text-3xl"
              aria-label="Instagram profil"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@endurodriftbosnien536"
              target="_blank"
              className="text-gray-400 hover:text-red-500 text-3xl"
              aria-label="Youtube profil"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.tiktok.com/@endurodriftbosnien"
              target="_blank"
              className="text-gray-400 hover:text-indigo-600 text-3xl"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-300 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Enduro Drift Bosnia |{" "}
        {isDe ? "Alle Rechte vorbehalten." : "All rights reserved."}
        <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
          <Link
            href={`/${locale}/privacy`}
            className="hover:underline text-amber-400"
          >
            {isDe ? "Datenschutz" : "Privacy Policy"}
          </Link>
          <Link
            href="https://www.linkedin.com/in/stipica-klepic/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline"
          >
            Design by Stipica
          </Link>
        </div>
      </div>
    </footer>
  );
}
