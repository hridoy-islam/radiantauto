export const metadata = {
  title: "Search Inventory",
  description:
    "Browse our extensive inventory of quality vehicles at Radiant Auto. Filter by make, model, year, price, and more to find your perfect car.",
  openGraph: {
    title: "Search Inventory - Radiant Auto",
    description:
      "Browse our extensive inventory of quality vehicles at Radiant Auto. Filter by make, model, year, price, and more to find your perfect car.",
    url: "https://www.radiant-auto.com/search",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://www.radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Search Inventory - Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Inventory - Radiant Auto",
    description:
      "Browse our extensive inventory of quality vehicles at Radiant Auto.",
    images: ["https://www.radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function SearchLayout({ children }) {
  return <>{children}</>;
}
