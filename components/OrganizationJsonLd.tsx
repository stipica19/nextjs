export default function OrganizationJsonLd() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Enduro Drift Bosnien",
    url: "https://endurodriftbosnien.com",
    logo: "https://endurodriftbosnien.com/logo.png",
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
