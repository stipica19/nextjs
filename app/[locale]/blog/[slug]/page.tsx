import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSlugs, getPostBySlug, getAllPosts } from "@/lib/posts";
type Params = { locale: "de" | "en"; slug: string };

// -------------------- Helpers --------------------
function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://endurodriftbosnien.com";
}
function absUrl(path: string) {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
function readingTime(markdown?: string | null) {
  if (!markdown) return null;
  const words = markdown.replace(/\s+/g, " ").trim().split(" ").length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

// -------------------- Static params per locale --------------------
export function generateStaticParams() {
  const locales = ["de", "en"] as const;
  return locales.flatMap((locale) =>
    getSlugs(locale).map((slug: any) => ({ locale, slug }))
  );
}

// -------------------- SEO metadata per post --------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;

  try {
    const post = getPostBySlug(slug, locale);
    const { title, description, date, cover } = post.frontmatter;

    const url = absUrl(`/${locale}/blog/${slug}`);
    const ogImage = cover ? absUrl(cover) : absUrl("/og-default.jpg");

    return {
      title: `${title} | Enduro Drift Bosnien`,
      description,
      alternates: {
        canonical: url,
        languages: {
          de: absUrl(`/de/blog/${slug}`),
          en: absUrl(`/en/blog/${slug}`),
        },
      },
      openGraph: {
        type: "article",
        url,
        title,
        description,
        images: [{ url: ogImage }],
        locale,
        siteName: "Enduro Drift Bosnien",
        // publishedTime: date || undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
      other: {
        "article:published_time": date || "",
      },
    };
  } catch {
    return {};
  }
}

// -------------------- Article JSON-LD --------------------
function ArticleJsonLd({
  locale,
  slug,
  title,
  description,
  date,
  cover,
}: {
  locale: "de" | "en";
  slug: any;
  title: string;
  description: string;
  date: string | null;
  cover: string | null;
}) {
  const url = absUrl(`/${locale}/blog/${slug}`);
  const image = cover ? absUrl(cover) : absUrl("/og-default.jpg");

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished: date || undefined,
    author: { "@type": "Organization", name: "Enduro Drift Bosnien" },
    publisher: {
      "@type": "Organization",
      name: "Enduro Drift Bosnien",
      logo: { "@type": "ImageObject", url: absUrl("/logo.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}

// -------------------- Page --------------------
export default async function BlogPost({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug, locale);
  } catch {
    notFound();
  }

  const { frontmatter, html, markdown } = post;
  const readTime = readingTime(markdown);

  // prev/next u istom jeziku
  interface BlogPost {
    slug: string;
    frontmatter: {
      title: string;
      description: string;
      date: string | null;
      cover: string | null;
      videoId?: string;
    };
    html: string;
    markdown: string | null;
  }

  const all: BlogPost[] = getAllPosts(locale);
  const idx: number = all.findIndex((p: BlogPost) => p.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      {/* JSON-LD */}
      <ArticleJsonLd
        locale={locale}
        slug={slug}
        title={frontmatter.title}
        description={frontmatter.description}
        date={frontmatter.date}
        cover={frontmatter.cover}
      />

      {/* Breadcrumbs */}
      <nav className="text-sm text-neutral-500">
        <ol className="flex items-center gap-2">
          <li>
            <Link href={`/${locale}`} className="hover:underline">
              {locale === "de" ? "Startseite" : "Home"}
            </Link>
          </li>
          <li>›</li>
          <li>
            <Link href={`/${locale}/blog`} className="hover:underline">
              Blog
            </Link>
          </li>
          <li>›</li>
          <li className="text-neutral-700 line-clamp-1">{frontmatter.title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative mt-5 overflow-hidden rounded-3xl bg-neutral-900 text-white">
        {frontmatter.cover ? (
          <>
            <Image
              src={frontmatter.cover}
              alt={frontmatter.title}
              fill
              priority
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </>
        ) : null}

        <div className="relative z-10 px-6 py-14 sm:px-10 md:px-14">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs tracking-wide backdrop-blur">
            Enduro Drift Bosnien · Blog
          </span>
          <h1 className="mt-4 font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl">
            {frontmatter.title}
          </h1>
          <p className="mt-3 text-sm text-white/80">
            {frontmatter.date
              ? new Date(frontmatter.date).toLocaleDateString(locale)
              : null}
            {readTime ? ` · ${readTime}` : ""}
          </p>
        </div>
      </section>

      {/* Featured Video Section */}
      {frontmatter.videoId && (
        <section className="mx-auto max-w-4xl mt-10">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              {locale === "de" ? "Video Tour" : "Video Tour"}
            </h2>
            <p className="text-neutral-600">
              {locale === "de"
                ? "Schauen Sie sich unser Video an und erleben Sie das Abenteuer"
                : "Watch our video and experience the adventure"}
            </p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${frontmatter.videoId}?rel=0&modestbranding=1&showinfo=0`}
              title={frontmatter.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Content */}
      <article className="mx-auto max-w-3xl mt-10">
        <div
          className="prose prose-lg prose-neutral max-w-none
                     prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-bold
                     prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-h3:font-semibold
                     prose-p:leading-relaxed prose-p:text-neutral-800
                     prose-blockquote:border-l-4 prose-blockquote:border-neutral-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-neutral-600
                     prose-img:rounded-2xl prose-img:shadow
                     prose-li:marker:text-neutral-400
                     first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {/* Prev / Next */}
      <section className="mx-auto mt-12 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/${locale}/blog/${prev.slug}`}
              className="group rounded-2xl border p-5 transition hover:bg-neutral-50"
            >
              <span className="text-xs uppercase tracking-wide text-neutral-500">
                {locale === "de" ? "Vorheriger Beitrag" : "Previous"}
              </span>
              <p className="mt-1 font-semibold group-hover:underline line-clamp-2">
                {prev.frontmatter.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/${locale}/blog/${next.slug}`}
              className="group rounded-2xl border p-5 text-right md:text-left transition hover:bg-neutral-50"
            >
              <span className="text-xs uppercase tracking-wide text-neutral-500">
                {locale === "de" ? "Nächster Beitrag" : "Next"}
              </span>
              <p className="mt-1 font-semibold group-hover:underline line-clamp-2">
                {next.frontmatter.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
          >
            ← {locale === "de" ? "Zurück zum Blog" : "Back to Blog"}
          </Link>
        </div>
      </section>
    </main>
  );
}
