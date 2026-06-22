export const metadata = {
  title: "About Us",
  description:
    "Learn more about Radiant Auto's commitment to quality car care and customer service.",
  openGraph: {
    title: "About Radiant Auto",
    description:
      "Discover Radiant Auto's dedication to exceptional automotive services and customer satisfaction.",
    url: "https://www.radiant-auto.com/about",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://www.radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "About Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Radiant Auto",
    description:
      "Discover Radiant Auto's dedication to exceptional automotive services and customer satisfaction.",
    images: ["https://www.radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
