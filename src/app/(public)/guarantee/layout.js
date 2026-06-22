export const metadata = {
  title: "Buy With Confidence - The Radiant Auto Guarantee",
  description:
    "We offer a 10-day money-back guarantee on all vehicles, as well as a 90-day complimentary warranty, so you can buy with confidence knowing your new car is a perfect fit.",
  openGraph: {
    title: "Buy With Confidence - The Radiant Auto Guarantee",
    description:
      "We offer a 10-day money-back guarantee on all vehicles, as well as a 90-day complimentary warranty, so you can buy with confidence knowing your new car is a perfect fit.",
    url: "https://www.radiant-auto.com/guarantee",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://www.radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Radiant Auto Guarantee",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy With Confidence - The Radiant Auto Guarantee",
    description:
      "We offer a 10-day money-back guarantee on all vehicles, as well as a 90-day complimentary warranty.",
    images: ["https://www.radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function GuaranteeLayout({ children }) {
  return <>{children}</>;
}
