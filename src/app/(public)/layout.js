import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";

export const metadata = {
  title: {
    default: "Radiant Auto - Buy, Sell & Trade-In Vehicles in Saskatoon",
    template: "%s | Radiant Auto",
  },
  description:
    "We offer a comprehensive range of services designed to meet all your automotive needs. Buy, sell, or trade-in your vehicle with confidence.",
  openGraph: {
    title: "Radiant Auto - Buy, Sell & Trade-In Vehicles in Saskatoon",
    description:
      "We offer a comprehensive range of services designed to meet all your automotive needs. Buy, sell, or trade-in your vehicle with confidence.",
    url: "https://www.radiant-auto.com",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://www.radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Radiant Auto - Your Trusted Automotive Dealer",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radiant Auto - Buy, Sell & Trade-In Vehicles in Saskatoon",
    description:
      "We offer a comprehensive range of services designed to meet all your automotive needs.",
    images: ["https://www.radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function PublicLayout({ children }) {
  return (
     <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}