export const metadata = {
  title: "Blog",
  description:
    "Read the latest automotive tips, buying guides, and industry insights from Radiant Auto. Stay informed before your next vehicle purchase.",
  alternates: {
    canonical: "/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Blog - Radiant Auto",
    description:
      "Stay updated with the latest automotive news, tips, and insights from Radiant Auto.",
    url: "https://radiant-auto.com/blog",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://radiant-auto.com/images/titlebg.jpeg",
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
    images: ["https://radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
