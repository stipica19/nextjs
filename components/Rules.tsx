"use client"
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";



export default function Rules() {
  const t = useTranslations();

  const rules = t.raw("rules"); //  `t.raw()` jer `rules` sadrži niz (array)


  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-16 bg-gray-200">
      <div className="container mx-auto px-6 lg:px-20 text-center">

        {/* Naslov */}
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          📜 {t("rule_title")}
        </h2>

        {/* Lista pravila */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 lg:p-10">
          <ul className="text-left space-y-4">
            {rules.slice(0, showAll ? rules.length : 5).map((rule, index) => (
              <li key={index} className="flex items-center text-gray-800 text-sm">
                <FaCheckCircle className="text-green-600 mr-3" />
                {rule}
              </li>
            ))}
          </ul>

          {/* Dugme za prikazivanje više pravila */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold uppercase tracking-wide hover:bg-red-700 transition"
            >
              {showAll ? "Prikaži manje" : "Prikaži više"}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
