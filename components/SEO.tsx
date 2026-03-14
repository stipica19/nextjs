import Head from "next/head";
import { generateNextSeo, type NextSeoProps } from "next-seo/pages";

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
  const seo: NextSeoProps = {
    title,
    description,
    canonical: url,
    additionalMetaTags: [
      { name: "keywords", content: keywords || "" },
      { name: "author", content: "Enduro Drift Bosnien" },
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: "Enduro Drift Bosnien",
      images: [
        {
          url:
            image ||
            "https://www.endurodriftbosnien.com/enduro_tour_bosnia.png",
          width: 1200,
          height: 630,
          alt: "Enduro Drift Bosnien - Offroad Adventure",
        },
      ],
    },
    twitter: {
      handle: "@endurodriftbosnien",
      site: "@endurodriftbosnien",
      cardType: "summary_large_image",
    },
  };

  return <Head>{generateNextSeo(seo)}</Head>;
}
