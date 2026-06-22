export const metadata = {
  title: "Blog",
  description:
    "Stay updated with the latest automotive news, tips, and insights from Radiant Auto.",
  openGraph: {
    title: "Blog - Radiant Auto",
    description:
      "Stay updated with the latest automotive news, tips, and insights from Radiant Auto.",
    url: "https://www.radiant-auto.com/blog",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://www.radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Radiant Auto Blog",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Radiant Auto",
    description:
      "Stay updated with the latest automotive news, tips, and insights from Radiant Auto.",
    images: ["https://www.radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
