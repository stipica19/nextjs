import Image from "next/image";
import { useState } from "react";

const Anmeldung = () => {
  const [selectedTour, setSelectedTour] = useState("");

  const tours = [
    { id: 401, date: "20/03/2024", available: true },
    { id: 402, date: "25/03/2024", available: false },
    { id: 403, date: "30/03/2024", available: true },
    { id: 404, date: "05/04/2024", available: true },
    { id: 405, date: "10/04/2024", available: false },
  ];

  return (
    <section className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat px-6 lg:px-20 py-20"
      style={{ backgroundImage: "url('/background.jpg')" }}>
      
      {/* Overlay za bolji kontrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
          WAS SIE TUN MÜSSEN, UM EINE ENDURO-TOUR ZU BUCHEN?
        </h1>

        {/* Glavni sadržaj */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Tabela sa turama */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Reservieren Sie Ihre Tour
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-3 text-left">Tournummer</th>
                  <th className="p-3 text-left">Vom Tag</th>
                  <th className="p-3 text-center">Verfügbarkeit</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour) => (
                  <tr key={tour.id} className="border-b">
                    <td className="p-3">{tour.id}</td>
                    <td className="p-3">{tour.date}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          tour.available ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {tour.available ? "Verfügbar" : "Nicht verfügbar"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Forma za prijavu */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Anmelden
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold">
                  Wählen Sie eine Tour*
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={selectedTour}
                  onChange={(e) => setSelectedTour(e.target.value)}
                >
                  <option value="">Bitte wählen...</option>
                  {tours.map((tour) => (
                    <option key={tour.id} value={tour.id}>
                      Tour {tour.id} - {tour.date}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">
                  Email*
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Ihre E-Mail eingeben"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">
                  Vorname und Nachname*
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Ihr Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">
                  Telefonnummer
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="+49 123 456 789"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">
                  Nachricht
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="3"
                  placeholder="Ihre Nachricht hier eingeben..."
                ></textarea>
              </div>

              {/* Dugme za slanje */}
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Anmeldung abschicken
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Anmeldung;
