export const metadata = {
  title: "Customer Reviews",
  description:
    "Read what our customers say about their experience at Radiant Auto. See why thousands trust us for their automotive needs.",
  openGraph: {
    title: "Customer Reviews - Radiant Auto",
    description:
      "Read what our customers say about their experience at Radiant Auto. See why thousands trust us for their automotive needs.",
    url: "https://radiant-auto.com/reviews",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Customer Reviews - Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews - Radiant Auto",
    description:
      "Read what our customers say about their experience at Radiant Auto.",
    images: ["https://radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function ReviewsLayout({ children }) {
  return <>{children}</>;
}
