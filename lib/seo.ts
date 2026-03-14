import type { Metadata } from "next";

const SITE_URL = "https://endurodriftbosnien.com";
const SITE_NAME = "Enduro Drift Bosnien";
const DEFAULT_OG_IMAGE =
    "https://res.cloudinary.com/stipica/image/upload/c_limit,w_2048/f_auto/q_auto/v1/Your_paragraph_text_1_jabt8n?_a=BAVAZGBz0";

export type Locale = "de" | "en";

function normalizeRoute(route?: string) {
    if (!route) return "";
    return `/${route.replace(/^\/+/, "")}`;
}

function localizedPath(locale: Locale, route?: string) {
    return `/${locale}${normalizeRoute(route)}`;
}

export function buildLocalizedMetadata({
    locale,
    route,
    title,
    description,
    image,
    index = true,
    follow = true,
    ogType = "website",
}: {
    locale: Locale;
    route?: string;
    title: string;
    description: string;
    image?: string;
    index?: boolean;
    follow?: boolean;
    ogType?: "website" | "article";
}): Metadata {
    const path = localizedPath(locale, route);
    const url = `${SITE_URL}${path}`;
    const ogImage = image || DEFAULT_OG_IMAGE;
    const localeTag = locale === "de" ? "de_DE" : "en_US";

    return {
        title,
        description,
        robots: { index, follow },
        alternates: {
            canonical: path,
            languages: {
                de: localizedPath("de", route),
                en: localizedPath("en", route),
                "x-default": localizedPath("de", route),
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${SITE_NAME} - ${title}`,
                },
            ],
            locale: localeTag,
            type: ogType,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

export function absoluteUrl(path: string) {
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
