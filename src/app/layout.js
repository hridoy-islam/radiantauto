import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Radiant Auto",
  description:
    "We offer a comprehensive range of services designed to meet all your automotive needs.",
  schemaOrg: {
    "@context": "http://schema.org",
    "@type": "AutoBodyShop",
    name: "Radiant Auto",
    description:
      "Radiant Auto offers top-notch car care services with a focus on customer experience and professional workmanship.",
    url: "https://www.radiantauto.com/about",
    image: "https://www.radiantauto.com/images/about-hero.jpg",
    telephone: "+1 306 261 4800",
    address: {
      "@type": "PostalAddress",
      streetAddress: "213 33rd St",
      addressLocality: "WSaskatoon",
      addressRegion: "SK",
      postalCode: "S7L 0V2",
      addressCountry: "CA",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
