import { NextSeo } from "next-seo";

export default function SEO({
    title,
    description,
    url,
    image,
    keywords,
}: {
    title: string;
    description: string;
    url: string;
    image?: string;
    keywords?: string;
}) {
    return (
        <NextSeo
            title={title}
            description={description}
            canonical={url}
            additionalMetaTags={[
                { name: "keywords", content: keywords || "" },
                { name: "author", content: "Enduro Drift Bosnien" },
            ]}
            openGraph={{
                title: title,
                description: description,
                url: url,
                site_name: "Enduro Drift Bosnien",
                images: [
                    {
                        url: image || "https://endurodriftbosnien.com/og-image.jpg",
                        width: 1200,
                        height: 630,
                        alt: "Enduro Drift Bosnien - Offroad Adventure",
                    },
                ],
            }}
            twitter={{
                handle: "@endurodriftbosnien",
                site: "@endurodriftbosnien",
                cardType: "summary_large_image",
            }}
        />
    );
}
