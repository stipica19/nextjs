"use client"; // Obavezno za Next.js App Router

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { getNavLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";



const Navbar = () => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1]; // ✅ Uzimamo locale iz URL-a
  const router = useRouter();

  const navLinks = getNavLinks(locale);


  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("de");

  const languages = [
    { code: "en", label: "English", icon: "/gb.png" },
    { code: "de", label: "Deutsch", icon: "/de.png" },
  ];

  // Funkcija koja menja jezik klikom na zastavu
  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return; // Ako je isti jezik, ne radi ništa

    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`); // Menjamo `locale` u URL-u
    router.push(newPathname); // Navigiramo na novi jezik
  };

  return (
    <nav className="flex justify-between items-center max-container padding-container relative z-30 py-5">

      {/* Logo */}
      <Link href="/">
        <Image src="/logo.png" alt="Enduro Drift Bosnien Logo" width={74} height={29} priority />
      </Link>

      {/* Desktop Navigacija */}
      <ul className="hidden lg:flex items-center gap-12">
        {navLinks?.map((link) => (
          <li key={link.key}>
            <Link href={link.href} className="text-gray-800 hover:text-black  font-roboto font-medium transition-all">
              {link.label.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>

      {/* Jezički izbor */}
      <div className=" flex-row hidden lg:flex">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}

            className={`flex mr-2 items-center gap-1 px-3 py-2 rounded-md ${language === lang.code ? "bg-gray-200" : "bg-gray-100"}`}
          >
            <Image src={lang?.icon} alt={lang.label} width={24} height={24} />
          </button>
        ))}
      </div>



      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
        <Image src="/menu.png" alt="Menu" width={32} height={32} className="cursor-pointer" />
      </button>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
        <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-5">

        </button>

        <ul className="flex flex-col items-start mt-16 px-6 space-y-4">
          {navLinks?.map((link) => (
            <li key={link.key}>
              <Link href={link.href} onClick={() => setMenuOpen(false)} className="text-gray-800 text-lg font-medium block py-2">
                {link.label.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>

        {/* Jezički izbor u mobilnom meniju */}
        <div className="mt-8 px-6">
          <p className="text-gray-700 font-medium">Language:</p>
          <div className="flex space-x-4 mt-2">
            {languages.map((lang) => (
              <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`flex flex-col items-center gap-3 px-3 py-2 rounded-md ${language === lang.code ? "bg-gray-200" : "bg-gray-100"}`}>
                <Image src={lang?.icon} alt={lang.label} width={24} height={24} />
                <span>{lang.label.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>


      </div>

      {/* Overlay kada je meni otvoren */}
      {menuOpen && <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={() => setMenuOpen(false)}></div>}

    </nav>
  );
};

export default Navbar;
