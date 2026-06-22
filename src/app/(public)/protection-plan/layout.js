export const metadata = {
  title: "Vehicle Protection - Buy With Confidence",
  description:
    "We offer a variety of protection plans beyond the 90-day Complimentary Warranty included on all vehicles. Our warranties cover your car by extending its original warranty, covering costs should something break down. Gap Coverage covers what you still owe on the car should it be totaled or stolen.",
  openGraph: {
    title: "Vehicle Protection - Radiant Auto",
    description:
      "We offer a variety of protection plans beyond the 90-day Complimentary Warranty included on all vehicles. Gap Coverage covers what you still owe on the car should it be totaled or stolen.",
    url: "https://www.radiant-auto.com/protection-plan",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://www.radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Vehicle Protection - Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Protection - Radiant Auto",
    description:
      "Explore protection plans and warranty options at Radiant Auto. Buy with confidence.",
    images: ["https://www.radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function ProtectionPlanLayout({ children }) {
  return <>{children}</>;
}
