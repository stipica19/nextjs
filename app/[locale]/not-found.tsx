import Link from "next/link";

export default async function NotFound({
  params,
}: {
  params: Promise<{ locale: "de" | "en" }>;
}) {
  const { locale } = (await params) ?? { locale: "de" };
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-neutral-600">
        {locale === "de"
          ? "Diese Seite wurde nicht gefunden."
          : "This page could not be found."}
      </p>
      <div className="mt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
        >
          {locale === "de" ? "Zuruck zur Startseite" : "Back to home"}
        </Link>
      </div>
    </main>
  );
}
