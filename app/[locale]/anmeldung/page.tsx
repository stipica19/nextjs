import type { Metadata } from "next";
import AnmeldungClient from "./AnmeldungClient";

type Params = { locale: "de" | "en" };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "de"
      ? "Anmeldung - Enduro Drift Bosnien"
      : "Booking - Enduro Drift Bosnia";
  const description =
    locale === "de"
      ? "Melden Sie sich für Ihre Enduro Tour in Bosnien an. Schnelle und einfache Buchung."
      : "Register for your Enduro tour in Bosnia. Fast and easy booking.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/anmeldung`,
      languages: {
        de: "/de/anmeldung",
        en: "/en/anmeldung",
      },
    },
    openGraph: {
      url: `https://endurodriftbosnien.com/${locale}/anmeldung`,
      title,
      description,
    },
  };
}

export default function AnmeldungPage() {
  return <AnmeldungClient />;
}
