export const metadata = {
  title: "About Us",
  description:
    "Learn about Radiant Auto's story, mission, and team. Saskatoon's trusted auto dealer committed to transparent no-haggle vehicle sales.",
  alternates: {
    canonical: "/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Radiant Auto",
    description:
      "Discover Radiant Auto's dedication to exceptional automotive services and customer satisfaction.",
    url: "https://radiant-auto.com/about",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://radiant-auto.com/images/titlebg.jpeg",
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
    images: ["https://radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
