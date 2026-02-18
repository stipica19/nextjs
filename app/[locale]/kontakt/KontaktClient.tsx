"use client";

import { useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { useTranslations } from "next-intl";

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
  recaptchaToken?: string;
}

export default function KontaktClient() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const t = useTranslations();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // reCAPTCHA v3: dinamički učitaj i izvrši
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;
      let token = "";

      if (typeof window !== "undefined" && siteKey) {
        if (!(window as any).grecaptcha) {
          await new Promise<void>((resolve) => {
            const s = document.createElement("script");
            s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            s.async = true;
            s.onload = () => resolve();
            document.body.appendChild(s);
          });
        }

        await new Promise<void>((resolve) =>
          (window as any).grecaptcha.ready(resolve),
        );

        token = await (window as any).grecaptcha.execute(siteKey, {
          action: "kontakt_form",
        });
      }

      const payload = { ...form, recaptchaToken: token };

      await axios.post("/api/email", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess("Die Nachricht wurde erfolgreich gesendet!");
      setForm({ name: "", email: "", message: "", honeypot: "" });
    } catch (err: any) {
      setError(err.response?.data?.error || "Fehler beim Senden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Hero Sekcija */}
      <div className="relative w-full h-[20vh] flex items-center justify-center bg-cover bg-center">
        <div className="bg-opacity-70 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold text-red-500">{t("kontakt_t")}</h1>
          <p className="text-lg ">{t("kontakt_p")}</p>
        </div>
      </div>

      {/* Kontakt Forma */}
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Honeypot polje */}
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handleChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <input
            type="text"
            name="name"
            placeholder={t("kontakt_n")}
            value={form.name}
            onChange={handleChange}
            className="p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder={t("kontakt_e")}
            value={form.email}
            onChange={handleChange}
            className="p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          <textarea
            placeholder={t("kontakt_m")}
            name="message"
            value={form.message}
            onChange={handleChange}
            className="p-3 h-28 bg-gray-700 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 uppercase text-white font-bold py-3 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? t("gastebuch_b1") : t("gastebuch_b")}
          </button>
        </form>

        {success && <p className="text-green-500 mt-3">{success}</p>}
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>

      {/* Google Maps */}
      <div className="w-full max-w-2xl mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.014095597526!2d17.576779!3d43.937553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475f0de3ca1241e7%3A0x1fb0faed507d7f51!2sEnduro%20Drift%20Bosnien!5e0!3m2!1sen!2sba!4v1700000000000"
          width="100%"
          height="300"
          allowFullScreen
          loading="lazy"
          className="rounded-lg shadow-lg border-0"
        />
      </div>

      {/* Društvene Mreže */}
      <div className="flex flex-col items-center mt-10 space-y-4">
        <p className="text-lg font-semibold">Folge uns auf:</p>
        <div className="flex space-x-6 text-2xl">
          <a href="#" className="text-blue-500 hover:text-blue-400 transition">
            <FaFacebook />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-400 transition">
            <FaInstagram />
          </a>
          <a
            href="#"
            className="text-green-500 hover:text-green-400 transition"
          >
            <FaWhatsapp />
          </a>
        </div>

        <p className="mt-4 text-gray-400 text-center px-4">
          📍 Silvija Strahimira Kranjcevica, 70280 - Gornji Vakuf-Uskoplje,
          Bosnia and Hercegovina
        </p>
      </div>
    </div>
  );
}
