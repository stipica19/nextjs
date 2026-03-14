import type { MetadataRoute } from "next";

const BASE_URL = "https://endurodriftbosnien.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/de/admin",
                    "/en/admin",
                    "/de/login",
                    "/en/login",
                    "/de/anmeldung",
                    "/en/anmeldung",
                ],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
