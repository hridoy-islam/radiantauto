export const metadata = {
  title: "Trade In Your Car",
  description:
    "Get the best value for your current vehicle with Radiant Auto's hassle-free trade-in process. Free appraisal, instant offer, and same-day processing.",
  openGraph: {
    title: "Trade In Your Car - Radiant Auto",
    description:
      "Get the best value for your current vehicle with Radiant Auto's hassle-free trade-in process. Free appraisal, instant offer, and same-day processing.",
    url: "https://radiant-auto.com/trade-in",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Trade In Your Car - Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trade In Your Car - Radiant Auto",
    description:
      "Get the best value for your current vehicle with Radiant Auto's hassle-free trade-in process.",
    images: ["https://radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function TradeInLayout({ children }) {
  return <>{children}</>;
}
