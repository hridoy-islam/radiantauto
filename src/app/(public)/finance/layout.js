export const metadata = {
  title: "Finance",
  description:
    "Explore flexible financing options at Radiant Auto. Get pre-approved in minutes with competitive rates and tailored payment plans.",
  openGraph: {
    title: "Finance - Radiant Auto",
    description:
      "Explore flexible financing options at Radiant Auto. Get pre-approved in minutes with competitive rates and tailored payment plans.",
    url: "https://radiant-auto.com/finance",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Finance - Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance - Radiant Auto",
    description:
      "Explore flexible financing options at Radiant Auto. Get pre-approved in minutes with competitive rates and tailored payment plans.",
    images: ["https://radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function FinanceLayout({ children }) {
  return <>{children}</>;
}
