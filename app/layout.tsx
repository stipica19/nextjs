import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <meta name="author" content="Enduro Drift Bosnien" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.endurodriftbosnien.com" />
        <link rel="icon" href="/logo.png" sizes="32x32" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="Enduro Tours in Bosnia " />
        <meta
          property="og:description"
          content="Experience the best Enduro tours in Bosnia and enjoy an unforgettable adventure"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/stipica/image/upload/c_limit,w_2048/f_auto/q_auto/v1/Your_paragraph_text_1_jabt8n?_a=BAVAZGBz0"
        />
        <meta property="og:url" content="https://www.endurodriftbosnien.com" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:type" content="website" />
      </head>
      <body>
        <GoogleAnalytics />
        <div className="mx-auto screen">
          <main className="relative overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
