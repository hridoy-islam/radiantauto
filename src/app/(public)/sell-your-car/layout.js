export const metadata = {
  title: "Sell Your Car",
  description:
    "Sell your car quickly and at the best possible price with Radiant Auto. Free market evaluation, no hidden fees, fast payment, and free pickup.",
  openGraph: {
    title: "Sell Your Car - Radiant Auto",
    description:
      "Sell your car quickly and at the best possible price with Radiant Auto. Free market evaluation, no hidden fees, fast payment, and free pickup.",
    url: "https://www.radiant-auto.com/sell-your-car",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://www.radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Sell Your Car - Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Your Car - Radiant Auto",
    description:
      "Sell your car quickly and at the best possible price with Radiant Auto.",
    images: ["https://www.radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function SellYourCarLayout({ children }) {
  return <>{children}</>;
}
