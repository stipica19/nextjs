import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="author" content="Enduro Drift Bosnien" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/logo.png" sizes="32x32" />
      </head>
      <body className={`${roboto.className} bg-white text-black`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
