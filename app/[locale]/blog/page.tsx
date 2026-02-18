import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Params = { locale: "de" | "en" };
// Explicit types for posts returned by getAllPosts to satisfy TypeScript
type Frontmatter = {
  title: string;
  description?: string;
  cover?: string;
  date?: string | number;
  tags?: string[];
};

type Post = {
  slug: string;
  frontmatter: Frontmatter;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isDe = locale === "de";

  return {
    title: isDe
      ? "Enduro Blog | Enduro Drift Bosnien"
      : "Enduro Blog | Enduro Drift Bosnia",
    description: isDe
      ? "Tipps, Erfahrungen und Guides für Enduro-Touren in Bosnien."
      : "Tips, experiences and guides for Enduro tours in Bosnia.",
    alternates: {
      canonical: `/${locale}/blog`,
    },
    openGraph: {
      url: `https://endurodriftbosnien.com/${locale}/blog`,
    },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;

  const posts: Post[] = getAllPosts(locale);
  const t = await getTranslations({ locale, namespace: "" });

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white">
        <Image
          src="/slider2.webp"
          alt="Enduro Drift Bosnien"
          fill
          priority
          className="object-cover opacity-20"
        />
        <div className="relative z-10 px-6 py-16 sm:px-10 md:px-14">
          <h1 className="mt-4 font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl">
            Enduro Drift Bosnien · Blog
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">{t("blog_p")}</p>
          <div className="mt-8 flex gap-3">
            <Link
              href={`/${locale}/contact`}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow hover:shadow-md transition"
            >
              {t("book_now")}
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of posts */}
      <section className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/${locale}/blog/${slug}`}
              className="group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition flex flex-col"
            >
              <div className="relative h-48">
                {frontmatter.cover ? (
                  <Image
                    src={frontmatter.cover}
                    alt={frontmatter.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full w-full bg-neutral-100" />
                )}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold leading-snug line-clamp-2 group-hover:underline">
                  {frontmatter.title}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  {frontmatter.date
                    ? new Date(frontmatter.date).toLocaleDateString(locale)
                    : ""}
                </p>
                <p className="mt-3 text-neutral-700 line-clamp-3 flex-1">
                  {frontmatter.description}
                </p>

                {Array.isArray(frontmatter.tags) &&
                  frontmatter.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {frontmatter.tags.slice(0, 3).map((f: any) => (
                        <span
                          key={f}
                          className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] text-neutral-700"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                {/* CTA "Pročitaj više" */}
                <span className="mt-5 inline-block text-sm font-semibold text-amber-600 group-hover:text-amber-700">
                  {t("blog_read")} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="mt-16">
        <div className="rounded-2xl border bg-gradient-to-r from-amber-50 to-orange-50 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">{t("blog_kontakt")}</h3>
            <p className="text-neutral-600">{t("blog_read_more")}</p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="rounded-xl bg-neutral-900 text-white px-5 py-2.5 font-semibold shadow hover:shadow-md transition"
          >
            Kontakt
          </Link>
        </div>
      </section>
    </main>
  );
}
