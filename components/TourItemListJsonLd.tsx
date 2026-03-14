type TourItem = {
  name: string;
  description: string;
  url: string;
  image: string;
};

export default function TourItemListJsonLd({ items }: { items: TourItem[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TouristTrip",
        name: item.name,
        description: item.description,
        url: item.url,
        image: item.image,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
