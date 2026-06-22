export const metadata = {
  title: "FAQ",
  description:
    "Find answers to frequently asked questions about buying, selling, financing, and trading in vehicles at Radiant Auto.",
  openGraph: {
    title: "FAQ - Radiant Auto",
    description:
      "Find answers to frequently asked questions about buying, selling, financing, and trading in vehicles at Radiant Auto.",
    url: "https://www.radiant-auto.com/faq",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://www.radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "FAQ - Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Radiant Auto",
    description:
      "Find answers to frequently asked questions about buying, selling, financing, and trading in vehicles at Radiant Auto.",
    images: ["https://www.radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function FaqLayout({ children }) {
  return <>{children}</>;
}
