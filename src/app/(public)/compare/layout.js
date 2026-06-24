export const metadata = {
  title: "Compare Vehicles",
  description:
    "Compare side-by-side specifications, features, and pricing of your favorite vehicles to make an informed buying decision.",
  alternates: {
    canonical: "/compare",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Compare Vehicles - Radiant Auto",
    description:
      "Compare side-by-side specs, features, and pricing of your favorite vehicles at Radiant Auto.",
    url: "https://radiant-auto.com/compare",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Compare Vehicles - Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Vehicles - Radiant Auto",
    description:
      "Compare side-by-side specs, features, and pricing of your favorite vehicles at Radiant Auto.",
    images: ["https://radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function CompareLayout({ children }) {
  return <>{children}</>;
}
